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
		<section>
			{showNavigation && (
				<>
					<div className='hidden tablet:block tablet:fixed tablet:w-full tablet:top-0 tablet:z-40'>
						<DesktopNavigation />
					</div>
					<div className='block fixed w-full top-0 tablet:hidden'>
						<MobileNavigation />
					</div>
				</>
			)}
			<main className='container min-h-[70vh]'>{children}</main>
			{showFooter && (
				<>
					<div className='hidden tablet:block  tablet:w-full'>
						{/* <div className='hidden tablet:blocktablet:w-full'> */}
						<DesktopFooter />
					</div>
					<div className='block w-full tablet:hidden'>
						{/* <div className='block w-full tablet:hidden'> */}
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
