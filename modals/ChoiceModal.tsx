import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { FaSpinner } from 'react-icons/fa';

interface IChoiceModal {
	setChoiceModal: Function;
	name: string;
	handleEthereumNftSale: Function;
	loading?: boolean;
	tokenId?: string;
}
const ChoiceModal = ({
	setChoiceModal,
	name,
	loading,
	tokenId,
	handleEthereumNftSale,
}: IChoiceModal) => {
	return (
		<div className='flex flex-col justify-center items-center'>
			<h4 className='mb-4 text-base tablet:text-xl font-bold mt-8'>
				Are you sure you want to sell {name}
			</h4>
			<div>
				<button
					onClick={() => setChoiceModal(false)}
					className='flex items-center mb-4 hover:text-blue-950'
				>
					No <BsArrowRight className='ml-4' />
				</button>
				{loading ? (
					<button
						disabled
						className='flex items-center mb-4 hover:text-blue-950'
					>
						<FaSpinner className='animate-spin h-5 w-5 mr-3' />
						Selling Asset... <BsArrowRight className='ml-4' />
					</button>
				) : (
					<button
						onClick={() => handleEthereumNftSale(tokenId)}
						className='flex items-center mb-4 hover:text-blue-950'
					>
						Yes <BsArrowRight className='ml-4' />
					</button>
				)}
			</div>
		</div>
	);
};

export default ChoiceModal;
