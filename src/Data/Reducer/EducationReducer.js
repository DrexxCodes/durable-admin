import {
	ADD_EDUCATION,
	ADD_EDUCATION_BUNDLE,
	ADD_EDUCATION_BUNDLE_FAIL,
	ADD_EDUCATION_FAIL,
	CREATE_EDUCATION_PIN,
	DELETE_EDUCATION_BUNDLE,
	DELETE_EDUCATION_PIN,
	DELETE_TRANSACTION,
	DELETE_TRANSACTION_FAIL,
	GET_EDUCATION,
	GET_EDUCATION_BUNDLE,
	GET_EDUCATION_BUNDLE_FAIL,
	GET_EDUCATION_DIRECT,
	GET_EDUCATION_FAIL,
	GET_EDUCATION_LOADING,
	GET_EDUCATION_TO_BUY,
	LOGOUT,
	SEARCH_EDUCATION,
	SEARCH_EDUCATION_BUNDLE,
	SEARCH_EDUCATION_BUNDLE_FAIL,
	SEARCH_EDUCATION_BUNDLE_LOADING,
	SEARCH_EDUCATION_BUNDLE_RELOAD,
	SEARCH_EDUCATION_FAIL,
	SEARCH_EDUCATION_LOADING,
	SEARCH_EDUCATION_RELOAD,
	UPDATE_EDUCATION_BUNDLE,
} from "@/Data/Actions/ActionTypes";
import { DeleteData, EditData } from "@/Data/Reducer/AuthReducer";

const initialState = {
	isLoading: false,
	education: [],
	education_direct: [],
	isAdded: false,
	isDeleted: false,
	isFound: null,
	searchLoading: null,
	mainSearch: [],
	search: "",
	search_paginate: null,
	educationToBuy: null,
	pins: [],
	isCreated: false,
};

const EducationReducer = (state = initialState, action) => {
	const { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_EDUCATION_TO_BUY:
			return {
				...state,
				educationToBuy: data || [],
				pins: payload?.pins,
			};
		case CREATE_EDUCATION_PIN:
			return {
				...state,
				pins: [data, ...state.pins],
				isCreated: true,
			};
		case DELETE_EDUCATION_PIN:
			return {
				...state,
				pins: DeleteData(state.pins, payload),
				isDeleted: true,
			};
		case SEARCH_EDUCATION:
			return {
				...state,
				isFound: true,
				searchLoading: false,
				mainSearch: data,
				search: action.search,
				search_paginate: payload?.paginate,
			};
		case SEARCH_EDUCATION_FAIL:
			return {
				...state,
				searchLoading: false,
				mainSearch: state.mainSearch,
				search_paginate: state.search_paginate,
			};
		case SEARCH_EDUCATION_LOADING:
			return {
				...state,
				searchLoading: true,
			};
		case SEARCH_EDUCATION_RELOAD:
			return {
				...state,
				isFound: false,
				searchLoading: false,
			};
		case ADD_EDUCATION:
			return {
				...state,
				isAdded: true,
				education: [data, ...state.education],
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result + 1,
					total: state?.paginate?.total + 1,
				},
			};
		case ADD_EDUCATION_FAIL:
			return {
				...state,
				isAdded: false,
				isDeleted: false,
			};
		case GET_EDUCATION:
			return {
				...state,
				isLoading: false,
				education: data,
				paginate: payload?.paginate,
			};
		case DELETE_TRANSACTION:
			return {
				...state,
				mainSearch: DeleteData(state.mainSearch, payload),
				education: DeleteData(state.education, payload),
				isDeleted: true,
			};
		case DELETE_TRANSACTION_FAIL:
			return {
				...state,
				isDeleted: false,
			};
		case GET_EDUCATION_DIRECT:
			return {
				...state,
				education_direct: data,
			};
		case GET_EDUCATION_FAIL:
			return {
				...state,
				isLoading: false,
			};
		case GET_EDUCATION_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default EducationReducer;

const initialState3 = {
	isLoading: false,
	data: [],
	isAdded: false,
	isUpdated: false,
	paginate: null,
	isDeleted: null,
	isFound: null,
	searchLoading: null,
	mainSearch: [],
	search: "",
	search_paginate: null,
};

export const EducationBundleReducer = (state = initialState3, action) => {
	const { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case SEARCH_EDUCATION_BUNDLE:
			return {
				...state,
				isFound: true,
				searchLoading: false,
				mainSearch: data ? data : [],
				search: action.search,
				search_paginate: payload?.paginate,
			};
		case SEARCH_EDUCATION_BUNDLE_FAIL:
			return {
				...state,
				searchLoading: false,
				mainSearch: state.mainSearch,
				search_paginate: state.search_paginate,
			};
		case SEARCH_EDUCATION_BUNDLE_LOADING:
			return {
				...state,
				searchLoading: true,
			};
		case SEARCH_EDUCATION_BUNDLE_RELOAD:
			return {
				...state,
				isFound: false,
				searchLoading: false,
			};
		case GET_EDUCATION_BUNDLE:
			return {
				...state,
				isLoading: false,
				data: data ? data : [],
				paginate: payload?.paginate,
			};
		case GET_EDUCATION_BUNDLE_FAIL:
			return {
				...state,
				isLoading: false,
			};
		case ADD_EDUCATION_BUNDLE:
			return {
				...state,
				isAdded: true,
				data: [data, ...state?.data],
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result + 1,
					total: state?.paginate?.total + 1,
				},
			};
		case DELETE_EDUCATION_BUNDLE:
			return {
				...state,
				isDeleted: true,
				data: DeleteData(state?.data, data),
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result - 1,
					total: state?.paginate?.total - 1,
				},
			};
		case ADD_EDUCATION_BUNDLE_FAIL:
			return {
				...state,
				isLoading: false,
				isUpdated: false,
				isAdded: false,
				isDeleted: false,
			};
		case UPDATE_EDUCATION_BUNDLE:
			return {
				...state,
				isUpdated: true,
				data: EditData(state?.data, data),
				mainSearch: EditData(state?.mainSearch, data),
			};
		case LOGOUT:
			return initialState3;
		default:
			return state;
	}
};
