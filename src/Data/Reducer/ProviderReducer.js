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
	DELETE_BILLER,
	DELETE_CATEGORY,
	DELETE_NETWORK,
	DELETE_PRODUCTS,
	GET_BILLER,
	GET_BILLER_CHOOSEN,
	GET_BILLER_FAIL,
	GET_BILLER_FUNDING,
	GET_BILLER_HONOURWORLD,
	GET_BILLER_HUSMO,
	GET_BILLER_DATASTATION,
	GET_BILLER_OGDAMS,
	GET_BILLER_RINGO,
	GET_BILLER_SMEPLUG,
	GET_BILLER_VTPASS,
	GET_CATEGORY,
	GET_CATEGORY_FAIL,
	GET_CHOSEN_SERVICES,
	GET_HONOURWORLD_DATA,
	GET_HUSMO,
	GET_DATASTATION,
	GET_MCD,
	GET_NETWORK,
	GET_OGDAMS,
	GET_PRODUCTS,
	GET_PRODUCTS_FAIL,
	GET_RINGO_DATA,
	GET_RPI_DATA,
	GET_RPI_DATA_PLAN,
	GET_UZOBEST,
	GET_VTPASS,
	LOGOUT,
	SEARCH_BILLER,
	SEARCH_BILLER_FAIL,
	SEARCH_BILLER_LOADING,
	SEARCH_BILLER_RELOAD,
	SEARCH_CATEGORY,
	SEARCH_CATEGORY_FAIL,
	SEARCH_CATEGORY_LOADING,
	SEARCH_CATEGORY_RELOAD,
	SEARCH_PRODUCTS,
	SEARCH_PRODUCTS_FAIL,
	SEARCH_PRODUCTS_LOADING,
	SEARCH_PRODUCTS_RELOAD,
	UPDATE_BILLER,
	UPDATE_CATEGORY,
	UPDATE_NETWORK,
	UPDATE_PRODUCTS,
	GET_TEETOP,
	GET_BILLER_TEETOP,
	GET_DATAMESOLUTION,
	GET_BILLER_DATAMESOLUTION,
	GET_MOAVOXPAY,
	GET_KEMTECH,
	GET_BILLER_MOAVOXPAY,
	GET_BILLER_KEMTECH,
	GET_CLUBKONNECT,
	GET_BILLER_CLUBKONNECT,
	GET_CONNECTSMS,
	GET_MASKAWASUB,
	GET_BILLER_MASKAWASUB,
	GET_VICKYBEST,
	GET_BILLER_VICKYBEST,
	GET_ROSSYTECHS,
	GET_BILLER_ROSSYTECHS,
	GET_KVDATA,
	GET_BILLER_KVDATA,
	GET_TERMII,
	GET_GLADTIDINGSDATA,
	GET_BILLER_GLADTIDINGSDATA,
	GET_UZOBEST_BALANCE,
	GET_UZOBESTGSM,
	GET_BILLER_UZOBESTGSM,
	GET_GEODNATECHSUB,
	GET_BILLER_GEODNATECHSUB,
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
	GET_SIRPDATA,
	GET_BILLER_SIRPDATA,
	GET_FORDLINK,
	GET_BILLER_FORDLINK,
	GET_MERCYFOUND,
	GET_BILLER_MERCYFOUND,
	GET_EDIVATELECOMM,
} from "@/Data/Actions/ActionTypes";
import { DeleteData, EditData } from "@/Data/Reducer/AuthReducer";

let initialStateA = {
	data: null,
	isAdded: false,
	isUpdated: false,
	isDeleted: false,
};

export const NetworkReducer = (state = initialStateA, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_NETWORK:
			return {
				data,
			};
		case ADD_NETWORK:
			return {
				data: [data, ...state.data],
				isAdded: true,
			};
		case UPDATE_NETWORK:
			return {
				data: EditData(state?.data, data),
				isUpdated: true,
			};
		case DELETE_NETWORK:
			return {
				data: DeleteData(state.data, data),
				isDeleted: true,
			};
		case ADD_NETWORK_FAIL:
			return {
				...state,
				isAdded: false,
				isUpdated: false,
				isDeleted: false,
			};
		case LOGOUT:
			return initialStateA;
		default:
			return state;
	}
};

