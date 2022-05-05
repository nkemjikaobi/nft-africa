import CountdownTimer from 'components/Countdown/CountdownTimer';
import NFTHistory from 'components/NFTHistory/NFTHistory';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useContext } from 'react';
import { History } from 'componentData/DetailPage/History';
import formatArdorImageUrl from 'helpers/formatArdorImageUrl';
import axios from 'axios';
import Bids from 'components/Bids/Bids';
import WalletContext from 'context/wallet/WalletContext';
import ShowBidForm from 'modals/ShowBidForm';
import toast, { Toaster } from 'react-hot-toast';
import SignArdorTransaction from 'components/SignArdorTransaction/SignArdorTransaction';
import addArdorZeroes from 'helpers/addArdorZeroes';
import IArdorNFT from 'dto/NFT/IArdorNFT';
import { ARDOR } from 'constants/index';

interface ISingleArdorNFT {
	singleNft: IArdorNFT;
	showMagnified: boolean;
	setShowMagnified: Function;
}
const SingleArdorNFT = ({
	singleNft,
	showMagnified,
	setShowMagnified,
}: ISingleArdorNFT) => {
	const [imageCID, setImageCID] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [showBidForm, setShowBidForm] = useState<boolean>(false);
	const [timeToSign, setTimeToSign] = useState<boolean>(false);
	const [price, setPrice] = useState<number>(0);

	const walletContext = useContext(WalletContext);

	const { fetchBids, bids, address, placeArdorBid, ardorPlaceOrderData, network } =
		walletContext;

	const fetchImage = async (cid: string) => {
		try {
			const url = await axios.get(cid);
			const finalUrl = url.data.fileUrl;
			const description = url.data.description;
			setDescription(description);
			setImageCID(finalUrl);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (singleNft && singleNft.asset) {
			fetchBids(singleNft.asset);
			const cid = formatArdorImageUrl(singleNft.description);
			fetchImage(cid);
		}
		//eslint-disable-next-line
	}, [singleNft]);

	const handleClick = () => {
		if (network !== ARDOR) {
			return toast.error("Please connect to ardor network")
		}
		if (singleNft.accountRS === address) {
			// sell
		} else {
			//place bid
			setShowBidForm(true);
		}
	};

	const handlePlaceBid = async () => {
		await placeArdorBid(singleNft.asset, 1, addArdorZeroes(price), address);
		setShowBidForm(false);
		setTimeToSign(true);
	};

	const callBack = () => {
		fetchBids();
		setTimeToSign(false);
	};

	return (
		<>
			{singleNft && (
				<>
					<Toaster position='top-right' />
					<div
						className={`mt-64 flex flex-col tablet:flex-row items-center tablet:items-start smallLaptop:items-center justify-between mx-40 tablet:mx-10 smallLaptop:mx-40 ${
							showBidForm && 'blur-lg'
						} ${showMagnified && 'blur-lg'} ${timeToSign && 'blur-lg'}`}
					>
						<div className='flex flex-col -mt-16 tablet:mt-0 tablet:mr-0 laptop:mr-16'>
							<div className='mb-8 tablet:hidden'>
								<h4 className='font-extrabold text-2xl'>{singleNft.name}</h4>
							</div>
							{imageCID !== '' && (
								<Image
									src={imageCID}
									alt={singleNft.name}
									width={500}
									height={500}
									className='cursor-pointer'
									onClick={() => setShowMagnified(true)}
								/>
							)}

							<div className='mt-8 mb-4'>
								<h4 className='text-sm text-gray-400'>Contract address</h4>
								<Link href='#'>
									<a
										href='#'
										className='font-bold text-sm hover:underline hover:text-blue-950'
									>
										{singleNft.account}
										{/* <FaSpinner className='animate-spin h-16 w-16 mr-3 text-9xl' /> */}
									</a>
								</Link>
							</div>
							<div>
								<h4 className='text-sm text-gray-400'>Token ID</h4>
								<p className='font-bold'>{singleNft.asset}</p>
							</div>
						</div>

						<div className='ml-8 tablet:w-3/4 tablet:mt-2 smallLaptop:mt-0'>
							<div className='hidden tablet:block'>
								<h4 className='font-extrabold text-2xl'>{singleNft.name}</h4>
							</div>
							<div className='flex items-center my-8'>
								<div className='flex -ml-20 tablet:ml-0 items-center mr-20'>
									<div>
										<p className='text-gray-400 text-sm'>Creator</p>
										<p className='font-bold'>
											{singleNft.accountRS &&
												singleNft.accountRS.substring(0, 12)}
										</p>
									</div>
								</div>
								<div className='flex items-center'>
									<div>
										<p className='text-gray-400 text-sm'>Owner</p>
										<p className='font-bold'>
											{singleNft.accountRS &&
												singleNft.accountRS.substring(0, 12)}
										</p>
									</div>
								</div>
							</div>
							<p className='text-sm mb-8 -ml-20 tablet:ml-0'>
								{description && description}
							</p>
							<button
								onClick={() => handleClick()}
								className='bg-black -ml-20 tablet:ml-0 flex items-center justify-center p-5 w-full tablet:w-2/3 smallLaptop:w-1/3 border border-black rounded-md text-white my-5 mb-8 hover:bg-white hover:text-black '
							>
								{address === singleNft.accountRS ? 'Sell' : 'Place A Bid'}
							</button>
							<div className='mt-4 -ml-20 tablet:ml-0'>
								<h4 className='font-extrabold '>Bids</h4>
								<p className='text-black mb-4'>------------</p>
							</div>
							<div className='-ml-20  tablet:ml-0 tablet:w-full'>
								<Bids bids={bids} />
							</div>
							<div className='mt-4 -ml-20 tablet:ml-0'>
								<h4 className='font-extrabold '>History</h4>
								<p className='text-black mb-4'>------------</p>
							</div>
							<div className='-ml-20  tablet:ml-0 tablet:w-full'>
								<NFTHistory history={History} />
							</div>
						</div>
					</div>
					{showBidForm && (
						<div className='fixed left-[15%] tablet:left-[25%] laptop:left-[30%] top-[30%] w-[70%] tablet:w-[60%] laptop:w-[40%]'>
							<ShowBidForm
								handlePlaceBid={handlePlaceBid}
								setShowBidForm={setShowBidForm}
								name={singleNft.name}
								price={price}
								setPrice={setPrice}
							/>
						</div>
					)}
					{timeToSign && (
						<div className='fixed left-[15%] tablet:left-[25%] laptop:left-[30%] top-[30%] w-[70%] tablet:w-[60%] laptop:w-[40%]'>
							<SignArdorTransaction
								onClose={setTimeToSign}
								data={ardorPlaceOrderData}
								callBack={callBack}
							/>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default SingleArdorNFT;
