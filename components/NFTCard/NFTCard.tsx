import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { FaEthereum, FaGavel } from 'react-icons/fa';
import { HiCurrencyDollar } from 'react-icons/hi';
import { AiTwotoneCloseCircle } from 'react-icons/ai';
import INFT from 'dto/NFT/INFT';
import Link from 'next/link';
import { FaGreaterThan } from 'react-icons/fa';
import { useRouter } from 'next/router';
import NFTCardSkeleton from 'skeletons/NFTCardSkeleton';
import WalletContext from 'context/wallet/WalletContext';
import axios from 'axios';

interface INFTCard {
	data: Array<INFT>;
	title: string;
}
const NFTCard = ({ data, title }: INFTCard) => {
	const router = useRouter();
	const walletContext = useContext(WalletContext);

	const { fetchAllNfts, contract, allNfts, web3 } = walletContext;

	useEffect(() => {
		let mounted = true;
		if (mounted && contract !== null) {
			fetchAllNfts(contract);
		}

		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [contract]);
	return allNfts === null ? (
		<NFTCardSkeleton />
	) : (
		<div className='mt-10 tablet:p-10 smallLaptop:p-20' id='boom'>
			<div className='flex items-center justify-between'>
				<h2 className='ml-2 tablet:ml-1 p-3 mb-4 tablet:mb-8 font-bold text-3xl tablet:text-4xl capitalize'>
					{title}
				</h2>
				{router.pathname === '/' && (
					<Link href={`/${title.toLowerCase()}`}>
						<a
							href={`/${title.toLowerCase()}`}
							className='text-blue-950 mr-10 flex items-center'
						>
							View All <FaGreaterThan className='ml-2' />
						</a>
					</Link>
				)}
			</div>
			<div className='mx-6 tablet:mx-6 mb-10 grid grid-cols-1 tablet:w-3/3 tablet:grid-cols-3 smallLaptop:grid-cols-4 gap-6 tablet:mb-8 cursor-pointer'>
				{allNfts &&
					allNfts.map((nft: any) => (
						<div
							className='mb-4 bg-gray-200 hover:drop-shadow-lg'
							key={nft.tokenId}
							onClick={() =>
								router.push(`${nft.name.toLowerCase()}/${nft.tokenId}`)
							}
						>
							<Image
								src={nft.fileUrl}
								width={500}
								height={500}
								alt='nft image'
							/>
							<div className='p-3 flex justify-between items-center'>
								<p>{nft.name}</p>
								<FaEthereum />
							</div>
							{nft.sold ? (
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
									<p>{web3.utils.fromWei(nft.price, 'ether')} ETH</p>
								</div>
							)}

							<div className='p-3 flex justify-between items-center'>
								<p className='tablet:text-xs smallLaptop:text-base'>Creator</p>
								<p className='tablet:text-xs smallLaptop:text-base'>
									{nft.owner.substring(0, 6)}
								</p>
							</div>
							<div className='p-3 flex items-center '>
								{nft.sold ? (
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
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default NFTCard;
