import Image from 'next/image';
import React from 'react';
import { FaEthereum, FaGavel } from 'react-icons/fa';
import { HiCurrencyDollar } from 'react-icons/hi';
import { AiTwotoneCloseCircle } from 'react-icons/ai';
import INFT from 'dto/NFT/INFT';

interface INFTCard {
	data: Array<INFT>;
	title: string;
}
const NFTCard = ({ data, title }: INFTCard) => {
	return (
		<div className='mt-10'>
			<h2 className='ml-2 tablet:ml-0 p-3 mb-4 tablet:mb-8 font-bold text-3xl tablet:text-4xl capitalize'>{title}</h2>
			<div className='mx-6 tablet:mx-6 mb-10 grid grid-cols-1 tablet:w-3/3 tablet:grid-cols-3 smallLaptop:grid-cols-4 gap-6 tablet:mb-8 cursor-pointer'>
				{data.map(nft => (
					<div className='mb-4 bg-gray-200 hover:drop-shadow-lg' key={nft.id}>
						<Image
							src={nft.imageUrl}
							width={500}
							height={500}
							alt='nft image'
						/>
						<div className='p-3 flex justify-between items-center'>
							<p>{nft.name}</p>
							<FaEthereum />
						</div>
						{nft.isAcquired ? (
							<div className='p-3 flex justify-between items-center'>
								<p className='flex items-center'>
									Price <HiCurrencyDollar className='ml-2' />
								</p>
								<p>${nft.price}</p>
							</div>
						) : (
							<div className='p-3 flex justify-between items-center'>
								<p className='flex items-center'>
									Current Bid <FaGavel className='ml-2' />
								</p>
								<p>${nft.currentBid}</p>
							</div>
						)}

						<div className='p-3 flex justify-between items-center'>
							<p className='tablet:text-xs smallLaptop:text-base'>Creator</p>
							<p className='tablet:text-xs smallLaptop:text-base'>{nft.author}</p>
						</div>
						<p className='p-3 flex items-center '>
							{nft.isAcquired ? (
								<p className='flex items-center'>
									Acquired
									<AiTwotoneCloseCircle className='ml-2 text-xs text-red-400' />{' '}
								</p>
							) : (
								<p className='flex items-center'>
									Auction in Progress
									<AiTwotoneCloseCircle className='ml-2 text-xs text-green-400' />
								</p>
							)}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default NFTCard;
