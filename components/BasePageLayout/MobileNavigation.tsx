import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { DesktopNav } from 'componentData/Navigation/DesktopNav';
import Link from 'next/link';
import useClickOutside from 'hooks/useClickOutside';
import Image from 'next/image';
import { ETHEREUM } from 'constants/index';
import removeArdorZeroes from 'helpers/removeArdorZeroes';
import { useRouter } from 'next/router';
import useWallet from 'hooks/useWallet';

interface IMobileNavigation {
	handleClick: Function;
}
const MobileNavigation = ({ handleClick }: IMobileNavigation) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const node = useClickOutside(() => {
		setIsOpen(false);
	});

	const { network, ardorUserData, isConnected, balance } =
		useWallet();

	const router = useRouter();

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
					<AiOutlineClose className='cursor-pointer' onClick={() => setIsOpen(false)} />
				) : (
					<GiHamburgerMenu className='cursor-pointer' onClick={() => setIsOpen(true)} />
				)}
			</div>
			{isOpen && (
				<ul className='w-3/5 px-10 py-4' ref={node}>
					{isConnected && (
						<li className='mb-4' onClick={() => router.push('/profile')}>
							<span>Profile</span>
						</li>
					)}
					{DesktopNav.map(data => (
						<li
							key={data.id}
							className={`mb-3  ${
								data.id === 4 &&
								'border border-black w-[90%] tablet:w-[40%] rounded-md py-3 px-8 flex justify-center items-center'
							}`}
							onClick={() => handleClick(data.id, data.route)}
						>
							<div>
								<span>
									{data.id === 3 && isConnected ? data.altName : data.name}
								</span>
							</div>
						</li>
					))}

					{isConnected && (
						<li className='border border-black rounded-md py-3 px-8 w-[90%] tablet:w-[40%] flex justify-center items-center whitespace-nowrap'>
							<div>
								<span>
									{network === ETHEREUM ? (
										<>{Number(balance).toFixed(4)} ETH</>
									) : (
										<>
											{Number(
												ardorUserData !== null &&
													removeArdorZeroes(ardorUserData.balance)
											).toFixed(4)}{' '}
											ARD
										</>
									)}
								</span>
							</div>
						</li>
					)}
				</ul>
			)}
		</div>
	);
};

export default MobileNavigation;
