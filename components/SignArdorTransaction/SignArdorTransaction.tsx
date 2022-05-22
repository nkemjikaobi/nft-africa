import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import Link from 'next/link';
import { FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import useWallet from 'hooks/useWallet';

interface ISignArdorTransaction {
	onClose: Function;
	data: any;
}

const SignArdorTransaction = ({
	onClose,
	data,
}: ISignArdorTransaction) => {
	const [uuid, setUuid] = useState('');
	const [url, setUrl] = useState('');
	const [ardorToken, setArdorToken] = useState<any>('');
	const { verifyToken } = useWallet();

	//Verify the token
	useEffect(() => {
		if (ardorToken !== '') {
			verifyToken(uuid, ardorToken);
			onClose(false);
		}
		//eslint-disable-next-line
	}, [ardorToken, uuid]);

	const watchToken = async (qrCodeId: string) => {
		try {
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_ARDOR_BASE_URL}/api/auth/auth-status/${qrCodeId}`
			);
			if (res.data.data.result === 'ok') {
				const token = res.data.data.token;
				setArdorToken(token);
			} else {
				setTimeout(() => {
					watchToken(qrCodeId);
				}, 3000);
			}
		} catch (error) {}
	};

	//Watch for when the user activates the token on device
	useEffect(() => {
		if (data !== null) {
			setUuid(data.uuid);
			setUrl(data.url);
			watchToken(data.uuid);
		}
		//eslint-disable-next-line
	}, [data]);

	return (
		<div className='flex flex-col justify-center items-center'>
			<div className='mb-4 mt-4 text-xl'>
				Sign the transaction
				<div className='hidden tablet:block tablet:mb-8'>
					<p className='text-sm text-center tablet:text-base'>
						Please scan the barcode below
					</p>
				</div>
				<div className='block break-normal tablet:hidden'>
					<p className='text-sm text-center tablet:text-base'>
						Please click the link below
					</p>
				</div>
			</div>

			{url !== '' ? (
				<>
					<div className='hidden tablet:block tablet:mb-8'>
						<QRCode value={`${url}`} />
						{/* <QRCodeSVG value={`${url}`} /> */}
					</div>
					<div className='block mb-8 break-normal p-5 text-sm ml-4 tablet:hidden'>
						<Link href={url}>{url}</Link>
					</div>
				</>
			) : (
				<>
					<div className='hidden tablet:block tablet:mb-4'>
						<FaSpinner className='animate-spin h-5 w-5 mr-3' />
						Generating Qrcode...
					</div>
					<div className='mb-4 block tablet:hidden'>
						<FaSpinner className='animate-spin h-5 w-5 mr-3' />
						Generating Qrlink...
					</div>
				</>
			)}

			<Link href='https://www.nxter.org/how-to-install-and-set-up-the-sigbro-app-on-android/'>
				<a target={'_blank'} className='mb-4 hover:text-blue-950'>
					Dont have Sigbro?
				</a>
			</Link>
		</div>
	);
};

export default SignArdorTransaction;
