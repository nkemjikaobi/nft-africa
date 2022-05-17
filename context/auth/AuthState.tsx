import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import {
	REGISTER_USER,
	REGISTER_FAIL,
	LOGIN_USER,
	LOGIN_FAIL,
	CLEAR_ERROR,
	CLEAR_MESSAGE,
} from '../types';
import axios from 'axios';
import IRegisterData from 'dto/Auth/IRegisterData';

const AuthState = (props: any) => {
	const initialState = {
		token: null,
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null,
		message: null,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	const registerUser = async (user: IRegisterData, router: any) => {
		try {
			await axios.post(
				`${process.env.NEXT_PUBLIC_ARDOR_BASE_URL}/api/auth/register`,
				user
			);
			dispatch({
				type: REGISTER_USER,
				payload: 'User Registered',
			});

			setTimeout(() => {
				router.push('/auth/login');
			}, 1500);
		} catch (error) {
			dispatch({
				type: REGISTER_FAIL,
				payload: 'User could not be registered',
			});
		}
	};

	//Clear Error
	const clearError = () => {
		dispatch({
			type: CLEAR_ERROR,
		});
	};

	//Clear Message
	const clearMessage = () => {
		dispatch({
			type: CLEAR_MESSAGE,
		});
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				message: state.message,
				registerUser,
				clearError,
				clearMessage,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