let initialState = {
	data: null,
};

export const ChoosenReducer = (state = initialState, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_CHOSEN_SERVICES:
			return {
				data,
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};
let initialTeetop = {
	data: null,
};

export const TeetopReducer = (state = initialTeetop, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_TEETOP:
			return {
				data,
			};
		case LOGOUT:
			return initialTeetop;
		default:
			return state;
	}
};

let initialMoavoxpay = {
	data: null,
};

export const MoavoxpayReducer = (state = initialMoavoxpay, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_MOAVOXPAY:
			return {
				data,
			};
		case LOGOUT:
			return initialMoavoxpay;
		default:
			return state;
	}
};

export const MercyfoundReducer = (state = initialMoavoxpay, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_MERCYFOUND:
			return {
				data,
			};
		case LOGOUT:
			return initialMoavoxpay;
		default:
			return state;
	}
};

let initialKemtech = {
	data: null,
};

export const KemtechReducer = (state = initialKemtech, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_KEMTECH:
			return {
				data,
			};
		case LOGOUT:
			return initialKemtech;
		default:
			return state;
	}
};

let initialStateVt = {
	data: null,
};

export const VtpassReducer = (state = initialStateVt, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_VTPASS:
			return {
				data,
			};
		case LOGOUT:
			return initialStateVt;
		default:
			return state;
	}
};

let initialStateClub = {
	data: null,
};

export const ClubKonnectReducer = (state = initialStateClub, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_CLUBKONNECT:
			return {
				data,
			};
		case LOGOUT:
			return initialStateH;
		default:
			return state;
	}
};
let initialStateConnectSMS = {
	data: null,
};

export const ConnectSMSReducer = (state = initialStateConnectSMS, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_CONNECTSMS:
			return {
				data,
			};
		case LOGOUT:
			return initialStateConnectSMS;
		default:
			return state;
	}
};

export const TermiiReducer = (state = initialStateConnectSMS, action) => {
	let { type, payload } = action;
	let data = payload?.data || payload;

	switch (type) {
		case GET_TERMII:
			return {
				data,
			};
		case LOGOUT:
			return initialStateConnectSMS;
		default:
			return state;
	}
};

let initialStateH = {
	data: null,
};

export const HusmoReducer = (state = initialStateH, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_HUSMO:
			return {
				data,
			};
		case LOGOUT:
			return initialStateH;
		default:
			return state;
	}
};

let initialStateDMS = {
	data: null,
};

export const DataMeSolutionReducer = (state = initialStateDMS, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_DATAMESOLUTION:
			return {
				data,
			};
		case LOGOUT:
			return initialStateDMS;
		default:
			return state;
	}
};

export const MaskawasubReducer = (state = initialStateDMS, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_MASKAWASUB:
			return {
				data,
			};
		case LOGOUT:
			return initialStateDMS;
		default:
			return state;
	}
};
export const VickybestReducer = (state = initialStateDMS, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_VICKYBEST:
			return {
				data,
			};
		case LOGOUT:
			return initialStateDMS;
		default:
			return state;
	}
};

let initialStateDS = {
	data: null,
};

export const KvdataReducer = (state = initialStateDS, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_KVDATA:
			return {
				data,
			};
		case LOGOUT:
			return initialStateDS;
		default:
			return state;
	}
};

export const GladtidingsdataReducer = (state = initialStateDS, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_GLADTIDINGSDATA:
			return {
				data,
			};
		case LOGOUT:
			return initialStateDS;
		default:
			return state;
	}
};

export const FrankeyconnectReducer = (state = initialStateDS, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_FRANKEYCONNECT:
			return {
				data,
			};
		case LOGOUT:
			return initialStateDS;
		default:
			return state;
	}
};

export const LegitdatawayReducer = (state = initialStateDS, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_LEGITDATAWAY:
			return {
				data,
			};
		case LOGOUT:
			return initialStateDS;
		default:
			return state;
	}
};

export const PearstelecomReducer = (state = initialStateDS, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_PEARSTELECOM:
			return {
				data,
			};
		case LOGOUT:
			return initialStateDS;
		default:
			return state;
	}
};

