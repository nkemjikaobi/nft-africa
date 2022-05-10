import { Hero } from 'componentData/HeroSection/Hero';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CatalogueSkeleton from 'skeletons/CatalogueSkeleton';
import { useRouter } from 'next/router';

const Catalogue = () => {
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			setTimeout(() => setLoading(false), 1000);
		}

		return () => {
			mounted = false;
		};
	}, []);
	return loading ? (
		<CatalogueSkeleton />
	) : (
		<div
			className='grid p-5 tablet:p-5 desktop:grid-cols-[600px_minmax(900px,_1fr)_100px] gap-4 tablet:flex tablet:items-center tablet:flex-col laptop:grid'
			//onClick={() => router.push('/nft/2')}
		>
			<div className='block tablet:hidden smallLaptop:block row-span-3 relative h-full laptop:mx-auto  hover:scale-105 cursor-pointer hover:z-20 transition duration-700 ease-in-out'>
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
						className='relative  hover:scale-110 cursor-pointer hover:z-20 transition duration-700 ease-in-out'
						key={data.id}
						//onClick={() => router.push('/nft/4')}
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
