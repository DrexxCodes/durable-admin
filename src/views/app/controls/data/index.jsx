import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "@/Data/Context";
import Container from "@/components/ui/Container";
import { Buttons, EmptyComponent } from "@/Utils";
import { ModalComponents } from "@/features";
import { BiTrashAlt } from "react-icons/bi";
import { BsPen } from "react-icons/bs";
import { HiThumbDown, HiThumbUp } from "react-icons/hi";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "@/lib/router";
import { MdMoreHoriz } from "react-icons/md";
import { MainPaginate, MainRanger } from "@/features/Transactions";

const Data = () => {
	let { setStateName, toggleAvailabilty, getBillerData } =
		useContext(GlobalState);
	useEffect(() => {
		setStateName("Data Controls");
		getBillerData("vtpass");
		if (
			![
				"Vickybest Telecom",
				"V12 Pay",
				"Fantastic Fisayo",
				"Mel Data Services",
				"SPRINT DATA",
				"Vee's Telecom",
				"Bliz",
				"Allbrite Digitals",
				"Noney Data Plug",
				"Rosezee Telecom",
				"Durable Telecommunications",
				"MySub",
				"M.O Data Plug",
				// "ALLAHU LATEEF INTEGRATED SERVICES LIMITED",
				"Giwa Digital",
				"QuickTopUp Telecom",
				"OG DATA",
				"OG NETWORK",
				"DONATEL TELECOM",
				"Ediva Telecoms",
				"GEEK VTU",
				"Marachdata",
				"Marachsub",
				"Josh Data",
				"Easyclick Telecom",
				"Jerrybod Telecom",
				"My Mobile VTU",
				"Vv Group",
			]?.includes(process.env.REACT_APP_NAME)
		) {
			getBillerData("honourworld");
		}
		if (
			![
				// "Vickybest Telecom",
				"Fantastic Fisayo",
				// "Mel Data Services",
				// "Yema Telecommunications",
				// "SPRINT DATA",
				"Bliz",
				"Allbrite Digitals",
				"Noney Data Plug",
				"Durable Telecommunications",
				"MySub",
				"Giwa Digital",
				"QuickTopUp Telecom",
				// "OG DATA",
				// "OG NETWORK",
				// "DONATEL TELECOM",
				"GEEK VTU",
				"Marachdata",
				"Marachsub",
				"Josh Data",
				"Jerrybod Telecom",
				// "My Mobile VTU",
			]?.includes(process.env.REACT_APP_NAME)
		) {
			getBillerData("datastation");
		}
		if (
			[
				"Fantastic Fisayo",
				"Teetop Digital",
				"ALLAHU LATEEF INTEGRATED SERVICES LIMITED",
			]?.includes(process.env.REACT_APP_NAME)
		) {
			getBillerData("clubkonnect");
		}
		if (
			[
				"Durable Telecommunications",
				"Noney Data Plug",
				"Mel Data Services",
				"Giwa Digital",
				"Fantastic Fisayo",
				"Vickybest Telecom",
				"OG DATA",
				"OG NETWORK",
				"GEEK VTU",
				"Vee's Telecom",
				"Houseaid",
				"Easyclick Telecom",
				"Moztelecom",
				"Moavox Pay",
				"Rosezee Telecom",
				"ALLAHU LATEEF INTEGRATED SERVICES LIMITED",
				"My Mobile VTU",
				"MercyFound Global",
				"Yema Telecommunications",
				"Vv Group",
			]?.includes(process.env.REACT_APP_NAME)
		) {
			getBillerData("gladtidingsdata");
		}
		if (["Durable Telecommunications"]?.includes(process.env.REACT_APP_NAME)) {
			getBillerData("bello-ventures");
			// getBillerData("sirpdata");
			getBillerData("fordlink");
		}
		if (
			[
				"Vee's Telecom",
				"Vickybest Telecom",
				"Rosezee Telecom",
				"Fantastic Fisayo",
				"OG DATA",
				"OG NETWORK",
			]?.includes(process.env.REACT_APP_NAME)
		) {
			getBillerData("geodnatechsub");
		}
		if (
			[
				"Rosezee Telecom",
				"ALLAHU LATEEF INTEGRATED SERVICES LIMITED",
				// "Kemtech Enterprises",
			]?.includes(process.env.REACT_APP_NAME)
		) {
			getBillerData("frankeyconnect");
		}
		if (
			["Rosezee Telecom", "Vee's Telecom"]?.includes(process.env.REACT_APP_NAME)
		) {
			getBillerData("legitdataway");
		}
		if (
			["Durable Telecommunications", "Marachdata", "Marachsub"]?.includes(
				process.env.REACT_APP_NAME
			)
		) {
			getBillerData("kvdata");
		}
		if (["Giwa Digital"]?.includes(process.env.REACT_APP_NAME)) {
			getBillerData("uzobestgsm");
		}
		if (
			[
				"Teetop Digital",
				"Kemtech Enterprises",
				"MercyFound Global",
				"DONATEL TELECOM",
			]?.includes(process.env.REACT_APP_NAME)
		) {
			getBillerData("husmo");
			if (["Teetop Digital"]?.includes(process.env.REACT_APP_NAME))
				getBillerData("rossytechs");
		}
		if (
			[
				"Vickybest Telecom",
				// "V12 Pay",
				"Fantastic Fisayo",
				"Moztelecom",
				"Moavox Pay",
				"Mel Data Services",
				"Yema Telecommunications",
				"SPRINT DATA",
				"Bliz",
				"Vee's Telecom",
				"Allbrite Digitals",
				"Noney Data Plug",
				"Rosezee Telecom",
				"Durable Telecommunications",
				"MySub",
				"M.O Data Plug",
				"ALLAHU LATEEF INTEGRATED SERVICES LIMITED",
				"Giwa Digital",
				"OG DATA",
				"OG NETWORK",
				"DONATEL TELECOM",
				"Ediva Telecoms",
				"GEEK VTU",
				"Marachdata",
				"Marachsub",
				"Josh Data",
				"Easyclick Telecom",
				"Jerrybod Telecom",
				"My Mobile VTU",
			]?.includes(process.env.REACT_APP_NAME)
		) {
			getBillerData("teetop");
		}
		if (["Vickybest Telecom"]?.includes(process.env.REACT_APP_NAME)) {
			getBillerData("datamesolution");
		}
		if (["SPRINT DATA", "GEEK VTU"]?.includes(process.env.REACT_APP_NAME)) {
			getBillerData("maskawasub");
		}
		if (
			[
				"Vee's Telecom",
				"QuickTopUp Telecom",
				"V12 Pay",
				"My Mobile VTU",
			]?.includes(process.env.REACT_APP_NAME)
		) {
			getBillerData("vickybest");
		}
		if (
			[
				"Kemtech Enterprises",
				"V12 Pay",
				"Fantastic Fisayo",
				"Noney Data Plug",
				"Vickybest Telecom",
				"Mel Data Services",
				"Yema Telecommunications",
				"Rosezee Telecom",
				"Giwa Digital",
				"OG DATA",
				"Vee's Telecom",
				"OG NETWORK",
				"DONATEL TELECOM",
				"Bliz",
				"Josh Data",
				"Easyclick Telecom",
				// "Jerrybod Telecom",
				"My Mobile VTU",
			]?.includes(process.env.REACT_APP_NAME)
		) {
			getBillerData("moavoxpay");
		}
		if (["Vv Group"]?.includes(process.env.REACT_APP_NAME)) {
			getBillerData("mercyfound");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [isOpen, setIsOpen] = useState(false),
		[isOpenInit, setIsOpenInit] = useState(false),
		[data, setData] = useState(null),
		[others, setOthers] = useState(null),
		toggle = () => {
			if (isOpen) {
				if (data) setData(null);
				if (others) setOthers(null);
			}
			setIsOpen(!isOpen);
		},
		toggleInit = () => {
			setIsOpenInit(!isOpenInit);
		},
		[loading, setLoading] = useState(""),
		navigate = useNavigate(),
		{ auth, permission } = useContext(GlobalState);

	useEffect(() => {
		if (auth?.user?.privilege !== "superadmin") {
			let findTitle = "viewmanagedataplans";

			let findPermit = permission?.data?.find(
				item =>
					item?.slug === findTitle && item?.user?.includes(auth?.user?._id)
			);
			if (!findPermit) {
				navigate(-1);
			}
		}
	}, [auth?.user, permission?.data, navigate]);

	useEffect(() => {
		if (data) {
			setIsOpen(true);
		}
	}, [data]);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<h4 className="Lexend">All data plans</h4>{" "}
				<div className="btn-group">
					<Buttons
						title={"create new"}
						css="btn-primary1 text-capitalize py-md-3 py-2 px-4 px-lg-5 my-md-4 my-2 mb-0"
						width={"w-auto"}
						onClick={toggleInit}
						style={{ borderRadius: "30px" }}
					/>
					<Buttons
						title={"disable all"}
						css="btn-primary1 text-capitalize py-md-3 py-2 px-4 px-lg-5 my-md-4 my-2 mb-0 mx-1 mx-md-2"
						width={"w-auto"}
						onClick={async () => {
							setLoading("disable");
							await toggleAvailabilty("data", "disable");
							setLoading("");
						}}
						loading={loading === "disable"}
						style={{ borderRadius: "30px" }}
					/>
					<Buttons
						title={"enable all"}
						css="btn-primary1 text-capitalize py-md-3 py-2 px-4 px-lg-5 my-md-4 my-2 mb-0 mx-1 mx-md-2"
						width={"w-auto"}
						onClick={async () => {
							setLoading("enable");
							await toggleAvailabilty("data", "enable");
							setLoading("");
						}}
						loading={loading === "enable"}
						style={{ borderRadius: "30px" }}
					/>
				</div>
				<DataBundleDetails setData={setData} />
			</Container>{" "}
			<MakeDataBundle
				isOpen={isOpen}
				toggle={toggle}
				back={() => {
					toggle();
					toggleInit();
				}}
				datum={data}
				others={others}
			/>
			<BillerCategorySelection
				isOpen={isOpenInit}
				back={toggleInit}
				setOthers={setOthers}
				setData={setData}
			/>
		</div>
	);
};

export default Data;

const DataBundleDetails = ({ setData }) => {
	let { dataBundle, manageDataBundle, nairaSign, numberWithCommas } =
			useContext(GlobalState),
		[state, setState] = useState(null),
		[load, setLoad] = useState({ isLoad: false, loadData: "" }),
		[load2, setLoad2] = useState({ isLoad: false, loadData: "" }),
		navigate = useNavigate(),
		init = { biller: "", category: "", network: "" },
		[stateFilter, setStateFilter] = useState(init),
		[isFilter, setIsFilter] = useState(false),
		[isOpen, setIsOpen] = useState(false),
		textChange =
			name =>
			({ target: { value } }) => {
				setStateFilter({ ...stateFilter, [name]: value });
			},
		[loading, setLoading] = useState(false),
		handleSubmit = async e => {
			e?.preventDefault();
			setIsFilter(false);
			setLoading(true);
			let returnData = dataBundle?.data;
			if (stateFilter?.biller)
				returnData = dataBundle?.data?.filter(
					item => item?.biller?.billerId === stateFilter?.biller
				);
			if (stateFilter?.category)
				returnData = dataBundle?.data?.filter(
					item => item?.category?.categoryId === stateFilter?.category
				);
			if (stateFilter?.network)
				returnData = dataBundle?.data?.filter(
					item => item?.network === stateFilter?.network
				);
			setLoading(false);
			setIsFilter(returnData);
			setStateFilter(init);
			setIsOpen(false);
		};

	useEffect(() => {
		if (dataBundle?.isFound) setState(dataBundle?.mainSearch);
		else if (isFilter) setState(isFilter);
		else setState(dataBundle?.data);
	}, [dataBundle?.mainSearch, dataBundle?.isFound, dataBundle?.data, isFilter]);

	useEffect(() => {
		setIsFilter(null);
	}, []);

	let [range, setRange] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;
	if (!state) return;

	const currentItems = state.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(state.length / range);

	const handlePageClick = event => {
		const newOffset = (event.selected * range) % state.length;
		setItemOffset(newOffset);
	};

	return (
		<>
			<div className="py-5">
				<Buttons
					title={"filter"}
					css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mb-3"
					width={"w-25 w25 ms-auto"}
					onClick={() => setIsOpen(true)}
					style={{ borderRadius: "30px" }}
				/>
				<div className="bland row mx-0 py-3 px-0 text-capitalize Lexend fw-bold d-none d-md-flex">
					<div className="col textTrunc Lexend">S/N</div>
					<div className="col textTrunc Lexend">network</div>
					<div className="col textTrunc Lexend">category</div>
					<div className="col textTrunc Lexend">biller</div>
					<div className="col textTrunc Lexend">provider price</div>
					<div className="col textTrunc Lexend">price</div>
					<div className="col textTrunc Lexend">reseller</div>
					<div className="col textTrunc Lexend">topuser</div>
					{["Teetop Digital", "TEETOP DIGITAL"]?.includes(
						process.env.REACT_APP_NAME
					) && <div className="col textTrunc Lexend">standalone</div>}
					{["Kemtech Enterprises"]?.includes(process.env.REACT_APP_NAME) && (
						<div className="col textTrunc Lexend">API</div>
					)}
					<div className="col textTrunc Lexend">validity</div>
					<div className="col textTrunc Lexend">allowance</div>
					<div className="col textTrunc Lexend">status</div>
					<div className="col textTrunc Lexend">action </div>
				</div>
				<MainRanger setRange={setRange} range={range} />
				<div className="bg-white d-block d-md-flex row mx-0">
					{currentItems?.length === 0 ? (
						<EmptyComponent subtitle={"DataBundle state empty"} />
					) : (
						currentItems?.map((item, index) => (
							<div
								key={index}
								className="bg-white d-block d-md-flex row mx-0 py-3 px-0 border-bottom">
								<div className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
									<span className="fontReduce d-md-none Lexend">S/N:</span>
									{index + 1}
								</div>
								<div className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
									<span className="fontReduce d-md-none Lexend">Network:</span>
									{item?.network}
								</div>
								<div className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
									<span className="fontReduce d-md-none Lexend">Category:</span>
									{item?.category?.name}
								</div>
								<div className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
									<span className="fontReduce d-md-none Lexend">Biller:</span>
									<span className="text-uppercase">{item?.biller?.name}</span>
								</div>
								<div className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
									<span className="fontReduce d-md-none Lexend">
										Provider price:
									</span>
									<span>
										{nairaSign}
										{item?.provider_price
											? numberWithCommas(
													Number(item?.provider_price).toFixed(2)
											  )
											: null}
									</span>
								</div>
								<div className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
									<span className="fontReduce d-md-none Lexend">Price:</span>
									<span>
										{nairaSign}
										{item?.price
											? numberWithCommas(Number(item?.price).toFixed(2))
											: null}
									</span>
								</div>
								<div className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
									<span className="fontReduce d-md-none Lexend">Reseller:</span>
									<span>
										{nairaSign}
										{item?.resellerPrice
											? numberWithCommas(Number(item?.resellerPrice).toFixed(2))
											: null}
									</span>
								</div>
								<div className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
									<span className="fontReduce d-md-none Lexend">Topuser:</span>
									<span>
										{nairaSign}
										{item?.topuserPrice
											? numberWithCommas(Number(item?.topuserPrice).toFixed(2))
											: null}
									</span>
								</div>
								{["Teetop Digital", "TEETOP DIGITAL"]?.includes(
									process.env.REACT_APP_NAME
								) && (
									<div className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
										<span className="fontReduce d-md-none Lexend">
											Standalone:
										</span>
										<span>
											{item?.standalonePrice ? nairaSign : null}
											{item?.standalonePrice
												? numberWithCommas(
														Number(item?.standalonePrice).toFixed(2)
												  )
												: null}
										</span>
									</div>
								)}
								{["Kemtech Enterprises"]?.includes(
									process.env.REACT_APP_NAME
								) && (
									<div className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
										<span className="fontReduce d-md-none Lexend">API:</span>
										<span>
											{item?.apiPrice ? nairaSign : null}
											{item?.apiPrice
												? numberWithCommas(Number(item?.apiPrice).toFixed(2))
												: null}
										</span>
									</div>
								)}
								<div className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
									<span className="fontReduce d-md-none Lexend">Validity:</span>
									{item?.validity}
								</div>
								<div className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
									<span className="fontReduce d-md-none Lexend">
										Allowance:
									</span>
									{item?.allowance} {item?.size}
								</div>
								<div
									className={`col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0 ${
										item?.available
											? "text-success text-success2"
											: "text-danger text-danger2"
									}`}>
									<span className="fontReduce d-md-none Lexend">
										Allowance:
									</span>
									{item?.available ? "Available" : "Not available"}
								</div>
								<div className="col textTrunc my-auto d-flex flex-column">
									<div className="btn-group my-1 my-md-0">
										<button
											title="Add new Data price"
											onClick={() => navigate(`/controls/data/${item?._id}`)}
											className="btn btn-info text-white text-capitalize py-3 px-1 p-md-2 w-100 fontReduce2">
											<MdMoreHoriz />
										</button>
										<button
											title="Edit Data plan"
											onClick={() => setData(item)}
											className="btn btn-success2 text-capitalize py-3 px-1 p-md-2 w-100 fontReduce2">
											<BsPen />
										</button>
									</div>
									<div className="btn-group py-1 my-md-0">
										<button
											title={`${
												item?.enabler === "enable" ? "Disable" : "Enable"
											} Data plan`}
											onClick={async () => {
												if (
													window.confirm(
														`Do you want to ${
															item?.enabler === "enable" ? "Disable" : "Enable"
														} this dataplan?`
													)
												) {
													setLoad({ isLoad: true, loadData: item?._id });
													await manageDataBundle(
														{
															...item,
															enabler:
																item?.enabler === "enable"
																	? "disable"
																	: "enable",
														},
														item?._id,
														"edit"
													);
													setLoad({ isLoad: false, loadData: "" });
												}
											}}
											className="btn btn-primary1 text-capitalize py-3 px-1 p-md-2 w-100 fontReduce2">
											{load?.isLoad && load?.loadData === item?._id ? (
												<ClipLoader color="white" size={16} />
											) : item?.enabler === "enable" ? (
												<HiThumbDown />
											) : (
												<HiThumbUp />
											)}
										</button>

										<button
											title="Delete Data plan"
											onClick={async () => {
												if (
													window.confirm("Do you want to delete this dataplan?")
												) {
													setLoad2({ isLoad: true, loadData: item?._id });
													await manageDataBundle(item, item?._id, "delete");
													setLoad2({ isLoad: false, loadData: "" });
												}
											}}
											className="btn btn-danger2 text-capitalize py-3 px-1 p-md-2 w-100 fontReduce2">
											{load2?.isLoad && load2?.loadData === item?._id ? (
												<ClipLoader color="white" size={16} />
											) : (
												<BiTrashAlt />
											)}
										</button>
									</div>
								</div>
							</div>
						))
					)}
				</div>
				<MainPaginate handlePageClick={handlePageClick} pageCount={pageCount} />
			</div>
			<FindDetails
				isOpen={isOpen}
				textChange={textChange}
				handleFind={handleSubmit}
				loading={loading}
				state={stateFilter}
				back={() => setIsOpen(false)}
			/>
		</>
	);
};

export const FindDetails = ({
	state,
	textChange,
	handleFind,
	loading,
	isOpen,
	back,
}) => {
	let { network, category, biller } = useContext(GlobalState);
	return (
		<>
			<ModalComponents isOpen={isOpen} toggle={back} title={`Filter selection`}>
				<form onSubmit={handleFind}>
					<div className="mb-4">
						<label htmlFor="Provider">Biller</label>
						<select
							className="form-control py-3 py-md-4 text-capitalize form-select"
							name="biller"
							placeholder="Provider"
							value={state?.biller}
							onChange={textChange("biller")}
							id="biller">
							<option value="">select biller</option>
							{biller?.data
								?.filter(item => !item?.billerId?.includes("inhouse"))
								?.map((item, i) => (
									<option value={item?.billerId} key={i}>
										{item?.name}
									</option>
								))}
						</select>
					</div>
					<div className="mb-4">
						<label htmlFor="Network">Network</label>
						<select
							className="form-control py-3 py-md-4 text-capitalize form-select"
							name="network"
							placeholder="Network"
							value={state?.network}
							onChange={textChange("network")}
							id="network">
							<option value="">select network</option>
							{network?.data?.map((item, i) => (
								<option value={item?.name} key={i}>
									{item?.name}
								</option>
							))}
						</select>
					</div>
					<div className="mb-4">
						<label htmlFor="Category">Category</label>
						<select
							className="form-control py-3 py-md-4 text-capitalize form-select"
							name="category"
							placeholder="Category"
							value={state?.category}
							onChange={textChange("category")}
							id="category">
							<option value="">select category</option>
							{category?.data
								?.filter(item => item?.product?.name === "data")
								?.map((item, i) => (
									<option value={item?.categoryId} key={i}>
										{item?.name}
									</option>
								))}
						</select>
					</div>

					<Buttons
						title={"Filter"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						onClick={handleFind}
						loading={loading}
						style={{ borderRadius: "30px" }}
					/>
				</form>
			</ModalComponents>
		</>
	);
};

const MakeDataBundle = ({ isOpen, back, datum, toggle, others }) => {
	let { dataBundle, manageDataBundle, nairaSign } = useContext(GlobalState);
	let init = {
			validity: "",
			allowance: "",
			price: "",
			resellerPrice: "",
			topuserPrice: "",
			enabler: "",
			size: "",
			apiPrice: "",
		},
		[state, setState] = useState(init),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			},
		[shouldEdit, setShouldEdit] = useState(false),
		[newLoad, setNewLoad] = useState(false),
		[submit, setSubmit] = useState(false);

	useEffect(() => {
		if (datum) {
			setState(
				others
					? {
							...datum,
							price: others?.data?.api_price
								? others?.data?.api_price
								: others?.data?.price
								? others?.data?.price
								: others?.data?.plan_amount
								? others?.data?.plan_amount
								: others?.data?.PRODUCT_AMOUNT
								? others?.data?.PRODUCT_AMOUNT
								: others?.data?.variation_amount
								? others?.data?.variation_amount
								: "",
							validity: others?.data?.month_validate
								? others?.data?.month_validate
								: others?.data?.validity
								? others?.data?.validity
								: others?.data?.plan
								? others?.data?.plan
								: others?.data?.name
								? others?.data?.name
								: others?.data?.PRODUCT_NAME
								? others?.data?.PRODUCT_NAME
								: "",
							allowance: [
								"chosen",
								"rpi",
								"husmo",
								"datastation",
								"datamesolution",
								"maskawasub",
								"rossytechs",
								"kvdata",
								"gladtidingsdata",
								"uzobestgsm",
								"geodnatechsub",
								"bello-ventures",
								"fordlink",
							]?.includes(others?.biller?.billerId)
								? others?.data?.plan
								: [
										"teetop",
										"honourworld",
										"moavoxpay",
										"kemtech",
										"vickybest",
										"mercyfound",
								  ]?.includes(others?.biller?.billerId)
								? others?.data?.allowance
								: others?.data?.size
								? others?.data?.size
								: others?.data?.PRODUCT_ID
								? others?.data?.PRODUCT_ID
								: others?.data?.allowance,
					  }
					: datum
			);

			let mainAllowance = [
				"chosen",
				"rpi",
				"husmo",
				"datastation",
				"datamesolution",
				"maskawasub",
				"rossytechs",
				"kvdata",
				"gladtidingsdata",
				"uzobestgsm",
				"geodnatechsub",
				"bello-ventures",
				"fordlink",
			]?.includes(others?.biller?.billerId)
				? others?.data?.plan
				: [
						"teetop",
						"honourworld",
						"moavoxpay",
						"kemtech",
						"vickybest",
						"mercyfound",
				  ]?.includes(others?.biller?.billerId)
				? others?.data?.allowance
				: others?.data?.size
				? others?.data?.size
				: others?.data?.allowance;

			let parser = parseFloat(mainAllowance);
			console.log({ mainAllowance, parser, others, datum });
			setState({
				...datum,
				allowance: datum?._id ? datum?.allowance : parser,
				size: datum?.size
					? datum?.size
					: others?.data?.size
					? others?.data?.size
					: mainAllowance
							?.replace(parser, "")
							?.replace(".0", "")
							?.toUpperCase(),
				validity: others?.data?.month_validate
					? others?.data?.month_validate
					: others?.data?.validity
					? others?.data?.validity
					: others?.data?.plan
					? others?.data?.plan
					: others?.data?.name
					? others?.data?.name
					: others?.data?.PRODUCT_NAME
					? others?.data?.PRODUCT_NAME
					: "",
			});

			if (datum?._id) setShouldEdit(true);
		}
	}, [datum, others]);

	useEffect(() => {
		if (others) {
			// console.log({ others });
		}
	}, [others]);

	let handleSubmit = async e => {
		e?.preventDefault();
		if (!datum?._id)
			if (
				!state?.validity ||
				!state?.allowance ||
				!state?.price ||
				!state?.size
			)
				return;
		if (
			[
				"chosen",
				"smeplug",
				"ogdams",
				"datamesolution",
				"datastation",
				"frankeyconnect",
				"legitdataway",
				"salompay",
				"wapay",
				"pearstelecom",
				"edivatelecomm",
			]?.includes(others?.biller?.billerId)
		)
			if (!state?.planId || !state?.networkId || !state?.provider_price) return;

		let datee = state;

		datee = {
			...datee,
			apiPrice:
				Number(datee?.apiPrice) && Number(datee?.apiPrice) > 0
					? datee?.apiPrice
					: null,
			standalonePrice:
				Number(datee?.standalonePrice) && Number(datee?.standalonePrice) > 0
					? datee?.standalonePrice
					: null,
		};

		setNewLoad(true);
		datum?._id
			? await manageDataBundle(datee, datum?._id, "edit")
			: await manageDataBundle(datee);
		setNewLoad(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && dataBundle?.isAdded) {
			setSubmit(false);
			setState(init);
			toggle();
		}
		if (submit && dataBundle?.isUpdated) {
			setSubmit(false);
			setState(init);
			toggle();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, dataBundle?.isAdded, dataBundle?.isUpdated]);

	return (
		<>
			<ModalComponents
				title={
					datum?._id
						? `update ${datum?.allowance} ${datum?.validity}`
						: "add data plan"
				}
				isOpen={isOpen}
				back={!datum?._id ? back : null}
				toggle={toggle}>
				<div className="downH2 d-flex">
					<form className="w-100">
						{!datum?._id ? (
							<div className="mb-4">
								<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
									<span>Biller: </span>
									<span className="fontInherit Lexend text-uppercase">
										{others?.biller?.name}
									</span>{" "}
								</p>
								<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
									<span>Category: </span>
									<span className="fontInherit Lexend text-uppercase">
										{others?.category?.name}
									</span>{" "}
								</p>
								<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
									<span>Validity: </span>
									<span className="fontInherit Lexend text-uppercase">
										{others?.data?.month_validate
											? others?.data?.month_validate
											: others?.data?.validity
											? others?.data?.validity
											: others?.data?.plan
											? others?.data?.plan
											: others?.data?.name
											? others?.data?.name
											: others?.data?.PRODUCT_NAME
											? others?.data?.PRODUCT_NAME
											: ""}
									</span>{" "}
								</p>
								<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
									<span>Allowance: </span>
									<span className="fontInherit Lexend text-uppercase">
										{[
											"chosen",
											"rpi",
											"husmo",
											"datastation",
											"datamesolution",
											"maskawasub",
											"rossytechs",
											"kvdata",
											"gladtidingsdata",
											"uzobestgsm",
											"geodnatechsub",
											"bello-ventures",
											"fordlink",
										]?.includes(others?.biller?.billerId)
											? others?.data?.plan
											: [
													"teetop",
													"honourworld",
													"moavoxpay",
													"kemtech",
													"vickybest",
													"mercyfound",
											  ]?.includes(others?.biller?.billerId)
											? others?.data?.allowance
											: others?.data?.size
											? others?.data?.size
											: others?.data?.PRODUCT_ID
											? others?.data?.PRODUCT_ID
											: others?.data?.allowance}
									</span>{" "}
								</p>
								<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
									<span>Price: </span>
									<span className="fontInherit Lexend text-uppercase">
										{nairaSign}{" "}
										{others?.data?.api_price
											? others?.data?.api_price
											: others?.data?.price
											? others?.data?.price
											: others?.data?.variation_amount
											? others?.data?.variation_amount
											: others?.data?.PRODUCT_AMOUNT
											? others?.data?.PRODUCT_AMOUNT
											: others?.data?.plan_amount
											? others?.data?.plan_amount
											: ""}
									</span>{" "}
								</p>
							</div>
						) : null}
						<div className="mb-4">
							<label htmlFor="value">Validity</label>
							<input
								type={"text"}
								placeholder="Name"
								className="form-control py-3"
								value={state?.validity}
								onChange={textChange("validity")}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="value">Allowance</label>
							<input
								type={"tel"}
								placeholder="Name"
								className="form-control py-3"
								value={state?.allowance}
								onChange={textChange("allowance")}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="Size">Size</label>
							<select
								className="form-control py-3 py-md-4 text-capitalize form-select"
								name="size"
								placeholder="Size"
								value={state?.size}
								onChange={textChange("size")}
								id="size">
								<option value="">select size</option>
								<option value="MB">MB</option>
								<option value="GB">GB</option>
								<option value="TB">TB</option>
							</select>
						</div>
						{!datum?._id && (
							<>
								<div className="mb-4">
									<label htmlFor="value">Provider Price</label>
									<input
										type={"number"}
										placeholder="200"
										className="form-control py-3"
										value={state?.provider_price}
										onChange={textChange("provider_price")}
									/>
								</div>
								<div className="mb-4">
									<label htmlFor="value">Price</label>
									<input
										type={"number"}
										placeholder="200"
										className="form-control py-3"
										value={state?.price}
										onChange={textChange("price")}
									/>
								</div>
								<div className="mb-4">
									<label htmlFor="value">Reseller price</label>
									<input
										type={"number"}
										placeholder="200"
										className="form-control py-3"
										value={state?.resellerPrice}
										onChange={textChange("resellerPrice")}
									/>
								</div>
								<div className="mb-4">
									<label htmlFor="value">Topuser price</label>
									<input
										type={"number"}
										placeholder="200"
										className="form-control py-3"
										value={state?.topuserPrice}
										onChange={textChange("topuserPrice")}
									/>
								</div>
								{["Teetop Digital", "TEETOP DIGITAL"]?.includes(
									process.env.REACT_APP_NAME
								) && (
									<div className="mb-4">
										<label htmlFor="value">Standalone price</label>
										<input
											type={"number"}
											placeholder="200"
											className="form-control py-3"
											value={state?.standalonePrice}
											onChange={textChange("standalonePrice")}
										/>
									</div>
								)}
								{["Kemtech Enterprises"]?.includes(
									process.env.REACT_APP_NAME
								) && (
									<div className="mb-4">
										<label htmlFor="value">API price</label>
										<input
											type={"number"}
											placeholder="200"
											className="form-control py-3"
											value={state?.apiPrice}
											onChange={textChange("apiPrice")}
										/>
									</div>
								)}
							</>
						)}
						{[
							"chosen",
							"smeplug",
							"ogdams",
							"datamesolution",
							"datastation",
							"frankeyconnect",
							"legitdataway",
							"salompay",
							"wapay",
							"pearstelecom",
							"edivatelecomm",
						]?.includes(others?.biller?.billerId) && (
							<>
								<div className="mb-4">
									<label htmlFor="value">Plan Id</label>
									<input
										type={"text"}
										placeholder="Name"
										className="form-control py-3"
										value={state?.planId}
										onChange={textChange("planId")}
									/>
								</div>
								<div className="mb-4">
									<label htmlFor="value">Network Id</label>
									<input
										type={"text"}
										placeholder="Name"
										className="form-control py-3"
										value={state?.networkId}
										onChange={textChange("networkId")}
									/>
								</div>
							</>
						)}
						{shouldEdit && (
							<>
								<div className="mb-4">
									<label htmlFor="value">Status</label>
									<select
										name="Status"
										className="form-control py-3"
										value={state?.enabler}
										onChange={textChange("enabler")}
										id="">
										<option value="">Select status</option>
										<option value="enable">Enabled</option>
										<option value="disable">Disabled</option>
									</select>
								</div>
							</>
						)}
						<Buttons
							title={datum?._id ? "update" : "create"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
							width={"w-50 w50"}
							onClick={handleSubmit}
							style={{ borderRadius: "30px" }}
							loading={newLoad}
						/>
					</form>
				</div>
			</ModalComponents>
		</>
	);
};

const BillerCategorySelection = ({ isOpen, back, setData, setOthers }) => {
	const { category, biller } = useContext(GlobalState);
	let [active, setActive] = useState(0),
		[data, setThisData] = useState({
			biller: "",
			category: "",
		}),
		[selectedBiller, setBiller] = useState(null),
		[selectedCategory, setCategory] = useState(null),
		[dataList, setDataList] = useState(null),
		[selectData, setSelectData] = useState(null);

	useEffect(() => {
		if (selectedBiller && selectedCategory) {
			let network = selectedCategory?.categoryId?.slice(
				0,
				selectedCategory?.categoryId?.includes("_")
					? selectedCategory?.categoryId?.lastIndexOf("_")
					: selectedCategory?.categoryId?.length
			);
			if (network?.includes("_"))
				network = network?.slice(
					0,
					network?.includes("_") ? network?.lastIndexOf("_") : network?.length
				);
			let billerName = selectedBiller?.billerId?.toLowerCase(),
				returnData;
			if (
				![
					"chosen",
					"rpi",
					"honourworld",
					"vtpass",
					"husmo",
					"datastation",
					"teetop",
					"datamesolution",
					"moavoxpay",
					"kemtech",
					"clubkonnect",
					"maskawasub",
					"vickybest",
					"rossytechs",
					"kvdata",
					"gladtidingsdata",
					"uzobestgsm",
					"geodnatechsub",
					"bello-ventures",
					"sirpdata",
					"fordlink",
					"mercyfound",
				]?.includes(billerName?.toLowerCase())
			) {
				if (biller?.[billerName?.replace("-", "")])
					returnData = [
						...biller?.[billerName?.replace("-", "")]?.filter(
							item => item?.network === network
						),
					];
			} else if (
				[
					"honourworld",
					"vtpass",
					"teetop",
					"moavoxpay",
					"kemtech",
					"vickybest",
					"sirpdata",
					"mercyfound",
				]?.includes(billerName?.toLowerCase())
			) {
				if (biller?.[billerName])
					returnData = [
						...biller?.[billerName]?.data?.filter(item =>
							network?.toLowerCase() === "smile"
								? item?.network?.toLowerCase()?.includes(network?.toLowerCase())
								: item?.network === network
						),
					];
			} else if (["clubkonnect"]?.includes(billerName?.toLowerCase())) {
				if (biller?.[billerName])
					returnData = [...biller?.[billerName]?.[network?.toLowerCase()]];
			} else {
				if (biller?.[billerName?.replace("-", "")])
					returnData = [
						...biller?.[billerName?.replace("-", "")]?.data?.[
							network?.toLowerCase()
						],
					];
			}
			setDataList(returnData);
		}
	}, [selectedBiller, selectedCategory, biller]);
	useEffect(() => {
		if (selectData) {
			setThisData({
				...data,
				networkId: selectData?.networkId,
				planId: selectData?.planId,
				provider_price: selectData?.plan_amount
					? selectData?.plan_amount
					: selectData?.variation_amount
					? selectData?.variation_amount
					: selectData?.price,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectData]);
	return (
		<ModalComponents
			title={"Add data plan process"}
			isOpen={isOpen}
			toggle={back}>
			<>
				{active === 2 ? (
					<>
						<BillerSelectPlan
							selectData={selectData}
							selectedBiller={selectedBiller}
							setSelectData={setSelectData}
							dataList={dataList}
						/>
						<div className="mx-auto d-block w-50">
							<div className="btn-group">
								<Buttons
									title={"prev"}
									css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
									width={"w-50 w50"}
									onClick={() => setActive(1)}
								/>
								<Buttons
									title={"next"}
									css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
									width={"w-50 w50"}
									onClick={() => {
										if (
											![
												"chosen",
												"smeplug",
												"ogdams",
												"datamesolution",
												"datastation",
												"frankeyconnect",
												"legitdataway",
												"salompay",
												"wapay",
												"pearstelecom",
												"edivatelecomm",
											]?.includes(selectedBiller?.billerId)
										)
											if (!selectData) return;
										setData(data);
										setOthers({
											category: selectedCategory,
											biller: selectedBiller,
											data: selectData,
										});
										setActive(0);
										back();
									}}
								/>
							</div>
						</div>
					</>
				) : active === 1 ? (
					<>
						<h3 className="Lexend">Select Biller</h3>
						<div className="row mx-0 g-3 g-md-4">
							{biller?.data
								?.filter(item => !item?.billerId?.includes("inhouse"))
								?.map((item, i) => (
									<div
										className="col-6 col-md-4 p-2"
										onClick={() => {
											setThisData({ ...data, biller: item?._id });
											setBiller(item);
										}}
										key={i}>
										<button
											className={`btn ${
												item?._id === data?.biller
													? "btn-primary1"
													: "btn-outline-primary1"
											} w-100 h-100 text-uppercase py-3 py-md-5 rounded20`}>
											{item?.name}
										</button>
									</div>
								))}
						</div>
						<div className="mx-auto d-block w-50">
							<div className="btn-group">
								<Buttons
									title={"prev"}
									css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
									width={"w-50 w50"}
									onClick={() => setActive(0)}
								/>
								<Buttons
									title={"next"}
									css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
									width={"w-50 w50"}
									onClick={() => {
										if (!data?.biller) return;

										setActive(2);
									}}
								/>
							</div>
						</div>
					</>
				) : (
					<>
						<h3 className="Lexend">Select Category</h3>
						<div className="row mx-0 g-3 g-md-4">
							{category?.data
								?.filter(item => item?.product?.name === "data")
								?.map((item, i) => (
									<div
										className="col-6 col-md-4 p-2"
										onClick={() => {
											setThisData({ ...data, category: item?._id });
											setCategory(item);
										}}
										key={i}>
										<button
											className={`btn ${
												item?._id === data?.category
													? "btn-primary1"
													: "btn-outline-primary1"
											} w-100 h-100 text-uppercase py-3 py-md-5 rounded20`}>
											{item?.name}
										</button>
									</div>
								))}
						</div>
						<Buttons
							title={"next"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
							width={"w-50 w50"}
							onClick={() => {
								if (!data?.category) return;
								setActive(1);
							}}
							style={{ borderRadius: "30px" }}
						/>
					</>
				)}
			</>
		</ModalComponents>
	);
};

export const BillerSelectPlan = ({
	selectedBiller,
	selectData,
	setSelectData,
	dataList,
}) => {
	const { numberWithCommas, nairaSign } = useContext(GlobalState);
	return (
		<>
			<h3 className="Lexend">
				Select {selectedBiller?.name?.toUpperCase()} Data Plan
			</h3>
			{selectedBiller?.billerId?.toLowerCase() === "ringo" ? (
				<>
					{dataList?.map((item, i) => (
						<div
							className={`myCursor py-3 px-2 border-bottom ${
								selectData?.planId === item?.planId &&
								selectData?.networkId === item?.networkId
									? "bg-select"
									: ""
							}`}
							onClick={() => setSelectData(item)}
							key={i}>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Category: </span>
								<span className="Lexend fw-bold">{item?.category}</span>
							</p>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Network: </span>
								<span className="Lexend fw-bold">{item?.network}</span>
							</p>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Price: </span>
								<span className="Lexend fw-bold">
									{nairaSign} {item?.price ? numberWithCommas(item?.price) : 0}
								</span>
							</p>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Allowance: </span>
								<span className="Lexend fw-bold">{item?.allowance}</span>
							</p>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Validity: </span>
								<span className="Lexend fw-bold">{item?.validity}</span>
							</p>
						</div>
					))}
				</>
			) : selectedBiller?.billerId?.toLowerCase() === "clubkonnect" ? (
				<>
					{dataList?.map((item, i) => (
						<div
							className={`myCursor py-3 px-2 border-bottom ${
								selectData?.planId === item?.planId &&
								selectData?.networkId === item?.networkId
									? "bg-select"
									: ""
							}`}
							onClick={() => setSelectData(item)}
							key={i}>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Network: </span>
								<span className="Lexend fw-bold">{item?.network}</span>
							</p>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Price: </span>
								<span className="Lexend fw-bold">
									{nairaSign} {numberWithCommas(item?.PRODUCT_AMOUNT || 0)}
								</span>
							</p>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Allowance: </span>
								<span className="Lexend fw-bold">{item?.PRODUCT_ID}</span>
							</p>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Validity: </span>
								<span className="Lexend fw-bold">{item?.PRODUCT_NAME}</span>
							</p>
						</div>
					))}
				</>
			) : ["smeplug", "ogdams", "sirpdata"]?.includes(
					selectedBiller?.billerId?.toLowerCase()
			  ) ? (
				<>
					{dataList?.map((item, i) => (
						<div
							className={`myCursor py-3 px-2 border-bottom ${
								selectData?.planId === item?.planId &&
								selectData?.networkId === item?.networkId
									? "bg-select"
									: ""
							}`}
							onClick={() => setSelectData(item)}
							key={i}>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Name: </span>
								<span className="Lexend fw-bold">{item?.name}</span>
							</p>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Network: </span>
								<span className="Lexend fw-bold">{item?.network}</span>
							</p>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Price: </span>
								<span className="Lexend fw-bold">
									{nairaSign} {item?.price ? numberWithCommas(item?.price) : 0}
								</span>
							</p>
						</div>
					))}
				</>
			) : [
					"chosen",
					"rpi",
					"husmo",
					"uzobest",
					"datastation",
					"datamesolution",
					"maskawasub",
					"rossytechs",
					"kvdata",
					"gladtidingsdata",
					"uzobestgsm",
					"geodnatechsub",
					"bello-ventures",
					"fordlink",
			  ]?.includes(selectedBiller?.billerId?.toLowerCase()) ? (
				<>
					{dataList?.map((item, i) => (
						<div
							className={`myCursor py-3 px-2 border-bottom ${
								selectData?.planId === item?.planId &&
								selectData?.networkId === item?.networkId
									? "bg-select"
									: ""
							}`}
							onClick={() => setSelectData(item)}
							key={i}>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Plan: </span>
								<span className="Lexend fw-bold">
									{item?.plan || item?.size}
								</span>
							</p>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Network: </span>
								<span className="Lexend fw-bold">{item?.network}</span>
							</p>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Type: </span>
								<span className="Lexend fw-bold">
									{item?.plan_type || item?.type}
								</span>
							</p>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Price: </span>
								<span className="Lexend fw-bold">
									{nairaSign}{" "}
									{item?.plan_amount || item?.price
										? numberWithCommas(item?.plan_amount || item?.price)
										: 0}
								</span>
							</p>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Validity: </span>
								<span className="Lexend fw-bold">
									{item?.month_validate || item?.validity}
								</span>
							</p>
						</div>
					))}
				</>
			) : [
					"honourworld",
					"teetop",
					"moavoxpay",
					"kemtech",
					"vickybest",
					"mercyfound",
			  ]?.includes(selectedBiller?.billerId?.toLowerCase()) ? (
				<>
					{dataList?.map((item, i) => (
						<div
							className={`myCursor py-3 px-2 border-bottom ${
								selectData?.planId === item?.planId &&
								selectData?.networkId === item?.networkId
									? "bg-select"
									: ""
							}`}
							onClick={() => setSelectData(item)}
							key={i}>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Network: </span>
								<span className="Lexend fw-bold">{item?.network}</span>
							</p>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Plan: </span>
								<span className="Lexend fw-bold">{item?.name}</span>
							</p>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Price: </span>
								<span className="Lexend fw-bold">
									{nairaSign} {item?.price ? numberWithCommas(item?.price) : 0}
								</span>
							</p>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Validity: </span>
								<span className="Lexend fw-bold">{item?.validity}</span>
							</p>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Allowance: </span>
								<span className="Lexend fw-bold">{item?.allowance}</span>
							</p>
						</div>
					))}
				</>
			) : ["vtpass"]?.includes(selectedBiller?.billerId?.toLowerCase()) ? (
				<>
					{dataList?.map((item, i) => (
						<div
							className={`myCursor py-3 px-2 border-bottom ${
								selectData?.planId === item?.planId &&
								selectData?.networkId === item?.networkId
									? "bg-select"
									: ""
							}`}
							onClick={() => setSelectData(item)}
							key={i}>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Network: </span>
								<span className="Lexend fw-bold">{item?.network}</span>
							</p>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Plan: </span>
								<span className="Lexend fw-bold">{item?.name}</span>
							</p>
							<p className="d-flex justify-content-between">
								<span className="text-capitalize">Price: </span>
								<span className="Lexend fw-bold">
									{nairaSign}{" "}
									{item?.variation_amount
										? numberWithCommas(item?.variation_amount)
										: 0}
								</span>
							</p>
						</div>
					))}
				</>
			) : (
				<></>
			)}
		</>
	);
};
