import axios from "axios";
import { toast } from "react-toastify";
import { returnErrors } from "@/Data/Reducer/ErrorReducer";
import {
	ADD_BILLER,
	ADD_BILLER_FAIL,
	ADD_BILLER_FUNDING,
	ADD_BILLER_FUNDING_FAIL,
	ADD_CATEGORY,
	ADD_CATEGORY_FAIL,
	ADD_NETWORK,
	ADD_NETWORK_FAIL,
	ADD_PRODUCTS,
	ADD_PRODUCTS_FAIL,
	DATA_TRANSACTIONS_STAT,
	DELETE_BILLER,
	DELETE_CATEGORY,
	DELETE_NETWORK,
	DELETE_PRODUCTS,
	FIND_TRANSACTIONS_STAT,
	GET_BILLER,
	GET_BILLER_CHOOSEN,
	GET_BILLER_FAIL,
	GET_BILLER_FUNDING,
	GET_BILLER_HONOURWORLD,
	GET_BILLER_HUSMO,
	GET_BILLER_DATASTATION,
	GET_BILLER_OGDAMS,
	GET_BILLER_RINGO,
	GET_BILLER_RINGO_FAIL,
	GET_BILLER_SMEPLUG,
	GET_BILLER_VTPASS,
	GET_CATEGORY,
	GET_CATEGORY_FAIL,
	GET_CHOSEN_SERVICES,
	GET_CHOSEN_SERVICES_FAIL,
	GET_DATA_BUNDLE,
	GET_DATA_BUNDLE_FAIL,
	GET_FLUTTERWAVE,
	GET_HONOURWORLD_DATA,
	GET_HONOURWORLD_DATA_FAIL,
	GET_HUSMO,
	GET_DATASTATION,
	GET_MANUAL,
	GET_MCD,
	GET_MCD_FAIL,
	GET_MONNIFY,
	GET_NETWORK,
	GET_OGDAMS,
	GET_OGDAMS_FAIL,
	GET_PAYSTACK,
	GET_PRODUCTS,
	GET_PRODUCTS_FAIL,
	GET_PROVIDER_FAIL,
	GET_RINGO_DATA,
	GET_RINGO_DATA_FAIL,
	GET_RPI_DATA,
	GET_RPI_DATA_FAIL,
	GET_RPI_DATA_PLAN,
	GET_UZOBEST,
	GET_VTPASS,
	SEARCH_BILLER,
	SEARCH_BILLER_FAIL,
	SEARCH_CATEGORY,
	SEARCH_CATEGORY_FAIL,
	SEARCH_PRODUCTS,
	SEARCH_PRODUCTS_FAIL,
	SEARCH_PROVIDER,
	SEARCH_PROVIDER_FAIL,
	SEARCH_PROVIDER_LOADING,
	SET_SUCCESS,
	TRANSACTIONS_STAT,
	UPDATE_BILLER,
	UPDATE_CATEGORY,
	UPDATE_NETWORK,
	UPDATE_PRODUCTS,
	WALLET_PROVIDER_STAT,
	GET_TEETOP,
	GET_BILLER_TEETOP,
	GET_DATAMESOLUTION,
	GET_BILLER_DATAMESOLUTION,
	GET_BUDPAY,
	COMMISSION_TRANSACTIONS_STAT,
	GET_MOAVOXPAY,
	GET_KEMTECH,
	GET_BILLER_KEMTECH,
	GET_BILLER_MOAVOXPAY,
	GET_BILLER_CLUBKONNECT,
	GET_CLUBKONNECT,
	GET_CONNECTSMS,
	GET_MASKAWASUB,
	GET_BILLER_MASKAWASUB,
	GET_VICKYBEST,
	GET_BILLER_VICKYBEST,
	GET_BILLER_ROSSYTECHS,
	GET_ROSSYTECHS,
	GET_KVDATA,
	GET_BILLER_KVDATA,
	GET_PAYVESSEL,
	GET_TERMII,
	GET_GLADTIDINGSDATA,
	GET_BILLER_GLADTIDINGSDATA,
	GET_BILLSTACK,
	GET_UZOBEST_BALANCE,
	GET_UZOBEST_BALANCE_FAIL,
	GET_BILLER_UZOBESTGSM,
	GET_UZOBESTGSM,
	GET_GEODNATECHSUB,
	GET_BILLER_GEODNATECHSUB,
	GET_PALMPAY,
	GET_FRANKEYCONNECT,
	GET_BILLER_FRANKEYCONNECT,
	GET_LEGITDATAWAY,
	GET_BILLER_LEGITDATAWAY,
	GET_SALOMPAY,
	GET_BILLER_SALOMPAY,
	GET_BILLER_WAPAY,
	GET_WAPAY,
	GET_BELLOVENTURES,
	GET_BILLER_BELLOVENTURES,
	GET_PEARSTELECOM,
	GET_BILLER_PEARSTELECOM,
	GET_SIRPDATA,
	GET_BILLER_SIRPDATA,
	GET_FORDLINK,
	GET_BILLER_FORDLINK,
	GET_MERCYFOUND,
	GET_BILLER_MERCYFOUND,
	GET_EDIVATELECOMM,
	GET_BILLER_EDIVATELECOMM,
} from "@/Data/Actions/ActionTypes";
import { imageUpload } from "@/Data/Actions/AuthActions";

