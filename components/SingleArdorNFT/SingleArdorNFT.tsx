import NFTHistory from 'components/NFTHistory/NFTHistory';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { History } from 'componentData/DetailPage/History';
import formatArdorImageUrl from 'helpers/formatArdorImageUrl';
import axios from 'axios';
import Bids from 'components/Bids/Bids';
import ShowBidForm from 'modals/ShowBidForm';
import toast from 'react-hot-toast';
import SignArdorTransaction from 'components/SignArdorTransaction/SignArdorTransaction';
import addArdorZeroes from 'helpers/addArdorZeroes';
import IArdorNFT from 'dto/NFT/IArdorNFT';
import { ARDOR } from 'constants/index';
import shortenWalletAddress from 'helpers/shortenWalletAddress';
import Modal from 'components/Modal/Modal';
import { BLUR_DATA_URL } from 'constants/index';
import useWallet from 'hooks/useWallet';

interface ISingleArdorNFT {
	singleNft: IArdorNFT;
	showMagnified: boolean;
	setShowMagnified: Function;
	setImageUrl: Function;
}
const SingleArdorNFT = ({
	singleNft,
	showMagnified,
	setShowMagnified,
	setImageUrl,
}: ISingleArdorNFT) => {
	const [imageCID, setImageCID] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [showBidForm, setShowBidForm] = useState<boolean>(false);
	const [timeToSign, setTimeToSign] = useState<boolean>(false);
	const [price, setPrice] = useState<number>(0);

	const {
		fetchBids,
		ardorBids,
		address,
		placeArdorBid,
		ardorPlaceOrderData,
		network,
	} = useWallet();

	const fetchImage = async (cid: string) => {
		try {
			const url = await axios.get(cid);
			const finalUrl = url.data.fileUrl;
			const description = url.data.description;
			setDescription(description);
			setImageCID(finalUrl);
			setImageUrl(finalUrl);
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
		if (network !== ARDOR || address === '') {
			return toast.error('Please connect to ardor network');
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
		setTimeout(() => {
			setTimeToSign(true);
		}, 1000);
	};

	const callBack = () => {
		fetchBids();
		setTimeToSign(false);
	};

	return (
		<>
			{singleNft && imageCID !== '' && (
				<div className='mt-64 flex flex-col tablet:flex-row items-center tablet:items-start smallLaptop:items-center justify-between mx-40 tablet:mx-10 smallLaptop:mx-40'>
					<div className='flex flex-col -mt-16 w-[500%] tablet:w-[70%] tablet:mt-0 tablet:mr-0 laptop:mr-16'>
						<div className='mb-8 tablet:hidden'>
							<h4 className='font-extrabold text-2xl'>{singleNft.name}</h4>
						</div>
						<Image
							src={imageCID}
							alt={singleNft.name}
							width={500}
							height={500}
							className='cursor-zoom-in'
							onClick={() => setShowMagnified(true)}
							placeholder='blur'
							blurDataURL={`${BLUR_DATA_URL}`}
						/>

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
											shortenWalletAddress(singleNft.accountRS)}
									</p>
								</div>
							</div>
							<div className='flex items-center'>
								<div>
									<p className='text-gray-400 text-sm'>Owner</p>
									<p className='font-bold'>
										{singleNft.accountRS &&
											shortenWalletAddress(singleNft.accountRS)}
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
							<Bids ardorBids={ardorBids} />
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
			)}

			<Modal visibility={showBidForm} toggleVisibility={setShowBidForm}>
				<ShowBidForm
					handlePlaceBid={handlePlaceBid}
					name={singleNft.name}
					price={price}
					setPrice={setPrice}
					network={network}
				/>
			</Modal>
			<Modal visibility={timeToSign} callBack={callBack}>
				<SignArdorTransaction
					onClose={setTimeToSign}
					data={ardorPlaceOrderData}
				/>
			</Modal>
		</>
	);
};

export default SingleArdorNFT;
