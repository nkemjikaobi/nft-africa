import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { range } from "lodash";

const CatalogueSkeleton = () => {
  return (
		<div className='grid p-5 tablet:p-5 desktop:grid-cols-[600px_minmax(900px,_1fr)_100px] gap-6 tablet:flex tablet:items-center tablet:flex-col laptop:grid'>
			<div className='row-span-3 relative h-full laptop:mx-auto z-10 hover:scale-105 cursor-pointer hover:z-20 transition duration-700 ease-in-out'>
				<Skeleton
					width={600}
					height={620}
				/>
			</div>
			<div className='grid grid-cols-3 gap-4'>
				{range(6).map((data, index) => (
					<div
						className='relative z-10 hover:scale-110 cursor-pointer hover:z-20 transition duration-700 ease-in-out'
						key={index}
					>
						<Skeleton
							width={300}
							height={300}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default CatalogueSkeleton