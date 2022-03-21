import React, { Fragment } from 'react';
import DesktopFooter from 'components/BasePageLayout/DesktopFooter';
import DesktopNavigation from 'components/BasePageLayout/DesktopNavigation';
import MobileFooter from 'components/BasePageLayout/MobileFooter';
import MobileNavigation from 'components/BasePageLayout/MobileNavigation';

interface IBasePageLayout {
	children: any;
	showNavigation?: boolean;
	showFooter?: boolean;
}

const BasePageLayout = ({
	children,
	showNavigation,
	showFooter,
}: IBasePageLayout) => {
	return (
		<section className=''>
			{showNavigation && (
				<>
					<div className='sm:hidden'>
						<DesktopNavigation />
					</div>
					<div className='md:hidden'>
						<MobileNavigation />
					</div>
				</>
			)}
			<main className=''>{children}</main>
			{showFooter && (
				<>
					<div className='sm:hidden'>
						<DesktopFooter />
					</div>
					<div className='md:hidden'>
						<MobileFooter />
					</div>
				</>
			)}
		</section>
	);
};

BasePageLayout.defaultProps = {
	showFooter: true,
	showNavigation: true,
	children: <Fragment />,
};

export default BasePageLayout;
