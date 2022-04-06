import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import React, { useContext, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import * as ipfsClient from 'ipfs-http-client';
import toast, { Toaster } from 'react-hot-toast';
import WalletContext from 'context/wallet/WalletContext';
import { BsImageFill } from 'react-icons/bs';
import { FaSpinner } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import { useRouter } from 'next/router';

const CreateNFT = () => {
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [price, setPrice] = useState<any>(0);
	const [fileUrl, setFileUrl] = useState<any>();
	const [image, setImage] = useState<any>();
	const [finalUrl, setFinalUrl] = useState<any>();
	const [loading, setLoading] = useState<boolean>(false);
	const [imageLoading, setImageLoading] = useState<boolean>(false);
	const walletContext = useContext(WalletContext);

	const { web3, address, contract, createNft } = walletContext;

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
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const handleSubmit = async () => {
		if (web3 === null) {
			return toast.error("Connect Wallet");
		}
		if (name === '' || fileUrl === '' || description === '' || price === '') {
			return toast.error('All fields are required');
		}
		setLoading(true);
		const data = JSON.stringify({ name, description, fileUrl });
		const res = await client.add(data);
		const url = `${process.env.NEXT_PUBLIC_IPFS_BASE_URL}/${res.path}`;
		setFinalUrl(url);

		try {
			//Get listing price
			const listingPrice = await contract.methods
				.getListingPrice()
				.call({ from: `${address}` });

			const auctionPrice = await web3.utils.toWei(price, 'ether');
			console.log({ auctionPrice, listingPrice });
			await createNft(contract, finalUrl, auctionPrice, listingPrice, address);
			toast.success('NFT Minted and Created');
			setLoading(false);
			router.push('/explore');
		} catch (error: any) {
			toast.error(error.message);
		}
	};
	return (
		<BasePageLayout>
			<div className='tablet:container tablet:w-600 text-center mb-32'>
				<Toaster position='top-right' />
				<h1 className='uppercase text-base tablet:text-5xl font-extrabold mb-8 mt-64'>
					Create NFT
				</h1>

				<div className='mb-8 relative border ml-28 border-black border-dotted flex items-center justify-center w-96 h-64 rounded-lg'>
					<label className='w-full h-full flex items-center justify-center cursor-pointer'>
						<input
							className='bg-gray-200 hidden p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black'
							type='file'
							value={image}
							onChange={e => handleImage(e)}
						/>
						{fileUrl !== undefined ? (
							<Image src={fileUrl} height={258} width={390} alt='nft preview' />
						) : imageLoading ? (
							<FaSpinner className='animate-spin h-16 w-16 mr-3 text-9xl' />
						) : (
							<BsImageFill className='text-6xl cursor-pointer' />
						)}
					</label>
					{/* <AiOutlineClose className='absolute z-20 top-10 right-0 text-white'/> */}
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
						type='number'
						placeholder='Price (ETH)'
						value={price}
						onChange={e => setPrice(e.target.value)}
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
		</BasePageLayout>
	);
};

export default CreateNFT;
