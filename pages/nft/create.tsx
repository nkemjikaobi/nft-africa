import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import React, { useContext, useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import * as ipfsClient from 'ipfs-http-client';
import toast, { Toaster } from 'react-hot-toast';
import WalletContext from 'context/wallet/WalletContext';
import { BsImageFill } from 'react-icons/bs';
import { FaSpinner } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ARDOR, ETHEREUM } from 'constants/index';
import ConnectArdorWallet from 'modals/ConnectArdorWallet';
import SignArdorTransaction from 'components/SignArdorTransaction/SignArdorTransaction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'components/Modal/Modal';

const CreateNFT = () => {
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [price, setPrice] = useState<string>('');
	const [networkk, setNetworkk] = useState<string>('');
	const [fileUrl, setFileUrl] = useState<string>('');
	const [finalUrl, setFinalUrl] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [imageLoading, setImageLoading] = useState<boolean>(false);
	const [finished, setFinished] = useState<boolean>(false);
	const walletContext = useContext(WalletContext);

	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [endDateTime, setEndDateTime] = useState<number>(0);

	const {
		web3,
		address,
		contract,
		mintArdorNft,
		createNft,
		isConnected,
		network,
		ardorMintedData,
	} = walletContext;

	const router = useRouter();

	const create: any = ipfsClient.create;
	const client = create(`${process.env.NEXT_PUBLIC_IPFS_URL}`);

	const handleImage = async (e: any) => {
		setImageLoading(true);
		const file = e.target.files[0];
		try {
			const res = await client.add(file, {
				progress: (prog: any) => console.log(`received: ${prog}`),
			});
			const url = `${process.env.NEXT_PUBLIC_IPFS_BASE_URL}/${res.path}`;
			setFileUrl(url);
			setImageLoading(false);
		} catch (error) {
			toast.error((error as Error).message);
		}
	};

	const handleEthereumMint = async (url: string) => {
		try {
			//Get listing price
			const listingPrice = await contract.methods
				.getListingPrice()
				.call({ from: `${address}` });

			const auctionPrice = await web3.utils.toWei(price, 'ether');
			await createNft(
				contract,
				url,
				auctionPrice,
				listingPrice,
				address,
				Math.floor(endDateTime / 1000),
				router
			);
			setLoading(false);
		} catch (error) {
			toast.error((error as Error).message);
		}
	};

	const handleSubmit = async () => {
		if (!isConnected) {
			return toast.error('Connect Wallet');
		}
		if (
			name === '' ||
			fileUrl === '' ||
			description === '' ||
			price === '' ||
			network === ''
		) {
			return toast.error('All fields are required');
		}
		setLoading(true);
		const data = JSON.stringify({ name, description, fileUrl, network });
		const res = await client.add(data);
		const url = `${process.env.NEXT_PUBLIC_IPFS_BASE_URL}/${res.path}`;
		setFinalUrl(url);
		if (network === ETHEREUM) {
			await handleEthereumMint(url);
		} else {
			await mintArdorNft(res.path, name, 1, address);
			setFinished(true);
			setLoading(false);
		}
	};

	const callBack = () => {
		router.push('/');
	};

	useEffect(() => {
		if (finished) {
		}
		//eslint-disable-next-line
	}, [finished]);
	return (
		<BasePageLayout>
			<div
				className='tablet:container tablet:w-600 text-center mb-32'
			>
				<Toaster position='top-right' />
				<h1 className='uppercase text-2xl tablet:text-5xl font-extrabold mb-8 mt-64'>
					Create NFT
				</h1>

				<div className='mb-8 relative border ml-16 tablet:ml-28 border-black border-dotted flex items-center justify-center w-64 h-64 tablet:w-96 tablet:h-[355px] rounded-lg'>
					<label className='w-full h-full flex items-center justify-center cursor-pointer'>
						<input
							className='bg-gray-200 hidden p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black'
							type='file'
							onChange={e => handleImage(e)}
						/>
						{fileUrl !== '' ? (
							<>
								<div className='hidden tablet:block'>
									<Image
										src={fileUrl}
										height={365}
										width={390}
										alt='nft preview'
									/>
								</div>
								<div className='block tablet:hidden'>
									<Image
										src={fileUrl}
										height={400}
										width={390}
										alt='nft preview'
									/>
								</div>
							</>
						) : imageLoading ? (
							<FaSpinner className='animate-spin h-16 w-16 mr-3 text-9xl' />
						) : (
							<BsImageFill className='text-6xl cursor-pointer' />
						)}
					</label>
					{fileUrl !== '' && (
						<AiOutlineClose
							className='absolute z-20 top-5 right-5 text-white text-xl cursor-pointer'
							onClick={() => setFileUrl('')}
						/>
					)}
				</div>
				<div className='mb-8'>
					<input
						className='bg-gray-200 p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black'
						type='text'
						placeholder='Art Name'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<div className='mb-8'>
					<input
						className='bg-gray-200 p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black'
						type='text'
						placeholder='Description'
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>
				</div>
				<div className='mb-8'>
					<input
						className='bg-gray-200 p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black'
						type='text'
						placeholder={`${
							network === ETHEREUM ? 'Price (ETH)' : 'Price (ARD)'
						}`}
						value={price}
						onChange={e => setPrice(e.target.value)}
					/>
				</div>
				{network === ETHEREUM && (
					<>
						<div className='mb-8'>
							<label htmlFor='auction-start'>Auction Starts:</label>
							<DatePicker
								selected={startDate}
								onChange={(date: any) => setStartDate(date)}
								dateFormat='yyyy-MM-dd'
								showYearDropdown
								scrollableMonthYearDropdown
								id='auction-start'
								selectsStart
								disabled
								minDate={new Date()}
								className='ml-4 text-black border w-2/3 bg-gray-200 mt-4  md:px-24 p-5 border-gray-300 rounded-md  mb-4 focus:outline-none'
							/>
						</div>
						<div className='mb-8'>
							<label htmlFor='auction-end'>Aucton Ends:</label>
							<DatePicker
								selected={endDate}
								onChange={(date: any) => {
									setEndDate(date), setEndDateTime(date.getTime());
								}}
								dateFormat='yyyy-MM-dd'
								showYearDropdown
								scrollableMonthYearDropdown
								id='auction-end'
								selectsEnd
								minDate={startDate}
								className='ml-4 text-black border w-2/3 bg-gray-200 mt-4  md:px-24 p-5 border-gray-300 rounded-md  mb-4 focus:outline-none'
							/>
						</div>
					</>
				)}

				<div className='mb-8'>
					<input
						className='bg-gray-200 p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black'
						type='text'
						value={network}
						disabled
					/>
				</div>

				<div className='flex justify-center'>
					{loading ? (
						<button
							type='button'
							className='disabled:opacity-40 bg-black flex items-center justify-center p-5 w-2/3 rounded-md text-white mt-4'
							disabled
						>
							<FaSpinner className='animate-spin h-5 w-5 mr-3' />
							Minting...
						</button>
					) : (
						<button
							className='bg-black flex items-center justify-center p-5 w-2/3 rounded-md text-white mt-4 hover:bg-white hover:text-black hover:border hover:border-black'
							onClick={() => handleSubmit()}
						>
							Create <BsArrowRight className='ml-4' />
						</button>
					)}
				</div>
			</div>
			<Modal visibility={finished} toggleVisibility={callBack}>
				<SignArdorTransaction onClose={setFinished} data={ardorMintedData} />
			</Modal>
		</BasePageLayout>
	);
};

export default CreateNFT;
