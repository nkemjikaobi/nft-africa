import CountdownTimer from 'components/Countdown/CountdownTimer';
import NFTHistory from 'components/NFTHistory/NFTHistory';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { History } from 'componentData/DetailPage/History';
import formatArdorImageUrl from 'helpers/formatArdorImageUrl';
import axios from 'axios';

const SingleArdorNFT = ({
	singleNft,
	showMagnified,
	setShowMagnified,
	time,
}: any) => {
	const [imageCID, setImageCID] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	const fetchImage: any = async (cid: any) => {
		try {
			const url: any = await axios.get(cid);
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
			const cid = formatArdorImageUrl(singleNft.description);
			fetchImage(cid);
		}
	}, [singleNft]);

	return (
		<>
			{singleNft && (
				<div
					className={`mt-64 flex flex-col tablet:flex-row items-center tablet:items-start smallLaptop:items-center justify-between mx-40 tablet:mx-10 smallLaptop:mx-40 ${
						showMagnified && 'blur-lg'
					}`}
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
						<div className='flex justify-between items-center flex-row tablet:flex-col laptop:flex-row -ml-20 tablet:ml-0'>
							<div className='mt-0 tablet:mt-8 tablet:-ml-[50%] laptop:ml-0 laptop:mt-0'>
								<h4 className='font-bold'>Ends In</h4>
								<p className='mt-1'>
									<CountdownTimer expiryTimestamp={time} />
								</p>
							</div>
						</div>
						<button className='bg-black -ml-20 tablet:ml-0 flex items-center justify-center p-5 w-full tablet:w-2/3 smallLaptop:w-1/3 border border-black rounded-md text-white my-5 mb-8 hover:bg-white hover:text-black '>
							Buy Now
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
		</>
	);
};

export default SingleArdorNFT;
