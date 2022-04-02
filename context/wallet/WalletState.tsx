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
} from '../types';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

const { NEXT_PUBLIC_INFURA_API_URL } = process.env;

const WalletState = (props: any) => {
	const initialState = {
		address: null,
		isConnected: false,
		balance: '',
		error: null,
		message: null,
	};

	const [state, dispatch] = useReducer(WalletReducer, initialState);

	//Connect Wallet
	const connectWallet = async () => {
		const providerOptions = {
			walletconnect: {
				package: WalletConnectProvider, // required
				options: {
					infuraId: NEXT_PUBLIC_INFURA_API_URL,
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
					payload: { balance, accounts },
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
	const disconnectWallet = async () => {
		const providerOptions = {
			walletconnect: {
				package: WalletConnectProvider, // required
				options: {
					infuraId: NEXT_PUBLIC_INFURA_API_URL,
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
		web3Modal.clearCachedProvider();
		dispatch({
			type: DISCONNECT_WALLET,
		});
		localStorage.removeItem('isWalletConnected');
	};

	//Monitor disconnect
	const monitorDisconnect = async () => {
		const providerOptions = {
			walletconnect: {
				package: WalletConnectProvider, // required
				options: {
					infuraId: NEXT_PUBLIC_INFURA_API_URL,
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
			// Subscribe to session disconnection
			provider.on('disconnect', (code: number, reason: string) => {
				console.log(code, reason);
				dispatch({
					type: MONITOR_DISCONNECT,
					payload: reason,
				});
				localStorage.removeItem('isWalletConnected');
			});
		} catch (error: any) {
			dispatch({
				type: ERROR,
				payload: error.message,
			});
		}
	};
	//Monitor account changed
	const monitorAccountChanged = async () => {
		const providerOptions = {
			walletconnect: {
				package: WalletConnectProvider, // required
				options: {
					infuraId: NEXT_PUBLIC_INFURA_API_URL,
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
			// Subscribe to accounts change
			provider.on('accountsChanged', (accounts: string[]) => {
				console.log(accounts);
				dispatch({
					type: MONITOR_ACCOUNT_CHANGED,
				});
				localStorage.removeItem('isWalletConnected');
			});
		} catch (error: any) {
			dispatch({
				type: ERROR,
				payload: error.message,
			});
		}
	};

	return (
		<WalletContext.Provider
			value={{
				address: state.address,
				isConnected: state.isConnected,
				balance: state.balance,
				error: state.error,
				message: state.message,
				clearError,
				connectWallet,
				disconnectWallet,
				clearMessage,
				monitorAccountChanged,
				monitorDisconnect,
			}}
		>
			{props.children}
		</WalletContext.Provider>
	);
};

export default WalletState;
