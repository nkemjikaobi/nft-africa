import React, { Fragment, useState } from 'react';
import DesktopFooter from 'components/BasePageLayout/DesktopFooter';
import DesktopNavigation from 'components/BasePageLayout/DesktopNavigation';
import MobileFooter from 'components/BasePageLayout/MobileFooter';
import MobileNavigation from 'components/BasePageLayout/MobileNavigation';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import ConnectArdorWallet from 'modals/ConnectArdorWallet';
import ChooseNetwork from 'modals/ChooseNetwork';
import { useRouter } from 'next/router';
import { ARDOR, ETHEREUM } from 'constants/index';
import Modal from 'components/Modal/Modal';
import useWallet from 'hooks/useWallet';
import useAlert from 'hooks/useAlert';
import showToast from 'helpers/showToast';
import IAlert from 'dto/Alert/IAlert';
import ChooseCountry from 'modals/ChooseCountry';

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
	const router = useRouter();

	const {
		connectWallet,
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
		location,
		getLocation,
		address,
		addLocation,
		showLocationModal,
	} = useWallet();

	const [connectArdor, setConnectArdor] = useState<boolean>(false);
	const [chooseNetwork, setChooseNetwork] = useState<boolean>(false);
	const [checkCountry, setCheckCountry] = useState<boolean>(false);
	const [networkk, setNetwork] = useState<string>(`${ETHEREUM}`);
	const [country, setCountry] = useState<string>('');

	const { alerts } = useAlert();

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

	useEffect(() => {
		let mounted = true;

		if (mounted && address !== null && location === '') {
			getLocation(address);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [address, location]);

	//Handle Notifications
	useEffect(() => {
		let mounted = true;

		if (mounted && alerts.length > 0) {
			alerts.map((alert: IAlert) => showToast(alert.message, alert.type));
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [alerts]);

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
			setTimeout(() => {
				setConnectArdor(true);
			}, 1000);
			//setNetwork(`${ETHEREUM}`); not sure why this was needed.
		} else {
			return await connectWallet();
		}
	};

	const handleCountry = () => {
		showLocationModal ? setCheckCountry(true) : setCheckCountry(false);
	};

	return (
		<div>
			<section>
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

			<Modal toggleVisibility={setChooseNetwork} visibility={chooseNetwork}>
				<ChooseNetwork setNetwork={setNetwork} handleConnect={handleConnect} />
			</Modal>

			<Modal callBack={handleCountry} visibility={showLocationModal}>
				<ChooseCountry
					setCountry={setCountry}
					addLocation={addLocation}
					country={country}
					address={address}
					setCheckCountry={setCheckCountry}
				/>
			</Modal>

			<Modal visibility={connectArdor} toggleVisibility={setConnectArdor}>
				<ConnectArdorWallet setConnectArdor={setConnectArdor} />
			</Modal>
		</div>
	);
};

BasePageLayout.defaultProps = {
	showFooter: true,
	showNavigation: true,
	children: <Fragment />,
};

export default BasePageLayout;
