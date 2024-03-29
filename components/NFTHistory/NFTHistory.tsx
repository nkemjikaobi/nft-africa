import IHistory from 'dto/NFT/IHistory';
import React from 'react';
import { SiBinance } from 'react-icons/si';

interface INFTHistory {
	history: Array<IHistory>;
}
const NFTHistory = ({ history }: INFTHistory) => {
	return (
		<div className='w-[115%] tablet:w-full'>
			{history.map((data: IHistory) => (
				<div
					key={data.id}
					className='bg-gray-200 mb-4 p-3 flex justify-between items-center'
				>
					<div>
						<h4 className='font-bold text-sm mb-1'>{data.description}</h4>
						<p className='text-gray-400 text-sm'>{data.date}</p>
					</div>
					{data.isPurchased && (
						<div className=''>
							<h4 className='font-bold flex items-center'>
								<SiBinance className='mr-2 text-orange-300' />
								{data?.amount?.bnb}
							</h4>
							<p className='text-gray-400 text-sm'>≈ $ {data?.amount?.usd}</p>
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default NFTHistory;
