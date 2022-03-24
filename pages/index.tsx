import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import Catalogue from 'components/Catalogue/Catalogue';
import type { NextPage } from 'next';

const Home: NextPage = () => {
	return (
		<BasePageLayout>
			<div className='mt-40'>
				<Catalogue />
			</div>
		</BasePageLayout>
	);
};

export default Home;
