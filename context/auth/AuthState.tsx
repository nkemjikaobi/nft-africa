import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import { REGISTER_USER, REGISTER_FAIL } from '../types';
import axios from 'axios';
import IRegisterData from 'dto/Auth/IRegisterData';
import useAlert from 'hooks/useAlert';
import { NotificationType } from 'constants/index';

const AuthState = (props: any) => {
	const initialState = {
		token: null,
		isAuthenticated: null,
		loading: true,
		user: null,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	const { setAlert } = useAlert();

	const registerUser = async (user: IRegisterData, router: any) => {
		try {
			await axios.post(
				`${process.env.NEXT_PUBLIC_ARDOR_BASE_URL}/api/auth/register`,
				user
			);
			dispatch({
				type: REGISTER_USER,
			});

			setAlert('User Registered', NotificationType.SUCCESS);

			setTimeout(() => {
				router.push('/auth/login');
			}, 1500);
		} catch (error) {
			dispatch({
				type: REGISTER_FAIL,
			});
			setAlert('User could not be registered', NotificationType.ERROR);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				registerUser,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
