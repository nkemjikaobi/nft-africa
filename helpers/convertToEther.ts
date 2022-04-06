const convertToEther = (web3: any, price: any) => {
	if (web3) {
		return web3.utils.fromWei(price, 'ether');
	}
};

export default convertToEther;