export const SalompayReducer = (state = initialStateDS, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_SALOMPAY:
			return {
				data,
			};
		case LOGOUT:
			return initialStateDS;
		default:
			return state;
	}
};

export const SirpdataReducer = (state = initialStateDS, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_SIRPDATA:
			return {
				data,
			};
		case LOGOUT:
			return initialStateDS;
		default:
			return state;
	}
};

export const WapayReducer = (state = initialStateDS, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_WAPAY:
			return {
				data,
			};
		case LOGOUT:
			return initialStateDS;
		default:
			return state;
	}
};

export const EdivatelecommReducer = (state = initialStateDS, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_EDIVATELECOMM:
			return {
				data,
			};
		case LOGOUT:
			return initialStateDS;
		default:
			return state;
	}
};

export const GeodnatechsubReducer = (state = initialStateDS, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_GEODNATECHSUB:
			return {
				data,
			};
		case LOGOUT:
			return initialStateDS;
		default:
			return state;
	}
};
export const belloVenturesReducer = (state = initialStateDS, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_BELLOVENTURES:
			return {
				data,
			};
		case LOGOUT:
			return initialStateDS;
		default:
			return state;
	}
};

export const fordlinkReducer = (state = initialStateDS, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_FORDLINK:
			return {
				data,
			};
		case LOGOUT:
			return initialStateDS;
		default:
			return state;
	}
};

export const UzobestgsmReducer = (state = initialStateDS, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_UZOBESTGSM:
			return {
				data,
			};
		case LOGOUT:
			return initialStateDS;
		default:
			return state;
	}
};

export const DataStationReducer = (state = initialStateDS, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_DATASTATION:
			return {
				data,
			};
		case LOGOUT:
			return initialStateDS;
		default:
			return state;
	}
};

export const RossyTechsReducer = (state = initialStateDS, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_ROSSYTECHS:
			return {
				data,
			};
		case LOGOUT:
			return initialStateDS;
		default:
			return state;
	}
};

let initialStateR = {
	data: null,
};

export const RingoReducer = (state = initialStateR, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_RINGO_DATA:
			return {
				data: data?.wallet?.wallet,
			};
		case LOGOUT:
			return initialStateR;
		default:
			return state;
	}
};

let initialStateMCD = {
	data: null,
};

export const MCDReducer = (state = initialStateMCD, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_MCD:
			return {
				...state,
				data,
			};
		case LOGOUT:
			return initialStateMCD;
		default:
			return state;
	}
};

let initialState2 = {
	data: null,
};

export const OgdamsReducer = (state = initialState2, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_OGDAMS:
			return {
				data: data?.msg,
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};

let initialState3 = {
	data: null,
};

export const RPIDataReducer = (state = initialState3, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_RPI_DATA:
			return {
				data,
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};

let initialStateHon = {
	data: null,
};

export const HonourworldReducer = (state = initialStateHon, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_HONOURWORLD_DATA:
			return {
				data,
			};
		case LOGOUT:
			return initialStateHon;
		default:
			return state;
	}
};

let initialStateUzo = {
	data: null,
};

export const UzobesDataReducer = (state = initialStateUzo, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_UZOBEST_BALANCE:
			return {
				data,
			};
		case LOGOUT:
			return initialStateUzo;
		default:
			return state;
	}
};

const initialState4 = {
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
	ogdams: null,
	ringo: null,
	smeplug: null,
	chosen: null,
	husmo: null,
	datastation: null,
	kvdata: null,
	gladtidingsdata: null,
	geodnatechsub: null,
	belloventures: null,
	fordlink: null,
	frankeyconnect: null,
	legitdataway: null,
	salompay: null,
	sirpdata: null,
	wapay: null,
	uzobestgsm: null,
	rossytechs: null,
	datamesolution: null,
	maskawasub: null,
	uzobest: null,
	honourworld: null,
	vtpass: null,
	rpi: null,
	funding: [],
	isFunded: false,
};

