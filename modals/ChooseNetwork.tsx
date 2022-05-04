import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { ARDOR, ETHEREUM } from 'constants/index';
import { BsArrowRight } from 'react-icons/bs';

interface IChooseNetwork {
	setChooseNetwork: Function;
	setNetwork: Function;
	handleConnect: Function;
}
const ChooseNetwork = ({
	setChooseNetwork,
	setNetwork,
	handleConnect,
}: IChooseNetwork) => {
	return (
		<div className='text-white relative bg-black rounded-lg p-10'>
			<div className='absolute right-5 top-10 cursor-pointer'>
				<AiOutlineClose onClick={() => setChooseNetwork(false)} />
			</div>
			<div className='flex flex-col justify-center items-center'>
				<h4 className='mb-4 text-base tablet:text-xl font-bold mt-8'>
					Choose Network
				</h4>
				<div>
					<select
						className='p-5 text-black border border-gray-300 rounded-md  mb-4 focus:outline-none'
						name=''
						id=''
						onChange={e => setNetwork(e.target.value)}
						defaultValue={`${ETHEREUM}`}
					>
						<option value={`${ARDOR}`}>Ardor</option>
						<option value={`${ETHEREUM}`}>Ethereum</option>
					</select>
				</div>
				<button
					onClick={() => handleConnect()}
					className='flex items-center mb-4 hover:text-blue-950'
				>
					Proceed <BsArrowRight className='ml-4' />
				</button>
			</div>
		</div>
	);
};

export default ChooseNetwork;
