import React, { Fragment } from 'react';
import DesktopFooter from 'components/BasePageLayout/DesktopFooter';
import DesktopNavigation from 'components/BasePageLayout/DesktopNavigation';
import MobileFooter from 'components/BasePageLayout/MobileFooter';
import MobileNavigation from 'components/BasePageLayout/MobileNavigation';
import { useContext, useEffect } from 'react';
import WalletContext from 'context/wallet/WalletContext';
import toast, { Toaster } from 'react-hot-toast';

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
	const walletContext = useContext(WalletContext);

	const {
		connectWallet,
		message,
		error,
		clearMessage,
		clearError,
		monitorAccountChanged,
		monitorDisconnect,
	} = walletContext;

	const reconnectWallet = async () => {
		await connectWallet();
	};

	useEffect(() => {
		let mounted = true;

		if (mounted && localStorage?.getItem('isWalletConnected') === 'true') {
			reconnectWallet();
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		let mounted = true;

		if (mounted && message !== null) {
			toast.success(message);
			setTimeout(() => clearMessage(), 3000);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [message]);

	useEffect(() => {
		let mounted = true;

		if (mounted && error !== null) {
			toast.error(error);
			setTimeout(() => clearError(), 3000);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [error]);

	useEffect(() => {
		let mounted = true;

		if (mounted) {
			// monitorAccountChanged();
			// monitorDisconnect();
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	});
	return (
		<section>
			{showNavigation && (
				<>
					<Toaster position='top-right' />
					<div className='hidden tablet:block tablet:fixed tablet:w-full tablet:top-0 tablet:z-40'>
						<DesktopNavigation />
					</div>
					<div className='block fixed w-full top-0 z-40 tablet:hidden'>
						<MobileNavigation />
					</div>
				</>
			)}
			<main className='container min-h-[70vh]'>{children}</main>
			{showFooter && (
				<>
					<div className='hidden tablet:block tablet:w-full'>
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
