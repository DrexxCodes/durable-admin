import axios from "axios";
import { toast } from "react-toastify";
import { returnErrors } from "@/Data/Reducer/ErrorReducer";
import {
	ADD_CABLES_TYPES,
	ADD_CABLES_TYPES_FAIL,
	ADD_DATA_BUNDLE,
	ADD_DATA_BUNDLE_FAIL,
	ADD_EDUCATION_BUNDLE,
	ADD_EDUCATION_BUNDLE_FAIL,
	ADD_ELECTRICITY_BUNDLE,
	ADD_ELECTRICITY_BUNDLE_FAIL,
	CREATE_EDUCATION_PIN,
	DELETE_CABLES_TYPES,
	DELETE_DATA_BUNDLE,
	DELETE_EDUCATION_BUNDLE,
	DELETE_EDUCATION_PIN,
	DELETE_ELECTRICITY_BUNDLE,
	GET_CABLES_TYPES,
	GET_CABLE_DIRECT_PACKAGE,
	GET_CABLE_DIRECT_PACKAGE_FAIL,
	GET_DATA_BUNDLE,
	GET_DATA_BUNDLE_FAIL,
	GET_DATA_TO_BUY,
	GET_DATA_TO_BUY_FAIL,
	GET_EDUCATION_BUNDLE,
	GET_EDUCATION_BUNDLE_FAIL,
	GET_EDUCATION_TO_BUY,
	GET_EDUCATION_TO_BUY_FAIL,
	GET_ELECTRICITY_BUNDLE,
	GET_ELECTRICITY_BUNDLE_FAIL,
	GET_ELECTRICITY_TO_BUY,
	GET_ELECTRICITY_TO_BUY_FAIL,
	SEARCH_DATA_BUNDLE,
	SEARCH_DATA_BUNDLE_FAIL,
	SEARCH_EDUCATION_BUNDLE,
	SEARCH_EDUCATION_BUNDLE_FAIL,
	SEARCH_ELECTRICITY_BUNDLE,
	SEARCH_ELECTRICITY_BUNDLE_FAIL,
	SET_SUCCESS,
	UPDATE_CABLES_TYPES,
	UPDATE_DATA_BUNDLE,
	UPDATE_EDUCATION_BUNDLE,
	UPDATE_ELECTRICITY_BUNDLE,
} from "@/Data/Actions/ActionTypes";
import { imageUpload } from "@/Data/Actions/AuthActions";
import { removeFalsyRecursive } from "@/Utils";

export const getDataBundle = data => async dispatch => {
	try {
		let res = await axios.get(
			`/api/v1/data/direct-bundles?type=all
			${!data?.limit ? "" : `&limit=${data.limit}`}
			${!data?.search ? "" : `&search=${data?.search}`}
			`
		);

		dispatch({
			type: data?.search ? SEARCH_DATA_BUNDLE : GET_DATA_BUNDLE,
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
			type: data?.search ? SEARCH_DATA_BUNDLE_FAIL : GET_DATA_BUNDLE_FAIL,
		});
	}
};

export const manageDataBundle = (data, id, type) => async dispatch => {
	try {
		let res;
		if (!id)
			res = await axios.post(
				`/api/v1/data`,
				removeFalsyRecursive({ ...data }),
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
		else if (type === "delete")
			res = await axios.delete(`/api/v1/data/${id}`, { data:removeFalsyRecursive(data) });
		else res = await axios.put(`/api/v1/data/${id}`, removeFalsyRecursive({ ...data }));
		dispatch({
			type: id
				? type === "delete" && !id?.startsWith("manage-price")
					? DELETE_DATA_BUNDLE
					: UPDATE_DATA_BUNDLE
				: ADD_DATA_BUNDLE,
			payload:
				type === "delete" && !id?.startsWith("manage-price")
					? data
					: res.data?.data,
		});
		dispatch(getDataToBuy());
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		console.log({ err });
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
			// error.forEach(error =>
			// 	error?.param
			// 		? error?.param !== "suggestion" &&
			// 		  toast.error(error.msg, { autoClose: false })
			// 		: toast.error(error.msg, { autoClose: false })
			// );
		}
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch({ type: ADD_DATA_BUNDLE_FAIL });
	}
};

export const getDataToBuy = () => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/data`);

		dispatch({
			type: GET_DATA_TO_BUY,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		let error = err.response?.data?.error;
		console.log({ error });
		dispatch({
			type: GET_DATA_TO_BUY_FAIL,
		});
	}
};

export const getElectricityBundle = data => async dispatch => {
	try {
		let res = await axios.get(
			`/api/v1/electricity/direct-electricity?type=all
			${!data?.limit ? "" : `&limit=${data.limit}`}
			${!data?.search ? "" : `&search=${data?.search}`}
			`
		);

		dispatch({
			type: data?.search ? SEARCH_ELECTRICITY_BUNDLE : GET_ELECTRICITY_BUNDLE,
			payload: res.data,
			search: data?.search ? data?.search : "",
		});
	} catch (err) {
		if (err) console.log({ err });
		let error = err.response?.data?.error;
		if (data?.search) {
			if (error) {
				dispatch(returnErrors({ error, status: err?.response?.status }));
			}
		}
		dispatch({
			type: data?.search
				? SEARCH_ELECTRICITY_BUNDLE_FAIL
				: GET_ELECTRICITY_BUNDLE_FAIL,
		});
	}
};

export const manageElectricityBundle = (data, id, type) => async dispatch => {
	try {
		let res;
		if (!id) {
			let media = await imageUpload([data?.image]),
				image = media[0];
			res = await axios.post(`/api/v1/electricity`, removeFalsyRecursive({ ...data, image }));
		} else if (type === "delete")
			res = await axios.delete(`/api/v1/electricity/${id}`);
		else {
			let image;
			if (data?.image)
				if (!data?.image?._id) {
					let media = await imageUpload([data?.image]);
					image = media[0];
				}
			res = await axios.put(`/api/v1/electricity/${id}`, removeFalsyRecursive({
				...data,
				image: image ? image : data?.image,
			}));
		}

		dispatch({
			type: id
				? type === "delete"
					? DELETE_ELECTRICITY_BUNDLE
					: UPDATE_ELECTRICITY_BUNDLE
				: ADD_ELECTRICITY_BUNDLE,
			payload: type === "delete" ? data : res.data?.data,
		});
		dispatch(getElectricityToBuy());
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		console.log({ err });
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch({ type: ADD_ELECTRICITY_BUNDLE_FAIL });
	}
};

export const getElectricityToBuy = () => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/electricity`);

		dispatch({
			type: GET_ELECTRICITY_TO_BUY,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		let error = err.response?.data?.error;
		console.log({ error });
		dispatch({
			type: GET_ELECTRICITY_TO_BUY_FAIL,
		});
	}
};

