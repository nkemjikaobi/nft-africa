import React, { useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Dialog } from '@headlessui/react';
import ICountry from 'dto/Auth/ICountry';
import { Country } from 'country-state-city';
import { v4 as uuidv4 } from 'uuid';

interface IChooseCountry {
	setCountry: Function;
	addLocation: Function;
	country: string;
	address: string;
	setCheckCountry: Function;
}
const ChooseCountry = ({
	setCountry,
	address,
	addLocation,
	country,
	setCheckCountry,
}: IChooseCountry) => {
	const [allCountries, setAllCountries] = useState<Array<ICountry>>([]);

	const fetchCountries = () => {
		const countries: any = Country.getAllCountries();
		setAllCountries(countries);
	};

	//Fetch all countries
	useEffect(() => {
		let mounted = true;

		if (mounted) {
			fetchCountries();
		}

		return () => {
			mounted = false;
		};
	}, []);
	return (
		<div className='flex flex-col justify-center items-center'>
			<Dialog.Title
				as='h4'
				className='mb-4 text-base tablet:text-xl font-bold mt-8'
			>
				Choose Country
			</Dialog.Title>
			<div>
				<select
					className='p-5 text-black border border-gray-300 rounded-md  mb-4 focus:outline-none'
					name=''
					id=''
					onChange={e => setCountry(e.target.value)}
					value={country}
				>
					<option value='Select State'>Select State</option>
					{allCountries &&
						allCountries.map((country, index) => (
							<>
								<option key={uuidv4()} value={country.isoCode}>
									{country.flag} {country.name}
								</option>
							</>
						))}
				</select>
			</div>
			<button
				onClick={() => {
					addLocation(address, country);
					setCheckCountry(false);
				}}
				className='flex items-center mb-4 hover:text-blue-950'
			>
				Proceed <BsArrowRight className='ml-4' />
			</button>
		</div>
	);
};

export default ChooseCountry;
