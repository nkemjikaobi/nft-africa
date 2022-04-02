import React, { useContext, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { DesktopNav } from 'componentData/Navigation/DesktopNav';
import Link from 'next/link';
import useClickOutside from 'hooks/useClickOutside';
import Image from 'next/image';
import { useRouter } from 'next/router';
import WalletContext from 'context/wallet/WalletContext';

const MobileNavigation = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const node = useClickOutside(() => {
		setIsOpen(false);
	});

	const router = useRouter();
	const walletContext = useContext(WalletContext);
	const { connectWallet, isConnected, balance, disconnectWallet } =
		walletContext;

	const handleClick = async (identifier: number, route: string) => {
		if (isConnected && identifier === 3) {
			return await disconnectWallet();
		}
		if (identifier === 3) {
			return await connectWallet();
		}
		return router.push(route);
	};
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
							className={`mb-3  ${
								data.id === 4 &&
								'border border-black rounded-md py-3 px-8 flex justify-center items-center'
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
						<li className='border border-black rounded-md py-3 px-8 flex justify-center items-center'>
							<div>
								<span>{balance} ETH</span>
							</div>
						</li>
					)}
				</ul>
			)}
		</div>
	);
};

export default MobileNavigation;
