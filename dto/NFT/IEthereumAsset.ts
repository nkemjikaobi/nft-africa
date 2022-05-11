interface IEthereumAsset {
	tokenId: string;
	name: string;
	description: string;
	fileUrl: string;
	creator: string;
	owner: string;
	price: string;
	sold: boolean;
}

export default IEthereumAsset;
