import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import NFTCard from 'components/NFTCard/NFTCard';
import { ListingPageData } from 'componentData/ListingPage/ListingPage';
import React from 'react';
import WalletContext from 'context/wallet/WalletContext';
import { useContext, useEffect } from 'react';
import { GetServerSideProps } from 'next';

interface IListingPage {
	type: string;
}
const ListingPage = ({ type }: IListingPage) => {
	const walletContext = useContext(WalletContext);

	const { fetchAllNfts, contract, allNfts } = walletContext;

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
	return (
		<BasePageLayout>
			<div className='mt-40 tablet:mt-64'>
				<NFTCard title={`${type}`} allNfts={allNfts} />
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
