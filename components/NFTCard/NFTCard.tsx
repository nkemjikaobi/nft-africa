import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaGreaterThan } from 'react-icons/fa';
import { useRouter } from 'next/router';
import NFTCardSkeleton from 'skeletons/NFTCardSkeleton';
import INFT from 'dto/NFT/INFT';
import { ARDOR, ETHEREUM } from 'constants/index';
import capitalizeFirstLetter from 'helpers/capitalizeFirstLetter';
import EthereumNFT from 'components/EthereurmNFT/EthereumNFT';
import ArdorNFT from 'components/ArdorNFT/ArdorNFT';
import IArdorNFT from 'dto/NFT/IArdorNFT';

interface INFTCard {
	allNfts?: Array<INFT>;
	title: string;
	ardorNfts?: Array<IArdorNFT>;
}
const NFTCard = ({ allNfts, title, ardorNfts }: INFTCard) => {
	const router = useRouter();

	const [active, setActive] = useState<string>('');
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const handleClick = (network: string) => {
		setActive(network);
		if (network === ETHEREUM) {
			setData(allNfts);
		} else {
			console.log('nere');
			console.log(ardorNfts);
			setData(ardorNfts);
		}
		setLoading(false);
	};

	useEffect(() => {
		let mounted = true;
		if (mounted && allNfts) {
			setActive(ETHEREUM);
			setData(allNfts);
			setLoading(false);
		}
		if (mounted && ardorNfts) {
			setActive(ARDOR);
			setData(ardorNfts);
			setLoading(false);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [allNfts, ardorNfts]);

	return loading ? (
		<NFTCardSkeleton />
	) : (
		<div className='mt-10 tablet:p-10 smallLaptop:p-20' id='boom'>
			<div className='flex items-center justify-between'>
				<h2 className='ml-2 tablet:ml-1 p-3 mb-4 tablet:mb-8 font-bold text-3xl tablet:text-4xl capitalize'>
					{title}
				</h2>
				<div className='hidden tablet:flex items-center justify-between w-1/5'>
					<h4
						className={`laptop:text-xl font-bold cursor-pointer ${
							active === ETHEREUM && 'border-b-4 border-b-blue-950'
						}`}
						onClick={() => handleClick(ETHEREUM)}
					>
						{capitalizeFirstLetter(ETHEREUM)}
					</h4>
					<h4
						className={`laptop:text-xl font-bold cursor-pointer ${
							active === ARDOR && 'border-b-4 border-b-blue-950'
						}`}
						onClick={() => handleClick(ARDOR)}
					>
						{capitalizeFirstLetter(ARDOR)}
					</h4>
				</div>
				{router.pathname === '/' && (
					<Link href={`/${title.toLowerCase()}`}>
						<a
							href={`/${title.toLowerCase()}`}
							className='text-blue-950 mr-10 flex items-center'
						>
							View All <FaGreaterThan className='ml-2' />
						</a>
					</Link>
				)}
			</div>
			<div className='mx-6 tablet:mx-6 mb-10 grid grid-cols-1 tablet:w-3/3 tablet:grid-cols-3 smallLaptop:grid-cols-4 gap-6 tablet:mb-8 cursor-pointer'>
				{data === null && !loading ? (
					<div>Nothing here...</div>
				) : (
					data &&
					data.map((nft: any) =>
						active === ETHEREUM ? (
							<EthereumNFT data={nft} key={nft.tokenId} />
						) : (
							<ArdorNFT data={nft} key={nft.asset} />
						)
					)
				)}
			</div>
		</div>
	);
};

export default NFTCard;
