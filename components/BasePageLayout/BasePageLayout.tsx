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
					<div className='hidden tablet:block'>
						<DesktopNavigation />
					</div>
					<div className='block fixed w-full tablet:hidden'>
						<MobileNavigation />
					</div>
				</>
			)}
			<main className='container'>{children}</main>
			{showFooter && (
				<>
					<div className='hidden tablet:block tablet:absolute w-full bottom-0'>
						<DesktopFooter />
					</div>
					<div className='block absolute w-full bottom-0 tablet:hidden'>
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
