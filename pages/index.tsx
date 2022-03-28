import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import Catalogue from 'components/Catalogue/Catalogue';
import NFTCard from 'components/NFTCard/NFTCard';
import { Trending } from 'data/Trending/Trending';
import type { NextPage } from 'next';
import CatalogueSkeleton from 'skeletons/CatalogueSkeleton';

const Home: NextPage = () => {
	return (
		<BasePageLayout>
			<div className='mt-40'>
				<Catalogue />
				<div className='tablet:p-10 smallLaptop:p-20'>
					<NFTCard title='trending' data={Trending} />
					<NFTCard title='auctions' data={Trending} />
					<NFTCard title='explore' data={Trending} />
				</div>
			</div>
		</BasePageLayout>
	);
};

export default Home;
