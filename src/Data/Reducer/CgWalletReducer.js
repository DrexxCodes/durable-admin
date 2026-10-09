import axios from "axios";
import { toast } from "react-toastify";
import {
	ADD_CGWALLET,
	ADD_CGWALLET_HISTORY,
	ADD_CGWALLET_HISTORY_USER,
	DELETE_CGWALLET,
	GET_CGWALLET,
	GET_CGWALLET_FAIL,
	GET_CGWALLET_HISTORY_FAIL_USER,
	GET_CGWALLET_HISTORY_LOADING_USER,
	GET_CGWALLET_HISTORY_PURCHASE,
	GET_CGWALLET_HISTORY_PURCHASE_USER,
	GET_CGWALLET_HISTORY_USAGE,
	GET_CGWALLET_HISTORY_USAGE_USER,
	GET_CGWALLET_LOADING,
	LOGOUT,
	SEARCH_CGWALLET_HISTORY,
	SEARCH_CGWALLET_HISTORY_FAIL,
	SEARCH_CGWALLET_HISTORY_FAIL_USER,
	SEARCH_CGWALLET_HISTORY_LOADING,
	SEARCH_CGWALLET_HISTORY_LOADING_USER,
	SEARCH_CGWALLET_HISTORY_USER,
	SEARCH_RELOAD,
	SET_SUCCESS,
	UPDATE_CGWALLET,
} from "@/Data/Actions/ActionTypes";
import { DeleteData, EditData } from "@/Data/Reducer/AuthReducer";
import { returnErrors } from "@/Data/Reducer/ErrorReducer";
import { getWalletBalance } from "@/Data/Actions/GeneralAction";

let initialStateA = {
	data: null,
	isAdded: false,
	isUpdated: false,
	isDeleted: false,
	isLoading: false,
};

export const CgWalletReducer = (state = initialStateA, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_CGWALLET:
			return {
				...state,
				data,
				isLoading: false,
			};
		case ADD_CGWALLET:
			return {
				...state,
				data: [data, ...state.data],
				isAdded: true,
			};
		case GET_CGWALLET_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case UPDATE_CGWALLET:
			return {
				...state,
				data: EditData(state?.data, data),
				isUpdated: true,
			};
		case DELETE_CGWALLET:
			return {
				...state,
				data: DeleteData(state.data, data),
				isDeleted: true,
			};
		case GET_CGWALLET_FAIL:
			return {
				...state,
				isAdded: false,
				isUpdated: false,
				isDeleted: false,
				isLoading: false,
			};
		case LOGOUT:
			return initialStateA;
		default:
			return state;
	}
};

let initialStateH = {
	purchase: [],
	purchase_paginate: null,
	usage: [],
	usage_paginate: null,
	isAdded: false,
	isLoading: false,
	isFound: null,
	searchLoading: null,
	mainSearch: [],
	search: "",
	search_paginate: null,
};

