import axios from "axios";
import { toast } from "react-toastify";
import { returnErrors } from "@/Data/Reducer/ErrorReducer";
import {
	ADD_FAQS,
	ADD_FAQS_FAIL,
	ADD_MANUAL_BANKS,
	ADD_MANUAL_BANKS_FAIL,
	ADD_PRIVACY_POLICY,
	ADD_SLIDER,
	ADD_SLIDER_FAIL,
	ADD_TERMS_CONDITIONS,
	DELETE_FAQS,
	DELETE_MANUAL_BANKS,
	DELETE_NOTIFICATONS,
	DELETE_SLIDER,
	GET_FAQS,
	GET_MANUAL_BANKS,
	GET_MY_NOTIFICATONS,
	GET_MY_NOTIFICATONS_FAIL,
	GET_NOTIFICATONS,
	GET_NOTIFICATONS_FAIL,
	GET_PRIVACY_POLICY,
	GET_SLIDER,
	GET_SLIDER_FAIL,
	GET_TERMS_CONDITIONS,
	MANAGE_WALLET_PIN,
	SET_SUCCESS,
	TRANSFER_FUND_FAIL,
	UPDATE_FAQS,
	UPDATE_SLIDER,
} from "@/Data/Actions/ActionTypes";
import { imageUpload } from "@/Data/Actions/AuthActions";
import {
	GET_NOTIFICATION_FROM,
	GET_NOTIFICATION_FROM_FAIL,
	GET_NOTIFICATION_TO,
	GET_NOTIFICATION_TO_FAIL,
	GET_USER_NOTIFICATION,
	GET_USER_NOTIFICATION_FAIL,
	SEARCH_NOTIFICATION,
	SEARCH_NOTIFICATION_FAIL,
	SEARCH_NOTIFICATION_LOADING,
	SEND_NOTIFICATION,
	SEND_NOTIFICATION_FAIL,
	UPDATE_NOTIFICATION,
} from "@/Data/Actions/ActionTypes";
import { getWalletBalance } from "@/Data/Actions/GeneralAction";

