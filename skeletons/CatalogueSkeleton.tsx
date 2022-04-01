import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { range } from 'lodash';

const CatalogueSkeleton = () => {
	return (
		<div className='grid p-5 tablet:p-5 desktop:grid-cols-[600px_minmax(900px,_1fr)_100px] gap-6 tablet:flex tablet:items-center tablet:flex-col laptop:grid'>
			<div className='row-span-3 relative h-full laptop:mx-auto z-10 cursor-pointer'>
				<div className='hidden tablet:block'>
					<Skeleton width={600} height={620} />
				</div>
				<div className='tablet:hidden'>
					<Skeleton width={350} height={300} />
				</div>
			</div>
			{/* Tablet */}
			<div className='hidden tablet:block'>
				<div className='grid grid-cols-3 gap-4'>
					{range(6).map((data, index) => (
						<div className='relative cursor-pointer' key={index}>
							<Skeleton width={300} height={300} />
						</div>
					))}
				</div>
			</div>
			{/* Laptop */}
			<div className='hidden laptop:block'>
				<div className='grid grid-cols-3 gap-4'>
					{range(6).map((data, index) => (
						<div className='relative cursor-pointer' key={index}>
							<Skeleton width={300} height={300} />
						</div>
					))}
				</div>
			</div>
			{/* Mobile */}
			<div className='tablet:hidden'>
				<div className='flex justify-between items-center'>
					{range(3).map((data, index) => (
						<div className='relative cursor-pointer' key={index}>
							<Skeleton width={100} height={50} />
						</div>
					))}
				</div>
			</div>
			<div className='tablet:hidden'>
				<div className='flex justify-between items-center'>
					{range(3).map((data, index) => (
						<div className='relative cursor-pointer' key={index}>
							<Skeleton width={100} height={50} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CatalogueSkeleton;
