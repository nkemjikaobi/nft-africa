import React, { useReducer } from 'react';
import WalletContext from './WalletContext';
import WalletReducer from './WalletReducer';
import {
	CONNECT_WALLET,
	DISCONNECT_WALLET,
	MONITOR_ACCOUNT_CHANGED,
	MONITOR_DISCONNECT,
	LOAD_CONTRACT,
	FETCH_ALL_NFTS,
	FETCH_SINGLE_NFT,
	CREATE_NFT,
	CONNECT_GUEST,
	GENERATE_AUTH,
	WATCH_TOKEN,
	VERIFY_TOKEN,
	DISCONNECT_ARDOR_WALLET,
	FETCH_ARDOR_NFTS,
	MINT_ARDOR_NFT,
	FETCH_SINGLE_ARDOR_NFT,
	RESET_NFT_ITEM,
	FETCH_ARDOR_BIDS,
	PLACE_ARDOR_BID,
	FETCH_ARDOR_PERSONAL_ASSETS,
	FETCH_ETHEREUM_PERSONAL_ASSETS,
	FETCH_AUCTIONED_NFTS,
} from '../types';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import NFTJson from 'artifacts/nft.json';
import axios from 'axios';
import convertToEther from 'helpers/convertToEther';
import { NextRouter } from 'next/router';
import INFT from 'dto/NFT/INFT';
import { ARDOR, ETHEREUM, NotificationType } from 'constants/index';
import useAlert from 'hooks/useAlert';

