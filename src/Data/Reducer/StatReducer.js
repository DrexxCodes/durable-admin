import {
	ADD_FAQS,
	ADD_FAQS_FAIL,
	ADD_MANUAL_BANKS,
	ADD_MANUAL_BANKS_FAIL,
	ADD_PRIVACY_POLICY,
	ADD_TERMS_CONDITIONS,
	COMMISSION_TRANSACTIONS_STAT,
	DATA_TRANSACTIONS_STAT,
	DELETE_FAQS,
	DELETE_MANUAL_BANKS,
	FIND_TRANSACTIONS_STAT,
	GET_BILLSTACK,
	GET_BUDPAY,
	GET_FAQS,
	GET_FLUTTERWAVE,
	GET_MANUAL,
	GET_MANUAL_BANKS,
	GET_MONNIFY,
	GET_PALMPAY,
	GET_PAYSTACK,
	GET_PAYVESSEL,
	GET_PRIVACY_POLICY,
	GET_PROVIDER_FAIL,
	GET_TERMS_CONDITIONS,
	LOGOUT,
	SEARCH_PROVIDER,
	SEARCH_PROVIDER_FAIL,
	SEARCH_PROVIDER_LOADING,
	SEARCH_RELOAD,
	TRANSACTIONS_STAT,
	UPDATE_FAQS,
	WALLET_PROVIDER_STAT,
} from "@/Data/Actions/ActionTypes";
import { DeleteData, EditData } from "@/Data/Reducer/AuthReducer";

let init2 = {
	data: [],
	transactions: null,
	finder: null,
	findLoad: false,
	dataFinder: null,
	banks: [],
	isAdded: false,
	isDeleted: false,
	commission: null,
};

export const ProviderStateReducer = (state = init2, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case WALLET_PROVIDER_STAT:
			return {
				...state,
				data,
			};
		case TRANSACTIONS_STAT:
			return {
				...state,
				transactions: data,
			};
		case COMMISSION_TRANSACTIONS_STAT:
			return {
				...state,
				commission: data,
			};
		case DATA_TRANSACTIONS_STAT:
			return {
				...state,
				dataFinder: data,
			};
		case FIND_TRANSACTIONS_STAT:
			return {
				...state,
				finder: data,
				findLoad: true,
			};
		case GET_MANUAL_BANKS:
			return { ...state, banks: data };
		case ADD_MANUAL_BANKS:
			return { ...state, banks: [data, ...state.banks], isAdded: true };
		case DELETE_MANUAL_BANKS:
			return {
				...state,
				banks: DeleteData(state.banks, data),
				isDeleted: true,
			};
		case ADD_MANUAL_BANKS_FAIL:
			return { ...state, isAdded: false, isDeleted: false };
		case LOGOUT:
			return init2;
		default:
			return state;
	}
};

let init = {
	data: [],
	isAdded: false,
	isDeleted: false,
};

export const FaqsReducer = (state = init, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_FAQS:
			return { ...state, data };
		case GET_TERMS_CONDITIONS:
			return { ...state, terms: data };
		case GET_PRIVACY_POLICY:
			return { ...state, privacy: data };
		case ADD_FAQS:
			return { ...state, data: [data, ...state.data], isAdded: true };
		case ADD_PRIVACY_POLICY:
			return { ...state, privacy: [data, ...state.privacy], isAdded: true };
		case ADD_TERMS_CONDITIONS:
			return { ...state, terms: [data, ...state.terms], isAdded: true };
		case DELETE_FAQS:
			return {
				...state,
				data: DeleteData(state?.data, data),
				privacy: DeleteData(state?.privacy, data),
				terms: DeleteData(state?.terms, data),
				isDeleted: true,
			};
		case UPDATE_FAQS:
			return {
				...state,
				data: EditData(state?.data, data),
				privacy: EditData(state?.privacy, data),
				terms: EditData(state?.terms, data),
				isAdded: true,
			};
		case ADD_FAQS_FAIL:
			return { ...state, isAdded: false, isDeleted: false };
		case LOGOUT:
			return init2;
		default:
			return state;
	}
};

let initFund = {
	monnify: [],
	monnify_paginate: null,
	paystack: [],
	paystack_paginate: null,
	flutterwave: [],
	flutterwave_paginate: null,
	manual: [],
	manual_paginate: null,
	isFound: null,
	searchLoading: null,
	mainSearch: [],
	search: "",
	search_paginate: null,
};

export const ProviderFundingReducer = (state = initFund, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case SEARCH_PROVIDER:
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
		case SEARCH_PROVIDER_FAIL:
			return {
				...state,
				searchLoading: false,
				mainSearch: state.mainSearch,
				search_paginate: state.search_paginate,
			};
		case SEARCH_PROVIDER_LOADING:
			return {
				...state,
				search: action.search,
				searchLoading: true,
			};
		case SEARCH_RELOAD:
			return {
				...state,
				isFound: false,
				searchLoading: false,
			};
		case GET_MONNIFY:
			return {
				...state,
				isLoading: false,
				monnify: payload?.data,
				monnify_paginate: payload?.paginate,
			};
		case GET_MANUAL:
			return {
				...state,
				isLoading: false,
				manual: payload?.data,
				manual_paginate: payload?.paginate,
			};
		case GET_PAYSTACK:
			return {
				...state,
				isLoading: false,
				paystack: payload?.data,
				paystack_paginate: payload?.paginate,
			};
		case GET_BUDPAY:
			return {
				...state,
				isLoading: false,
				budpay: payload?.data,
				budpay_paginate: payload?.paginate,
			};
		case GET_PAYVESSEL:
			return {
				...state,
				isLoading: false,
				payvessel: payload?.data,
				payvessel_paginate: payload?.paginate,
			};
		case GET_PALMPAY:
			return {
				...state,
				isLoading: false,
				palmpay: payload?.data,
				palmpay_paginate: payload?.paginate,
			};
		case GET_BILLSTACK:
			return {
				...state,
				isLoading: false,
				billstack: payload?.data,
				billstack_paginate: payload?.paginate,
			};
		case GET_FLUTTERWAVE:
			return {
				...state,
				isLoading: false,
				flutterwave: payload?.data,
				flutterwave_paginate: payload?.paginate,
			};
		case GET_PROVIDER_FAIL:
			return { ...state };
		case LOGOUT:
			return initFund;
		default:
			return state;
	}
};