import IFooterOption from 'dto/Footer/IFooterOption';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

interface IMobileFooterOptions {
	options: Array<IFooterOption>;
	title: string;
	hasIcons: boolean;
	activeIndex: number;
	setActiveIndex: Function;
	identifier: number;
}
const MobileFooterOptions = ({
	options,
	title,
	hasIcons,
	setActiveIndex,
	activeIndex,
	identifier,
}: IMobileFooterOptions) => {
	const [isActive, setIsActive] = useState<boolean>(false);
	const handleOpen = () => {
		setActiveIndex(identifier);
		setIsActive(true);
	};
	const handleClose = () => {
		setActiveIndex(0);
		setIsActive(false);
	};
	return (
		<div className='mb-4 mt-3'>
			<div className='flex justify-between items-center'>
				<h4 className='font-bold mb-3 text-base tablet:text-xl'>{title}</h4>
				{isActive && activeIndex === identifier ? (
					<AiOutlineMinus onClick={() => handleClose()} />
				) : (
					<AiOutlinePlus onClick={() => handleOpen()} />
				)}
			</div>

			{hasIcons && activeIndex === identifier && isActive ? (
				<ul className='text-xs flex justify-between items-center w-1/3 laptop:w-2/4'>
					{options &&
						options.map(data => (
							<li key={data.id}>
								<Link href={data.route}>
									<a href={data.route} className='text-2xl'>
										{<data.icon />}
									</a>
								</Link>
							</li>
						))}
				</ul>
			) : activeIndex === identifier && isActive ? (
				<ul className='text-xs'>
					{options &&
						options.map(data => (
							<li key={data.id} className='mb-4 flex justify-between'>
								<Link href={data.route}>
									<a href={data.route}>{data.name}</a>
								</Link>
							</li>
						))}
				</ul>
			) : null}
		</div>
	);
};

export default MobileFooterOptions;

MobileFooterOptions.defaultProps = {
	hasIcons: false,
};
