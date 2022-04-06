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
} from '../types';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import NFTJson from 'artifacts/nft.json';
import axios from 'axios';

const WalletState = (props: any) => {
	const initialState = {
		address: null,
		isConnected: false,
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
	};

	const [state, dispatch] = useReducer(WalletReducer, initialState);

	//Connect Wallet
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
						balance = web3.utils.fromWei(result, 'ether');
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
			}
		} catch (error: any) {
			dispatch({
				type: ERROR,
				payload: error.message,
			});
		}
	};

	//Fetch All Nft's
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
			console.log({ data });
			dispatch({
				type: FETCH_ALL_NFTS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: ERROR,
				payload: error.message,
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
		} catch (error: any) {
			dispatch({
				type: ERROR,
				payload: error.message,
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
	const disconnectWallet = async (modal: any) => {
		modal.clearCachedProvider();
		dispatch({
			type: DISCONNECT_WALLET,
		});
		localStorage.removeItem('isWalletConnected');
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
				clearError,
				connectWallet,
				disconnectWallet,
				clearMessage,
				monitorAccountChanged,
				monitorDisconnect,
				loadContract,
				fetchAllNfts,
			}}
		>
			{props.children}
		</WalletContext.Provider>
	);
};

export default WalletState;
