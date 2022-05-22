import React from 'react';
import { ARDOR, ETHEREUM } from 'constants/index';
import { BsArrowRight } from 'react-icons/bs';
import { Dialog } from '@headlessui/react';

interface IChooseNetwork {
	setNetwork: Function;
	handleConnect: Function;
}
const ChooseNetwork = ({ setNetwork, handleConnect }: IChooseNetwork) => {
	return (
		<div className='flex flex-col justify-center items-center'>
			<Dialog.Title
				as='h4'
				className='mb-4 text-base tablet:text-xl font-bold mt-8'
			>
				Choose Network
			</Dialog.Title>
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
	);
};

export default ChooseNetwork;
