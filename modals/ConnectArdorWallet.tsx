import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import QRCode from 'react-qr-code';
import Link from 'next/link';
import axios from 'axios';

const ConnectArdorWallet = ({ setConnectArdor }: any) => {
	const [url, setUrl] = useState('');
	const [id, setId] = useState('');
	const [token, setToken] = useState('');
	const [hasSentToken, sethasSentToken] = useState(false);
	const [isDone, setIsDone] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const generateAuth = async () => {
		const res = await axios.post(
			'https://nft-art-backend.herokuapp.com/api/auth/generate-auth'
		);
		const { data } = res;
		setUrl(data.data.url);
		const splitUrl = data.data.url.split('/');
		const id = splitUrl[splitUrl.length - 2];
		setId(id);
		sethasSentToken(true);
	};

	const watchToken = async (id: any) => {
		const newRes = await axios.get(
			`https://nft-art-backend.herokuapp.com/api/auth/auth-status/${id}`
		);
		const { data } = newRes;
		console.log(data);
		if (data.data.result === 'ok') {
			console.log('done');
			console.log(data);
			setToken(data.data.token);
			//setConnectArdor(false);
			setIsDone(true);
			// setTimeout(() => {
			// 	verifyToken(id, token);
			// }, 1500);

			return sethasSentToken(false);
		} else {
			setTimeout(() => {
				watchToken(id);
			}, 3000);
		}
	};

	const verifyToken = async (id: string, token: string) => {
		console.log('entered here');
		const res = await axios.post(
			'https://nft-art-backend.herokuapp.com/api/auth/verify-token',
			{ uuid: id, token: token }
		);
		const { data } = res;
		if (data.data.valid) {
			setIsValid(true);
			console.log(data);
			toast.success('Ardor Wallet connected');
			setConnectArdor(false);
		} else {
			toast.error('Token is invalid');
		}
	};

	useEffect(() => {
		if (token !== '') {
			verifyToken(id, token);
		}
		//eslint-disable-next-line
	}, [token, id]);

	useEffect(() => {
		//generateAuth();
	}, []);

	useEffect(() => {
		if (hasSentToken) {
			console.log('running');
			watchToken(id);
		}
		//eslint-disable-next-line
	}, [hasSentToken, id]);
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
				</div>
				{url !== '' && (
					<div className='mb-8'>
						<QRCode value={`${url}`} />
					</div>
				)}
				<div className='mb-8'>
					<QRCode value='lmaoo' />
				</div>

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
