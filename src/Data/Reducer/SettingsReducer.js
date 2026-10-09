import {
	ADD_SLIDER,
	ADD_SLIDER_FAIL,
	DELETE_NOTIFICATONS,
	DELETE_SLIDER,
	GET_MY_NOTIFICATONS,
	GET_MY_NOTIFICATONS_FAIL,
	GET_NOTIFICATION_FROM,
	GET_NOTIFICATION_FROM_FAIL,
	GET_NOTIFICATION_LOADING,
	GET_NOTIFICATION_TO,
	GET_NOTIFICATION_TO_FAIL,
	GET_NOTIFICATONS,
	GET_NOTIFICATONS_FAIL,
	GET_SETTINGS,
	GET_SLIDER,
	GET_SLIDER_FAIL,
	GET_USER_NOTIFICATION,
	LOGOUT,
	SEND_NOTIFICATION,
	SEND_NOTIFICATION_FAIL,
	SET_SUCCESS,
	UPDATE_NOTIFICATION,
	UPDATE_SETTINGS,
	UPDATE_SETTINGS_FAIL,
	UPDATE_SLIDER,
} from "@/Data/Actions/ActionTypes";
import { EditData, DeleteData } from "@/Data/Reducer/AuthReducer";

import axios from "axios";
import { toast } from "react-toastify";
import { returnErrors } from "@/Data/Reducer/ErrorReducer";

let initialState = {
	settings: null,
	isUpdated: null,
};

const SettingsReducer = (state = initialState, action) => {
	let { type, payload } = action;
	switch (type) {
		case GET_SETTINGS:
			// console.log({ payload });
			return { ...state, settings: payload };
		case UPDATE_SETTINGS:
			return { ...state, settings: payload, isUpdated: true };
		case UPDATE_SETTINGS_FAIL:
			return { ...state, isUpdated: false };
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default SettingsReducer;

export const getSettings = data => async dispatch => {
	try {
		let res;
		if (!data) res = await axios.get(`/api/v1/settings`);
		else res = await axios.post(`/api/v1/settings`, { ...data });
		// console.log({ data: res?.data });
		dispatch({
			type: !data ? GET_SETTINGS : UPDATE_SETTINGS,
			payload: res.data.data,
		});
		if (data) dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error) dispatch(returnErrors({ error, status: err?.response?.status }));
		dispatch({ type: UPDATE_SETTINGS_FAIL });
	}
};

let initialState2 = {
	notifications: [],
	notify: [],
	isLoading: false,
	isAdded: false,
	notifications_paginate: null,
	notify_paginate: null,
	paginate_user: null,
	user_notification: [],
	isDeleted: false,
};

export const NotificationReducer = (
	state = initialState2,
	{ type, payload }
) => {
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_NOTIFICATONS:
			return {
				...state,
				isLoading: false,
				incoming: data || [],
				paginate: payload?.paginate,
			};
		case GET_MY_NOTIFICATONS:
			return {
				...state,
				isLoading: false,
				outgoing: data || [],
				paginate2: payload?.paginate,
			};
		case GET_NOTIFICATONS_FAIL:
		case GET_MY_NOTIFICATONS_FAIL:
			return {
				...state,
				isLoading: false,
			};
		case GET_NOTIFICATION_LOADING:
			return { ...state, isLoading: true };
		case GET_NOTIFICATION_FROM:
			return {
				...state,
				notifications: payload?.data,
				notifications_paginate: payload?.paginate,
				isLoading: false,
			};
		case GET_USER_NOTIFICATION:
			return {
				...state,
				user_notification: payload?.data,
				paginate_user: payload?.paginate,
			};
		case GET_NOTIFICATION_TO:
			return {
				...state,
				notify: payload?.data,
				notify_paginate: payload?.paginate,
				isLoading: false,
			};
		case UPDATE_NOTIFICATION:
			return {
				...state,
				notify: EditData(state.notify, payload?.data || payload),
				notifications: EditData(state.notifications, payload?.data || payload),
				user_notification: EditData(
					state.user_notification,
					payload?.data || payload
				),
				isDeleted: true,
			};
		case DELETE_NOTIFICATONS:
			return {
				...state,
				notify: DeleteData(state.notify, payload),
				notifications: DeleteData(state.notifications, payload),
				user_notification: DeleteData(state.user_notification, payload),
				isDeleted: true,
			};
		case GET_NOTIFICATION_FROM_FAIL:
		case GET_NOTIFICATION_TO_FAIL:
		case SEND_NOTIFICATION_FAIL:
			return {
				...state,
				notifications: state.notifications,
				notify: state.notify,
				isAdded: false,
				isLoading: false,
			};
		case SEND_NOTIFICATION:
			return {
				...state,
				isAdded: true,
				notifications: [payload, ...state.notifications],
				notifications_paginate: {
					...state?.notifications_paginate,
					result: state?.notifications_paginate?.result + 1,
					total: state?.notifications_paginate?.total + 1,
				},
			};
		case LOGOUT:
			return initialState2;
		default:
			return state;
	}
};

const initialState3 = {
	isLoading: false,
	sliders: [],
	isAdded: false,
	isUpdated: false,
	paginate: null,
	isDeleted: null,
};

export const SliderReducer = (state = initialState3, action) => {
	const { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_SLIDER:
			return {
				...state,
				isLoading: false,
				sliders: data ? data : [],
				paginate: payload?.paginate,
			};
		case GET_SLIDER_FAIL:
			return {
				...state,
				isLoading: false,
			};
		case ADD_SLIDER:
			return {
				...state,
				isAdded: true,
				sliders: [data, ...state?.sliders],
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result + 1,
					total: state?.paginate?.total + 1,
				},
			};
		case DELETE_SLIDER:
			return {
				...state,
				isDeleted: true,
				sliders: DeleteData(state?.sliders, data),
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result - 1,
					total: state?.paginate?.total - 1,
				},
			};
		case ADD_SLIDER_FAIL:
			return {
				...state,
				isLoading: false,
				isUpdated: false,
				isAdded: false,
				isDeleted: false,
			};
		case UPDATE_SLIDER:
			return {
				...state,
				isUpdated: true,
				sliders: EditData(state?.sliders, data),
			};
		case LOGOUT:
			return initialState3;
		default:
			return state;
	}
};
