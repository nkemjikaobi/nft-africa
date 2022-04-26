import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import Catalogue from 'components/Catalogue/Catalogue';
import NFTCard from 'components/NFTCard/NFTCard';
import type { NextPage } from 'next';
import WalletContext from 'context/wallet/WalletContext';
import { useContext, useEffect } from 'react';

const Home: NextPage = () => {
	const walletContext = useContext(WalletContext);

	const { fetchAllNfts, contract, allNfts, fetchArdorNfts, ardorNfts } =
		walletContext;

	//Fetch NFT's on the ethereum network
	useEffect(() => {
		let mounted = true;
		if (mounted && contract !== null) {
			fetchAllNfts(contract);
		}

		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [contract]);

	//Fetch NFT's on the ardor network
	useEffect(() => {
		let mounted = true;
		if (mounted) {
			fetchArdorNfts();
		}

		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, []);
	return (
		<BasePageLayout>
			<div className='mt-40'>
				<Catalogue />
				<NFTCard title='trending' data={allNfts} />
				<NFTCard title='auctions' data={allNfts} />
				<NFTCard title='explore' data={allNfts} />
			</div>
		</BasePageLayout>
	);
};

export default Home;
