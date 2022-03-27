import Image from 'next/image';
import React from 'react';

const MagnifiedNFT = () => {
	return (
		<div>
			<Image
				alt='nft image'
				height={800}
				width={800}
				src='/images/hero/1.png'
			/>
		</div>
	);
};

export default MagnifiedNFT;
