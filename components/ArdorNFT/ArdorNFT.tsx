import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaEthereum } from 'react-icons/fa';
import { HiCurrencyDollar } from 'react-icons/hi';
import { AiTwotoneCloseCircle } from 'react-icons/ai';
import formatArdorImageUrl from 'helpers/formatArdorImageUrl';
import axios from 'axios';

const ArdorNFT = ({ data }: any) => {
	const router = useRouter();

	const [imageCID, setImageCID] = useState<any>('');

	const fetchImage: any = async (cid: any) => {
		try {
			const url: any = await axios.get(cid);
			const finalUrl = url.data.fileUrl;
			setImageCID(finalUrl);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (data) {
			const cid: any = formatArdorImageUrl(data.description);
			fetchImage(cid);
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
						<Image
							src={imageCID}
							width={500}
							height={500}
							alt='nft image'
						/>
					)}
					<div className='p-3 flex justify-between items-center'>
						<p>{data.name}</p>
						<FaEthereum />
					</div>

					<div className='p-3 flex justify-between items-center'>
						<p className='tablet:text-xs smallLaptop:text-base'>Creator</p>
						<p className='tablet:text-xs smallLaptop:text-base'>
							{data.accountRS && data.accountRS.substring(0, 12)}
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
