import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import NFTCard from 'components/NFTCard/NFTCard';
import React from 'react';
import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import useWallet from 'hooks/useWallet';

interface IListingPage {
	type: string;
}
const ListingPage = ({ type }: IListingPage) => {

	const { fetchAuctionedNfts, contract, auctionedNfts, fetchArdorNfts, ardorNfts } =
		useWallet();

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
			<div className='mt-40 tablet:mt-64'>
				<NFTCard
					title={`${type}`}
					auctionedNfts={auctionedNfts}
					ardorNfts={ardorNfts}
				/>
			</div>
		</BasePageLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({
	query: { type },
}) => {
	return {
		props: {
			type,
		},
	};
};

export default ListingPage;