const WalletState = (props: any) => {
	const initialState = {
		address: null,
		isConnected: false,
		isGuest: true,
		balance: '',
		web3: null,
		provider: null,
		symbol: '',
		providerOptions: null,
		web3Modal: null,
		contract: null,
		allNfts: null,
		auctionedNfts: null,
		singleNft: null,
		guestWeb3: null,
		guestProvider: null,
		network: ETHEREUM,
		//ARDOR
		qrCodeUrl: '',
		qrCodeId: '',
		hasGeneratedQrCodeUrl: false,
		ardorToken: '',
		ardorUserData: null,
		ardorNfts: null,
		ardorMintedData: null,
		singleArdorNft: null,
		ardorBids: [],
		ardorPlaceOrderData: null,
		ardorPersonalAssets: null,
		ethereumPersonalAssets: null,
	};

	const [state, dispatch] = useReducer(WalletReducer, initialState);

	const { setAlert } = useAlert();

	//Connect Wallet on Ethereum Network
	const connectWallet = async () => {
		const providerOptions = {
			walletconnect: {
				package: WalletConnectProvider, // required
				options: {
					infuraId: process.env.NEXT_PUBLIC_INFURA_APP_ID,
				},
			},
		};
		const web3Modal = new Web3Modal({
			theme: 'dark',
			network: 'mainnet', // optional
			cacheProvider: true, // optional
			providerOptions, // required
			//disableInjectedProvider: false
		});
		try {
			const provider = await web3Modal.connect();

			const web3 = new Web3(provider);

			//  Get Accounts
			const accounts = await web3.eth.getAccounts();

			if (accounts.length > 0) {
				//Get Balance
				let balance;
				await web3.eth.getBalance(`${accounts[0]}`, function (err, result) {
					if (err) {
						setAlert(err.message, NotificationType.ERROR);
					} else {
						balance = convertToEther(web3, result);
					}
				});
				dispatch({
					type: CONNECT_WALLET,
					payload: {
						balance,
						accounts,
						web3,
						web3Modal,
						providerOptions,
						provider,
					},
				});
				localStorage.setItem('isWalletConnected', 'true');
				localStorage.setItem('count', '1');
				localStorage.setItem('network', ETHEREUM);

				const count = localStorage.getItem('count');

				// count !== '1'
				// 	? setAlert('Wallet Connected', NotificationType.SUCCESS)
				// 	: null;
				setAlert('wallet connected', NotificationType.SUCCESS);
			}
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	//Connect Guest
	const connectGuest = async () => {
		try {
			//Use Infura Node to instantiate a provider
			const provider = new Web3.providers.HttpProvider(
				`${process.env.NEXT_PUBLIC_INFURA_APP_URL}`
			);
			const web3 = new Web3(provider);

			dispatch({
				type: CONNECT_GUEST,
				payload: {
					web3,
					provider,
				},
			});
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	//Fetch All Nft's on Ethereum Network
	const fetchAllNfts = async (contract: any) => {
		try {
			const all_nfts = await contract.methods.fetchMarketItems().call();
			const data = await Promise.all(
				all_nfts.map(async (dat: any) => {
					//Get the cid
					const nft = await contract.methods.tokenURI(dat.tokenId).call();
					//Get the metadata
					const nftData: any = await axios.get(nft);
					let item: any = {};
					item.tokenId = dat.tokenId;
					item.fileUrl = nftData.data.fileUrl;
					item.name = nftData.data.name;
					item.description = nftData.data.description;
					item.owner = dat.owner;
					item.price = dat.price;
					item.seller = dat.seller;
					item.sold = dat.sold;
					return item;
				})
			);
			dispatch({
				type: FETCH_ALL_NFTS,
				payload: data,
			});
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	//Fetch Auctioned Nft's on Ethereum Network
	const fetchAuctionedNfts = async (contract: any) => {
		try {
			const auctioned_nfts = await contract.methods.fetchAuctions().call();

			const data = await Promise.all(
				auctioned_nfts.map(async (dat: any) => {
					//Get the cid
					const nft = await contract.methods.tokenURI(dat.tokenId).call();
					//Get the metadata
					const nftData: any = await axios.get(nft);

					let item: any = {};
					item.name = nftData.data.name;
					item.description = nftData.data.description;
					item.fileUrl = nftData.data.fileUrl;
					item.tokenId = dat.tokenId;
					item.bidAmounts = dat.bidAmounts;
					item.duration = dat.duration;
					item.isActive = dat.isActive;
					item.maxBid = dat.maxBid;
					item.maxBidUser = dat.maxBidUser;
					item.nftContractAddress = dat.nftContractAddress;
					item.price = dat.price;
					item.seller = dat.seller;
					item.users = dat.users;
					return item;
				})
			);

			dispatch({
				type: FETCH_AUCTIONED_NFTS,
				payload: data,
			});
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	//Fetch Single Nft on Ethereum Network
	const fetchSingleNft = async (contract: any, id: string) => {
		try {
			const all_nfts = await contract.methods.fetchAuctions().call();
			const data = await Promise.all(
				all_nfts.map(async (dat: any) => {
					const nft = await contract.methods.tokenURI(dat.tokenId).call();
					const nftData: any = await axios.get(nft);
					let item: any = {};
					item.name = nftData.data.name;
					item.description = nftData.data.description;
					item.fileUrl = nftData.data.fileUrl;
					item.tokenId = dat.tokenId;
					item.bidAmounts = dat.bidAmounts;
					item.duration = dat.duration;
					item.isActive = dat.isActive;
					item.maxBid = dat.maxBid;
					item.maxBidUser = dat.maxBidUser;
					item.nftContractAddress = dat.nftContractAddress;
					item.price = dat.price;
					item.seller = dat.seller;
					item.users = dat.users;
					return item;
				})
			);
			const singleNft = data.filter((nft: INFT) => nft.tokenId === id);
			dispatch({
				type: FETCH_SINGLE_NFT,
				payload: singleNft[0],
			});
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	//Create NFT on Ethereum Network
	const createNft = async (
		contract: any,
		finalUrl: string,
		auctionPrice: string,
		listingPrice: string,
		address: string,
		duration: number,
		router: NextRouter
	) => {
		try {
			await contract.methods
				.createToken(finalUrl, duration, auctionPrice)
				.send({
					from: address,
					value: listingPrice,
				});

			dispatch({
				type: CREATE_NFT,
			});

			setAlert('NFT Minted and Created', NotificationType.SUCCESS);

			setTimeout(() => {
				router.push('/');
			}, 1500);
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	//Fetch ethereum personal assets
	const fetchEthereumPersonalAssets = async (
		contract: any,
		address: string
	) => {
		try {
			const assets = await contract.methods.fetchUserNft().call({
				from: address,
			});
			console.log(assets);
			// creator: '0x2223241f7d197cca53c1B13df8CfA38264017F04';
			// owner: '0x6917889Fe7922AA9A88aB4FfdBf71391fdb06A40';
			// price: '0';
			// sold: true;
			// tokenId: '5';
			const data = await Promise.all(
				assets.map(async (dat: any) => {
					const nft = await contract.methods.tokenURI(dat.tokenId).call();
					const nftData: any = await axios.get(nft);
					let item: any = {};
					item.name = nftData.data.name;
					item.description = nftData.data.description;
					item.fileUrl = nftData.data.fileUrl;
					item.tokenId = dat.tokenId;
					item.creator = dat.creator;
					item.owner = dat.owner;
					item.price = dat.price;
					item.sold = dat.sold;
					return item;
				})
			);
			dispatch({
				type: FETCH_ETHEREUM_PERSONAL_ASSETS,
				payload: data,
			});
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	//Place Bid on Ethereum Network
	const placeEthereumBid = async (
		contract: any,
		tokenId: string,
		address: string,
		price: number
	) => {
		try {
			await contract.methods.placeBid(tokenId).send({
				from: address,
				value: price,
			});

			await fetchSingleNft(contract, tokenId);

			setAlert('Bid Placed', NotificationType.SUCCESS);
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	//Execute Sale
	const sellEthereumNft = async (
		contract: any,
		tokenId: string,
		address: string,
		router: any
	) => {
		try {
			await contract.methods.executeSale(tokenId).send({
				from: address,
			});

			setAlert('Asset Sold', NotificationType.SUCCESS);
			router.push('/');
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	//Load Contract
	const loadContract = async (web3: any) => {
		try {
			const contract = new web3.eth.Contract(
				NFTJson,
				`${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`
			);

			dispatch({
				type: LOAD_CONTRACT,
				payload: contract,
			});
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	//Disconnect wallet
	const disconnectWallet = async (modal: any, network: string) => {
		if (network === ETHEREUM) {
			modal.clearCachedProvider();
			dispatch({
				type: DISCONNECT_WALLET,
			});
		} else {
			dispatch({
				type: DISCONNECT_ARDOR_WALLET,
			});
		}
		setAlert('Wallet Disconnected', NotificationType.SUCCESS);
		localStorage.removeItem('isWalletConnected');
		localStorage.removeItem('count');
		localStorage.removeItem('network');
		localStorage.removeItem('qrCodeId');
		localStorage.removeItem('ardorToken');
		connectGuest();
	};

	//Monitor disconnect
	const monitorDisconnect = async (provider: any) => {
		// Subscribe to session disconnection
		provider.on('disconnect', (code: number, reason: string) => {
			dispatch({
				type: MONITOR_DISCONNECT,
			});
			localStorage.removeItem('isWalletConnected');
			localStorage.removeItem('count');
			setAlert(reason, NotificationType.ERROR);
		});
	};
	//Monitor account changed
	const monitorAccountChanged = async (provider: any) => {
		// Subscribe to accounts change
		provider.on('accountsChanged', (accounts: string[]) => {
			dispatch({
				type: MONITOR_ACCOUNT_CHANGED,
			});
			localStorage.removeItem('isWalletConnected');
			localStorage.removeItem('count');
		});
	};

	//ARDOR
	const generateAuth = async () => {
		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_ARDOR_BASE_URL}/api/auth/generate-auth`
			);
			const url = res.data.data.url;
			const splitUrl = url.split('/');
			const id = splitUrl[splitUrl.length - 2];

			dispatch({
				type: GENERATE_AUTH,
				payload: { url, id },
			});
		} catch (error) {}
	};

	const watchToken = async (qrCodeId: string) => {
		try {
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_ARDOR_BASE_URL}/api/auth/auth-status/${qrCodeId}`
			);
			if (res.data.data.result === 'ok') {
				const token = res.data.data.token;
				dispatch({
					type: WATCH_TOKEN,
					payload: { token },
				});
			} else {
				setTimeout(() => {
					watchToken(qrCodeId);
				}, 3000);
			}
		} catch (error) {}
	};

	const verifyToken = async (qrCodeId: string, ardorToken: string) => {
		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_ARDOR_BASE_URL}/api/auth/verify-token`,
				{ uuid: qrCodeId, token: ardorToken }
			);
			if (res.data.data.valid) {
				const result = res.data.data;
				dispatch({
					type: VERIFY_TOKEN,
					payload: { result, qrCodeId, ardorToken },
				});
				localStorage.setItem('isWalletConnected', 'true');
				localStorage.setItem('count', '1');
				localStorage.setItem('network', ARDOR);
				localStorage.setItem('qrCodeId', qrCodeId);
				localStorage.setItem('ardorToken', ardorToken);

				const count = localStorage.getItem('count');

				count !== '1'
					? setAlert('Wallet Connected', NotificationType.SUCCESS)
					: null;
			}
		} catch (error) {
			setAlert('Token is invalid', NotificationType.ERROR);
		}
	};

	const fetchArdorNfts = async () => {
		try {
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_ARDOR_BASE_URL}/api/nftart/all/assets`
			);
			dispatch({
				type: FETCH_ARDOR_NFTS,
				payload: res.data.data,
			});
		} catch (error) {}
	};

	const mintArdorNft = async (
		cid: string,
		name: string,
		quantity: number,
		account: string
	) => {
		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_ARDOR_BASE_URL}/api/nftart/mint`,
				{ cid, name, quantity, account }
			);
			dispatch({
				type: MINT_ARDOR_NFT,
				payload: res.data.data,
			});

			setAlert('Asset Issued', NotificationType.SUCCESS);
		} catch (error) {}
	};

	const fetchSingleArdorNft = async (asset: string) => {
		await fetchArdorNfts();
		dispatch({
			type: FETCH_SINGLE_ARDOR_NFT,
			payload: asset,
		});
	};

	const resetNFTItem = async () => {
		dispatch({
			type: RESET_NFT_ITEM,
		});
	};

	const fetchBids = async (asset: string) => {
		try {
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_ARDOR_BASE_URL}/api/nftart/bid-order?asset=${asset}
`
			);
			dispatch({
				type: FETCH_ARDOR_BIDS,
				payload: res.data.data.bidOrders,
			});
		} catch (error) {}
	};

	const placeArdorBid = async (
		asset: string,
		quantityQNT: number,
		priceNQTPerShare: number,
		account: string
	) => {
		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_ARDOR_BASE_URL}/api/nftart/placebid`,
				{ asset, quantityQNT, priceNQTPerShare, account }
			);
			dispatch({
				type: PLACE_ARDOR_BID,
				payload: res.data.data,
			});
			setAlert(res.data.data.msg, NotificationType.SUCCESS);
		} catch (error) {}
	};

	//Fetch ardor personal assets fetchEthereumPersonalAssets
	const fetchArdorPersonalAssets = async (address: string) => {
		try {
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_ARDOR_BASE_URL}/api/nftart/account-assets/${address}
`
			);
			dispatch({
				type: FETCH_ARDOR_PERSONAL_ASSETS,
				payload: res.data.data,
			});
		} catch (error) {}
	};

	return (
		<WalletContext.Provider
			value={{
				address: state.address,
				isConnected: state.isConnected,
				balance: state.balance,
				web3: state.web3,
				provider: state.provider,
				symbol: state.symbol,
				providerOptions: state.providerOptions,
				web3Modal: state.web3Modal,
				contract: state.contract,
				allNfts: state.allNfts,
				auctionedNfts: state.auctionedNfts,
				singleNft: state.singleNft,
				guestWeb3: state.guestWeb3,
				guestProvider: state.guestProvider,
				isGuest: state.isGuest,
				qrCodeUrl: state.qrCodeUrl,
				qrCodeId: state.qrCodeId,
				hasGeneratedQrCodeUrl: state.hasGeneratedQrCodeUrl,
				ardorToken: state.ardorToken,
				ardorUserData: state.ardorUserData,
				network: state.network,
				ardorNfts: state.ardorNfts,
				ardorMintedData: state.ardorMintedData,
				singleArdorNft: state.singleArdorNft,
				ardorBids: state.ardorBids,
				ardorPlaceOrderData: state.ardorPlaceOrderData,
				ardorPersonalAssets: state.ardorPersonalAssets,
				ethereumPersonalAssets: state.ethereumPersonalAssets,
				connectWallet,
				disconnectWallet,
				monitorAccountChanged,
				monitorDisconnect,
				loadContract,
				fetchAllNfts,
				fetchSingleNft,
				createNft,
				connectGuest,
				generateAuth,
				watchToken,
				verifyToken,
				fetchArdorNfts,
				mintArdorNft,
				fetchSingleArdorNft,
				resetNFTItem,
				fetchBids,
				placeArdorBid,
				fetchArdorPersonalAssets,
				fetchAuctionedNfts,
				placeEthereumBid,
				sellEthereumNft,
				fetchEthereumPersonalAssets,
			}}
		>
			{props.children}
		</WalletContext.Provider>
	);
};

export default WalletState;
