import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';


const { NEXT_PUBLIC_INFURA_API_URL } = process.env;

export const connectWallet = async () => {
	const providerOptions = {
		walletconnect: {
			package: WalletConnectProvider, // required
			options: {
				infuraId: NEXT_PUBLIC_INFURA_API_URL,
			},
		},
	};
	const web3Modal = new Web3Modal({
		theme: 'dark',
		network: 'mainnet', // optional
		cacheProvider: true, // optional
        providerOptions, // required
        //disableInjectedProvider: false
	});

	try {
        const provider = await web3Modal.connect();
        //const provider = await web3Modal.connectTo('walletconnect');

		// await provider.enable();
		const web3 = new Web3(provider);

		// Subscribe to accounts change
		provider.on('accountsChanged', (accounts: string[]) => {
			console.log(accounts);
		});

		// Subscribe to chainId change
		provider.on('chainChanged', (chainId: number) => {
			console.log(chainId);
		});

		// Subscribe to session connection
		provider.on('connect', () => {
			console.log('connect');
		});

		// Subscribe to session disconnection
		provider.on('disconnect', (code: number, reason: string) => {
			console.log(code, reason);
		});

		//  Get Accounts
		const accounts = await web3.eth.getAccounts();
		console.log({ accounts });

		return { accounts };
	} catch (error) {
		console.log(error);
	}
};
