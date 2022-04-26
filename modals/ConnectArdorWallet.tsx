import React, { useEffect, useState, useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import QRCode from 'react-qr-code';
import Link from 'next/link';
import axios from 'axios';
import WalletContext from 'context/wallet/WalletContext';
import { FaSpinner } from 'react-icons/fa';

const ConnectArdorWallet = ({ setConnectArdor }: any) => {
	const walletContext = useContext(WalletContext);
	const {
		generateAuth,
		qrCodeUrl,
		watchToken,
		ardorToken,
		qrCodeId,
		hasGeneratedQrCodeUrl,
		verifyToken,
	} = walletContext;

	//Verify the token
	useEffect(() => {
		if (ardorToken !== '') {
			verifyToken(qrCodeId, ardorToken);
			setConnectArdor(false);
		}
		//eslint-disable-next-line
	}, [ardorToken, qrCodeId]);

	//Generate auth that contains the QRCode Url
	useEffect(() => {
		generateAuth();
		//eslint-disable-next-line
	}, []);

	//Watch for when the user activates the token on device
	useEffect(() => {
		if (hasGeneratedQrCodeUrl) {
			watchToken(qrCodeId);
		}
		//eslint-disable-next-line
	}, [hasGeneratedQrCodeUrl, qrCodeId]);

	return (
		<div className='text-white relative bg-black rounded-lg p-10'>
			<Toaster position='top-right' />
			<div className='absolute right-5 top-10 cursor-pointer'>
				<AiOutlineClose onClick={() => setConnectArdor(false)} />
			</div>
			<div className='flex flex-col justify-center items-center'>
				{/* <h4 className='mb-4 text-2xl font-bold'>Login with SIGBRO</h4> */}
				<div className='mb-4 mt-4'>
					<Image
						src='/images/sigbro.png'
						className='mb-4'
						alt='sigbro'
						height={65}
						width={300}
					/>
					<p className='text-sm text-center tablet:text-base'>
						Please scan the barcode below
					</p>
				</div>
				{qrCodeUrl !== '' ? (
					<div className='mb-8'>
						<QRCode value={`${qrCodeUrl}`} />
					</div>
				) : (
					<div className='mb-4'>
						<FaSpinner className='animate-spin h-5 w-5 mr-3' />
						Generating Qrcode...
					</div>
				)}

				<Link href='https://www.nxter.org/how-to-install-and-set-up-the-sigbro-app-on-android/'>
					<a target={'_blank'} className='mb-4 hover:text-blue-950'>
						Dont have Sigbro?
					</a>
				</Link>
			</div>
		</div>
	);
};

export default ConnectArdorWallet;
