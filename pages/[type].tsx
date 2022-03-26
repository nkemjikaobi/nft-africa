import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import NFTCard from 'components/NFTCard/NFTCard';
import { ListingPageData } from 'data/ListingPage/ListingPage';
import React from 'react';

interface IListingPage {
	type: string;
}
const ListingPage = ({ type }: IListingPage) => {
	return (
		<BasePageLayout>
			<div className='mt-64'>
				<NFTCard title={`${type}`} data={ListingPageData} />
			</div>
		</BasePageLayout>
	);
};
export async function getServerSideProps({ query: { type } }: any) {

	return {
		props: {
			type
		},
	};
}

export default ListingPage;
