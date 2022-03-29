import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { range } from 'lodash';
import { useRouter } from 'next/router';

const NFTCardSkeleton = () => {
	const router = useRouter();
	return (
		<div className='mt-10'>
			<div className='flex items-center ml-4 justify-between'>
				<Skeleton
					className='ml-2 tablet:ml-1 p-3 mb-4 tablet:mb-8 font-bold text-3xl tablet:text-4xl capitalize'
					width={200}
					height={50}
				/>
			</div>
			<div className='mx-6 tablet:mx-6 mb-10 grid grid-cols-1 tablet:w-3/3 tablet:grid-cols-3 smallLaptop:grid-cols-4 gap-4 tablet:mb-8 cursor-pointer'>
				{range(16).map((nft, index) => (
					<div className='mb-4 bg-gray-200 hover:drop-shadow-lg' key={index}>
						<div className='hidden tablet:block'>
							<Skeleton width={359} height={400} />
						</div>
						<div className='tablet:hidden'>
							<Skeleton width={344} height={300} />
						</div>

						<div className='p-3 flex justify-between items-center'>
							<Skeleton width={100} />
							<Skeleton width={100} />
						</div>
						<div className='p-3 flex justify-between items-center'>
							<Skeleton className='flex items-center' width={100} />
							<Skeleton width={100} />
						</div>
						<div className='p-3 flex justify-between items-center'>
							<Skeleton className='flex items-center' width={100} />
							<Skeleton width={100} />
						</div>

						<div className='p-3 flex justify-between items-center'>
							<Skeleton className='tablet:text-xs smallLaptop:text-base' />
							<Skeleton className='tablet:text-xs smallLaptop:text-base' />
						</div>
						<Skeleton
							className='p-3 mb-4 ml-4 flex items-center '
							width={100}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default NFTCardSkeleton;
