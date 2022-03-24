import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { DesktopNav } from 'data/Navigation/DesktopNav';
import Link from 'next/link';
import useClickOutside from 'customHooks/useClickOutside';
import Image from 'next/image';

const MobileNavigation = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const node = useClickOutside(() => {
		setIsOpen(false);
	});
	return (
		<div className='bg-white'>
			<div className='flex justify-between items-center  py-5 px-10 drop-shadow-md'>
				<Link href='/'>
					<a href='#' className='font-bold cursor-pointer text-xl'>
						<Image
							src='/images/logo.png'
							alt='nft-africa'
							width='70'
							height='70'
						/>
					</a>
				</Link>
				{isOpen ? (
					<AiOutlineClose onClick={() => setIsOpen(false)} />
				) : (
					<GiHamburgerMenu onClick={() => setIsOpen(true)} />
				)}
			</div>
			{isOpen && (
				<ul className='w-3/5 px-10 py-4' ref={node}>
					{DesktopNav.map(data => (
						<li
							key={data.id}
							className={`mb-3 ${
								data.id === 4 &&
								'border border-black rounded-md py-3 px-8 flex justify-center items-center'
							}`}
						>
							<Link href={data.route}>
								<a href='#'>{data.name}</a>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default MobileNavigation;
