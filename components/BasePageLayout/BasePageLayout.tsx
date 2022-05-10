import React, { Fragment, useState } from 'react';
import DesktopFooter from 'components/BasePageLayout/DesktopFooter';
import DesktopNavigation from 'components/BasePageLayout/DesktopNavigation';
import MobileFooter from 'components/BasePageLayout/MobileFooter';
import MobileNavigation from 'components/BasePageLayout/MobileNavigation';
import { useContext, useEffect } from 'react';
import WalletContext from 'context/wallet/WalletContext';
import toast, { Toaster } from 'react-hot-toast';
import ConnectArdorWallet from 'modals/ConnectArdorWallet';
import ChooseNetwork from 'modals/ChooseNetwork';
import { useRouter } from 'next/router';
import { ARDOR, ETHEREUM } from 'constants/index';

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
	const router = useRouter();

	const {
		connectWallet,
		message,
		error,
		clearMessage,
		clearError,
		monitorAccountChanged,
		monitorDisconnect,
		provider,
		web3,
		loadContract,
		connectGuest,
		guestWeb3,
		disconnectWallet,
		isConnected,
		web3Modal,
		network,
		verifyToken,
	} = walletContext;

	const reconnectWallet = async () => {
		await connectWallet();
	};
	const connectAsGuest = async () => {
		await connectGuest();
	};

	//Reconnect wallet on page refresh
	useEffect(() => {
		let mounted = true;

		if (mounted && localStorage?.getItem('isWalletConnected') === 'true') {
			if (localStorage?.getItem('network') === ETHEREUM) {
				//reconnect to ethereum wallet
				reconnectWallet();
			} else {
				//reconect to ardor wallet
				const qrCodeId = localStorage?.getItem('qrCodeId');
				const ardorToken = localStorage?.getItem('ardorToken');
				verifyToken(qrCodeId, ardorToken);
				connectAsGuest();
			}
		} else {
			connectAsGuest();
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, []);

	//Handle Messages
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

	//Handle Errors
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

	//monitior account changed and monitor disconnect
	useEffect(() => {
		let mounted = true;

		if (mounted && provider !== null) {
			monitorAccountChanged(provider);
			monitorDisconnect(provider);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [provider]);

	//load contract for connected users
	useEffect(() => {
		let mounted = true;

		if (mounted && web3 !== null) {
			loadContract(web3);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [web3]);

	//load contract for guests
	useEffect(() => {
		let mounted = true;

		if (mounted && guestWeb3 !== null) {
			loadContract(guestWeb3);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [guestWeb3]);

	const handleClick = async (identifier: number, route: string) => {
		if (isConnected && identifier === 3) {
			return await disconnectWallet(web3Modal, network);
		}
		if (identifier === 3) {
			setChooseNetwork(true);
		}
		return router.push(route);
	};

	const handleConnect = async () => {
		setChooseNetwork(false);
		if (networkk === ARDOR) {
			setConnectArdor(true);
			setNetwork(`${ETHEREUM}`);
		} else {
			return await connectWallet();
		}
	};

	const [connectArdor, setConnectArdor] = useState<boolean>(false);
	const [chooseNetwork, setChooseNetwork] = useState<boolean>(false);
	const [networkk, setNetwork] = useState<string>(`${ETHEREUM}`);

	return (
		<div>
			<section
				className={`${connectArdor && 'blur-lg'} ${chooseNetwork && 'blur-lg'}`}
			>
				{showNavigation && (
					<>
						<Toaster position='top-right' />
						<div className='hidden tablet:block tablet:fixed tablet:w-full tablet:top-0 tablet:z-40'>
							<DesktopNavigation handleClick={handleClick} />
						</div>
						<div className='block fixed w-full top-0 z-40 smallLaptop:hidden'>
							<MobileNavigation handleClick={handleClick} />
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
			{connectArdor && (
				<div className='fixed left-[15%] tablet:left-[25%] laptop:left-[30%] top-[30%] w-[70%] tablet:w-[60%] laptop:w-[40%]'>
					<ConnectArdorWallet setConnectArdor={setConnectArdor} />
				</div>
			)}
			{chooseNetwork && (
				<div className='fixed left-[10%] laptop:left-[30%] top-[30%] w-[80%] laptop:w-[40%]'>
					<ChooseNetwork
						setChooseNetwork={setChooseNetwork}
						setNetwork={setNetwork}
						handleConnect={handleConnect}
					/>
				</div>
			)}
		</div>
	);
};

BasePageLayout.defaultProps = {
	showFooter: true,
	showNavigation: true,
	children: <Fragment />,
};

export default BasePageLayout;
