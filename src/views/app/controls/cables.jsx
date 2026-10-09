import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "@/Data/Context";
import Container from "@/components/ui/Container";
import { Buttons, EmptyComponent } from "@/Utils";
import { ModalComponents } from "@/features";
import { BiTrashAlt } from "react-icons/bi";
import { BsPen } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import { UploadPicture } from "@/views/app/sliders";
import { useNavigate } from "@/lib/router";

const Cables = () => {
	let { setStateName, auth, permission } = useContext(GlobalState);
	useEffect(() => {
		setStateName("Cables Controls");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [isOpen, setIsOpen] = useState(false),
		[isOpenInit, setIsOpenInit] = useState(false),
		[data, setCables] = useState(null),
		toggleInit = () => {
			setIsOpenInit(!isOpenInit);
		},
		toggle = () => {
			if (data) setCables(null);
			setIsOpen(!isOpen);
		},
		navigate = useNavigate();

	useEffect(() => {
		if (auth?.user?.privilege !== "superadmin") {
			let findTitle = "viewmanagecablessubscription";

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
				<h4 className="Lexend">All cables plans</h4>{" "}
				<div className="btn-group">
					<Buttons
						title={"create new"}
						css="btn-primary1 text-capitalize py-md-3 py-2 px-4 px-lg-5 my-md-4 my-2 mb-0"
						width={"w-auto"}
						onClick={toggleInit}
						style={{ borderRadius: "30px" }}
					/>
				</div>
				<CablesBundleDetails setCables={setCables} />
			</Container>{" "}
			<MakeCablesBundle isOpen={isOpen} back={toggle} datum={data} />
			<CategorySelection
				isOpen={isOpenInit}
				back={toggleInit}
				setCables={setCables}
			/>
		</div>
	);
};

export default Cables;

const CablesBundleDetails = ({ setCables }) => {
	let { cablesBundle, manageCables } = useContext(GlobalState),
		[state, setState] = useState(null),
		[load2, setLoad2] = useState({ isLoad: false, loadCables: "" });

	useEffect(() => {
		setState(cablesBundle?.data);
	}, [cablesBundle?.data]);

	if (!state) return;

	return (
		<>
			<div className="pb-5 my-5">
				<div className="bland row mx-0 py-3 px-0 text-capitalize Lexend fw-bold">
					<div className="col textTrunc d-none d-md-flex Lexend">S/N</div>
					<div className="col textTrunc Lexend">Image</div>
					<div className="col textTrunc Lexend">Name</div>
					<div className="col textTrunc Lexend">action </div>
				</div>
				<div className="bg-white row mx-0">
					{state?.length === 0 ? (
						<EmptyComponent subtitle={"CablesBundle state empty"} />
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
											width: "auto",
										}}
									/>
								</div>
								<div className="col textTrunc my-auto">{item?.name}</div>
								<div className="col textTrunc my-auto btn-group">
									<button
										title="Edit Cables plan"
										onClick={() => setCables(item)}
										className="btn btn-success2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
										<BsPen />
									</button>
									<button
										title="Delete Cables plan"
										onClick={async () => {
											setLoad2({ isLoad: true, loadCables: item?._id });
											await manageCables(item, item?._id, "delete");
											setLoad2({ isLoad: false, loadCables: "" });
										}}
										className="btn btn-danger2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
										{load2?.isLoad && load2?.loadCables === item?._id ? (
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

const MakeCablesBundle = ({ isOpen, back, datum }) => {
	let { cablesBundle, manageCables } = useContext(GlobalState);
	let init = {
			name: "",
			category: "",
		},
		[state, setState] = useState(init),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			},
		[newLoad, setNewLoad] = useState(false),
		[submit, setSubmit] = useState(false),
		[image, setImages] = useState();

	useEffect(() => {
		if (datum) {
			setState(datum);
			setImages(datum?.image ? datum?.image : false);
		}
	}, [datum]);

	let handleSubmit = async e => {
		e?.preventDefault();
		if (!state?.name) return;

		let datee = state;

		if (!datum) {
			datee = { ...state, image };
		} else {
			if (image === datum?.image) {
				datee = { ...state };
			} else datee = { ...state, image };
		}

		setNewLoad(true);
		datum?._id
			? await manageCables(datee, datum?._id, "edit")
			: await manageCables(datee);
		setNewLoad(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && cablesBundle?.isAdded) {
			setSubmit(false);
			setState(init);
			back();
		}
		if (submit && cablesBundle?.isUpdated) {
			setSubmit(false);
			setState(init);
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, cablesBundle?.isAdded, cablesBundle?.isUpdated]);

	return (
		<>
			<ModalComponents
				title={datum?._id ? `update ${datum?.name}` : "add cables plan"}
				isOpen={isOpen}
				back={back}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<UploadPicture img={image} setImages={setImages} />
						<div className="mb-4">
							<label htmlFor="value">Cables name</label>
							<input
								type={"text"}
								placeholder="Cables name"
								className="form-control py-3"
								value={state?.name}
								onChange={textChange("name")}
							/>
						</div>
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

const CategorySelection = ({ isOpen, back, setCables }) => {
	const { category } = useContext(GlobalState);
	let [data, setThisCables] = useState({
		category: "",
	});

	return (
		<ModalComponents
			title={"Add cables plan process"}
			isOpen={isOpen}
			toggle={back}>
			<>
				{
					<>
						<h3 className="Lexend">Select Category</h3>
						<div className="row mx-0 g-3 g-md-4">
							{category?.data
								?.filter(item => item?.product?.name === "cables")
								?.map((item, i) => (
									<div
										className="col-6 col-md-4 p-2"
										onClick={() => {
											setThisCables({ ...data, category: item?._id });
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
								setCables(data);
								back();
							}}
						/>
					</>
				}
			</>
		</ModalComponents>
	);
};
