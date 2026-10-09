import { returnErrors } from "@/Data/Reducer/ErrorReducer";
import axios from "axios";
import { toast } from "react-toastify";
import {
	ACTIVATE_USER,
	ACTIVATE_USER_FAIL,
	ADD_ACCOUNTANT,
	ADD_ACCOUNTANT_FAIL,
	ADD_ADMIN,
	ADD_CUSTOMERCARE,
	ADD_CUSTOMERCARE_FAIL,
	ADD_DEVELOPERS,
	ADD_DEVELOPERS_FAIL,
	ADD_EMPLOYEE_FAIL,
	ADD_MANAGERS,
	ADD_MANAGERS_FAIL,
	ADD_MARKETERS,
	ADD_MARKETERS_FAIL,
	ADD_SUPERADMIN,
	ADD_SUPERADMIN_FAIL,
	DELETE_ADMIN,
	GET_ACCOUNTANT,
	GET_ACCOUNTANT_FAIL,
	GET_ALL_ACCOUNTANT,
	GET_ALL_CUSTOMERCARE,
	GET_ALL_DEVELOPERS,
	GET_ALL_MANAGERS,
	GET_ALL_MARKETERS,
	GET_ALL_RESELLERS,
	GET_ALL_SUPERADMIN,
	GET_ALL_TOPUSERS,
	GET_ALL_USER,
	GET_ALL_USERS,
	GET_ALL_USERS_FAIL,
	GET_CUSTOMERCARE,
	GET_CUSTOMERCARE_FAIL,
	GET_DEVELOPERS,
	GET_DEVELOPERS_FAIL,
	GET_MANAGERS,
	GET_MANAGERS_FAIL,
	GET_MARKETERS,
	GET_MARKETERS_FAIL,
	GET_RESELLERS,
	GET_RESELLERS_FAIL,
	GET_STANDALONE,
	GET_STANDALONE_FAIL,
	GET_SUPERADMIN,
	GET_SUPERADMIN_FAIL,
	GET_TOPUSERS,
	GET_TOPUSERS_FAIL,
	GET_USERS,
	GET_USERS_FAIL,
	PURCHASE_HISTORY_USER,
	PURCHASE_HISTORY_USER_FAIL,
	PURCHASE_HISTORY_USER_LOADING,
	SEARCH_ACCOUNTANT,
	SEARCH_ACCOUNTANT_FAIL,
	SEARCH_ACCOUNTANT_LOADING,
	SEARCH_ACCOUNTANT_RELOAD,
	SEARCH_AIRTIME_RELOAD,
	SEARCH_ALL_USERS,
	SEARCH_ALL_USERS_FAIL,
	SEARCH_ALL_USERS_LOADING,
	SEARCH_ALL_USERS_RELOAD,
	SEARCH_BILLER_RELOAD,
	SEARCH_BIZ_RELOAD,
	SEARCH_CABLE_RELOAD,
	SEARCH_CATEGORY_RELOAD,
	SEARCH_CONVERTER_RELOAD,
	SEARCH_CUSTOMERCARE,
	SEARCH_CUSTOMERCARE_FAIL,
	SEARCH_CUSTOMERCARE_LOADING,
	SEARCH_CUSTOMERCARE_RELOAD,
	SEARCH_DATA_BUNDLE_RELOAD,
	SEARCH_DATA_RELOAD,
	SEARCH_DEVELOPERS,
	SEARCH_DEVELOPERS_FAIL,
	SEARCH_DEVELOPERS_LOADING,
	SEARCH_DEVELOPERS_RELOAD,
	SEARCH_EDUCATION_RELOAD,
	SEARCH_ELECTRICITY_RELOAD,
	SEARCH_MANAGERS,
	SEARCH_MANAGERS_FAIL,
	SEARCH_MANAGERS_LOADING,
	SEARCH_MANAGERS_RELOAD,
	SEARCH_MARKETERS,
	SEARCH_MARKETERS_FAIL,
	SEARCH_MARKETERS_LOADING,
	SEARCH_MARKETERS_RELOAD,
	SEARCH_MY_TRANSACTION_RELOAD,
	SEARCH_PENDING_HISTORY_CARD_RELOAD,
	SEARCH_PENDING_HISTORY_RELOAD,
	SEARCH_PENDING_HISTORY_VIRTUAL_RELOAD,
	SEARCH_PRODUCTS_RELOAD,
	SEARCH_RELOAD,
	SEARCH_RESELLERS,
	SEARCH_RESELLERS_FAIL,
	SEARCH_RESELLERS_LOADING,
	SEARCH_RESELLERS_RELOAD,
	SEARCH_STANDALONE,
	SEARCH_STANDALONE_FAIL,
	SEARCH_SUPERADMIN,
	SEARCH_SUPERADMIN_FAIL,
	SEARCH_SUPERADMIN_LOADING,
	SEARCH_SUPERADMIN_RELOAD,
	SEARCH_TOPUSERS,
	SEARCH_TOPUSERS_FAIL,
	SEARCH_TOPUSERS_LOADING,
	SEARCH_TOPUSERS_RELOAD,
	SEARCH_TRANSACTION_RELOAD,
	SEARCH_USERS,
	SEARCH_USERS_FAIL,
	SEARCH_USERS_LOADING,
	SEARCH_USERS_RELOAD,
	SEARCH_VERIFY_RELOAD,
	SEARCH_WALLET_RELOAD,
	SET_SUCCESS,
	TRANSACTION_DETAILS,
	TRANSACTION_DETAILS_ACCOUNTANT,
	TRANSACTION_DETAILS_CUSTOMERCARE,
	TRANSACTION_DETAILS_DEVELOPERS,
	TRANSACTION_DETAILS_MANAGERS,
	TRANSACTION_DETAILS_MARKETERS,
	TRANSACTION_DETAILS_RESELLER,
	TRANSACTION_DETAILS_STANDALONE,
	TRANSACTION_DETAILS_SUPERADMIN,
	TRANSACTION_DETAILS_TOPUSER,
	TRANSACTION_DETAILS_USER,
	UPDATE_ADMIN,
	WALLET_HISTORY_USER,
	WALLET_HISTORY_USER_FAIL,
	WALLET_HISTORY_USER_LOADING,
} from "@/Data/Actions/ActionTypes";

