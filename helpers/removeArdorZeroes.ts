import Web3 from 'web3';

const removeArdorZeroes = (amount: number) => {
	return amount / 100000000;
};

export default removeArdorZeroes;
