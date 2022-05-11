import { ETHEREUM } from 'constants/index';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { FaSpinner } from 'react-icons/fa';

interface IShowBidForm {
	setShowBidForm: Function;
	name: string;
	price: number;
	setPrice: Function;
	handlePlaceBid: Function;
	network: string;
	loading?: boolean;
	tokenId?: string;
}
const ShowBidForm = ({
	setShowBidForm,
	name,
	price,
	setPrice,
	network,
	loading,
	tokenId,
	handlePlaceBid,
}: IShowBidForm) => {
	return (
		<div className='text-white relative bg-black rounded-lg p-10'>
			<div className='absolute right-5 top-10 cursor-pointer'>
				<AiOutlineClose onClick={() => setShowBidForm(false)} />
			</div>
			<div className='flex flex-col justify-center items-center'>
				<h4 className='mb-4 text-base tablet:text-xl font-bold mt-8'>
					Place Bid on {name}
				</h4>
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
					<button
						disabled
						className='flex items-center mb-4 hover:text-blue-950'
					>
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
		</div>
	);
};

export default ShowBidForm;