import {
	getCablesPackages,
	getDataBundle,
	getDataToBuy,
	getElectricityBundle,
	getElectricityToBuy,
} from "@/Data/Actions/DataActions";

export const getHonourworld = () => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/biller/honourworld/balance`, {});

		dispatch({
			type: GET_HONOURWORLD_DATA,
			payload: res.data,
		});
		console.log({ balance: res.data });
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		dispatch({
			type: GET_HONOURWORLD_DATA_FAIL,
		});
	}
};

export const getVtpassBalance = () => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/biller/vtpass/balance`, {});

		dispatch({
			type: GET_VTPASS,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		dispatch({
			type: GET_CHOSEN_SERVICES_FAIL,
		});
	}
};
export const getTeetopBalance = () => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/biller/teetop/balance`, {});

		dispatch({
			type: GET_TEETOP,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		dispatch({
			type: GET_CHOSEN_SERVICES_FAIL,
		});
	}
};
export const getProviderBalance = provider => async dispatch => {
	try {
		let res = await axios.get(
			`/api/v1/biller/${provider || "moavoxpay"}/balance`,
			{}
		);

		dispatch({
			type:
				provider === "kemtech"
					? GET_KEMTECH
					: provider === "clubkonnect"
					? GET_CLUBKONNECT
					: provider === "maskawasub"
					? GET_MASKAWASUB
					: provider === "vickybest"
					? GET_VICKYBEST
					: provider === "rossytechs"
					? GET_ROSSYTECHS
					: provider === "kvdata"
					? GET_KVDATA
					: provider === "gladtidingsdata"
					? GET_GLADTIDINGSDATA
					: provider === "geodnatechsub"
					? GET_GEODNATECHSUB
					: provider === "bello-ventures"
					? GET_BELLOVENTURES
					: provider === "fordlink"
					? GET_FORDLINK
					: provider === "frankeyconnect"
					? GET_FRANKEYCONNECT
					: provider === "legitdataway"
					? GET_LEGITDATAWAY
					: provider === "pearstelecom"
					? GET_PEARSTELECOM
					: provider === "salompay"
					? GET_SALOMPAY
					: provider === "sirpdata"
					? GET_SIRPDATA
					: provider === "wapay"
					? GET_WAPAY
					: provider === "edivatelecomm"
					? GET_EDIVATELECOMM
					: provider === "uzobestgsm"
					? GET_UZOBESTGSM
					: provider === "connectsms"
					? GET_CONNECTSMS
					: provider === "termii"
					? GET_TERMII
					: provider === "mercyfound"
					? GET_MERCYFOUND
					: GET_MOAVOXPAY,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		dispatch({
			type: GET_CHOSEN_SERVICES_FAIL,
		});
	}
};

export const getHusmoBalance = () => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/biller/husmo/balance`, {});

		dispatch({
			type: GET_HUSMO,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		dispatch({
			type: GET_CHOSEN_SERVICES_FAIL,
		});
	}
};

