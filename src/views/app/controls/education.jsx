import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "@/Data/Context";
import Container from "@/components/ui/Container";
import { Buttons, EmptyComponent } from "@/Utils";
import { ModalComponents } from "@/features";
import { BiTrashAlt } from "react-icons/bi";
import { BsPen } from "react-icons/bs";
import { HiThumbDown, HiThumbUp } from "react-icons/hi";
import { ClipLoader } from "react-spinners";
import { UploadPicture } from "@/views/app/sliders";
import moment from "moment";
import { useNavigate } from "@/lib/router";

const Education = () => {
	let { setStateName, toggleAvailabilty, auth, permission } =
			useContext(GlobalState),
		[active, setActive] = useState(0),
		btnTab = ["education list", "Education Pin List"];
	useEffect(() => {
		setStateName("Education Controls");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [isOpen, setIsOpen] = useState(false),
		[isOpenInit, setIsOpenInit] = useState(false),
		[data, setEducation] = useState(null),
		toggle = () => {
			if (data) setEducation(null);
			setIsOpen(!isOpen);
		},
		toggleInit = () => {
			setIsOpenInit(!isOpenInit);
		},
		[loading, setLoading] = useState(""),
		[isPin, setIsPin] = useState(false),
		togglePin = () => {
			setIsPin(!isPin);
		},
		navigate = useNavigate();

	useEffect(() => {
		if (auth?.user?.privilege !== "superadmin") {
			let findTitle = "viewmanageeducation";

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
				<div className="btn-group w-100 py-3">
					{btnTab?.map((item, i) => (
						<button
							key={i}
							className={`btn py-3 text-capitalize fw-bold ${
								i === active ? "border-bottom textColor" : ""
							} rounded-0`}
							onClick={() => setActive(i)}>
							{item}
						</button>
					))}
				</div>
				<h4 className="Lexend">All {btnTab?.[active]}</h4>{" "}
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
							await toggleAvailabilty("education", "disable");
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
							await toggleAvailabilty("education", "enable");
							setLoading("");
						}}
						loading={loading === "enable"}
						style={{ borderRadius: "30px" }}
					/>
					<Buttons
						title={"add new pin"}
						css="btn-primary1 text-capitalize py-md-3 py-2 px-4 px-lg-5 my-md-4 my-2 mb-0 mx-1 mx-md-2"
						width={"w-auto"}
						onClick={togglePin}
						style={{ borderRadius: "30px" }}
					/>
				</div>
				{active === 1 ? (
					<EducationPinList />
				) : (
					<EducationBundleDetails setEducation={setEducation} />
				)}
			</Container>{" "}
			<MakeEducationBundle isOpen={isOpen} back={toggle} datum={data} />
			<BillerCategorySelection
				isOpen={isOpenInit}
				back={toggleInit}
				setEducation={setEducation}
			/>
			<MakePin isOpen={isPin} back={togglePin} />
		</div>
	);
};

export default Education;

const EducationBundleDetails = ({ setEducation }) => {
	let { educationBundle, manageEducationBundle, nairaSign, numberWithCommas } =
			useContext(GlobalState),
		[state, setState] = useState(null),
		[load, setLoad] = useState({ isLoad: false, loadEducation: "" }),
		[load2, setLoad2] = useState({ isLoad: false, loadEducation: "" });

	useEffect(() => {
		if (educationBundle?.isFound) setState(educationBundle?.mainSearch);
		else setState(educationBundle?.data);
	}, [
		educationBundle?.mainSearch,
		educationBundle?.isFound,
		educationBundle?.data,
	]);

	if (!state) return;

	return (
		<>
			<div className="pb-5 my-5">
				<div className="bland row mx-0 py-3 px-0 text-capitalize Lexend fw-bold">
					<div className="col textTrunc d-none d-md-flex Lexend">S/N</div>
					<div className="col textTrunc Lexend">Image</div>
					<div className="col textTrunc Lexend">Type</div>
					<div className="col textTrunc Lexend">Price</div>
					<div className="col textTrunc Lexend">Reseller Price</div>
					{["Teetop Digitals", "TEETOP DIGITALS"]?.includes(
						process.env.REACT_APP_NAME
					) && <div className="col textTrunc Lexend">Standalone Price</div>}
					{["Kemtech Enterprises"]?.includes(process.env.REACT_APP_NAME) && (
						<div className="col textTrunc Lexend">API Price</div>
					)}
					<div className="col textTrunc Lexend">Topuser Price</div>
					<div className="col textTrunc Lexend">category</div>
					<div className="col textTrunc Lexend">status</div>
					<div className="col textTrunc Lexend">action </div>
				</div>
				<div className="bg-white row mx-0">
					{state?.length === 0 ? (
						<EmptyComponent subtitle={"EducationBundle state empty"} />
					) : (
						state?.map((item, index) => (
							<div key={index} className="row mx-0 py-3 px-0 border-bottom">
								<div className="col d-none d-md-flex textTrunc my-auto">
									{index + 1}
								</div>
								<div className="col my-auto">
									<img
										src={item?.image?.url}
										alt={item?.image?.name}
										className="img-fluid rounded imgFluid"
										style={{
											height: "10rem",
											width: "100%",
										}}
									/>
								</div>
								<div className="col textTrunc my-auto">{item?.type}</div>
								<div className="col d-none d-md-flex textTrunc my-auto">
									{nairaSign}
									{item?.price
										? numberWithCommas(Number(item?.price).toFixed(2))
										: 0}
								</div>
								<div className="col textTrunc my-auto">
									{nairaSign}
									{item?.resellerPrice
										? numberWithCommas(Number(item?.resellerPrice).toFixed(2))
										: 0}
								</div>
								{["Teetop Digital", "TEETOP DIGITAL"]?.includes(
									process.env.REACT_APP_NAME
								) && (
									<div className="col textTrunc my-auto">
										{nairaSign}
										{item?.standalonePrice
											? numberWithCommas(
													Number(item?.standalonePrice).toFixed(2)
											  )
											: 0}
									</div>
								)}
								{["Kemtech Enterprises"]?.includes(
									process.env.REACT_APP_NAME
								) && (
									<div className="col textTrunc my-auto">
										{nairaSign}
										{item?.apiPrice
											? numberWithCommas(Number(item?.apiPrice).toFixed(2))
											: 0}
									</div>
								)}
								<div className="col textTrunc my-auto">
									{nairaSign}
									{item?.topuserPrice
										? numberWithCommas(Number(item?.topuserPrice).toFixed(2))
										: 0}
								</div>
								<div className="col textTrunc my-auto">
									{item?.category?.name}
								</div>
								<div
									className={`col textTrunc my-auto ${
										item?.enabler === "enable"
											? "text-success text-success2"
											: "text-danger text-danger2"
									}`}>
									{item?.enabler === "enable" ? "Available" : "Not available"}
								</div>
								<div className="col textTrunc my-auto btn-group">
									<button
										title={`${
											item?.enabler === "enable" ? "Disable" : "Enable"
										} Education plan`}
										onClick={async () => {
											setLoad({ isLoad: true, loadEducation: item?._id });
											await manageEducationBundle(
												{
													...item,
													enabler:
														item?.enabler === "enable" ? "disable" : "enable",
												},
												item?._id,
												"edit"
											);
											setLoad({ isLoad: false, loadEducation: "" });
										}}
										className="btn btn-primary1 text-capitalize p-1 p-md-2 w-100 fontReduce2">
										{load?.isLoad && load?.loadEducation === item?._id ? (
											<ClipLoader color="white" size={16} />
										) : item?.enabler === "enable" ? (
											<HiThumbDown />
										) : (
											<HiThumbUp />
										)}
									</button>
									<button
										title="Edit Education plan"
										onClick={() => setEducation(item)}
										className="btn btn-success2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
										<BsPen />
									</button>
									<button
										title="Delete Education plan"
										onClick={async () => {
											setLoad2({ isLoad: true, loadEducation: item?._id });
											await manageEducationBundle(item, item?._id, "delete");
											setLoad2({ isLoad: false, loadEducation: "" });
										}}
										className="btn btn-danger2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
										{load2?.isLoad && load2?.loadEducation === item?._id ? (
											<ClipLoader color="white" size={16} />
										) : (
											<BiTrashAlt />
										)}
									</button>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</>
	);
};

const MakeEducationBundle = ({ isOpen, back, datum }) => {
	let { educationBundle, manageEducationBundle } = useContext(GlobalState);
	let init = {
			enabler: "",
			type: "",
			price: "",
			resellerPrice: "",
			topuserPrice: "",
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
		[submit, setSubmit] = useState(false),
		[image, setImages] = useState();

	useEffect(() => {
		if (datum) {
			setState(datum);
			if (datum?._id) setShouldEdit(true);
			setImages(datum?.image ? datum?.image : false);
		}
		return () => setShouldEdit(false);
	}, [datum]);

	let handleSubmit = async e => {
		e?.preventDefault();
		if (!state?.type) return;

		let datee = state;

		if (!datum) {
			// return toast.info("Pleae fill out all fields");
			// if (!image) return toast.warn("Tour image required");
			datee = { ...state, image };
		} else {
			if (image === datum?.image) {
				datee = { ...state };
			} else datee = { ...state, image };
		}

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
			? await manageEducationBundle(datee, datum?._id, "edit")
			: await manageEducationBundle(datee);
		setNewLoad(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && educationBundle?.isAdded) {
			setSubmit(false);
			setState(init);
			back();
		}
		if (submit && educationBundle?.isUpdated) {
			setSubmit(false);
			setState(init);
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, educationBundle?.isAdded, educationBundle?.isUpdated]);

	return (
		<>
			<ModalComponents
				title={datum?._id ? `update ${datum?.fullname}` : "add education plan"}
				isOpen={isOpen}
				back={back}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<UploadPicture img={image} setImages={setImages} />
						<div className="mb-4">
							<label htmlFor="value">Type name</label>
							<input
								type={"text"}
								placeholder="Type name"
								className="form-control py-3"
								value={state?.type}
								onChange={textChange("type")}
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
						{["Kemtech Enterprises"]?.includes(process.env.REACT_APP_NAME) && (
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

const BillerCategorySelection = ({ isOpen, back, setEducation }) => {
	const { category } = useContext(GlobalState);
	let [data, setThisEducation] = useState({
		category: "",
	});

	return (
		<ModalComponents
			title={"Add education plan process"}
			isOpen={isOpen}
			toggle={back}>
			<>
				{
					<>
						<h3 className="Lexend">Select Category</h3>
						<div className="row mx-0 g-3 g-md-4">
							{category?.data
								?.filter(item => item?.product?.name === "education")
								?.map((item, i) => (
									<div
										className="col-6 col-md-4 p-2"
										onClick={() => {
											setThisEducation({ ...data, category: item?._id });
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
							style={{ borderRadius: "30px" }}
							title={"next"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
							width={"w-50 w50"}
							onClick={() => {
								if (!data?.category) return;
								setEducation(data);
								back();
							}}
						/>
					</>
				}
			</>
		</ModalComponents>
	);
};

const MakePin = ({ isOpen, back, type }) => {
	let { education, manageEducationPin } = useContext(GlobalState);
	let init = {
			type: type ? type : "",
			pin: "",
		},
		[state, setState] = useState(init),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			},
		handleSubmit = async e => {
			e?.preventDefault();
			setLoading(true);
			await manageEducationPin("post", state, "pin");
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (submit && education?.isCreated) {
			back();
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, education?.isCreated]);

	return (
		<>
			<ModalComponents title="education pin" isOpen={isOpen} back={back}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<div className="mb-4">
							<label htmlFor="Education">Education</label>
							<select
								name="network"
								id="network"
								value={state?.type}
								onChange={textChange("type")}
								className="form-control form-select py-3 rounded20">
								<option value="">Select plan</option>
								{education?.educationToBuy?.map((it, i) => (
									<option value={it?._id} key={i}>
										{it?.type}
									</option>
								))}
							</select>
						</div>
						<div className="mb-4">
							<label htmlFor="value">Pin</label>
							<input
								type={"text"}
								placeholder="1234567890"
								value={state?.pin}
								onChange={textChange("pin")}
								className="form-control py-3"
							/>
						</div>
						<Buttons
							title={"add pin"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 d-block mx-auto"
							width={"w-50 w50"}
							onClick={handleSubmit}
							loading={loading}
							style={{ borderRadius: "30px" }}
						/>
					</form>
				</div>
			</ModalComponents>
		</>
	);
};

const EducationPinList = () => {
	let { education } = useContext(GlobalState);

	useEffect(() => {}, [education]);

	let [submit, setSubmit] = useState(false),
		[isDelete, setIsDelete] = useState(false);

	let [data, setData] = useState(null);

	useEffect(() => {
		setData(education?.pins);
	}, [education?.pins]);

	useEffect(() => {
		if (submit && education?.isDeleted) {
			setIsDelete(false);
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, education?.isDeleted]);

	return (
		<>
			<div className="bland row mx-0 p-3 text-capitalize">
				<div className="col textTrunc fontReduce fw-bold Lexend">type</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">pin</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">date</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">status</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">bought By</div>
				<div className="col textTrunc fontReduce fw-bold Lexend"></div>
			</div>
			<div className="bg-white row mx-0">
				{data?.length === 0 ? (
					<EmptyComponent subtitle={"Education list is empty"} />
				) : (
					data?.map((item, index) => (
						<div
							// onClick={() => setThisData(item)}
							key={index}
							className="row mx-0 border-bottom myCursor">
							<div className="col py-3 my-auto textTrunc fontReduce2">
								{item?.type?.type}
							</div>
							<div className="col py-3 my-auto textTrunc fontReduce2">
								{item?.pin}
							</div>
							<div className="col py-3 my-auto textTrunc fontReduce2">
								{moment(item?.createdAt).format("DD/MM/YYYY hh:mm A")}
							</div>
							<div
								className={`col py-3 my-auto textTrunc fontReduce2 text-capitalize ${
									!item?.isBought
										? "list-group-item-success"
										: "list-group-item-danger"
								}`}>
								{item?.isBought ? "bought" : "active"}
							</div>
							<div className="col py-3 my-auto textTrunc fontReduce2 text-capitalize">
								{item?.isBought ? (
									<>
										{item?.boughtBy?.lastName} {item?.boughtBy?.firstName}
									</>
								) : (
									""
								)}
							</div>
							<div className="col py-3 textTrunc my-auto myCursor fontReduce2 text-uppercase text-primary1 btn-group w-100">
								<button
									onClick={() => setIsDelete(item)}
									className="btn  btn-danger2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
									<BiTrashAlt />
								</button>
							</div>
						</div>
					))
				)}
			</div>
			<MakeDelete
				isDelete={isDelete}
				back={() => {
					setIsDelete(false);
				}}
				type={"pin"}
			/>
		</>
	);
};

const MakeDelete = ({ isDelete, back, type }) => {
	let { manageEducationPin, education } = useContext(GlobalState);
	let [loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		handleSubmit = async e => {
			e?.preventDefault();
			setLoading(true);
			await manageEducationPin("delete", isDelete, type);
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (submit && education?.isDeleted) {
			back();
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, education?.isDeleted]);

	return (
		<>
			<ModalComponents
				title={`Delete ${type ? type : "plan"}`}
				isOpen={isDelete ? true : false}
				back={back}>
				<div className="downH2 d-flex">
					<div className="my-auto w-100">
						<p className="text-center">
							Do you want to delete this{" "}
							{isDelete?.type?.type ? isDelete?.type?.type : isDelete?.type}{" "}
							education {type ? type : "plan"}?
						</p>
						<div className="d-flex w-100">
							<Buttons
								loading={loading}
								title="confirm"
								onClick={handleSubmit}
								css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
								width={"w-50"}
							/>
						</div>
					</div>
				</div>
			</ModalComponents>
		</>
	);
};
