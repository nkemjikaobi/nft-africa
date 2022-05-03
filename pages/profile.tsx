import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import Tabs from 'components/Tabs/Tabs';
import shortenWalletAddress from 'helpers/shortenWalletAddress';
import Image from 'next/image';
import React, { useState, useEffect, useContext } from 'react';
import { FaEthereum } from 'react-icons/fa';
import WalletContext from 'context/wallet/WalletContext';
import NFTCard from 'components/NFTCard/NFTCard';

const ProfilePage = () => {
	const [active, setActive] = useState<number>(1);

	const walletContext = useContext(WalletContext);

	const {
		fetchAllNfts,
		contract,
		allNfts,
		fetchPersonalAssets,
		personalAssets,
		address,
	} = walletContext;

	//Fetch NFT's on the ethereum network
	useEffect(() => {
		let mounted = true;
		if (mounted && contract !== null) {
			fetchAllNfts(contract);
		}

		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [contract]);

	//Fetch personal assets
	useEffect(() => {
		let mounted = true;
		if (mounted && address) {
			fetchPersonalAssets(address);
		}

		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [address]);

	return (
		<div className='mt-[110px] tablet:mt-[130px]'>
			<div>
				<div className='w-full'>
					<Image
						src={'/images/nftBg.png'}
						alt='nft bg image'
						width='1536px'
						height='225px'
						layout='responsive'
					/>
				</div>
			</div>
			<BasePageLayout>
				<div className='rounded-full border w-24 h-24 border-black absolute left-[39%] tablet:left-[44%] smallLaptop:left-[45%] top-[160px] tablet:top-[230px] smallLaptop:top-[350px]'>
					<Image
						src={'/images/noimage.webp'}
						className='rounded-full'
						alt=''
						height={100}
						width={100}
					/>
					<div className='-ml-8'>
						<h3 className='whitespace-nowrap text-2xl font-bold '>
							Nkemjika Obi
						</h3>
						<div className='flex items-center justify-between border border-gray-300 h-8 w-32 mt-4 ml-4'>
							{' '}
							<p className='flex items-center justify-center w-full text-sm text-gray-500'>
								<FaEthereum />
								{shortenWalletAddress(
									'0x6917889Fe7922AA9A88aB4FfdBf71391fdb06A40'
								)}
							</p>
						</div>
					</div>
				</div>
				<div className='mt-[10%] ml-[35%] laptop:mt-[12%]'>
					<Tabs active={active} setActive={setActive} />
					{/* <hr className='border-gray-600'/> */}
				</div>
				<div className='mt-[10%] laptop:mt-[3%]'>
					<NFTCard
						title='Your Assets'
						allNfts={allNfts}
						ardorNfts={personalAssets}
					/>
				</div>
			</BasePageLayout>
		</div>
	);
};

export default ProfilePage;