export const getReload = () => async dispatch => {
	dispatch({ type: SEARCH_ALL_USERS_RELOAD });
	dispatch({ type: SEARCH_RESELLERS_RELOAD });
	dispatch({ type: SEARCH_TOPUSERS_RELOAD });
	dispatch({ type: SEARCH_USERS_RELOAD });
	dispatch({ type: SEARCH_MANAGERS_RELOAD });
	dispatch({ type: SEARCH_ACCOUNTANT_RELOAD });
	dispatch({ type: SEARCH_DEVELOPERS_RELOAD });
	dispatch({ type: SEARCH_MARKETERS_RELOAD });
	dispatch({ type: SEARCH_CUSTOMERCARE_RELOAD });
	dispatch({ type: SEARCH_SUPERADMIN_RELOAD });
	dispatch({ type: SEARCH_DATA_BUNDLE_RELOAD });
	dispatch({ type: SEARCH_BILLER_RELOAD });
	dispatch({ type: SEARCH_PRODUCTS_RELOAD });
	dispatch({ type: SEARCH_CATEGORY_RELOAD });
	dispatch({ type: SEARCH_DATA_RELOAD });
	dispatch({ type: SEARCH_AIRTIME_RELOAD });
	dispatch({ type: SEARCH_EDUCATION_RELOAD });
	dispatch({ type: SEARCH_BIZ_RELOAD });
	dispatch({ type: SEARCH_ELECTRICITY_RELOAD });
	dispatch({ type: SEARCH_CABLE_RELOAD });
	dispatch({ type: SEARCH_WALLET_RELOAD });
	dispatch({ type: SEARCH_TRANSACTION_RELOAD });
	dispatch({ type: SEARCH_MY_TRANSACTION_RELOAD });
	dispatch({ type: SEARCH_CONVERTER_RELOAD });
	dispatch({ type: SEARCH_PENDING_HISTORY_RELOAD });
	dispatch({ type: SEARCH_PENDING_HISTORY_VIRTUAL_RELOAD });
	dispatch({ type: SEARCH_PENDING_HISTORY_CARD_RELOAD });
	dispatch({ type: SEARCH_VERIFY_RELOAD });
	dispatch({ type: SEARCH_RELOAD });
};

