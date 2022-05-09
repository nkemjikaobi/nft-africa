interface INFT {
	tokenId: string;
	name: string;
	description: string;
	fileUrl: string;
	bidAmounts: Array<any>;
	duration: string;
	isActive: boolean;
	maxBid: string;
	maxBidUser: string
	nftContractAddress: string;
	price: string;
	seller: string;
	users: Array<any>;
}

export default INFT;