export const getDataStationBalance = () => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/biller/datastation/balance`, {});

		dispatch({
			type: GET_DATASTATION,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		dispatch({
			type: GET_CHOSEN_SERVICES_FAIL,
		});
	}
};

export const getDataMeSolutionBalance = () => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/biller/datamesolution/balance`, {});

		dispatch({
			type: GET_DATAMESOLUTION,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		dispatch({
			type: GET_CHOSEN_SERVICES_FAIL,
		});
	}
};

export const getChoosenServices = () => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/biller/chosen/balance`, {});

		dispatch({
			type: GET_CHOSEN_SERVICES,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		dispatch({
			type: GET_CHOSEN_SERVICES_FAIL,
		});
	}
};

export const getRpiData = () => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/biller/rpi/balance`, {});

		dispatch({
			type: GET_RPI_DATA,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		dispatch({
			type: GET_RPI_DATA_FAIL,
		});
	}
};

export const getOgdams = () => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/biller/ogdams/balance`, {});

		dispatch({
			type: GET_OGDAMS,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		dispatch({
			type: GET_OGDAMS_FAIL,
		});
	}
};

export const getRingo = () => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/biller/ringo/balance`, {});

		dispatch({
			type: GET_RINGO_DATA,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		dispatch({
			type: GET_RINGO_DATA_FAIL,
		});
	}
};

