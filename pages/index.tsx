import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import Catalogue from 'components/Catalogue/Catalogue';
import NFTCard from 'components/NFTCard/NFTCard';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import useWallet from 'hooks/useWallet';

const Home: NextPage = () => {

	const {
		fetchAuctionedNfts,
		contract,
		auctionedNfts,
		fetchArdorNfts,
		ardorNfts,
	} = useWallet();

	//Fetch NFT's on the ethereum network
	useEffect(() => {
		let mounted = true;
		if (mounted && contract !== null) {
			fetchAuctionedNfts(contract);
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
				<NFTCard
					title='trending'
					auctionedNfts={auctionedNfts}
					ardorNfts={ardorNfts}
				/>
				<NFTCard
					title='auctions'
					auctionedNfts={auctionedNfts}
					ardorNfts={ardorNfts}
				/>
				<NFTCard
					title='explore'
					auctionedNfts={auctionedNfts}
					ardorNfts={ardorNfts}
				/>
			</div>
		</BasePageLayout>
	);
};

export default Home;
