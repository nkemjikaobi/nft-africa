import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import CountdownTimer from 'components/Countdown/CountdownTimer';
import NFTHistory from 'components/NFTHistory/NFTHistory';
import { History } from 'data/DetailPage/History';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaEthereum } from 'react-icons/fa';


const ProductDetailPage = () => {
	const time = new Date();
	time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
	return (
		<BasePageLayout>
			<div className='mt-64 flex items-center justify-between mx-40'>
				<div className='flex flex-col mr-16'>
					<Image
						src='/images/hero/1.png'
						alt='nft-image'
						width={500}
						height={500}
						className=''
					/>
					<div className='mt-8 mb-4'>
						<h4 className='text-sm text-gray-400'>Contract address</h4>
						<Link href='#'>
							<a
								href='#'
								className='font-bold text-sm hover:underline hover:text-blue-950'
							>
								0x1dDB2C0897daF18632662E71fdD2dbDC0eB3a9Ec
							</a>
						</Link>
					</div>
					<div>
						<h4 className='text-sm text-gray-400'>Token ID</h4>
						<p className='font-bold'>100300857841</p>
					</div>
				</div>

				<div className='w-3/4'>
					<h4 className='font-extrabold text-2xl'>GiiiO Non-medal role NFT</h4>
					<div className='flex items-center my-8'>
						<div className='flex items-center mr-20'>
							{/* <div className="rounded-full bg-[url('/images/hero/5.png')] bg-orange-300 ">
								m
							</div> */}
							<div>
								<p className='text-gray-400 text-sm'>Creator</p>
								<p className='font-bold'>GIIIO</p>
							</div>
						</div>
						<div className='flex items-center'>
							{/* <div className="rounded-full bg-[url('/images/hero/6.png')]"></div> */}
							<div>
								<p className='text-gray-400 text-sm'>Owner</p>
								<p className='font-bold'>Lemy777</p>
							</div>
						</div>
					</div>
					<p className='text-sm mb-8'>
						The GIIIO alien NFT is an important asset to the GIIIO metaverse, an
						identity symbol for participation in the GIIIO planet game, and an
						important player in the game, production and construction!
					</p>
					<div className='flex justify-between items-center'>
						<div>
							<h4 className='font-bold'>Price</h4>
							<p className='flex items-center mt-1'>
								<FaEthereum />{' '}
								<span className='text-2xl font-bold mx-2'>0.1 ETH</span>{' '}
								<span className='text-gray-400 text-sm'>≈ $ 318.60</span>
							</p>
						</div>
						<div>
							<h4 className='font-bold'>Ends In</h4>
							<p className='mt-1'>
								<CountdownTimer expiryTimestamp={time} />
							</p>
						</div>
					</div>
					<button className='bg-black flex items-center justify-center p-5 w-1/3 border border-black rounded-md text-white my-5 mb-8 hover:bg-white hover:text-black '>
						Buy Now
					</button>
					<div className='mt-4'>
						<h4 className='font-extrabold '>History</h4>
						<p className='text-orange-300 mb-4'>------------</p>
					</div>
					<div>
						<NFTHistory history={History} />
					</div>
				</div>
			</div>
		</BasePageLayout>
	);
};;

export default ProductDetailPage;