export const getEducationBundle = data => async dispatch => {
	try {
		let res = await axios.get(
			`/api/v1/education/direct-education?type=all
			${!data?.limit ? "" : `&limit=${data.limit}`}
			${!data?.search ? "" : `&search=${data?.search}`}
			`
		);

		dispatch({
			type: data?.search ? SEARCH_EDUCATION_BUNDLE : GET_EDUCATION_BUNDLE,
			payload: res.data,
			search: data?.search ? data?.search : "",
		});
	} catch (err) {
		if (err) console.log({ err });
		let error = err.response?.data?.error;
		if (data?.search) {
			if (error) {
				dispatch(returnErrors({ error, status: err?.response?.status }));
			}
		}
		dispatch({
			type: data?.search
				? SEARCH_EDUCATION_BUNDLE_FAIL
				: GET_EDUCATION_BUNDLE_FAIL,
		});
	}
};

export const manageEducationBundle = (data, id, type) => async dispatch => {
	try {
		let res;
		if (!id) {
			let media = await imageUpload([data?.image]),
				image = media[0];
			res = await axios.post(`/api/v1/education`, removeFalsyRecursive({ ...data, image }));
		} else if (type === "delete")
			res = await axios.delete(`/api/v1/education/${id}`);
		else {
			let image;
			if (data?.image)
				if (!data?.image?._id) {
					let media = await imageUpload([data?.image]);
					image = media[0];
				}
			res = await axios.put(`/api/v1/education/${id}`, removeFalsyRecursive({
				...data,
				image: image ? image : data?.image,
			}));
		}

		dispatch({
			type: id
				? type === "delete"
					? DELETE_EDUCATION_BUNDLE
					: UPDATE_EDUCATION_BUNDLE
				: ADD_EDUCATION_BUNDLE,
			payload: type === "delete" ? data : res.data,
		});
		dispatch(getEducationToBuy());
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		console.log({ err });
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch({ type: ADD_EDUCATION_BUNDLE_FAIL });
	}
};

export const manageEducationPin = (type, data) => async dispatch => {
	try {
		let res;
		if (type !== "delete") {
			res = await axios.post(`/api/v1/education/pin`, removeFalsyRecursive({ ...data }));
		} else if (type === "delete")
			res = await axios.delete(`/api/v1/education/${data?._id}/pin`);

		dispatch({
			type: type === "delete" ? DELETE_EDUCATION_PIN : CREATE_EDUCATION_PIN,
			payload: type === "delete" ? data : res.data?.data,
		});
		dispatch(getEducationToBuy());
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		console.log({ err });
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch({ type: ADD_EDUCATION_BUNDLE_FAIL });
	}
};

export const getEducationToBuy = () => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/education`);

		dispatch({
			type: GET_EDUCATION_TO_BUY,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		let error = err.response?.data?.error;
		console.log({ error });
		dispatch({
			type: GET_EDUCATION_TO_BUY_FAIL,
		});
	}
};

export const getCablesPackages = () => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/cables`);
		dispatch({
			type: GET_CABLE_DIRECT_PACKAGE,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		let error = err.response?.data?.error;
		if (error) console.log({ error });
		dispatch({
			type: GET_CABLE_DIRECT_PACKAGE_FAIL,
		});
	}
};

export const getCablesTypes = () => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/cables/types`);

		dispatch({
			type: GET_CABLES_TYPES,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const manageCables = (data, id, type) => async dispatch => {
	try {
		let res;
		if (!id) {
			let media = await imageUpload([data?.image]),
				image = media[0];
			res = await axios.post(`/api/v1/cables`, removeFalsyRecursive({ ...data, image }));
		} else if (type === "delete")
			res = await axios.delete(`/api/v1/cables/${id}`);
		else {
			let image;
			if (data?.image)
				if (!data?.image?._id) {
					let media = await imageUpload([data?.image]);
					image = media[0];
				}
			res = await axios.put(`/api/v1/cables/${id}`, removeFalsyRecursive({
				...data,
				image: image ? image : data?.image,
			}));
		}

		dispatch({
			type: id
				? type === "delete"
					? DELETE_CABLES_TYPES
					: UPDATE_CABLES_TYPES
				: ADD_CABLES_TYPES,
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
		dispatch({ type: ADD_CABLES_TYPES_FAIL });
	}
};
