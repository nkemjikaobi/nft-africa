const convertToEther = (web3: any, price: any) => {
	return web3.utils.fromWei(price, 'ether');
};

export default convertToEther;
