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
	CONNECT_GUEST,
} from '../types';

const contactReducer = (state: any, action: any) => {
	switch (action.type) {
		case CONNECT_WALLET:
			return {
				...state,
				address: action.payload.accounts[0],
				isConnected: true,
				balance: action.payload.balance,
				message: 'Wallet connected',
				web3: action.payload.web3,
				web3Modal: action.payload.web3Modal,
				providerOptions: action.payload.providerOptions,
				provider: action.payload.provider,
				isGuest: false,
				guestWeb3: null,
				guestProvider: null,
			};
		case CONNECT_GUEST:
			return {
				...state,
				guestWeb3: action.payload.web3,
				guestProvider: action.payload.provider,
				isGuest: true,
			};
		case LOAD_CONTRACT:
			return {
				...state,
				contract: action.payload,
			};
		case FETCH_ALL_NFTS:
			return {
				...state,
				allNfts: action.payload,
			};
		case FETCH_SINGLE_NFT:
			return {
				...state,
				singleNft: action.payload,
			};
		case DISCONNECT_WALLET:
			return {
				...state,
				address: null,
				isConnected: false,
				balance: '',
				message: 'Wallet Disconnected',
				web3: null,
				web3Modal: null,
				providerOptions: null,
				provider: null,
				isGuest: true,
			};
		case MONITOR_DISCONNECT:
			return {
				...state,
				error: action.payload,
				isConnected: false,
				balance: '',
				address: null,
				isGuest: true,
			};
		case MONITOR_ACCOUNT_CHANGED:
			return {
				...state,
				address: null,
				isConnected: false,
				balance: '',
			};
		case ERROR:
			return {
				...state,
				error: action.payload,
			};
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		case CLEAR_MESSAGE:
			return {
				...state,
				message: null,
			};
		default:
			return state;
	}
};
export default contactReducer;
