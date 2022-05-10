import CountdownTimer from 'components/Countdown/CountdownTimer';
import NFTHistory from 'components/NFTHistory/NFTHistory';
import WalletContext from 'context/wallet/WalletContext';
import convertToEther from 'helpers/convertToEther';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { History } from 'componentData/DetailPage/History';
import INFT from 'dto/NFT/INFT';
import toast from 'react-hot-toast';
import ShowBidForm from 'modals/ShowBidForm';
import { ETHEREUM } from 'constants/index';
import shortenWalletAddress from 'helpers/shortenWalletAddress';

interface ISingleEthereumNFT {
	singleNft: INFT;
	showMagnified: boolean;
	setShowMagnified: Function;
	time: Date;
}
const SingleEthereumNFT = ({
	singleNft,
	showMagnified,
	setShowMagnified,
	time,
}: ISingleEthereumNFT) => {
	const walletContext = useContext(WalletContext);

	const {
		web3,
		isGuest,
		address,
		network,
		contract,
		guestWeb3,
		placeEthereumBid,
	} = walletContext;

	const [loading, setLoading] = useState<boolean>(false);
	const [showBidForm, setShowBidForm] = useState<boolean>(false);
	const [price, setPrice] = useState<number>(0);

	const handleClick = () => {
		if (network !== ETHEREUM || address === null) {
			return toast.error('Please connect to ethereum network');
		} else {
			if (singleNft.seller === address) {
				// sell
			} else {
				//place bid
				setShowBidForm(true);
			}
		}
	};

	const handlePlaceBid = async (id: string) => {
		setLoading(true);
		const auctionPrice = await web3.utils.toWei(price, 'ether');
		await placeEthereumBid(contract, id, address, auctionPrice);
		setLoading(false);
		setShowBidForm(false);
		setPrice(0);
	};

	return (
		<>
			{singleNft && (
				<div
					className={`mt-64 flex flex-col tablet:flex-row items-center tablet:items-start smallLaptop:items-center justify-between mx-40 tablet:mx-10 smallLaptop:mx-40 ${
						showBidForm && 'blur-lg'
					} ${showMagnified && 'blur-lg'}`}
				>
					<div className='flex flex-col -mt-16 tablet:mt-0 tablet:mr-0 laptop:mr-16'>
						<div className='mb-8 tablet:hidden'>
							<h4 className='font-extrabold text-2xl'>{singleNft.name}</h4>
						</div>
						<Image
							src={singleNft.fileUrl}
							alt={singleNft.name}
							width={500}
							height={500}
							className='cursor-pointer'
							onClick={() => setShowMagnified(true)}
						/>
						<div className='mt-8 mb-4'>
							<h4 className='text-sm text-gray-400'>Contract address</h4>
							<Link href='#'>
								<a
									href='#'
									className='font-bold text-sm hover:underline hover:text-blue-950'
								>
									{singleNft.seller}
									{/* <FaSpinner className='animate-spin h-16 w-16 mr-3 text-9xl' /> */}
								</a>
							</Link>
						</div>
						<div>
							<h4 className='text-sm text-gray-400'>Token ID</h4>
							<p className='font-bold'>{singleNft.tokenId}</p>
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
										{shortenWalletAddress(singleNft.seller)}
									</p>
								</div>
							</div>
							<div className='flex items-center'>
								<div>
									<p className='text-gray-400 text-sm'>Owner</p>
									<p className='font-bold'>
										{shortenWalletAddress(singleNft.seller)}
									</p>
								</div>
							</div>
						</div>
						<p className='text-sm mb-8 -ml-20 tablet:ml-0'>
							{singleNft.description}
						</p>
						<div className='flex justify-between items-center flex-row tablet:flex-col laptop:flex-row -ml-20 tablet:ml-0'>
							<div className='tablet:-ml-[25%] laptop:ml-0'>
								<h4 className='font-bold'>Price</h4>
								<p className='flex items-center mt-1'>
									<FaEthereum />{' '}
									<span className='text-sm tablet:text-2xl font-bold mx-2'>
										{convertToEther(
											isGuest ? guestWeb3 : web3,
											singleNft.price
										)}
										ETH
									</span>{' '}
									<span className='text-gray-400 text-sm'>≈ $ 318.60</span>
								</p>
							</div>
							<div className='mt-0 tablet:mt-8 tablet:-ml-[50%] laptop:ml-0 laptop:mt-0'>
								<h4 className='font-bold'>Ends In</h4>
								<p className='mt-1'>
									<CountdownTimer expiryTimestamp={time} />
								</p>
							</div>
						</div>
						<div className='mt-4'>
							Max Bid:
							<span className='text-green-500 text-xl'>
								{' '}
								{convertToEther(
									isGuest ? guestWeb3 : web3,
									singleNft.maxBid
								)}{' '}
								ETH
							</span>
						</div>
						<button
							onClick={() => handleClick()}
							className='bg-black -ml-20 tablet:ml-0 flex items-center justify-center p-5 w-full tablet:w-2/3 smallLaptop:w-1/3 border border-black rounded-md text-white my-5 mb-8 hover:bg-white hover:text-black '
						>
							{singleNft.seller === address ? 'Sell' : 'Place Bid'}
						</button>
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
			{showBidForm && (
				<div className='fixed left-[15%] tablet:left-[25%] laptop:left-[30%] top-[30%] w-[70%] tablet:w-[60%] laptop:w-[40%]'>
					<ShowBidForm
						handlePlaceBid={handlePlaceBid}
						setShowBidForm={setShowBidForm}
						name={singleNft.name}
						price={price}
						setPrice={setPrice}
						loading={loading}
						network={network}
						tokenId={singleNft.tokenId}
					/>
				</div>
			)}
		</>
	);
};

export default SingleEthereumNFT;
