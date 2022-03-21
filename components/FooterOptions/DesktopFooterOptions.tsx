import IFooterOption from 'dto/Footer/IFooterOption';
import Link from 'next/link';
import React from 'react';

interface IDesktopFooterOptions {
	options: Array<IFooterOption>;
	title: string;
	hasIcons: boolean;
}
const DesktopFooterOptions = ({ options, title, hasIcons }: IDesktopFooterOptions) => {
	return (
		<div>
			<h4 className='font-bold mb-3 text-xl'>{title}</h4>
			{hasIcons ? (
				<ul className='text-xs flex justify-between items-center laptop:w-2/4'>
					{options &&
						options.map(data => (
							<li key={data.id} className='hover:text-blue-950'>
								<Link href={data.route}>
									<a href='#' className='text-2xl'>
										{<data.icon />}
									</a>
								</Link>
							</li>
						))}
				</ul>
			) : (
				<ul className='text-xs'>
					{options &&
						options.map(data => (
							<li key={data.id} className='mb-4 hover:text-blue-950'>
								<Link href={data.route}>
									<a href='#'>{data.name}</a>
								</Link>
							</li>
						))}
				</ul>
			)}
		</div>
	);
};

export default DesktopFooterOptions;

DesktopFooterOptions.defaultProps = {
	hasIcons: false,
};
