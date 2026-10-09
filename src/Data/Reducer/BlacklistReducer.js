import axios from "axios";
import { toast } from "react-toastify";
import {
	ADD_BLACKLIST,
	DELETE_BLACKLIST,
	GET_BLACKLIST_FAIL,
	GET_BLACKLIST_LOADING,
	GET_BLACKLIST_METERNO,
	GET_BLACKLIST_SMARTCARDNO,
	GET_BLACKLIST_TELEPHONE,
	GET_CGWALLET_HISTORY_FAIL_USER,
	LOGOUT,
	SEARCH_BLACKLIST,
	SEARCH_BLACKLIST_FAIL,
	SEARCH_BLACKLIST_LOADING,
	SEARCH_CGWALLET_HISTORY_FAIL_USER,
	SEARCH_RELOAD,
	SET_SUCCESS,
	UPDATE_BLACKLIST,
} from "@/Data/Actions/ActionTypes";
import { DeleteData, EditData } from "@/Data/Reducer/AuthReducer";
import { returnErrors } from "@/Data/Reducer/ErrorReducer";

let initialStateH = {
	isAdded: false,
	isLoading: false,
	isFound: null,
	searchLoading: null,
	mainSearch: [],
	search: "",
	search_paginate: null,
	telephone: null,
	smartCardNo: null,
	meterNo: null,
};

export const BlacklistReducer = (state = initialStateH, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_BLACKLIST_TELEPHONE:
			return {
				...state,
				telephone: data,
				telephone_paginate: payload?.paginate,
				isLoading: false,
			};
		case GET_BLACKLIST_SMARTCARDNO:
			return {
				...state,
				smartCardNo: data,
				smartCardNo_paginate: payload?.paginate,
				isLoading: false,
			};
		case GET_BLACKLIST_METERNO:
			return {
				...state,
				meterNo: data,
				meterNo_paginate: payload?.paginate,
				isLoading: false,
			};
		case SEARCH_RELOAD:
			return {
				...state,
				isFound: false,
				searchLoading: false,
			};
		case SEARCH_BLACKLIST:
			return {
				...state,
				isFound: true,
				searchLoading: false,
				mainSearch: action?.search === state?.search ? data : state?.mainSearch,
				search_paginate:
					action?.search === state?.search
						? payload?.paginate
						: state?.search_paginate,
			};
		case SEARCH_BLACKLIST_FAIL:
			return {
				...state,
				searchLoading: false,
				mainSearch: state.mainSearch,
				search_paginate: state.search_paginate,
			};
		case SEARCH_BLACKLIST_LOADING:
			return {
				...state,
				search: action.search,
				searchLoading: true,
			};
		case ADD_BLACKLIST:
			let newD = {};
			if (data?.type === "telephone")
				newD.telephone = state?.telephone
					? [data, ...state?.telephone]
					: [data];
			if (data?.type === "meterNo")
				newD.meterNo = state?.meterNo ? [data, ...state?.meterNo] : [data];
			if (data?.type === "smartCardNo")
				newD.smartCardNo = state?.smartCardNo
					? [data, ...state?.smartCardNo]
					: [data];
			return {
				...state,
				isAdded: true,
				...newD,
			};
		case UPDATE_BLACKLIST:
			return {
				...state,
				telephone: EditData(state?.telephone, data),
				meterNo: EditData(state?.meterNo, data),
				smartCardNo: EditData(state?.smartCardNo, data),
			};
		case DELETE_BLACKLIST:
			return {
				...state,
				telephone: DeleteData(state?.telephone, data),
				meterNo: DeleteData(state?.meterNo, data),
				smartCardNo: DeleteData(state?.smartCardNo, data),
			};
		case GET_BLACKLIST_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case GET_BLACKLIST_FAIL:
			return {
				...state,
				isAdded: false,
				isLoading: false,
			};
		case LOGOUT:
			return initialStateH;
		default:
			return state;
	}
};

export const manageBlacklist = (type, data) => async dispatch => {
	if (type === "get") {
		if (data?.search) {
			dispatch({
				type: SEARCH_BLACKLIST_LOADING,
				search: data?.search,
			});
		}
	}
	try {
		let res;
		if (type === "post") {
			res = await axios.post(`/api/v1/blacklist`, { ...data });
		}
		if (type === "put") {
			res = await axios.put(`/api/v1/blacklist?blacklist=${data?._id}`, {
				...data,
			});
		}
		if (type === "delete") {
			res = await axios.delete(`/api/v1/blacklist?blacklist=${data?._id}`, {
				...data,
			});
		}
		if (type === "get") {
			res = await axios.get(
				`/api/v1/blacklist
				${data?.type ? `?type=${data?.type}` : ""}
				${data?.limit ? `&limit=${data?.limit}` : ""}
				${data?.search ? `&search=${data?.search}` : ""}`
			);
		}

		dispatch({
			type:
				data?.search && type === "get"
					? SEARCH_BLACKLIST
					: type === "post"
					? ADD_BLACKLIST
					: type === "update"
					? UPDATE_BLACKLIST
					: type === "delete"
					? DELETE_BLACKLIST
					: type === "get" && data?.type === "meterNo"
					? GET_BLACKLIST_METERNO
					: type === "get" && data?.type === "smartCardNo"
					? GET_BLACKLIST_SMARTCARDNO
					: type === "get" && data?.type === "telephone"
					? GET_BLACKLIST_TELEPHONE
					: null,
			payload: type === "delete" ? data : res.data,
			search: data?.search
				? res?.data?.search
					? res?.data?.search
					: data?.search
				: "",
		});
		if (type !== "get") {
			dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
		}
	} catch (err) {
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		console.log({ err });
		let error = err.response?.data?.error;
		if (error && type !== "get") {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		dispatch({
			type: data?.search
				? SEARCH_CGWALLET_HISTORY_FAIL_USER
				: GET_CGWALLET_HISTORY_FAIL_USER,
		});
	}
};
