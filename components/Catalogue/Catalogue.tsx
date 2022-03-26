import { Hero } from 'data/HeroSection/Hero';
import Image from 'next/image';
import React from 'react';

const Catalogue = () => {
	return (
		<div className='grid p-5 tablet:p-5 desktop:grid-cols-[600px_minmax(900px,_1fr)_100px] gap-4 tablet:flex tablet:items-center tablet:flex-col laptop:grid'>
			<div className='row-span-3 relative h-full laptop:mx-auto z-10 hover:scale-105 cursor-pointer hover:z-20 transition duration-700 ease-in-out'>
				<Image
					src='/images/hero/african-festival.png'
					alt='nft catalogue'
					width={600}
					height={600}
				/>
				<p className='text-white capitalize font-bold text-4xl absolute top-10 left-10'>
					African festival
				</p>
			</div>
			<div className='grid grid-cols-3 gap-4'>
				{Hero.map(data => (
					<div
						className='relative z-10 hover:scale-110 cursor-pointer hover:z-20 transition duration-700 ease-in-out'
						key={data.id}
					>
						<Image
							src={data.imageUrl}
							alt='nft atalogue'
							width={500}
							height={500}
						/>
						<p className='text-white capitalize font-bold text-sm tablet:text-base tablet:w-2/4 absolute top-5 left-5 tablet:top-10 tablet:left-10'>
							{data.text}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Catalogue;
