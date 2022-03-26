import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import Catalogue from 'components/Catalogue/Catalogue';
import NFTCard from 'components/NFTCard/NFTCard';
import { Trending } from 'data/Trending/Trending';
import type { NextPage } from 'next';

const Home: NextPage = () => {
	return (
		<BasePageLayout>
			<div className='mt-40'>
				<Catalogue />
				<NFTCard title='trending' data={Trending} />
			</div>
		</BasePageLayout>
	);
};

export default Home;
