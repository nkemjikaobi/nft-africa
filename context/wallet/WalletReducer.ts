import { ARDOR, ETHEREUM } from 'constants/index';
import IArdorNFT from 'dto/NFT/IArdorNFT';
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
	CREATE_NFT,
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
	FETCH_AUCTIONED_NFTS,
	PLACE_ETHEREUM_BID,
	SELL_ETHEREUM_NFT,
	FETCH_ETHEREUM_PERSONAL_ASSETS,
} from '../types';

const WalletReducer = (state: any, action: any) => {
	switch (action.type) {
		case CONNECT_WALLET:
			const count = localStorage.getItem('count');
			return {
				...state,
				address: action.payload.accounts[0],
				isConnected: true,
				balance: action.payload.balance,
				message: count !== '1' ? 'Wallet connected' : null,
				web3: action.payload.web3,
				web3Modal: action.payload.web3Modal,
				providerOptions: action.payload.providerOptions,
				provider: action.payload.provider,
				isGuest: false,
				guestWeb3: null,
				guestProvider: null,
				network: ETHEREUM,
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
		case CREATE_NFT:
			return {
				...state,
				message: 'NFT Minted and Created',
			};
		case FETCH_ALL_NFTS:
			return {
				...state,
				allNfts: action.payload,
			};
		case FETCH_AUCTIONED_NFTS:
			return {
				...state,
				auctionedNfts: action.payload,
			};
		case PLACE_ETHEREUM_BID:
			return {
				...state,
				message: 'Bid Placed',
			};
		case SELL_ETHEREUM_NFT:
			return {
				...state,
				message: 'Asset sold',
			};
		case FETCH_SINGLE_NFT:
			return {
				...state,
				singleNft: action.payload,
			};
		case FETCH_ETHEREUM_PERSONAL_ASSETS:
			return {
				...state,
				ethereumPersonalAssets: action.payload,
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
		case DISCONNECT_ARDOR_WALLET:
			return {
				...state,
				address: null,
				isConnected: false,
				balance: '',
				message: 'Wallet Disconnected',
				isGuest: true,
				qrCodeUrl: '',
				qrCodeId: '',
				hasGeneratedQrCodeUrl: false,
				ardorToken: '',
				ardorUserData: null,
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
		//ARDOR
		case GENERATE_AUTH:
			return {
				...state,
				qrCodeUrl: action.payload.url,
				qrCodeId: action.payload.id,
				hasGeneratedQrCodeUrl: true,
			};
		case WATCH_TOKEN:
			return {
				...state,
				ardorToken: action.payload.token,
				hasGeneratedQrCodeUrl: false,
			};
		case VERIFY_TOKEN:
			const count1 = localStorage.getItem('count');
			return {
				...state,
				ardorUserData: action.payload.result,
				message: count1 !== '1' ? 'Wallet connected' : null,
				isConnected: true,
				address: action.payload.result.accountRS,
				network: ARDOR,
				qrCodeId: action.payload.qrCodeId,
				//ardorToken: action.payload.ardorToken,
			};
		case FETCH_ARDOR_NFTS:
			return {
				...state,
				ardorNfts: action.payload,
			};
		case FETCH_SINGLE_ARDOR_NFT:
			const nft = state.ardorNfts.filter(
				(nft: IArdorNFT) => nft.asset === action.payload
			);
			return {
				...state,
				singleArdorNft: nft[0],
			};
		case MINT_ARDOR_NFT:
			return {
				...state,
				ardorMintedData: action.payload,
				message: 'Asset Issued',
			};
		case RESET_NFT_ITEM:
			return {
				...state,
				singleArdorNft: null,
				singleNft: null,
			};
		case FETCH_ARDOR_BIDS:
			return {
				...state,
				ardorBids: action.payload,
			};
		case PLACE_ARDOR_BID:
			return {
				...state,
				message: action.payload.msg,
				ardorPlaceOrderData: action.payload,
			};
		case FETCH_ARDOR_PERSONAL_ASSETS:
			return {
				...state,
				ardorPersonalAssets: action.payload,
			};
		default:
			return state;
	}
};
export default WalletReducer;
