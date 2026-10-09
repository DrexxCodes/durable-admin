import {
	ADD_AIRTIME,
	ADD_BIZ,
	ADD_CABLE,
	ADD_DATA,
	ADD_ELECTRICITY,
	LOGOUT,
	SOCKET,
	SOCKET_ONLINE,
} from "@/Data/Actions/ActionTypes";

const initialState = {
	socket: null,
	user: [],
};

const socketReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SOCKET:
			return {
				...state,
				socket: payload,
			};
		case SOCKET_ONLINE:
			return { ...state, user: payload };
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default socketReducer;

export const socketProfile = socket => async dispatch => {
	dispatch({ type: SOCKET, payload: socket });
};

export const socketOnline = socket => async dispatch => {
	dispatch({ type: SOCKET_ONLINE, payload: socket });
};

export const socketTransaction = socket => async dispatch => {
	dispatch({
		type:
			socket?.type === "electricity"
				? ADD_ELECTRICITY
				: socket?.type === "biz"
				? ADD_BIZ
				: socket?.type === "airtime"
				? ADD_AIRTIME
				: socket?.type === "cables"
				? ADD_CABLE
				: socket?.type === "data"
				? ADD_DATA
				: null,
		payload: socket,
	});
};
