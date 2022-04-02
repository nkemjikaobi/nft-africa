import {
	CONNECT_WALLET,
	ERROR,
	CLEAR_ERROR,
	CLEAR_MESSAGE,
	DISCONNECT_WALLET,
	MONITOR_ACCOUNT_CHANGED,
	MONITOR_DISCONNECT,
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
			};
		case DISCONNECT_WALLET:
			return {
				...state,
				address: null,
				isConnected: false,
				balance: '',
				message: 'Wallet Disconnected',
			};
		case MONITOR_DISCONNECT:
			return {
				...state,
				error: action.payload,
				isConnected: false,
				balance: '',
				address: null,
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
