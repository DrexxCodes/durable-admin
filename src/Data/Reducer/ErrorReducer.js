import axios from "axios";
import {
	GET_ERRORS,
	CLEAR_ERRORS,
	LOGOUT,
	GET_ERRORS_TEXT,
	SET_SUCCESS,
	SET_SUCCESS_FAIL,
	GET_PERMISSION,
	UDPATE_PERMISSION,
	GET_PERMISSION_FAIL,
} from "@/Data/Actions/ActionTypes";
import { toast } from "react-toastify";

let initialState = {
	error: null,
	id: null,
	status: null,
	errorText: "",
};

const ErrorReducer = (state = initialState, action) => {
	let { type, payload } = action;
	switch (type) {
		case GET_ERRORS:
			return {
				error: payload?.error ? payload?.error : payload,
				id: payload.id,
				status: payload.status,
			};
		case GET_ERRORS_TEXT:
			return { ...state, errorText: payload };
		case CLEAR_ERRORS:
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};

let initialState2 = {
	msg: null,
};

export const SuccessReducer = (state = initialState2, action) => {
	let { type, payload } = action;
	switch (type) {
		case SET_SUCCESS:
			return {
				msg: payload,
			};
		case SET_SUCCESS_FAIL:
			return { msg: "" };
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default ErrorReducer;

export let returnErrors = (error, status, id = null) => {
	return {
		type: GET_ERRORS,
		payload: { error, status, id },
	};
};

// CLEAR ERRORS
export let clearErrors = () => {
	return {
		type: CLEAR_ERRORS,
	};
};
export let restoreMsg = () => {
	return {
		type: SET_SUCCESS_FAIL,
	};
};

let initialPermission = {
	data: [],
	isUpdated: false,
};

export const PermissionReducer = (state = initialPermission, action) => {
	let { type, payload } = action;
	switch (type) {
		case GET_PERMISSION:
			return {
				...state,
				data: payload?.data || payload,
			};
		case UDPATE_PERMISSION:
			return { ...state, isUpdated: true, data: payload?.data || payload };
		case GET_PERMISSION_FAIL:
			return { ...state, isUpdated: false };
		case LOGOUT:
			return initialPermission;
		default:
			return state;
	}
};

export const getPermission = data => async dispatch => {
	try {
		let res;
		if (!data) res = await axios.get(`/api/v1/permission`);
		else res = await axios.put(`/api/v1/permission`, { ...data });
		// console.log({ data: res?.data });
		dispatch({
			type: !data ? GET_PERMISSION : UDPATE_PERMISSION,
			payload: res.data,
		});
		if (data) dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error) dispatch(returnErrors({ error, status: err?.response?.status }));
		dispatch({ type: GET_PERMISSION_FAIL });
	}
};