export const getSlider = data => async dispatch => {
	try {
		let res = await axios.get(
			`/api/v1/slider${!data ? "" : `?limit=${data.limit}`}`
		);

		dispatch({
			type: GET_SLIDER,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch({
			type: GET_SLIDER_FAIL,
		});
	}
};

export const manageSlider = (data, id, type) => async dispatch => {
	try {
		let res;
		if (!id) {
			let media = await imageUpload([data?.image]),
				image = media[0];
			res = await axios.post(`/api/v1/slider`, { ...data, image });
		} else if (type === "delete")
			res = await axios.delete(`/api/v1/slider/${id}`);
		else {
			let image;
			if (data?.image)
				if (!data?.image?._id) {
					let media = await imageUpload([data?.image]);
					image = media[0];
				}
			res = await axios.put(`/api/v1/slider/${id}`, {
				...data,
				image: image ? image : data?.image,
			});
		}
		dispatch({
			type: id
				? type === "delete"
					? DELETE_SLIDER
					: UPDATE_SLIDER
				: ADD_SLIDER,
			payload: type === "delete" ? data : res.data?.data,
		});

		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		console.log({ err });
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		dispatch({ type: ADD_SLIDER_FAIL });
	}
};

export const getNotificationsFrom =
	(data, search = false) =>
	async dispatch => {
		if (search) dispatch({ type: SEARCH_NOTIFICATION_LOADING, search: search });
		try {
			let res1 = await axios.get(
				`/api/v1/notification/manage-notifications?type=from
						${!data?.limit ? "" : `&limit=${data.limit}`}
						${!data?.search ? "" : `&search=${data?.search}`}
						`
			);
			dispatch({
				type: !search ? GET_NOTIFICATION_FROM : SEARCH_NOTIFICATION,
				payload: res1.data,
				search: search
					? res1?.data?.search
						? res1?.data?.search
						: search
					: "",
			});
		} catch (err) {
			if (err) console.log({ err });
			if (err) console.log(err?.response ? err?.response?.data : err?.message);
			dispatch({
				type: !search ? GET_NOTIFICATION_FROM_FAIL : SEARCH_NOTIFICATION_FAIL,
			});
		}
	};

export const getNotificationsTo = data => async dispatch => {
	try {
		// if (search) dispatch({ type: SEARCH_NOTIFICATION_LOADING, search: data?.search });
		let res1 = await axios.get(
			`/api/v1/notification/manage-notifications?type=to
						${!data?.limit ? "" : `&limit=${data.limit}`}
						${!data?.search ? "" : `&search=${data?.search}`}`
		);

		dispatch({
			type: GET_NOTIFICATION_TO,
			payload: res1.data,
			// search: data?.search ? res1?.data?.search ? res1?.data?.search : data?.search : ""
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		dispatch({ type: GET_NOTIFICATION_TO_FAIL });
	}
};

export const getNotificationsUser = data => async dispatch => {
	try {
		let res1 = await axios.get(
			`/api/v1/notification/${data?.user}${
				!data?.limit ? "" : `?limit=${data.limit}`
			}`
		);

		dispatch({
			type: GET_USER_NOTIFICATION,
			payload: res1.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		dispatch({ type: GET_USER_NOTIFICATION_FAIL });
	}
};

export const manageNotify = (data, id, prior) => async dispatch => {
	try {
		let res;
		if (!id) res = await axios.post(`/api/v1/notification`, { ...data });
		else if (prior === "delete")
			res = await axios.delete(`/api/v1/notification/${id}`);
		else if (prior === "status")
			res = await axios.put(
				`/api/v1/notification/manage-notifications/${id}?status=${
					data?.status === "play" ? "pause" : "play"
				}`
			);
		else if (prior) res = await axios.put(`/api/v1/notification/${id}`);
		else res = await axios.post(`/api/v1/notification/${id}`);
		dispatch({
			type: id
				? prior === "delete"
					? DELETE_NOTIFICATONS
					: UPDATE_NOTIFICATION
				: SEND_NOTIFICATION,
			payload: prior === "delete" ? data : res.data,
		});
		if (!id || ["delete", "status"]?.includes(prior))
			dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error)
			if (!prior || prior !== "prior")
				dispatch(returnErrors({ error, status: err?.response?.status }));
		// error.forEach(error =>
		// 	error?.param
		// 		? error?.param !== "suggestion" &&
		// 		  toast.error(error.msg, { autoClose: false })
		// 		: toast.error(error.msg, { autoClose: false })
		// );
		dispatch({ type: SEND_NOTIFICATION_FAIL });
	}
};

export const sendNotification = data => async dispatch => {
	try {
		let image;
		if (data?.image)
			if (!data?.image?._id) {
				let media = await imageUpload([data?.image]);
				image = media[0];
			}
		let res = await axios.post(`/api/v1/notification/manage-notifications`, {
			...data,
			image: image || data?.image,
		});

		dispatch({
			type: SEND_NOTIFICATION,
			payload: res.data?.data,
		});
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err) console.log({ err });
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		dispatch({ type: SEND_NOTIFICATION_FAIL });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
	}
};

export const readNotification = data => async dispatch => {
	try {
		let res = await axios.put(`/api/v1/notification/${data}`);

		dispatch({
			type: UPDATE_NOTIFICATION,
			payload: res.data?.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
	}
};

export const manageManualBanks = (type, data) => async dispatch => {
	try {
		let res;
		if (type === "post") {
			res = await axios.post(`/api/v1/user/manage-manual-bank`, { ...data });
		} else if (type === "delete")
			res = await axios.delete(
				`/api/v1/user/manage-manual-bank?id=${data?._id}`
			);
		else {
			res = await axios.get(`/api/v1/user/manage-manual-bank`);
		}
		dispatch({
			type:
				type === "delete"
					? DELETE_MANUAL_BANKS
					: type === "post"
					? ADD_MANUAL_BANKS
					: GET_MANUAL_BANKS,
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
		dispatch({ type: ADD_MANUAL_BANKS_FAIL });
	}
};

export const manageFaqs = (type, data, scene) => async dispatch => {
	try {
		let res;
		if (type === "post") {
			res = await axios.post(`/api/v1/faqs`, { ...data });
		} else if (type === "put")
			res = await axios.put(`/api/v1/faqs?id=${data?._id}`, { ...data });
		else if (type === "delete")
			res = await axios.delete(`/api/v1/faqs?id=${data?._id}`);
		else {
			res = await axios.get(`/api/v1/faqs${scene ? `?type=${scene}` : ""}`);
		}
		dispatch({
			type:
				type === "delete"
					? DELETE_FAQS
					: type === "post"
					? scene === "privacy"
						? ADD_PRIVACY_POLICY
						: scene === "terms"
						? ADD_TERMS_CONDITIONS
						: ADD_FAQS
					: type === "put"
					? UPDATE_FAQS
					: scene === "privacy"
					? GET_PRIVACY_POLICY
					: scene === "terms"
					? GET_TERMS_CONDITIONS
					: GET_FAQS,
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
		dispatch({ type: ADD_FAQS_FAIL });
	}
};

export const manageWalletPin = (method, data) => async dispatch => {
	try {
		let res;
		if (method === "post")
			res = await axios.post(`/api/v1/wallet/manage-wallet-pin`, { ...data });
		else res = await axios.put(`/api/v1/wallet/manage-wallet-pin`, { ...data });
		dispatch({
			type: MANAGE_WALLET_PIN,
			payload: res.data,
		});
		dispatch(getWalletBalance());
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error) dispatch(returnErrors({ error, status: err?.response?.status }));
		dispatch({ type: TRANSFER_FUND_FAIL });
	}
};

export const getNotify = (type, data) => async dispatch => {
	try {
		let res = await axios.get(
			`/api/v1/notification?type=${type}${
				data?.limit ? `&limit=${data?.limit}` : ""
			}`
		);
		dispatch({
			type: type !== "incoming" ? GET_MY_NOTIFICATONS : GET_NOTIFICATONS,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		dispatch({
			type:
				type !== "incoming" ? GET_MY_NOTIFICATONS_FAIL : GET_NOTIFICATONS_FAIL,
		});
	}
};