import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaEthereum } from 'react-icons/fa';
import { HiCurrencyDollar } from 'react-icons/hi';
import { AiTwotoneCloseCircle } from 'react-icons/ai';

const ArdorNFT = ({ data }: any) => {
	const router = useRouter();

	const [imageCID, setImageCID] = useState<string>('');

	const formatDescription = (description: string) => {
		const split = description.split('||');
		const lastItem = split[split.length - 1];
		setImageCID(`${process.env.NEXT_PUBLIC_IPFS_BASE_URL}/${lastItem}`);
	};

	useEffect(() => {
		if (data) {
			formatDescription(data.description);
		}
	}, [data]);

	return (
		<>
			{data && (
				<div
					className='mb-4 bg-gray-200 hover:drop-shadow-lg'
					key={data.asset}
					onClick={() => router.push(`nft/${data.asset}`)}
				>
					{imageCID !== '' && (
						<Image src={imageCID} width={500} height={500} alt='nft image' />
					)}
					<div className='p-3 flex justify-between items-center'>
						<p>{data.name}</p>
						<FaEthereum />
					</div>
					<div className='p-3 flex justify-between items-center'>
						<p className='flex items-center'>
							Price <HiCurrencyDollar className='ml-2' />
						</p>
						<p>0.0001 ETH</p>
					</div>

					<div className='p-3 flex justify-between items-center'>
						<p className='tablet:text-xs smallLaptop:text-base'>Creator</p>
						<p className='tablet:text-xs smallLaptop:text-base'>
							{data.accountRS.substring(0, 12)}
						</p>
					</div>
					<div className='p-3 flex items-center '>
						<p className='flex items-center'>
							Auction in Progress
							<AiTwotoneCloseCircle className='ml-2 text-xs text-green-400' />
						</p>
					</div>
				</div>
			)}
		</>
	);
};

export default ArdorNFT;