// MANAGE USER ACTION
export const manageUserPrivilege =
	(userData, id, privilege, type) => async dispatch => {
		try {
			let res;
			if (!id)
				res = await axios.post(`/api/v1/user/manage-users`, { ...userData });
			else if (type === "delete") {
				res = await axios.delete(`/api/v1/user/manage-users/${id}`);
			} else
				res = await axios.put(`/api/v1/user/manage-users${id}`, {
					...userData,
				});
			// console.log({ data: res.data });

			dispatch({
				type: id
					? type === "delete"
						? DELETE_ADMIN
						: UPDATE_ADMIN
					: privilege === "superadmin"
					? ADD_SUPERADMIN
					: privilege === "manager"
					? ADD_MANAGERS
					: privilege === "marketer"
					? ADD_MARKETERS
					: privilege === "customer-care"
					? ADD_CUSTOMERCARE
					: privilege === "developer"
					? ADD_DEVELOPERS
					: privilege === "accountant"
					? ADD_ACCOUNTANT
					: ADD_ADMIN,
				payload: type === "delete" ? userData : res.data,
			});
			dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
		} catch (err) {
			if (err) console.log(err.response?.data?.error, { err });
			if (err?.response?.status === 429 || err?.response?.status === 405)
				toast.error(err?.response?.data ? err?.response?.data : err?.message);
			let error = err.response?.data?.error;
			if (error)
				dispatch(returnErrors({ error, status: err?.response?.status }));
			dispatch({ type: ADD_MARKETERS_FAIL });
			dispatch({ type: ADD_CUSTOMERCARE_FAIL });
			dispatch({ type: ADD_SUPERADMIN_FAIL });
			dispatch({ type: ADD_MANAGERS_FAIL });
			dispatch({ type: ADD_ACCOUNTANT_FAIL });
			dispatch({ type: ADD_DEVELOPERS_FAIL });
			dispatch({ type: ADD_EMPLOYEE_FAIL });
		}
	};

