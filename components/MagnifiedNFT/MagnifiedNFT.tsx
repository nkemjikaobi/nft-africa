import Image from 'next/image';
import React from 'react';

interface IMagnifiedNFT {
	url: string;
}
const MagnifiedNFT = ({ url }: IMagnifiedNFT) => {
	return (
		<div>
			<Image alt='nft image' height={700} width={800} src={url} />
		</div>
	);
};

export default MagnifiedNFT;
