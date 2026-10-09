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
import { useNavigate } from "@/lib/router";

const Electricity = () => {
	let { setStateName, toggleAvailabilty, auth, permission } =
		useContext(GlobalState);
	useEffect(() => {
		setStateName("Electricity Controls");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [isOpen, setIsOpen] = useState(false),
		[isOpenInit, setIsOpenInit] = useState(false),
		[data, setElectricity] = useState(null),
		toggle = () => {
			if (data) setElectricity(null);
			setIsOpen(!isOpen);
		},
		toggleInit = () => {
			setIsOpenInit(!isOpenInit);
		},
		[loading, setLoading] = useState(""),
		navigate = useNavigate();

	useEffect(() => {
		if (auth?.user?.privilege !== "superadmin") {
			let findTitle = "viewmanagebillplan";

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
				<h4 className="Lexend">All electricity plans</h4>{" "}
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
							await toggleAvailabilty("electricity", "disable");
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
							await toggleAvailabilty("electricity", "enable");
							setLoading("");
						}}
						loading={loading === "enable"}
						style={{ borderRadius: "30px" }}
					/>
				</div>
				<ElectricityBundleDetails setElectricity={setElectricity} />
			</Container>{" "}
			<MakeElectricityBundle isOpen={isOpen} back={toggle} datum={data} />
			<BillerCategorySelection
				isOpen={isOpenInit}
				back={toggleInit}
				setElectricity={setElectricity}
			/>
		</div>
	);
};

export default Electricity;

const ElectricityBundleDetails = ({ setElectricity }) => {
	let { electricityBundle, manageElectricityBundle } = useContext(GlobalState),
		[state, setState] = useState(null),
		[load, setLoad] = useState({ isLoad: false, loadElectricity: "" }),
		[load2, setLoad2] = useState({ isLoad: false, loadElectricity: "" });

	useEffect(() => {
		if (electricityBundle?.isFound) setState(electricityBundle?.mainSearch);
		else setState(electricityBundle?.data);
	}, [
		electricityBundle?.mainSearch,
		electricityBundle?.isFound,
		electricityBundle?.data,
	]);

	if (!state) return;

	return (
		<>
			<div className="pb-5 my-5">
				<div className="bland row mx-0 py-3 px-0 text-capitalize Lexend fw-bold">
					<div className="col textTrunc d-none d-md-flex Lexend">S/N</div>
					<div className="col textTrunc Lexend">Image</div>
					<div className="col textTrunc Lexend">Disco</div>
					<div className="col textTrunc Lexend">Disco fullname</div>
					<div className="col textTrunc Lexend">category</div>
					<div className="col textTrunc Lexend">status</div>
					<div className="col textTrunc Lexend">action </div>
				</div>
				<div className="bg-white row mx-0">
					{state?.length === 0 ? (
						<EmptyComponent subtitle={"ElectricityBundle state empty"} />
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
								<div className="col textTrunc my-auto">{item?.disco}</div>
								<div className="col textTrunc textTrunc3 my-auto">
									{item?.fullname}
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
										} Electricity plan`}
										onClick={async () => {
											setLoad({ isLoad: true, loadElectricity: item?._id });
											await manageElectricityBundle(
												{
													...item,
													enabler:
														item?.enabler === "enable" ? "disable" : "enable",
												},
												item?._id,
												"edit"
											);
											setLoad({ isLoad: false, loadElectricity: "" });
										}}
										className="btn btn-primary1 text-capitalize p-1 p-md-2 w-100 fontReduce2">
										{load?.isLoad && load?.loadElectricity === item?._id ? (
											<ClipLoader color="white" size={16} />
										) : item?.enabler === "enable" ? (
											<HiThumbDown />
										) : (
											<HiThumbUp />
										)}
									</button>
									<button
										title="Edit Electricity plan"
										onClick={() => setElectricity(item)}
										className="btn btn-success2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
										<BsPen />
									</button>
									<button
										title="Delete Electricity plan"
										onClick={async () => {
											setLoad2({ isLoad: true, loadElectricity: item?._id });
											await manageElectricityBundle(item, item?._id, "delete");
											setLoad2({ isLoad: false, loadElectricity: "" });
										}}
										className="btn btn-danger2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
										{load2?.isLoad && load2?.loadElectricity === item?._id ? (
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

const MakeElectricityBundle = ({ isOpen, back, datum }) => {
	let { electricityBundle, manageElectricityBundle } = useContext(GlobalState);
	let init = {
			enabler: "",
			disco: "",
			fullname: "",
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
		if (!state?.disco || !state?.fullname) return;

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

		setNewLoad(true);
		datum?._id
			? await manageElectricityBundle(datee, datum?._id, "edit")
			: await manageElectricityBundle(datee);
		setNewLoad(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && electricityBundle?.isAdded) {
			setSubmit(false);
			setState(init);
			back();
		}
		if (submit && electricityBundle?.isUpdated) {
			setSubmit(false);
			setState(init);
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, electricityBundle?.isAdded, electricityBundle?.isUpdated]);

	return (
		<>
			<ModalComponents
				title={
					datum?._id ? `update ${datum?.fullname}` : "add electricity plan"
				}
				isOpen={isOpen}
				back={back}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<UploadPicture img={image} setImages={setImages} />
						<div className="mb-4">
							<label htmlFor="value">Disco name</label>
							<input
								type={"text"}
								placeholder="Disco name"
								className="form-control py-3"
								value={state?.disco}
								onChange={textChange("disco")}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="value">Full disco name</label>
							<input
								type={"text"}
								placeholder="Fullname"
								className="form-control py-3"
								value={state?.fullname}
								onChange={textChange("fullname")}
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

const BillerCategorySelection = ({ isOpen, back, setElectricity }) => {
	const { category } = useContext(GlobalState);
	let [data, setThisElectricity] = useState({
		category: "",
	});

	return (
		<ModalComponents
			title={"Add electricity plan process"}
			isOpen={isOpen}
			toggle={back}>
			<>
				{
					<>
						<h3 className="Lexend">Select Category</h3>
						<div className="row mx-0 g-3 g-md-4">
							{category?.data
								?.filter(item => item?.product?.name === "electricity")
								?.map((item, i) => (
									<div
										className="col-6 col-md-4 p-2"
										onClick={() => {
											setThisElectricity({ ...data, category: item?._id });
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
								setElectricity(data);
								back();
							}}
						/>
					</>
				}
			</>
		</ModalComponents>
	);
};