export const CgWalletHistoryReducer = (state = initialStateH, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_CGWALLET_HISTORY_PURCHASE:
			return {
				...state,
				purchase: data,
				purchase_paginate: payload?.paginate,
				isLoading: false,
			};
		case GET_CGWALLET_HISTORY_USAGE:
			return {
				...state,
				usage: data,
				usage_paginate: payload?.paginate,
				isLoading: false,
			};
		case SEARCH_RELOAD:
			return {
				...state,
				isFound: false,
				searchLoading: false,
			};
		case SEARCH_CGWALLET_HISTORY:
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
		case SEARCH_CGWALLET_HISTORY_FAIL:
			return {
				...state,
				searchLoading: false,
				mainSearch: state.mainSearch,
				search_paginate: state.search_paginate,
			};
		case SEARCH_CGWALLET_HISTORY_LOADING:
			return {
				...state,
				search: action.search,
				searchLoading: true,
			};
		case ADD_CGWALLET_HISTORY:
			return {
				...state,
				purchase: [data, ...state.purchase],
				isAdded: true,
			};
		case GET_CGWALLET_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case GET_CGWALLET_FAIL:
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

export const manageCGWallets = (type, data) => async dispatch => {
	try {
		let res;
		if (type === "post") {
			res = await axios.post(`/api/v1/cgwallet`, { ...data });
		} else if (type === "put")
			res = await axios.put(`/api/v1/cgwallet?cgwallet=${data?._id}`, {
				...data,
			});
		else if (type === "delete")
			res = await axios.delete(`/api/v1/cgwallet?cgwallet=${data?._id}`);
		else {
			res = await axios.get(`/api/v1/cgwallet`);
		}
		dispatch({
			type:
				type === "delete"
					? DELETE_CGWALLET
					: type === "post"
					? ADD_CGWALLET
					: type === "put"
					? UPDATE_CGWALLET
					: GET_CGWALLET,
			payload: type === "delete" ? data : res.data?.data,
		});
		if (type !== "get")
			dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		console.log({ err });
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		dispatch({ type: GET_CGWALLET_FAIL });
	}
};

export const manageCGWalletHistory = (type, data) => async dispatch => {
	if (!["post", "put"]?.includes(type)) {
		if (data?.search) {
			dispatch({
				type: SEARCH_CGWALLET_HISTORY_LOADING,
				search: data?.search,
			});
		}
	}
	try {
		let res;
		if (type === "post") {
			res = await axios.put(`/api/v1/cgwallet/buy`, { ...data });
		} else if (type === "put") {
			res = await axios.patch(`/api/v1/cgwallet/buy`, { ...data });
		} else {
			res = await axios.get(
				`/api/v1/cgwallet/history?type=${type || "credit"}
				${data?.limit ? `&limit=${data?.limit}` : ""}
				${data?.search ? `&search=${data?.search}` : ""}
				`
			);
		}
		if (["post", "put"]?.includes(type))
			console.log({ type, data, resp: res?.data });
		dispatch({
			type:
				data?.search && !["post", "put"]?.includes(type)
					? SEARCH_CGWALLET_HISTORY
					: type === "credit"
					? GET_CGWALLET_HISTORY_PURCHASE
					: type === "debit"
					? GET_CGWALLET_HISTORY_USAGE
					: ["post", "put"]?.includes(type)
					? ADD_CGWALLET_HISTORY
					: null,
			payload: res.data,
			search: data?.search
				? res?.data?.search
					? res?.data?.search
					: data?.search
				: "",
		});
		if (["post", "put"]?.includes(type))
			dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		console.log({ err });
		let error = err.response?.data?.error;
		if (error && ["post", "put"]?.includes(type)) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		dispatch({
			type: data?.search ? SEARCH_CGWALLET_HISTORY_FAIL : GET_CGWALLET_FAIL,
		});
	}
};

let initialStateUser = {
	purchase: [],
	purchase_paginate: null,
	usage: [],
	usage_paginate: null,
	isAdded: false,
	isLoading: false,
	data: [],
};

export const CgWalletUserHistoryReducer = (
	state = initialStateUser,
	action
) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_CGWALLET:
			return {
				...state,
				data,
			};
		case GET_CGWALLET_HISTORY_PURCHASE_USER:
			return {
				...state,
				purchase: data,
				purchase_paginate: payload?.paginate,
				isLoading: false,
			};
		case GET_CGWALLET_HISTORY_USAGE_USER:
			return {
				...state,
				usage: data,
				usage_paginate: payload?.paginate,
				isLoading: false,
			};
		case ADD_CGWALLET_HISTORY_USER:
			return {
				...state,
				purchase: [data, ...state.purchase],
				isAdded: true,
			};
		case GET_CGWALLET_HISTORY_LOADING_USER:
			return {
				...state,
				isLoading: true,
			};
		case GET_CGWALLET_HISTORY_FAIL_USER:
			return {
				...state,
				isAdded: false,
				isLoading: false,
			};
		case SEARCH_RELOAD:
			return {
				...state,
				isFound: false,
				searchLoading: false,
			};
		case SEARCH_CGWALLET_HISTORY_USER:
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
		case SEARCH_CGWALLET_HISTORY_FAIL_USER:
			return {
				...state,
				searchLoading: false,
				mainSearch: state.mainSearch,
				search_paginate: state.search_paginate,
			};
		case SEARCH_CGWALLET_HISTORY_LOADING_USER:
			return {
				...state,
				search: action.search,
				searchLoading: true,
			};
		case LOGOUT:
			return initialStateUser;
		default:
			return state;
	}
};

export const manageCGWalletUserHistory = (type, data) => async dispatch => {
	if (type !== "post") {
		if (data?.search) {
			dispatch({
				type: SEARCH_CGWALLET_HISTORY_LOADING_USER,
				search: data?.search,
			});
		}
	}
	try {
		let res;
		if (type === "post") {
			res = await axios.post(`/api/v1/cgwallet/buy`, { ...data });
		} else {
			res = await axios.get(
				`/api/v1/cgwallet/history?type=${type || "credit"}
				${data?.limit ? `&limit=${data?.limit}` : ""}
				${data?.search ? `&search=${data?.search}` : ""}&myCase=admin
				`
			);
		}

		dispatch({
			type:
				data?.search && type !== "post"
					? SEARCH_CGWALLET_HISTORY_USER
					: type === "credit"
					? GET_CGWALLET_HISTORY_PURCHASE_USER
					: type === "debit"
					? GET_CGWALLET_HISTORY_USAGE_USER
					: type === "post"
					? ADD_CGWALLET_HISTORY_USER
					: null,
			payload: res.data,
			search: data?.search
				? res?.data?.search
					? res?.data?.search
					: data?.search
				: "",
		});
		if (type === "post") {
			dispatch(getWalletBalance());
			dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
		}
	} catch (err) {
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		console.log({ err });
		let error = err.response?.data?.error;
		if (error && type === "post") {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		dispatch({
			type: data?.search
				? SEARCH_CGWALLET_HISTORY_FAIL_USER
				: GET_CGWALLET_HISTORY_FAIL_USER,
		});
	}
};
