import {
	LOGIN_USER,
	LOGIN_USER_FAIL,
	LOGOUT,
	TOKEN,
	GET_USER,
	GET_USER_LOADING,
	GET_USER_FAIL,
	GET_ERRORS_TEXT,
	REGISTER_USER,
	UPDATE_USER,
	REGISTER_USER_FAIL,
	UPDATE_USER_FAIL,
	UPDATE_PASSWORD,
	UPDATE_PASSWORD_FAIL,
	SET_SUCCESS,
	TOKEN_2FA,
	LOGIN_USER_2FA,
} from "@/Data/Actions/ActionTypes";
import { SetAuthToken } from "@/Data/Config";
import axios from "axios";
import { toast } from "react-toastify";
import {
	clearErrors,
	getPermission,
	returnErrors,
} from "@/Data/Reducer/ErrorReducer";
import {
	getCablesPackages,
	getCablesTypes,
	getDataBundle,
	getDataToBuy,
	getEducationBundle,
	getEducationToBuy,
	getElectricityBundle,
	getElectricityToBuy,
} from "@/Data/Actions/DataActions";
import {
	getBiller,
	// getBillerData,
	// getBillerFunding,
	getCategory,
	// getDataMeSolutionBalance,
	// getDataStationBalance,
	// getHonourworld,
	// getHusmoBalance,
	getNetwork,
	getProducts,
	// getProviderBalance,
	// getTeetopBalance,
	// getVtpassBalance,
} from "@/Data/Actions/ProviderAction";
import { getSettings } from "@/Data/Reducer/SettingsReducer";
import { getUseCase } from "@/Data/Reducer/UseCaseReducer";
import {
	// getServicesHistory,
	getWalletBalance,
	// getWalletStat,
	// getWalletStatMonthDay,
} from "@/Data/Actions/GeneralAction";
// import { manageManualBanks } from "@/Data/Actions/NotificationAction";
import {
	// 	getAllUserTransactionAmount,
	// 	getUserPrivileges,
} from "@/Data/Actions/UserActions";

// LOGOUT
export const logoutUser = () => async dispatch => {
	try {
		dispatch({ type: LOGOUT });
		axios.post(`/api/v1/user/logout`);
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch({ type: GET_USER_FAIL });
	}
	dispatch(clearErrors());
};

