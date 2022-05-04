import IBidOrder from './IBidOrder';

interface IArdorNFT {
	quantityQNT: string;
	accountRS: string;
	decimals: number;
	name: string;
	description: string;
	hasPhasingAssetControl: boolean;
	asset: string;
	account: string;
	bidOrders: {
		bidOrders: Array<IBidOrder>;
		requestProcessingTime: number;
	};
}

export default IArdorNFT;
