interface IHistory {
	id: number;
	description: string;
	amount?: {
		bnb: number;
		usd: number;
	};
	isPurchased: boolean;
	date: string;
}

export default IHistory;