export const getUserPrivileges = (type, data) => async dispatch => {
	try {
		console.log({ data });

		if (typeof data !== "string" && data?.search) {
			console.log("hi", { data });

			dispatch({
				type:
					type === "superadmin"
						? SEARCH_SUPERADMIN_LOADING
						: type === "manager"
						? SEARCH_MANAGERS_LOADING
						: type === "accountant"
						? SEARCH_ACCOUNTANT_LOADING
						: type === "developer"
						? SEARCH_DEVELOPERS_LOADING
						: type === "marketer"
						? SEARCH_MARKETERS_LOADING
						: type === "customer-care"
						? SEARCH_CUSTOMERCARE_LOADING
						: type === "topuser"
						? SEARCH_TOPUSERS_LOADING
						: type === "reseller"
						? SEARCH_RESELLERS_LOADING
						: type === "user"
						? SEARCH_USERS_LOADING
						: null,
			});
		}
		let res = await axios.get(
			`/api/v1/user/manage-users?type=${type}&nocgbalance=nocgbalance${
				data?.limit ? `&limit=${data?.limit}` : ""
			}
			${typeof data !== "string" && data?.search ? `&search=${data?.search}` : ""}
			`
		);

		dispatch({
			type:
				type === "superadmin"
					? typeof data !== "string" && data?.search
						? SEARCH_SUPERADMIN
						: GET_SUPERADMIN
					: type === "manager"
					? typeof data !== "string" && data?.search
						? SEARCH_MANAGERS
						: GET_MANAGERS
					: type === "accountant"
					? typeof data !== "string" && data?.search
						? SEARCH_ACCOUNTANT
						: GET_ACCOUNTANT
					: type === "developer"
					? typeof data !== "string" && data?.search
						? SEARCH_DEVELOPERS
						: GET_DEVELOPERS
					: type === "marketer"
					? typeof data !== "string" && data?.search
						? SEARCH_MARKETERS
						: GET_MARKETERS
					: type === "customer-care"
					? typeof data !== "string" && data?.search
						? SEARCH_CUSTOMERCARE
						: GET_CUSTOMERCARE
					: type === "topuser"
					? typeof data !== "string" && data?.search
						? SEARCH_TOPUSERS
						: GET_TOPUSERS
					: type === "standalone"
					? typeof data !== "string" && data?.search
						? SEARCH_STANDALONE
						: GET_STANDALONE
					: type === "reseller"
					? typeof data !== "string" && data?.search
						? SEARCH_RESELLERS
						: GET_RESELLERS
					: type === "user"
					? typeof data !== "string" && data?.search
						? SEARCH_USERS
						: GET_USERS
					: null,
			payload: res.data,
			search: typeof data !== "string" && data?.search ? data?.search : "",
		});
		if (!data) {
			let res2 = await axios.get(
				`/api/v1/user/manage-users?type=${type}&pagination=not`
			);

			dispatch({
				type:
					type === "superadmin"
						? GET_ALL_SUPERADMIN
						: type === "manager"
						? GET_ALL_MANAGERS
						: type === "accountant"
						? GET_ALL_ACCOUNTANT
						: type === "developer"
						? GET_ALL_DEVELOPERS
						: type === "marketer"
						? GET_ALL_MARKETERS
						: type === "customer-care"
						? GET_ALL_CUSTOMERCARE
						: type === "topuser"
						? GET_ALL_TOPUSERS
						: type === "reseller"
						? GET_ALL_RESELLERS
						: type === "user"
						? GET_ALL_USER
						: null,
				payload: res2.data,
			});
		}
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		dispatch({
			type:
				type === "superadmin"
					? data?.search
						? SEARCH_SUPERADMIN_FAIL
						: GET_SUPERADMIN_FAIL
					: type === "manager"
					? data?.search
						? SEARCH_MANAGERS_FAIL
						: GET_MANAGERS_FAIL
					: type === "accountant"
					? data?.search
						? SEARCH_ACCOUNTANT_FAIL
						: GET_ACCOUNTANT_FAIL
					: type === "developer"
					? data?.search
						? SEARCH_DEVELOPERS_FAIL
						: GET_DEVELOPERS_FAIL
					: type === "marketer"
					? data?.search
						? SEARCH_MARKETERS_FAIL
						: GET_MARKETERS_FAIL
					: type === "customer-care"
					? data?.search
						? SEARCH_CUSTOMERCARE_FAIL
						: GET_CUSTOMERCARE_FAIL
					: type === "topuser"
					? data?.search
						? SEARCH_TOPUSERS_FAIL
						: GET_TOPUSERS_FAIL
					: type === "standalone"
					? data?.search
						? SEARCH_STANDALONE_FAIL
						: GET_STANDALONE_FAIL
					: type === "reseller"
					? data?.search
						? SEARCH_RESELLERS_FAIL
						: GET_RESELLERS_FAIL
					: type === "user"
					? data?.search
						? SEARCH_USERS_FAIL
						: GET_USERS_FAIL
					: null,
		});
	}
};