export const getMcd = () => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/biller/mcd/balance`, {});

		dispatch({
			type: GET_MCD,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		dispatch({
			type: GET_MCD_FAIL,
		});
	}
};

export const getCategory = data => async dispatch => {
	try {
		let res = await axios.get(
			`/api/v1/category?type=all
			${!data?.limit ? "" : `&limit=${data.limit}`}
			${!data?.search ? "" : `&search=${data?.search}`}
			`,
			{}
		);

		dispatch({
			type: data?.search ? SEARCH_CATEGORY : GET_CATEGORY,
			payload: res.data,
			search: data?.search ? data?.search : "",
		});
	} catch (err) {
		if (err) console.log({ err });
		let error = err.response?.data?.error;
		if (data?.search) {
			if (error) {
				dispatch(returnErrors({ error, status: err?.response?.status }));
				// error.forEach(error =>
				// 	error?.param
				// 		? error?.param !== "suggestion" &&
				// 		  toast.error(error.msg, { autoClose: false })
				// 		: toast.error(error.msg, { autoClose: false })
				// );
			}
		}
		dispatch({
			type: data?.search ? SEARCH_CATEGORY_FAIL : GET_CATEGORY_FAIL,
		});
	}
};

export const manageCategory = (data, id, type) => async dispatch => {
	try {
		let res;
		if (!id) res = await axios.post(`/api/v1/category`, { ...data }, {});
		else if (type === "delete")
			res = await axios.delete(`/api/v1/category/${id}`, {});
		else res = await axios.put(`/api/v1/category/${id}`, { ...data }, {});
		dispatch({
			type: id
				? type === "delete"
					? DELETE_CATEGORY
					: UPDATE_CATEGORY
				: ADD_CATEGORY,
			payload: type === "delete" ? data : res.data?.data,
		});
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
		if (id === "switch-biller") {
			dispatch(getDataToBuy());
			dispatch(getDataBundle());
			dispatch(getElectricityBundle());
			dispatch(getElectricityToBuy());
			dispatch(getCablesPackages());
		}
	} catch (err) {
		console.log({ err });
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch({ type: ADD_CATEGORY_FAIL });
	}
};

export const getBiller = data => async dispatch => {
	try {
		let res = await axios.get(
			`/api/v1/biller?type=all
			${!data?.limit ? "" : `&limit=${data.limit}`}
			${!data?.search ? "" : `&search=${data?.search}`}
			`,
			{}
		);

		dispatch({
			type: data?.search ? SEARCH_BILLER : GET_BILLER,
			payload: res.data,
			search: data?.search ? data?.search : "",
		});
	} catch (err) {
		if (err) console.log({ err });
		let error = err.response?.data?.error;
		if (data?.search) {
			if (error) {
				dispatch(returnErrors({ error, status: err?.response?.status }));
				// error.forEach(error =>
				// 	error?.param
				// 		? error?.param !== "suggestion" &&
				// 		  toast.error(error.msg, { autoClose: false })
				// 		: toast.error(error.msg, { autoClose: false })
				// );
			}
		}
		dispatch({
			type: data?.search ? SEARCH_BILLER_FAIL : GET_BILLER_FAIL,
		});
	}
};

export const manageBiller = (data, id, type) => async dispatch => {
	try {
		let res;
		if (!id) res = await axios.post(`/api/v1/biller`, { ...data }, {});
		else if (type === "delete")
			res = await axios.delete(`/api/v1/biller/${id}`);
		else res = await axios.put(`/api/v1/biller/${id}`, { ...data }, {});
		dispatch({
			type: id
				? type === "delete"
					? DELETE_BILLER
					: UPDATE_BILLER
				: ADD_BILLER,
			payload: type === "delete" ? data : res.data?.data,
		});
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		console.log({ err });
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch({ type: ADD_BILLER_FAIL });
	}
};

export const getUzobestData = () => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/biller/uzobest/balance`);

		dispatch({
			type: GET_UZOBEST_BALANCE,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		dispatch({
			type: GET_UZOBEST_BALANCE_FAIL,
		});
	}
};

