import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import IRegisterData from 'dto/Auth/IRegisterData';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { Country, State } from 'country-state-city';
import ICountry from 'dto/Auth/ICountry';
import IState from 'dto/Auth/IState';
import { v4 as uuidv4 } from 'uuid';
import { FaSpinner } from 'react-icons/fa';
import { useRouter } from 'next/router';
import useAuth from 'hooks/useAuth';

const SignUpPage = () => {
	const [registerData, setRegisterData] = useState<IRegisterData>({
		name: '',
		email: '',
		otp: 222,
		password: '',
		status: 1,
		country: '',
		state: '',
		lga: 'anonymous',
	});
	const [confirmPassWord, setConfirmPassword] = useState<string>('');
	const [allCountries, setAllCountries] = useState<Array<ICountry>>([]);
	const [allStates, setAllStates] = useState<Array<IState>>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const { registerUser } = useAuth();

	const router = useRouter();

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setRegisterData({ ...registerData, [name]: value });
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		setLoading(true);

		//Validation
		const hasEmptyFields = Object.values(registerData).some(
			element => element === ''
		);

		if (hasEmptyFields) {
			setLoading(false);
			return toast.error('Please fill in all fields');
		}

		if (registerData.password !== confirmPassWord) {
			setLoading(false);
			return toast.error('Passwords dont match');
		}

		await registerUser(registerData, router);
		setLoading(false);
	};

	const fetchCountries = () => {
		const countries: any = Country.getAllCountries();
		setAllCountries(countries);
	};

	const fetchStatesForSelectedCountry = (countryCode: string) => {
		const states: any = State.getStatesOfCountry(countryCode);
		setAllStates(states);
	};

	//Fetch all countries
	useEffect(() => {
		let mounted = true;

		if (mounted) {
			// console.log(State.getAllStates());
			fetchCountries();
		}

		return () => {
			mounted = false;
		};
	}, []);

	//Fetch states of selected country
	useEffect(() => {
		let mounted = true;

		if (mounted && registerData.country !== '') {
			fetchStatesForSelectedCountry(registerData.country);
		}

		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [registerData.country]);

	return (
		<BasePageLayout>
			<div className='tablet:container tablet:w-600 text-center'>
				<h1 className='uppercase text-base tablet:text-3xl font-extrabold mb-4 mt-64'>
					Sign Up
				</h1>
				<h4 className='font-bold mb-6 text-sm tablet:text-base'>
					For an NFT Art Account
				</h4>
				<div>
					<input
						className='bg-gray-200 p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black'
						type='text'
						placeholder='Name'
						name='name'
						onChange={handleChange}
						value={registerData.name}
					/>
				</div>
				<div>
					<input
						className='bg-gray-200 p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black my-5'
						type='email'
						placeholder='Email Address'
						name='email'
						onChange={handleChange}
						value={registerData.email}
					/>
				</div>
				<div className='relative'>
					<input
						className='bg-gray-200 p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black my-5'
						type='password'
						placeholder='Password'
						name='password'
						onChange={handleChange}
						value={registerData.password}
					/>
					<AiOutlineEye className='absolute top-10 right-20 tablet:right-32  text-2xl cursor-pointer' />
				</div>
				<div className='relative'>
					<input
						className='bg-gray-200 p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black my-5'
						type='password'
						placeholder='Confirm Password'
						value={confirmPassWord}
						onChange={(e: any) => setConfirmPassword(e.target.value)}
					/>
					<AiOutlineEye className='absolute top-10 right-20 tablet:right-32  text-2xl cursor-pointer' />
				</div>
				<div>
					<select
						className='bg-gray-200 p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black my-5 cursor-pointer'
						name='country'
						id=''
						onChange={handleChange}
						value={registerData.country}
					>
						<option value='Select Country'>Select Country</option>
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

				<div>
					<select
						className='bg-gray-200 p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black my-5 cursor-pointer'
						name='state'
						id=''
						onChange={handleChange}
						value={registerData.state}
					>
						<option value='Select State'>Select State</option>
						{allStates &&
							allStates.map(state => (
								<>
									<option key={uuidv4()} value={state.name}>
										{state.name}
									</option>
								</>
							))}
					</select>
				</div>

				<div className='flex justify-center'>
					{loading ? (
						<button
							type='button'
							className='disabled:opacity-40 bg-black flex items-center justify-center p-5 w-2/3 rounded-md text-white mt-4'
							disabled
						>
							<FaSpinner className='animate-spin h-5 w-5 mr-3' />
							Registering User...
						</button>
					) : (
						<Link href='#'>
							<a
								onClick={e => handleSubmit(e)}
								href='#'
								className='bg-black flex items-center justify-center p-5 w-2/3 rounded-md text-white mt-4 hover:bg-white hover:text-black hover:border hover:border-black'
							>
								{' '}
								Sign Up <BsArrowRight className='ml-4' />
							</a>
						</Link>
					)}
				</div>
				<div className='flex justify-center'>
					<Link href='/auth/login'>
						<a
							href='#'
							className='bg-white flex items-center justify-center p-5 w-2/3 border border-black rounded-md text-black my-5 hover:bg-black hover:text-white '
						>
							Have an Account? Sign In
						</a>
					</Link>
				</div>
			</div>
		</BasePageLayout>
	);
};

export default SignUpPage;
