import { ETHEREUM } from 'constants/index';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { FaSpinner } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';

interface IShowBidForm {
	name: string;
	price: number;
	setPrice: Function;
	handlePlaceBid: Function;
	network: string;
	loading?: boolean;
	tokenId?: string;
}
const ShowBidForm = ({
	name,
	price,
	setPrice,
	network,
	loading,
	tokenId,
	handlePlaceBid,
}: IShowBidForm) => {
	return (
		<div className='flex flex-col justify-center items-center'>
			<Dialog.Title
				as='h4'
				className='mb-4 text-base tablet:text-xl font-bold mt-8'
			>
				Place Bid on {name}
			</Dialog.Title>
			<div>
				<label>Price in {network === ETHEREUM ? 'ETH' : 'IGNIS'}</label>
				<input
					className='text-black p-5 border border-gray-300 rounded-md w-full mb-4 focus:border-black focus:outline-black'
					type='number'
					value={price}
					onChange={e => setPrice(e.target.value)}
				/>
			</div>
			{loading ? (
				<button disabled className='flex items-center mb-4 hover:text-blue-950'>
					<FaSpinner className='animate-spin h-5 w-5 mr-3' />
					Placing Bid... <BsArrowRight className='ml-4' />
				</button>
			) : (
				<button
					onClick={() => handlePlaceBid(tokenId)}
					className='flex items-center mb-4 hover:text-blue-950'
				>
					Proceed <BsArrowRight className='ml-4' />
				</button>
			)}
		</div>
	);
};

export default ShowBidForm;
