import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';

interface IShowBidForm {
	setShowBidForm: Function;
	name: string;
	price: number;
	setPrice: Function;
	handlePlaceBid: Function;
}
const ShowBidForm = ({
	setShowBidForm,
	name,
	price,
	setPrice,
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
					<label>Price in IGNIS</label>
					<input
						className='text-black p-5 border border-gray-300 rounded-md w-full mb-4 focus:border-black focus:outline-black'
						type='number'
						value={price}
						onChange={e => setPrice(e.target.value)}
					/>
				</div>
				<button
					onClick={() => handlePlaceBid()}
					className='flex items-center mb-4 hover:text-blue-950'
				>
					Proceed <BsArrowRight className='ml-4' />
				</button>
			</div>
		</div>
	);
};

export default ShowBidForm;
