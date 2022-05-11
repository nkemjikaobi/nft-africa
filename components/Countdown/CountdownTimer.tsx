import React from 'react';
import { useTimer } from 'react-timer-hook';

interface ICountdownTimer {
	expiryTimestamp: Date;
	setHasAuctionEnded: Function;
}
const CountdownTimer = ({
	expiryTimestamp,
	setHasAuctionEnded,
}: ICountdownTimer) => {
	const { seconds, minutes, hours, days, isRunning } = useTimer({
		expiryTimestamp,
		onExpire: () => {
			setHasAuctionEnded(true);
			console.warn('onExpire called');
		},
	});

	return (
		<div>
			{isRunning ? (
				<div className='mt-2 flex justify-between'>
					<span className='mr-4 smallLaptop:mr-8'>
						<p className='text-base smallLaptop:text-2xl font-bold'>{days}</p>
						<p className='text-xs smallLaptop:text-sm text-gray-500'>Days</p>
					</span>

					<span className='mr-4 smallLaptop:mr-8'>
						<p className='text-base smallLaptop:text-2xl font-bold'>{hours}</p>
						<p className='text-xs smallLaptop:text-sm text-gray-500'>Hours</p>
					</span>

					<span className='mr-4 smallLaptop:mr-8'>
						<p className='text-base smallLaptop:text-2xl font-bold'>
							{minutes}
						</p>
						<p className='text-xs smallLaptop:text-sm text-gray-500'>Mins</p>
					</span>

					<span className='mr-4 smallLaptop:mr-8'>
						<p className='text-base smallLaptop:text-2xl font-bold'>
							{seconds}
						</p>
						<p className='text-xs smallLaptop:text-sm text-gray-500'>Secs</p>
					</span>
				</div>
			) : (
				<span className='text-red-500'>Auction Ended</span>
			)}
		</div>
	);
};

export default CountdownTimer;
