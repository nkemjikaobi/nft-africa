import { useContext } from 'react';
import AuthContext from 'context/auth/AuthContext';

/**
 * This is a hook to return all (functions / methods) and state variables in the auth context provider
 * Prevents reimports and repititions of useContext and the auth context
 * @returns
 */
const useAuth = () => {
	const {
		//methods
		registerUser,
		clearError,
		clearMessage,

		//state variables
		token,
		isAuthenticated,
		loading,
		user,
		error,
		message,
	} = useContext(AuthContext);

	return {
		//methods
		registerUser,
		clearError,
		clearMessage,

		//state variables
		token,
		isAuthenticated,
		loading,
		user,
		error,
		message,
	};
};

export default useAuth;
