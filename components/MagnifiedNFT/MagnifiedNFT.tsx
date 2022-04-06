import Image from 'next/image';
import React from 'react';

const MagnifiedNFT = ({ url }: any) => {
	return (
		<div>
			<Image alt='nft image' height={700} width={800} src={url} />
		</div>
	);
};

export default MagnifiedNFT;
