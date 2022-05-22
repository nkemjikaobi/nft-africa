import React, { useEffect, useState } from 'react';
import NFTCardSkeleton from 'skeletons/NFTCardSkeleton';
import INFT from 'dto/NFT/INFT';
import { ETHEREUM, networkMappings } from 'constants/index';
import EthereumNFT from 'components/EthereurmNFT/EthereumNFT';
import ArdorNFT from 'components/ArdorNFT/ArdorNFT';
import IArdorNFT from 'dto/NFT/IArdorNFT';
import { v4 as uuidv4 } from 'uuid';
import IEthereumAsset from 'dto/NFT/IEthereumAsset';
import EthereumAssetCard from 'components/EthereumAssetCard/EthereumAssetCard';
import SwitchBlockChainNetwork from 'components/SwitchBlockChainNetwork/SwitchBlockChainNetwork';

interface INFTCard {
	auctionedNfts?: Array<INFT> | Array<IEthereumAsset>;
	title: string;
	ardorNfts?: Array<IArdorNFT>;
	location?: string;
}
const NFTCard = ({ auctionedNfts, title, ardorNfts, location }: INFTCard) => {
	const [active, setActive] = useState<string>(ETHEREUM);
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const handleClick = (index: number) => {
		switch (networkMappings[index]) {
			case networkMappings[index]:
				return setActive(networkMappings[index]);
			case networkMappings[index]:
				return setActive(networkMappings[index]);
			default:
				return setActive(ETHEREUM);
		}
	};

	useEffect(() => {
		let mounted = true;
		if ((mounted && active && auctionedNfts) || ardorNfts) {
			setLoading(true);
			if (active === ETHEREUM) {
				setData(auctionedNfts);
			} else {
				setData(ardorNfts);
			}
			setLoading(false);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [active, auctionedNfts, ardorNfts]);

	return loading ? (
		<NFTCardSkeleton />
	) : (
		<div className='mt-10 tablet:p-10 smallLaptop:p-20' id='boom'>
			<div className='flex items-center justify-between'>
				<h2 className='ml-2 tablet:ml-1 p-3 mb-4 tablet:mb-8 font-bold text-2xl tablet:text-4xl capitalize'>
					{title}
				</h2>
				<SwitchBlockChainNetwork handleClick={handleClick} />

				{/* {router.pathname === '/' && (
					<div className='hidden tablet:block'>
						<Link href={`/${title.toLowerCase()}`}>
							<a
								href={`/${title.toLowerCase()}`}
								className='text-blue-950 mr-10 flex items-center'
							>
								View All <FaGreaterThan className='ml-2' />
							</a>
						</Link>
					</div>
				)} */}
			</div>
			<div className='mx-6 tablet:mx-6 mb-10 grid grid-cols-1 tablet:w-3/3 tablet:grid-cols-3 smallLaptop:grid-cols-4 gap-6 tablet:mb-8 cursor-pointer'>
				{data === null || (data && data.length === 0 && !loading) ? (
					<div>Nothing here...</div>
				) : (
					data &&
					data.map((nft: any) =>
						active === ETHEREUM ? (
							location === 'profile' ? (
								<EthereumAssetCard data={nft} key={uuidv4()} />
							) : (
								<EthereumNFT data={nft} key={uuidv4()} />
							)
						) : (
							<ArdorNFT data={nft} key={uuidv4()} />
						)
					)
				)}
			</div>
		</div>
	);
};

export default NFTCard;
