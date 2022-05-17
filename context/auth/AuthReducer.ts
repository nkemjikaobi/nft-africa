import {
	REGISTER_USER,
	REGISTER_FAIL,
	LOGIN_USER,
	LOGIN_FAIL,
	CLEAR_ERROR,
	CLEAR_MESSAGE,
} from '../types';

const AuthReducer = (state: any, action: any) => {
	switch (action.type) {
		case REGISTER_USER:
			console.log(action.payload);
			return {
				...state,
				laoding: false,
				message: action.payload,
			};
		case REGISTER_FAIL:
			return {
				...state,
				laoding: false,
				error: action.payload,
			};
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		case CLEAR_MESSAGE:
			return {
				...state,
				message: null,
			};
		default:
			return state;
	}
};
export default AuthReducer;