// GET USER INFO
export const loadUser = () => async dispatch => {
	let token = localStorage.getItem(TOKEN);
	if (token) SetAuthToken(token);

	dispatch({ type: GET_USER_LOADING });
	dispatch(clearErrors());
	try {
		let res = await axios.get(`/api/v1/user`);
		if (res?.data?.data?.isAdmin) {
			dispatch({
				type: GET_USER,
				payload: res.data,
			});
			dispatch(getNetwork());
			dispatch(getWalletBalance());
			// dispatch(getWalletStat("notransact"));
			// dispatch(getWalletStatMonthDay("day"));
			// dispatch(getWalletStatMonthDay("month"));
			// dispatch(getVtpassBalance());
			// if (
			// 	![
			// 		"Moztelecom",
			// 		"Moavox Pay",
			// 		"Vickybest Telecom",
			// 		"V12 Pay",
			// 		"Fantastic Fisayo",
			// 		"Mel Data Services",
			// 		"Yema Telecommunications",
			// 		"SPRINT DATA",
			// 		"Vee's Telecom",
			// 		"Bliz",
			// 		"Noney Data Plug",
			// 		"Allbrite Digitals",
			// 		"Rosezee Telecom",
			// 		"Durable Telecommunications",
			// 		"MySub",
			// 		"M.O Data Plug",
			// 		"ALLAHU LATEEF INTEGRATED SERVICES LIMITED",
			// 	]?.includes(process.env.REACT_APP_NAME)
			// ) {
			// 	dispatch(getBillerData("honourworld"));
			// 	dispatch(getHonourworld());
			// }
			// if (
			// 	![
			// 		"Vickybest Telecom",
			// 		"Fantastic Fisayo",
			// 		"Mel Data Services",
			// 		"Yema Telecommunications",
			// 		"SPRINT DATA",
			// 		"Vee's Telecom",
			// 		"Bliz",
			// 		"Noney Data Plug",
			// 		"Allbrite Digitals",
			// 		"Rosezee Telecom",
			// 		"Durable Telecommunications",
			// 		"MySub",
			// 		"M.O Data Plug",
			// 		"ALLAHU LATEEF INTEGRATED SERVICES LIMITED",
			// 	]?.includes(process.env.REACT_APP_NAME)
			// ) {
			// 	dispatch(getDataStationBalance());
			// }
			// if (
			// 	["Fantastic Fisayo", "Teetop Digital"]?.includes(
			// 		process.env.REACT_APP_NAME
			// 	)
			// ) {
			// 	dispatch(getProviderBalance("clubkonnect"));
			// }
			// if (["Teetop Digital"]?.includes(process.env.REACT_APP_NAME)) {
			// 	dispatch(getProviderBalance("connnectsms"));
			// 	dispatch(getProviderBalance("rossytechs"));
			// }
			// if (
			// 	["Kemtech Enterprises", "V12 Pay"]?.includes(process.env.REACT_APP_NAME)
			// ) {
			// 	dispatch(getProviderBalance());
			// 	dispatch(getBillerData("moavoxpay"));
			// }
			// if (
			// 	["Teetop Digital", "Kemtech Enterprises"]?.includes(
			// 		process.env.REACT_APP_NAME
			// 	)
			// )
			// 	dispatch(getHusmoBalance());
			// if (
			// 	[
			// 		"Vickybest Telecom",
			// 		// "V12 Pay",
			// 		"Fantastic Fisayo",
			// 		"Moztelecom",
			// 		"Moavox Pay",
			// 		"Mel Data Services",
			// 		"Yema Telecommunications",
			// 		"SPRINT DATA",
			// 		"Bliz",
			// 		"Vee's Telecom",
			// 		"Noney Data Plug",
			// 		"Allbrite Digitals",
			// 		"Rosezee Telecom",
			// 		"Durable Telecommunications",
			// 		"MySub",
			// 		"M.O Data Plug",
			// 		"ALLAHU LATEEF INTEGRATED SERVICES LIMITED",
			// 	]?.includes(process.env.REACT_APP_NAME)
			// ) {
			// 	dispatch(getBillerData("teetop"));
			// 	dispatch(getTeetopBalance());
			// }
			// if (["Vickybest Telecom"]?.includes(process.env.REACT_APP_NAME)) {
			// 	dispatch(getDataMeSolutionBalance());
			// }
			// if (["SPRINT DATA"]?.includes(process.env.REACT_APP_NAME)) {
			// 	dispatch(getProviderBalance("maskawasub"));
			// }
			// if (["Vee's Telecom"]?.includes(process.env.REACT_APP_NAME)) {
			// 	dispatch(getProviderBalance("vickybest"));
			// }
			dispatch(getSettings());
			dispatch(getUseCase());
			dispatch(getDataBundle());
			dispatch(getElectricityBundle());
			dispatch(getEducationBundle());
			dispatch(getProducts());
			dispatch(getCategory());
			dispatch(getDataToBuy());
			dispatch(getElectricityToBuy());
			dispatch(getEducationToBuy());
			dispatch(getCablesPackages());
			dispatch(getCablesTypes());
			dispatch(getBiller());
			// dispatch(getAllUserTransactionAmount("user", "notransact"));
			// dispatch(getAllUserTransactionAmount("topuser", "notransact"));
			// dispatch(getAllUserTransactionAmount("reseller", "notransact"));
			// dispatch(getAllUserTransactionAmount("superadmin", "notransact"));
			// dispatch(getUserPrivileges("user"));
			// dispatch(getUserPrivileges("reseller"));
			// if (
			// 	["Teetop Digital", "TEETOP DIGITAL"]?.includes(
			// 		process.env.REACT_APP_NAME
			// 	)
			// ) {
			// 	dispatch(getAllUserTransactionAmount("standalone", "notransact"));
			// 	dispatch(getUserPrivileges("standalone"));
			// }
			// dispatch(getUserPrivileges("topuser"));
			// dispatch(getUserPrivileges("superadmin"));
			// The full user list (every user, ~10MB for thousands of users) is no longer loaded on
			// login. The profile page fetches a single user and the Excel export loads the list
			// when it is clicked.
			// dispatch(manageManualBanks("get"));
			// dispatch(getBillerFunding());
			// dispatch(getServicesHistory("all", { streamline: "month" }));
			// dispatch(getServicesHistory("all", { streamline: "day" }));
			// dispatch(getServicesHistory("all"));
			dispatch(getPermission());
		} else {
			dispatch({ type: GET_USER_FAIL });
		}
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch({ type: GET_USER_FAIL });
		dispatch({
			type: GET_ERRORS_TEXT,
			payload: err?.response?.data?.error
				? err?.response?.data?.error?.[0]?.msg
				: err?.response?.data
				? err?.response?.data
				: err?.message,
		});
	}
};

