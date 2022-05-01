import React, { useReducer } from 'react';
import WalletContext from './WalletContext';
import WalletReducer from './WalletReducer';
import {
	CONNECT_WALLET,
	ERROR,
	CLEAR_ERROR,
	CLEAR_MESSAGE,
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
} from '../types';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import NFTJson from 'artifacts/nft.json';
import axios from 'axios';
import convertToEther from 'helpers/convertToEther';
import { NextRouter } from 'next/router';
import INFT from 'dto/NFT/INFT';
import { ARDOR, ETHEREUM } from 'constants/index';

const WalletState = (props: any) => {
	const initialState = {
		address: null,
		isConnected: false,
		isGuest: true,
		balance: '',
		error: null,
		message: null,
		web3: null,
		provider: null,
		symbol: '',
		providerOptions: null,
		web3Modal: null,
		contract: null,
		allNfts: null,
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
	};

	const [state, dispatch] = useReducer(WalletReducer, initialState);

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
						dispatch({
							type: ERROR,
							payload: err.message,
						});
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
			}
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
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
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};

	//Fetch All Nft's on Ethereum Network
	const fetchAllNfts = async (contract: any) => {
		try {
			const all_nfts = await contract.methods.fetchMarketItems().call();
			const data = await Promise.all(
				all_nfts.map(async (dat: any) => {
					const nft = await contract.methods.tokenURI(dat.tokenId).call();
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
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};

	//Fetch Single Nft on Ethereum Network
	const fetchSingleNft = async (contract: any, id: string) => {
		try {
			const all_nfts = await contract.methods.fetchMarketItems().call();
			const data = await Promise.all(
				all_nfts.map(async (dat: any) => {
					const nft = await contract.methods.tokenURI(dat.tokenId).call();
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
			const singleNft = data.filter((nft: INFT) => nft.tokenId === id);
			dispatch({
				type: FETCH_SINGLE_NFT,
				payload: singleNft[0],
			});
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};

	//Create NFT on Ethereum Network
	const createNft = async (
		contract: any,
		finalUrl: string,
		auctionPrice: string,
		listingPrice: string,
		address: string,
		router: NextRouter
	) => {
		try {
			await contract.methods.createToken(finalUrl, auctionPrice).send({
				from: address,
				value: listingPrice,
			});

			dispatch({
				type: CREATE_NFT,
			});
			setTimeout(() => {
				router.push('/explore');
			}, 2000);
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
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
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};

	//Clear Error
	const clearError = () => {
		dispatch({
			type: CLEAR_ERROR,
		});
	};

	//Clear Message
	const clearMessage = () => {
		dispatch({
			type: CLEAR_MESSAGE,
		});
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
				payload: reason,
			});
			localStorage.removeItem('isWalletConnected');
			localStorage.removeItem('count');
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
			}
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: 'Token is invalid',
			});
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
			console.log(res);
			dispatch({
				type: MINT_ARDOR_NFT,
				payload: res.data.data,
			});
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

	return (
		<WalletContext.Provider
			value={{
				address: state.address,
				isConnected: state.isConnected,
				balance: state.balance,
				error: state.error,
				message: state.message,
				web3: state.web3,
				provider: state.provider,
				symbol: state.symbol,
				providerOptions: state.providerOptions,
				web3Modal: state.web3Modal,
				contract: state.contract,
				allNfts: state.allNfts,
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
				clearError,
				connectWallet,
				disconnectWallet,
				clearMessage,
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
				resetNFTItem
			}}
		>
			{props.children}
		</WalletContext.Provider>
	);
};

export default WalletState;