export const BillerReducer = (state = initialState4, action) => {
	const { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case SEARCH_BILLER:
			return {
				...state,
				isFound: true,
				searchLoading: false,
				mainSearch: data || [],
				search: action.search,
				search_paginate: payload?.paginate,
			};
		case SEARCH_BILLER_FAIL:
			return {
				...state,
				searchLoading: false,
				mainSearch: state.mainSearch,
				search_paginate: state.search_paginate,
			};
		case SEARCH_BILLER_LOADING:
			return {
				...state,
				searchLoading: true,
			};
		case SEARCH_BILLER_RELOAD:
			return {
				...state,
				isFound: false,
				searchLoading: false,
			};
		case GET_BILLER:
			return {
				...state,
				isLoading: false,
				data: data || [],
				paginate: payload?.paginate,
			};
		case GET_BILLER_FAIL:
			return {
				...state,
				isLoading: false,
			};
		case ADD_BILLER:
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
		case DELETE_BILLER:
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
		case ADD_BILLER_FAIL:
			return {
				...state,
				isLoading: false,
				isUpdated: false,
				isAdded: false,
				isDeleted: false,
			};
		case UPDATE_BILLER:
			return {
				...state,
				isUpdated: true,
				data: EditData(state?.data, data),
				mainSearch: EditData(state?.mainSearch, data),
			};
		case GET_BILLER_RINGO:
			return {
				...state,
				isLoading: false,
				ringo: data || null,
			};
		case GET_BILLER_HUSMO:
			return {
				...state,
				isLoading: false,
				husmo: data || null,
			};
		case GET_BILLER_CLUBKONNECT:
			return {
				...state,
				isLoading: false,
				clubkonnect: data || null,
			};
		case GET_BILLER_DATASTATION:
			return {
				...state,
				isLoading: false,
				datastation: data || null,
			};
		case GET_BILLER_KVDATA:
			return {
				...state,
				isLoading: false,
				kvdata: data || null,
			};
		case GET_BILLER_GLADTIDINGSDATA:
			return {
				...state,
				isLoading: false,
				gladtidingsdata: data || null,
			};
		case GET_BILLER_GEODNATECHSUB:
			return {
				...state,
				isLoading: false,
				geodnatechsub: data || null,
			};
		case GET_BILLER_BELLOVENTURES:
			return {
				...state,
				isLoading: false,
				belloventures: data || null,
			};
		case GET_BILLER_FORDLINK:
			return {
				...state,
				isLoading: false,
				fordlink: data || null,
			};
		case GET_BILLER_FRANKEYCONNECT:
			return {
				...state,
				isLoading: false,
				frankeyconnect: data || null,
			};
		case GET_BILLER_LEGITDATAWAY:
			return {
				...state,
				isLoading: false,
				legitdataway: data || null,
			};
		case GET_BILLER_SALOMPAY:
			return {
				...state,
				isLoading: false,
				salompay: data || null,
			};
		case GET_BILLER_SIRPDATA:
			return {
				...state,
				isLoading: false,
				sirpdata: data || null,
			};
		case GET_BILLER_WAPAY:
			return {
				...state,
				isLoading: false,
				wapay: data || null,
			};
		case GET_BILLER_UZOBESTGSM:
			return {
				...state,
				isLoading: false,
				uzobestgsm: data || null,
			};
		case GET_BILLER_ROSSYTECHS:
			return {
				...state,
				isLoading: false,
				rossytechs: data || null,
			};
		case GET_BILLER_DATAMESOLUTION:
			return {
				...state,
				isLoading: false,
				datamesolution: data || null,
			};
		case GET_BILLER_MASKAWASUB:
			return {
				...state,
				isLoading: false,
				maskawasub: data || null,
			};
		case GET_BILLER_VICKYBEST:
			return {
				...state,
				isLoading: false,
				vickybest: data || null,
			};
		case GET_BILLER_TEETOP:
			return {
				...state,
				isLoading: false,
				teetop: data || null,
			};
		case GET_BILLER_MOAVOXPAY:
			return {
				...state,
				isLoading: false,
				moavoxpay: data || null,
			};
		case GET_BILLER_MERCYFOUND:
			return {
				...state,
				isLoading: false,
				mercyfound: data || null,
			};
		case GET_BILLER_KEMTECH:
			return {
				...state,
				isLoading: false,
				kemtech: data || null,
			};
		case GET_UZOBEST:
			console.log({ uzo: payload });
			return {
				...state,
				isLoading: false,
				uzobest: data || null,
				uzobest_cables: payload?.cables,
			};
		case GET_RPI_DATA_PLAN:
			return {
				...state,
				isLoading: false,
				rpi: data || null,
			};
		case GET_BILLER_HONOURWORLD:
			return {
				...state,
				isLoading: false,
				honourworld: data || null,
			};
		case GET_BILLER_VTPASS:
			return {
				...state,
				isLoading: false,
				vtpass: data || null,
			};
		case GET_BILLER_OGDAMS:
			return {
				...state,
				isLoading: false,
				ogdams: data || null,
			};
		case GET_BILLER_SMEPLUG:
			return {
				...state,
				isLoading: false,
				smeplug: data || null,
			};
		case GET_BILLER_CHOOSEN:
			return {
				...state,
				isLoading: false,
				chosen: data || null,
			};
		case GET_BILLER_FUNDING:
			return { ...state, funding: data };
		case ADD_BILLER_FUNDING:
			return { ...state, funding: [data, ...state.funding], isFunded: true };
		case ADD_BILLER_FUNDING_FAIL:
			return { ...state, isFunded: false };
		case LOGOUT:
			return initialState4;
		default:
			return state;
	}
};