export const getBillerData = data => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/biller/${data}`, {});

		dispatch({
			type:
				data === "ringo"
					? GET_BILLER_RINGO
					: data === "ogdams"
					? GET_BILLER_OGDAMS
					: data === "smeplug"
					? GET_BILLER_SMEPLUG
					: data === "chosen"
					? GET_BILLER_CHOOSEN
					: data === "husmo"
					? GET_BILLER_HUSMO
					: data === "datastation"
					? GET_BILLER_DATASTATION
					: data === "kvdata"
					? GET_BILLER_KVDATA
					: data === "gladtidingsdata"
					? GET_BILLER_GLADTIDINGSDATA
					: data === "geodnatechsub"
					? GET_BILLER_GEODNATECHSUB
					: data === "bello-ventures"
					? GET_BILLER_BELLOVENTURES
					: data === "fordlink"
					? GET_BILLER_FORDLINK
					: data === "frankeyconnect"
					? GET_BILLER_FRANKEYCONNECT
					: data === "legitdataway"
					? GET_BILLER_LEGITDATAWAY
					: data === "pearstelecom"
					? GET_BILLER_PEARSTELECOM
					: data === "salompay"
					? GET_BILLER_SALOMPAY
					: data === "sirpdata"
					? GET_BILLER_SIRPDATA
					: data === "wapay"
					? GET_BILLER_WAPAY
					: data === "edivatelecomm"
					? GET_BILLER_EDIVATELECOMM
					: data === "uzobestgsm"
					? GET_BILLER_UZOBESTGSM
					: data === "rossytechs"
					? GET_BILLER_ROSSYTECHS
					: data === "datamesolution"
					? GET_BILLER_DATAMESOLUTION
					: data === "maskawasub"
					? GET_BILLER_MASKAWASUB
					: data === "vickybest"
					? GET_BILLER_VICKYBEST
					: data === "teetop"
					? GET_BILLER_TEETOP
					: data === "kemtech"
					? GET_BILLER_KEMTECH
					: data === "moavoxpay"
					? GET_BILLER_MOAVOXPAY
					: data === "mercyfound"
					? GET_BILLER_MERCYFOUND
					: data === "uzobest"
					? GET_UZOBEST
					: data === "honourworld"
					? GET_BILLER_HONOURWORLD
					: data === "vtpass"
					? GET_BILLER_VTPASS
					: data === "rpi"
					? GET_RPI_DATA_PLAN
					: data === "clubkonnect"
					? GET_BILLER_CLUBKONNECT
					: null,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		let error = err.response?.data?.error;
		console.log({ error });
		// if (data?.search) {
		// 	if (error) {
		// 		dispatch(returnErrors({ error, status: err?.response?.status }));
		// 	}
		// }
		dispatch({
			type: GET_BILLER_RINGO_FAIL,
		});
	}
};

export const getProducts = data => async dispatch => {
	try {
		let res = await axios.get(
			`/api/v1/product?type=all
			${!data?.limit ? "" : `&limit=${data.limit}`}
			${!data?.search ? "" : `&search=${data?.search}`}
			`,
			{}
		);

		dispatch({
			type: data?.search ? SEARCH_PRODUCTS : GET_PRODUCTS,
			payload: res.data,
			search: data?.search ? data?.search : "",
		});
	} catch (err) {
		if (err) console.log({ err });
		let error = err.response?.data?.error;
		if (data?.search) {
			if (error) {
				dispatch(returnErrors({ error, status: err?.response?.status }));
				// error.forEach(error =>
				// 	error?.param
				// 		? error?.param !== "suggestion" &&
				// 		  toast.error(error.msg, { autoClose: false })
				// 		: toast.error(error.msg, { autoClose: false })
				// );
			}
		}
		dispatch({
			type: data?.search ? SEARCH_PRODUCTS_FAIL : GET_PRODUCTS_FAIL,
		});
	}
};

export const manageProducts = (data, id, type) => async dispatch => {
	try {
		let res;
		if (!id) res = await axios.post(`/api/v1/product`, { ...data }, {});
		else if (type === "delete")
			res = await axios.delete(`/api/v1/product/${id}`, {});
		else res = await axios.put(`/api/v1/product/${id}`, { ...data }, {});
		dispatch({
			type: id
				? type === "delete"
					? DELETE_PRODUCTS
					: UPDATE_PRODUCTS
				: ADD_PRODUCTS,
			payload: type === "delete" ? data : res.data?.data,
		});
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		console.log({ err });
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch({ type: ADD_PRODUCTS_FAIL });
	}
};

export const toggleAvailabilty = (data, type) => async dispatch => {
	try {
		let res = await axios.put(`/api/v1/${data}?enabler=${type}`, {}, {});
		dispatch({
			type:
				data === "data"
					? GET_DATA_BUNDLE
					: data === "category"
					? GET_CATEGORY
					: data === "product"
					? GET_PRODUCTS
					: null,
			payload: res.data,
		});
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		console.log({ err });
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch({
			type:
				data === "data"
					? GET_DATA_BUNDLE_FAIL
					: data === "category"
					? GET_CATEGORY_FAIL
					: data === "product"
					? GET_PRODUCTS_FAIL
					: null,
		});
	}
};

export const getProviderStat = data => async dispatch => {
	try {
		let res = await axios.get(
			`/api/v1/${
				["/manage-wallet-provider", "/manage-commission"]?.includes(data?.route)
					? "wallet"
					: "transactions"
			}${data?.route}${data?.year ? `?year=${data?.year}` : ""}`,
			{}
		);

		dispatch({
			type:
				data?.route === "/manage-transactions"
					? TRANSACTIONS_STAT
					: data?.route === "/manage-commission"
					? COMMISSION_TRANSACTIONS_STAT
					: WALLET_PROVIDER_STAT,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const findProviderStat = data => async dispatch => {
	try {
		let res = await axios.post(
			`/api/v1/transactions/manage-transactions${
				data?.year ? `?year=${data?.year}` : ""
			}`,
			{ ...data },
			{}
		);

		dispatch({
			type: FIND_TRANSACTIONS_STAT,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
	}
};

export const getDataTransactionStat = data => async dispatch => {
	try {
		let res = await axios.patch(
			`/api/v1/transactions/data${data?.year ? `?year=${data?.year}` : ""}`,
			{ ...data },
			{}
		);

		dispatch({
			type: DATA_TRANSACTIONS_STAT,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
	}
};

export const getNetwork = () => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/network`, {});

		dispatch({
			type: GET_NETWORK,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const manageNetwork = (data, id, type) => async dispatch => {
	try {
		let res;
		if (!id) {
			let media = await imageUpload([data?.image]),
				image = media[0];
			res = await axios.post(`/api/v1/network`, { ...data, image }, {});
		} else if (type === "delete")
			res = await axios.delete(`/api/v1/network/${id}`, {});
		else {
			let image;
			if (data?.image)
				if (!data?.image?._id) {
					let media = await imageUpload([data?.image]);
					image = media[0];
				}
			res = await axios.put(
				`/api/v1/network/${id}`,
				{
					...data,
					image: image ? image : data?.image,
				},
				{}
			);
		}

		dispatch({
			type: id
				? type === "delete"
					? DELETE_NETWORK
					: UPDATE_NETWORK
				: ADD_NETWORK,
			payload: type === "delete" ? data : res.data?.data,
		});
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		console.log({ err });
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch({ type: ADD_NETWORK_FAIL });
	}
};

export const getBillerFunding = data => async dispatch => {
	try {
		let res;

		if (!data) res = await axios.get(`/api/v1/biller/manage-biller-funding`);
		else
			res = await axios.post(`/api/v1/biller/manage-biller-funding`, {
				...data,
			});

		dispatch({
			type: data ? ADD_BILLER_FUNDING : GET_BILLER_FUNDING,
			payload: res.data,
		});
		if (data) dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err) console.log({ err });
		let error = err.response?.data?.error;
		if (data?.search) {
			if (error) {
				dispatch(returnErrors({ error, status: err?.response?.status }));
			}
		}
		dispatch({
			type: ADD_BILLER_FUNDING_FAIL,
		});
	}
};

export const findProviderFunding = data => async dispatch => {
	if (data?.search)
		dispatch({ type: SEARCH_PROVIDER_LOADING, search: data?.search });
	try {
		let res = await axios.post(
			`/api/v1/wallet/manage-wallet-provider
			${data?.provider ? `?provider=${data?.provider}` : ""}
			${data?.search ? `&search=${data?.search}` : ""}
			${data?.limit ? `&limit=${data?.limit}` : ""}
			`,
			{ ...data }
		);

		dispatch({
			type: data?.search
				? SEARCH_PROVIDER
				: data?.provider === "monnify"
				? GET_MONNIFY
				: data?.provider === "flutterwave"
				? GET_FLUTTERWAVE
				: data?.provider === "paystack"
				? GET_PAYSTACK
				: data?.provider === "budpay"
				? GET_BUDPAY
				: data?.provider === "payvessel"
				? GET_PAYVESSEL
				: data?.provider === "palmpay"
				? GET_PALMPAY
				: data?.provider === "billstack"
				? GET_BILLSTACK
				: data?.provider === "manual"
				? GET_MANUAL
				: null,
			payload: res.data,
			data,
			search: data?.search
				? res?.data?.search
					? res?.data?.search
					: data?.search
				: "",
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error && data?.search) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		dispatch({ type: data?.search ? SEARCH_PROVIDER_FAIL : GET_PROVIDER_FAIL });
	}
};