// LOGIN ACTION
export const loginUser = userData => async dispatch => {
	try {
		let res = await axios.post(`/api/v1/user/login`, { ...userData });
		dispatch(clearErrors());

		if (res?.data?.data?.isAdmin) {
			dispatch({
				type:
					res?.data?.is2FAEnabled === "enable" ? LOGIN_USER_2FA : LOGIN_USER,
				is2FAType:
					res?.data?.is2FAEnabled === "enable" ? res?.data?.is2FAType : null,
				payload: res.data,
			});
			if (res?.data?.is2FAEnabled !== "enable") dispatch(loadUser());
			toast.success(res.data.msg, { autoClose: 5000 });
		} else {
			dispatch({ type: LOGIN_USER_FAIL });
			dispatch(
				returnErrors({ error: [{ msg: "Unauthorised User", param: "auth" }] })
			);
		}
	} catch (err) {
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		console.log({ err });
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		dispatch({ type: LOGIN_USER_FAIL });
	}
};

export const loginUser2FA = userData => async dispatch => {
	try {
		let res = await axios.put(
			`/api/v1/user/is2fa-authenticate`,
			{ ...userData },
			{
				headers: {
					Authorization: localStorage.getItem(TOKEN_2FA),
				},
			}
		);
		dispatch(clearErrors());

		if (res?.data?.data?.isAdmin) {
			dispatch({
				type:
					res?.data?.is2FAEnabled === "enable" ? LOGIN_USER_2FA : LOGIN_USER,
				payload: res.data,
			});
			if (res?.data?.is2FAEnabled !== "enable") dispatch(loadUser());
			toast.success(res.data.msg, { autoClose: 5000 });
		} else {
			dispatch({ type: LOGIN_USER_FAIL });
			dispatch(
				returnErrors({ error: [{ msg: "Unauthorised User", param: "auth" }] })
			);
		}
	} catch (err) {
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		console.log({ err });
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		dispatch({ type: LOGIN_USER_FAIL });
	}
};

// REGISTER ACTION
export const registerUser = userData => async dispatch => {
	dispatch(clearErrors());
	console.log({ userData });
	try {
		var res = await axios.post("/api/v1/user", { ...userData });

		dispatch({
			type: REGISTER_USER,
			payload: res.data,
		});
		toast.success(res.data.msg, { autoClose: 5000 });
	} catch (err) {
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		console.log({ err });
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		dispatch({ type: REGISTER_USER_FAIL });
	}
};

export const updatePassword = userData => async dispatch => {
	dispatch(clearErrors());

	try {
		var res = await axios.put(
			`/api/v1/user/update-password`,
			{ ...userData },
			{}
		);

		dispatch({
			type: UPDATE_PASSWORD,
			payload: res.data,
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
		dispatch({ type: UPDATE_PASSWORD_FAIL });
	}
};

export const updateUser = (userData, type) => async dispatch => {
	dispatch(clearErrors());

	try {
		var avatar, res;
		if (type === "profile-image") {
			let media = await imageUpload([userData.logo]);
			avatar = media[0];
			// console.log({ avatar, media, userData });
			res = await axios.put(
				`/api/v1/user/update-avatar`,
				{
					...userData,
					avatar,
				},
				{}
			);
		} else {
			res = await axios.put(`/api/v1/user`, { ...userData });
		}

		dispatch({
			type: UPDATE_USER,
			payload: res.data,
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
		dispatch({ type: UPDATE_USER_FAIL });
	}
};

export const imageUpload = async images => {
	let imgArr = [];
	for (const item of images) {
		// console.log({ item });
		let post = new FormData();
		post.append(`file`, item);

		let res = await axios.post(`/api/v1/file`, post, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		const data = await res.data?.data;

		Array.isArray(data) ? (imgArr = [...imgArr, ...data]) : imgArr.push(data);
	}
	return imgArr;
};
