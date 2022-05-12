import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface IBaseModal {
	children: any;
	isVisible: boolean;
	onClose: Function;
}
const BaseModal = ({ children, isVisible, onClose }: IBaseModal) => {
	return (
		<>
			{isVisible && (
				<div className='fixed left-[10%] laptop:left-[30%] top-[30%] w-[80%] laptop:w-[40%]'>
					<div className='text-white relative bg-black rounded-lg p-10'>
						<div className='absolute right-5 top-10 cursor-pointer'>
							<AiOutlineClose onClick={() => onClose(false)} />
						</div>
						{children}
					</div>
				</div>
			)}
		</>
	);
};

export default BaseModal;