const initialState5 = {
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

export const CategoryReducer = (state = initialState5, action) => {
	const { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case SEARCH_CATEGORY:
			return {
				...state,
				isFound: true,
				searchLoading: false,
				mainSearch: data || [],
				search: action.search,
				search_paginate: payload?.paginate,
			};
		case SEARCH_CATEGORY_FAIL:
			return {
				...state,
				searchLoading: false,
				mainSearch: state.mainSearch,
				search_paginate: state.search_paginate,
			};
		case SEARCH_CATEGORY_LOADING:
			return {
				...state,
				searchLoading: true,
			};
		case SEARCH_CATEGORY_RELOAD:
			return {
				...state,
				isFound: false,
				searchLoading: false,
			};
		case GET_CATEGORY:
			return {
				...state,
				isLoading: false,
				data: data || [],
				paginate: payload?.paginate,
			};
		case GET_CATEGORY_FAIL:
			return {
				...state,
				isLoading: false,
			};
		case ADD_CATEGORY:
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
		case DELETE_CATEGORY:
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
		case ADD_CATEGORY_FAIL:
			return {
				...state,
				isLoading: false,
				isUpdated: false,
				isAdded: false,
				isDeleted: false,
			};
		case UPDATE_CATEGORY:
			return {
				...state,
				isUpdated: true,
				data: EditData(state?.data, data),
				mainSearch: EditData(state?.mainSearch, data),
			};
		case LOGOUT:
			return initialState5;
		default:
			return state;
	}
};

const initialState6 = {
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

export const ProductReducer = (state = initialState6, action) => {
	const { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case SEARCH_PRODUCTS:
			return {
				...state,
				isFound: true,
				searchLoading: false,
				mainSearch: data || [],
				search: action.search,
				search_paginate: payload?.paginate,
			};
		case SEARCH_PRODUCTS_FAIL:
			return {
				...state,
				searchLoading: false,
				mainSearch: state.mainSearch,
				search_paginate: state.search_paginate,
			};
		case SEARCH_PRODUCTS_LOADING:
			return {
				...state,
				searchLoading: true,
			};
		case SEARCH_PRODUCTS_RELOAD:
			return {
				...state,
				isFound: false,
				searchLoading: false,
			};
		case GET_PRODUCTS:
			return {
				...state,
				isLoading: false,
				data: data || [],
				paginate: payload?.paginate,
			};
		case GET_PRODUCTS_FAIL:
			return {
				...state,
				isLoading: false,
			};
		case ADD_PRODUCTS:
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
		case DELETE_PRODUCTS:
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
		case ADD_PRODUCTS_FAIL:
			return {
				...state,
				isLoading: false,
				isUpdated: false,
				isAdded: false,
				isDeleted: false,
			};
		case UPDATE_PRODUCTS:
			return {
				...state,
				isUpdated: true,
				data: EditData(state?.data, data),
				mainSearch: EditData(state?.mainSearch, data),
			};
		case LOGOUT:
			return initialState6;
		default:
			return state;
	}
};
