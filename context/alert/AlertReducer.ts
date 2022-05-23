import IAlert from 'dto/Alert/IAlert';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertReducer = (state: any, action: any) => {
	switch (action.type) {
		case SET_ALERT:
			console.log(action.payload);
			return [...state, action.payload];
		case REMOVE_ALERT:
			return state.filter((alert: IAlert) => alert.id !== action.payload);
		default:
			return state;
	}
};
export default AlertReducer;
