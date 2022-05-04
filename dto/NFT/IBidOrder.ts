interface IBidOrder {
	quantityQNT: string;
	orderFullHash: string;
	transactionHeight: number;
	accountRS: string;
	priceNQTPerShare: string;
	transactionIndex: number;
	asset: string;
    type: string;
    account: string;
    order: string;
    height: number
}

export default IBidOrder;
