import IBidOrder from 'dto/NFT/IBidOrder';
import removeArdorZeroes from 'helpers/removeArdorZeroes';
import React from 'react';

interface IBid {
	bids: Array<IBidOrder>;
}
const Bids = ({ bids }: IBid) => {
	return (
		<div className='w-[115%] tablet:w-full'>
			{bids && bids.length !== 0 ? (
				bids.map((data: IBidOrder) => (
					<div
						key={data.asset}
						className='bg-gray-200 mb-4 p-3 flex justify-between items-center'
					>
						<div>
							<h4 className='font-bold text-sm mb-1'>{data.accountRS}</h4>
						</div>
						<div className=''>
							<h4 className='font-bold flex items-center'>
								{removeArdorZeroes(Number(data.priceNQTPerShare))} ARD
							</h4>
						</div>
					</div>
				))
			) : (
				<div className='text-blue-950'>No bids yet</div>
			)}
		</div>
	);
};

export default Bids;
