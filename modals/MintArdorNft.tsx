import React, { useEffect, useState, useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import QRCode from 'react-qr-code';
import Link from 'next/link';
import axios from 'axios';
import WalletContext from 'context/wallet/WalletContext';
import { FaSpinner } from 'react-icons/fa';

const MintArdorNft = ({ setFinished }: any) => {
    const walletContext = useContext(WalletContext);
    const [uuid, setUuid] = useState("");
    const [url, setUrl] = useState("");
	const {
		generateAuth,
		qrCodeUrl,
		watchToken,
		ardorToken,
		qrCodeId,
		hasGeneratedQrCodeUrl,
		verifyToken,
		ardorMintedData,
	} = walletContext;

	//const { uuid, url } = ardorMintedData && ardorMintedData;

	//Verify the token
	useEffect(() => {
		if (ardorToken !== '') {
			verifyToken(uuid, ardorToken);
			setFinished(false);
		}
		//eslint-disable-next-line
	}, [ardorToken, uuid]);

	//Watch for when the user activates the token on device
	useEffect(() => {
        if (ardorMintedData !== null) {
            setUuid(ardorMintedData.uuid)
            setUrl(ardorMintedData.url)
			watchToken(ardorMintedData.uuid);
		}
		//eslint-disable-next-line
	}, [ardorMintedData]);

	return (
		<div className='text-white relative bg-black rounded-lg p-10'>
			<Toaster position='top-right' />
			<div className='absolute left-0 tablet:right-5 top-0 tablet:top-10 cursor-pointer'>
				<AiOutlineClose onClick={() => setFinished(false)} />
			</div>
			<div className='flex flex-col justify-center items-center'>
				{/* <h4 className='mb-4 text-2xl font-bold'>Login with SIGBRO</h4> */}
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
		</div>
	);
};

export default MintArdorNft;
