import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { range } from 'lodash';

const NFTDetailSkeleton = () => {
	return (
		<div className='mt-64 flex flex-col tablet:flex-row items-center tablet:items-start smallLaptop:items-baseline justify-between mx-40 tablet:mx-10 smallLaptop:mx-40'>
			<div className='flex flex-col -mt-16 tablet:mt-0 tablet:mr-16'>
				<div className='mb-8 ml-4 tablet:hidden'>
					{/* Tablet Up */}
					<div className='hidden tablet:block'>
						<Skeleton
							className='font-extrabold text-2xl'
							width={400}
							height={50}
						/>
					</div>
					{/* Mobile */}
					<div className='tablet:hidden'>
						<Skeleton className='font-extrabold text-2xl' height={50} />
					</div>
				</div>

				{/* Tablet Up */}
				<div className='hidden tablet:block'>
					<Skeleton width={500} height={500} />
				</div>
				{/* Mobile */}
				<div className='tablet:hidden'>
					<Skeleton width={300} height={300} />
				</div>
				{/* Tablet Up */}
				<div className='hidden tablet:block'>
					<Skeleton width={100} height={16} />
					<Skeleton width={400} height={20} />
				</div>
				{/* Tablet Up */}
				<div className='hidden tablet:block'>
					<Skeleton width={100} height={16} />
					<Skeleton width={400} height={20} />
				</div>
				{/* Mobile */}
				<div className='tablet:hidden'>
					<Skeleton width={100} height={16} />
					<Skeleton width={200} height={20} />
				</div>
				{/* Mobile */}
				<div className='tablet:hidden'>
					<Skeleton width={100} height={16} />
					<Skeleton width={200} height={20} />
				</div>
			</div>

			<div className='tablet:w-3/4 tablet:mt-2 smallLaptop:mt-0'>
				<div className='hidden tablet:block'>
					<Skeleton width={400} height={25} />
				</div>
				<div className='flex items-center my-8'>
					<div className='flex -ml-20 tablet:ml-0 items-center mr-20'>
						<div>
							<Skeleton width={60} height={16} />
							<Skeleton width={70} height={20} />
						</div>
					</div>
					<div className='flex items-center'>
						<div>
							<Skeleton width={60} height={16} />
							<Skeleton width={70} height={20} />
						</div>
					</div>
				</div>
				{/* Tablet Up */}
				<div className='hidden tablet:block'>
					<p className='text-sm mb-8 -ml-20 tablet:ml-0'>
						<Skeleton width={700} height={50} />
					</p>
				</div>
				{/* Mobile */}
				<div className='tablet:hidden'>
					<p className='text-sm mb-8 -ml-20 tablet:ml-0'>
						<Skeleton width={300} height={50} />
					</p>
				</div>

				<div className='flex items-center justify-between -ml-20 tablet:ml-0'>
					<div className='mr-8'>
						<Skeleton width={60} height={20} />
						<Skeleton width={70} height={25} />
					</div>
					<div className='ml-4'>
						<Skeleton width={60} height={20} />
						<Skeleton width={70} height={25} />
					</div>
				</div>
				<button className='-ml-20 tablet:ml-0 flex items-center w-full tablet:w-full smallLaptop:w-1/3  rounded-md text-white my-5 mb-8 '>
					<Skeleton width={200} height={60} />
				</button>
				<div className='mt-4 -ml-20 tablet:ml-0'>
					<Skeleton width={60} height={20} />
					<Skeleton width={85} height={12} />
				</div>
				{/* Tablet Up */}
				<div className='hidden tablet:block'>
					<div className='mb-4 tablet:ml-0 '>
						<Skeleton width={700} height={50} count={3} />
					</div>
				</div>
				{/* Mobile */}
				<div className='tablet:hidden'>
					<div className='mb-4 tablet:ml-0 '>
						<Skeleton width={600} height={50} count={3} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default NFTDetailSkeleton;
