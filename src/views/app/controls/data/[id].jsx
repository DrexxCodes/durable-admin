import React, { useContext, useEffect, useState } from "react";
import { BsPen } from "react-icons/bs";
import { useNavigate, useParams } from "@/lib/router";
import Container from "@/components/ui/Container";
import { ModalComponents } from "@/features/DefaultHeader";
import { GlobalState } from "@/Data/Context";
import { Buttons } from "@/Utils";
import { BillerSelectPlan } from "@/views/app/controls/data";
import { ClipLoader } from "react-spinners";
import { BiTrashAlt } from "react-icons/bi";

const DataPlanPriceList = () => {
	let {
			dataBundle,
			nairaSign,
			numberWithCommas,
			getBillerData,
			manageDataBundle,
		} = useContext(GlobalState),
		[load, setLoad] = useState({ isLoad: false, loadData: "" }),
		[state, setState] = useState(null),
		[isOpen, setIsOpen] = useState(null),
		toggle = () => {
			if (isOpen) if (data) setData(null);
			setIsOpen(!isOpen);
		},
		[data, setData] = useState(null),
		[others, setOthers] = useState(null),
		{ step } = useParams(),
		[isOpenInit, setIsOpenInit] = useState(false),
		toggleInit = () => {
			setIsOpenInit(!isOpenInit);
		},
		navigate = useNavigate(),
		{ auth, permission } = useContext(GlobalState);

	useEffect(() => {
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
			["Durable Telecommunications", "Marachdata", "Marachsub"]?.includes(
				process.env.REACT_APP_NAME
			)
		) {
			getBillerData("kvdata");
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
				"Vv Group"
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
				// "Vickybest Telecom",
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
		if (
			[
				"Vv Group",
			]?.includes(process.env.REACT_APP_NAME)
		) {
			getBillerData("mercyfound");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
		if (data) setIsOpen(true);
	}, [data]);

	useEffect(() => {
		if (dataBundle?.isFound)
			setState(dataBundle?.mainSearch?.find(item => item?._id === step));
		else setState(dataBundle?.data?.find(item => item?._id === step));
	}, [dataBundle?.mainSearch, dataBundle?.isFound, dataBundle?.data, step]);

	if (!state) return;
	return (
		<>
			<div className="bg-white aboutScreen">
				<Container className="py-5">
					<h3 className="Lexend mb-3">
						{state?.category?.name} - {state?.validity} {state?.allowance}
					</h3>
					<div className="py-3 d-flex justify-content-end">
						<Buttons
							title={"add new biller"}
							css="btn-primary1 text-capitalize py-md-3 py-2 px-4 px-lg-5 my-md-4 my-2 mb-0"
							width={"w-auto"}
							onClick={toggleInit}
							style={{ borderRadius: "30px" }}
						/>
					</div>
					<div className="bland row mx-0 py-3 px-0 text-capitalize Lexend fw-bold">
						<div className="col textTrunc Lexend">Provider price</div>
						<div className="col textTrunc Lexend">price</div>
						<div className="col textTrunc Lexend">reseller</div>
						<div className="col textTrunc Lexend">topuser</div>
						{["Teetop Digital", "TEETOP DIGITAL"]?.includes(
							process.env.REACT_APP_NAME
						) && <div className="col textTrunc Lexend">standalone</div>}
						{["Kemtech Enterprises"]?.includes(process.env.REACT_APP_NAME) && (
							<div className="col textTrunc Lexend">API</div>
						)}
						<div className="col textTrunc Lexend">action </div>
					</div>
					{state?.billerList?.map((item, i) => (
						<div className="" key={i}>
							<h5 className="Lexend text-uppercase">{item?.biller?.name}</h5>
							{[item?.price]?.map((list, index) => (
								<div key={index} className="row mx-0 py-3 px-0 border-bottom">
									<div className="col d-none d-md-flex textTrunc my-auto">
										{list?.provider_price ? nairaSign : null}
										{list?.provider_price
											? numberWithCommas(
													Number(list?.provider_price).toFixed(2)
											  )
											: null}
									</div>
									<div className="col d-none d-md-flex textTrunc my-auto">
										{list?.price ? nairaSign : null}
										{list?.price
											? numberWithCommas(Number(list?.price).toFixed(2))
											: null}
									</div>
									<div className="col textTrunc my-auto">
										{list?.resellerPrice ? nairaSign : null}
										{list?.resellerPrice
											? numberWithCommas(Number(list?.resellerPrice).toFixed(2))
											: null}
									</div>
									<div className="col textTrunc my-auto">
										{list?.topuserPrice ? nairaSign : null}
										{list?.topuserPrice
											? numberWithCommas(Number(list?.topuserPrice).toFixed(2))
											: null}
									</div>
									{["Teetop Digital", "TEETOP DIGITAL"]?.includes(
										process.env.REACT_APP_NAME
									) && (
										<div className="col textTrunc my-auto">
											{list?.standalonePrice ? nairaSign : null}
											{list?.standalonePrice
												? numberWithCommas(
														Number(list?.standalonePrice).toFixed(2)
												  )
												: null}
										</div>
									)}
									{["Kemtech Enterprises"]?.includes(
										process.env.REACT_APP_NAME
									) && (
										<div className="col textTrunc my-auto">
											{list?.apiPrice ? nairaSign : null}
											{list?.apiPrice
												? numberWithCommas(Number(list?.apiPrice).toFixed(2))
												: null}
										</div>
									)}
									<div className="col textTrunc my-auto">
										<div className="btn-group my-1 my-md-0">
											<button
												title="Edit Data plan"
												onClick={() => {
													setData(list);
													setOthers(item);
												}}
												className="btn btn-success2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
												<BsPen />
											</button>
											<button
												title={`${
													item?.enabler === "enable" ? "Disable" : "Enable"
												} Data plan`}
												onClick={async () => {
													if (
														window.confirm(
															"Do you want to delete this dataplan?"
														)
													) {
														setLoad({ isLoad: true, loadData: list?._id });
														await manageDataBundle(
															list,
															`manage-price${
																list?._id
																	? `/${list?._id}?biller=${list?.biller}&dataplan=${list?.dataplan}`
																	: ""
															}`,
															"delete"
														);
														setLoad({ isLoad: false, loadData: "" });
													}
												}}
												className="btn btn-danger2 text-capitalize py-3 px-1 p-md-2 w-100 fontReduce2">
												{load?.isLoad && load?.loadData === list?._id ? (
													<ClipLoader color="white" size={16} />
												) : (
													<BiTrashAlt />
												)}
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					))}
				</Container>
			</div>
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
		</>
	);
};

export default DataPlanPriceList;

const MakeDataBundle = ({ isOpen, back, datum, others, toggle }) => {
	let { dataBundle, manageDataBundle, nairaSign } = useContext(GlobalState);
	let init = {
			price: "",
			resellerPrice: "",
			topuserPrice: "",
			provider_price: "",
			apiPrice: "",
		},
		[state, setState] = useState(init),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			},
		[newLoad, setNewLoad] = useState(false),
		[submit, setSubmit] = useState(false),
		{ step } = useParams();

	useEffect(() => {
		if (datum) {
			setState({ ...state, ...datum });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [datum]);

	let handleSubmit = async e => {
		e?.preventDefault();
		console.log({ state });
		if (!state?.price) return;

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
			if (
				(!state?.planId && !state?.providerPlanId) ||
				(!state?.networkId && !state?.providerNetworkId) ||
				!state?.provider_price
			)
				return;

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
			dataplan: step,
		};

		setNewLoad(true);
		await manageDataBundle(
			datee,
			`manage-price${datum?._id ? `/${datum?._id}` : ""}`,
			"edit"
		);

		setNewLoad(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && dataBundle?.isUpdated) {
			setSubmit(false);
			setState(init);
			toggle();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, dataBundle?.isUpdated]);

	// console.log({ datum, others });

	return (
		<>
			<ModalComponents
				title={`${datum?._id ? "update" : "add"} ${others?.biller?.name} price`}
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
											: others?.data?.plan_amount
											? others?.data?.plan_amount
											: others?.data?.PRODUCT_AMOUNT
											? others?.data?.PRODUCT_AMOUNT
											: others?.data?.variation_amount
											? others?.data?.variation_amount
											: ""}
									</span>{" "}
								</p>
							</div>
						) : null}
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
											value={state?.planId || state?.providerPlanId}
											onChange={textChange("planId")}
										/>
									</div>
									<div className="mb-4">
										<label htmlFor="value">Network Id</label>
										<input
											type={"text"}
											placeholder="Name"
											className="form-control py-3"
											value={state?.networkId || state?.providerNetworkId}
											onChange={textChange("networkId")}
										/>
									</div>
								</>
							)}
						</>
						<Buttons
							title={datum?._id ? "update" : "add"}
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
	const { biller, category, dataBundle } = useContext(GlobalState);
	let [active, setActive] = useState(0),
		[data, setThisData] = useState({
			biller: "",
		}),
		[selectedBiller, setBiller] = useState(null),
		[selectedCategory, setCategory] = useState(null),
		[dataList, setDataList] = useState(null),
		[selectData, setSelectData] = useState(null),
		{ step } = useParams();

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
			let billerName = selectedBiller?.billerId,
				returnData;
			if (
				![
					"chosen",
					"rpi",
					"honourworld",
					"vtpass",
					"husmo",
					"datastation",
					"datamesolution",
					"teetop",
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
				provider_price: selectData?.variation_amount
					? selectData?.variation_amount
					: selectData?.plan_amount
					? selectData?.plan_amount
					: selectData?.price,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectData]);

	useEffect(() => {
		let DataCat = dataBundle?.data?.find(item => item?._id === step);

		let categoryNew = category?.data?.find(
			item => item?._id === DataCat?.category?._id
		);

		setCategory(categoryNew);
	}, [step, dataBundle, category]);

	return (
		<ModalComponents
			title={"Add data price process"}
			isOpen={isOpen}
			toggle={back}>
			<>
				{active === 1 ? (
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
									onClick={() => setActive(0)}
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
				) : (
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
							{/* <div className="btn-group"> */}
							{/* <Buttons
									title={"prev"}
									css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
									width={"w-50 w50"}
									onClick={() => setActive(0)}
								/> */}
							<Buttons
								title={"next"}
								css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
								width={"w-50 w50"}
								onClick={() => {
									if (!data?.biller) return;
									setActive(1);
								}}
							/>
							{/* </div> */}
						</div>
					</>
				)}
			</>
		</ModalComponents>
	);
};