export const getAllUserPrivileges = data => async dispatch => {
	try {
		if (data?.search) {
			dispatch({
				type: SEARCH_ALL_USERS_LOADING,
			});
		}
		let res = await axios.get(
			`/api/v1/user/manage-users/all-users?type=all&nocgbalance=nocgbalance${
				data?.limit ? `&limit=${data?.limit}` : ""
			}
			${data?.search ? `&search=${data?.search}` : ""}
			`
		);

		dispatch({
			type: data?.search ? SEARCH_ALL_USERS : GET_ALL_USERS,
			payload: res.data,
			search: data?.search ? data?.search : "",
		});

		let res2 = await axios.get(
			`/api/v1/user/manage-users/all-users?type=all${
				data?.limit ? `&limit=${data?.limit}` : ""
			}
			${data?.search ? `&search=${data?.search}` : ""}
			`
		);

		dispatch({
			type: data?.search ? SEARCH_ALL_USERS : GET_ALL_USERS,
			payload: res2?.data,
			search: data?.search ? data?.search : "",
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		dispatch({
			type: data?.search ? SEARCH_ALL_USERS_FAIL : GET_ALL_USERS_FAIL,
		});
	}
};

// One user (same shape as the entries of the user list). Resolves with the user, or null.
// Used by the profile page when the user is not already in a loaded list, so the admin app no
// longer has to download every user at login.
export const getUserProfile = id => async () => {
	try {
		let res = await axios.get(`/api/v1/user/manage-users/profile/${id}`);
		return res?.data?.data || null;
	} catch (err) {
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		return null;
	}
};

// Users of one privilege (or everyone) for the Excel export. Loaded only when the export
// button is clicked and NOT stored in the app state. Resolves with an array.
export const getUsersForExport = privilege => async () => {
	try {
		let res = await axios.get(
			`/api/v1/user/manage-users/all-users?type=all&nocgbalance=nocgbalance${
				privilege ? `&privilege=${encodeURIComponent(privilege)}` : ""
			}`
		);
		return res?.data?.data || [];
	} catch (err) {
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		toast.error(
			err?.response?.data?.error?.[0]?.msg ||
				err?.message ||
				"Could not load users"
		);
		return null;
	}
};

export const manageUserActiveness =
	(id, action, change, get, data, authorizer) => async dispatch => {
		try {
			if (get) {
				if (action === "wallet")
					dispatch({ type: WALLET_HISTORY_USER_LOADING });
				if (action === "purchase")
					dispatch({ type: PURCHASE_HISTORY_USER_LOADING });
			}
			let res;
			if (get) {
				if (authorizer) {
					console.log({ id, action, change, get, data, authorizer });
					if (action === "wallet")
						res = await axios.get(
							`/api/v1/wallet?type=all&authorizer=${authorizer}${
								data?.limit ? `&limit=${data?.limit}` : ""
							}${data?.search ? `&search=${data?.search}` : ""}`
						);
					else
						res = await axios.get(
							`/api/v1/transactions?type=all&authorizer=${authorizer}${
								data?.limit ? `&limit=${data?.limit}` : ""
							}${data?.search ? `&search=${data?.search}` : ""}`
						);
				} else {
					res = await axios.get(
						`/api/v1/user/manage-users/${id}?type=${action}`
					);
				}
			} else if (data)
				res = await axios.patch(
					`/api/v1/user/manage-users/${id}?type=${action}`,
					{ ...data }
				);
			else if (!change)
				res = await axios.post(
					`/api/v1/user/manage-users/${id}?type=${action}`
				);
			else
				res = await axios.put(`/api/v1/user/manage-users/${id}?type=${action}`);
			dispatch({
				type: get
					? action === "wallet"
						? WALLET_HISTORY_USER
						: PURCHASE_HISTORY_USER
					: ACTIVATE_USER,
				payload: res.data,
			});
			if (!get) dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
		} catch (err) {
			if (err) console.log(err.response?.data?.error, { err });
			if (err?.response?.status === 429 || err?.response?.status === 405)
				toast.error(err?.response?.data ? err?.response?.data : err?.message);
			if (!get) {
				let error = err.response?.data?.error;
				if (error)
					dispatch(returnErrors({ error, status: err?.response?.status }));
			}
			dispatch({
				type: get
					? action === "wallet"
						? WALLET_HISTORY_USER_FAIL
						: PURCHASE_HISTORY_USER_FAIL
					: ACTIVATE_USER_FAIL,
			});
		}
	};

export const getAllUserTransactionAmount =
	(type, notransact) => async dispatch => {
		try {
			let res = await axios.put(
				`/api/v1/user/manage-users/all-users?type=${type || "all"}${
					notransact ? `&notransact=notransact` : ""
				}`
			);

			dispatch({
				type:
					type === "user"
						? TRANSACTION_DETAILS_USER
						: type === "reseller"
						? TRANSACTION_DETAILS_RESELLER
						: type === "standalone"
						? TRANSACTION_DETAILS_STANDALONE
						: type === "topuser"
						? TRANSACTION_DETAILS_TOPUSER
						: type === "customer-care"
						? TRANSACTION_DETAILS_CUSTOMERCARE
						: type === "marketer"
						? TRANSACTION_DETAILS_MARKETERS
						: type === "manager"
						? TRANSACTION_DETAILS_MANAGERS
						: type === "developer"
						? TRANSACTION_DETAILS_DEVELOPERS
						: type === "accountant"
						? TRANSACTION_DETAILS_ACCOUNTANT
						: type === "superadmin"
						? TRANSACTION_DETAILS_SUPERADMIN
						: TRANSACTION_DETAILS,
				payload: res.data,
			});
		} catch (err) {
			if (err) console.log({ err });
			if (err) console.log(err?.response ? err?.response?.data : err?.message);
		}
	};