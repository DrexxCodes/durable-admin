import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { Buttons, EmptyComponent } from "@/Utils";
import { GlobalState } from "@/Data/Context";
import { ModalComponents } from "@/features/DefaultHeader";
import { BiTrashAlt } from "react-icons/bi";
import { HiThumbDown, HiThumbUp } from "react-icons/hi";
import { BsPen } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import { MainPaginate, MainRanger } from "@/features/Transactions";
import { useNavigate } from "@/lib/router";

const Sliders = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("sliders");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [isOpen, setIsOpen] = useState(false),
		toggle = () => {
			if (isOpen) if (data) setData(null);
			setIsOpen(!isOpen);
		},
		[data, setData] = useState(null),
		navigate = useNavigate(),
		{ auth, permission } = useContext(GlobalState);

	useEffect(() => {
		if (auth?.user?.privilege !== "superadmin") {
			let findTitle = "viewslider";

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

	return (
		<div className="bg-white aboutScreen pb-5">
			<Container className="pt-5">
				<Buttons
					title={"add new slider"}
					css="btn-primary1 text-capitalize py-3"
					width={"px-5"}
					style={{ borderRadius: "30px" }}
					onClick={toggle}
				/>
				<SliderList setData={setData} />
			</Container>
			<MakeNew
				isOpen={isOpen}
				back={toggle}
				setIsOpen={setIsOpen}
				data={data}
			/>
		</div>
	);
};

export default Sliders;

const SliderList = ({ setData }) => {
	let { sliders, manageSlider, getSlider } = useContext(GlobalState);

	let [state, setState] = useState(null),
		[load, setLoad] = useState({ isLoad: false, loadData: "" }),
		[load2, setLoad2] = useState({ isLoad: false, loadData: "" });

	useEffect(() => {
		getSlider();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setState(sliders?.sliders);
	}, [sliders?.sliders]);

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
		<div className="py-5">
			<MainRanger  setRange={setRange} range={range}/>
			<div className="bland row m-0 p-3 text-capitalize">
				<div className="col Lexend fw-bold">Name</div>
				<div className="col Lexend fw-bold">Image</div>
				<div className="col Lexend fw-bold">Date created</div>
				<div className="col Lexend fw-bold">Description</div>
				<div className="col Lexend fw-bold">status</div>
				<div className="col Lexend fw-bold">Action</div>
			</div>
			<div className="bg-white row m-0 p-3">
				{currentItems?.length === 0 ? (
					<EmptyComponent subtitle={"Slider collection empty"} />
				) : (
					currentItems?.map((item, index) => (
						<div key={index} className="row mx-0 p-3 border-bottom">
							<div className="col my-auto">{item?.title}</div>
							<div className="col">
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
							<div className="col my-auto">
								{moment(item?.createdAt).format("MMM DD, YYYY HH:mm:ss")}
							</div>
							<div className="col textTrunc textTrunc4 my-auto">
								{item?.description}
							</div>
							<div
								className={`col my-auto ${
									item?.enabler === "enable" ? "text-success" : "text-danger"
								}`}>
								{item?.enabler}d
							</div>
							<div className="col textTrunc my-auto btn-group fontReduce2 w-100">
								<button
									onClick={async () => {
										setLoad({ isLoad: true, loadData: item?._id });
										await manageSlider(
											{
												...item,
												enabler:
													item?.enabler === "enable" ? "disable" : "enable",
												},
											item?._id,
											"edit"
										);
										setLoad({ isLoad: false, loadData: "" });
									}}
									className="btn btn-primary1 text-capitalize p-1 p-md-2 w-100 fontReduce2">
									{load?.isLoad && load?.loadData === item?._id ? (
										<ClipLoader color="white" size={16} />
										) : item?.enabler === "enable" ? (
											<HiThumbDown />
											) : (
												<HiThumbUp />
												)}
								</button>
								<button
									onClick={() => setData(item)}
									className="btn btn-success2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
									<BsPen />
								</button>
								<button
									onClick={async () => {
										setLoad2({ isLoad: true, loadData: item?._id });
										await manageSlider(item, item?._id, "delete");
										setLoad2({ isLoad: false, loadData: "" });
									}}
									className="btn btn-danger2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
									{load2?.isLoad && load2?.loadData === item?._id ? (
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
			<MainPaginate handlePageClick={handlePageClick} pageCount={pageCount} />
		</div>
	);
};

const MakeNew = ({ isOpen, back, data, setIsOpen }) => {
	let { manageSlider, sliders } = useContext(GlobalState);
	let init = {
		description: "",
		title: "",
		status: "active",
	};
	let [newData, setNewData] = useState(init),
		[newLoad, setNewLoad] = useState(false),
		[image, setImages] = useState(false),
		[submit, setSubmit] = useState(false);

	let textChange =
		name =>
		({ target: { value } }) => {
			setNewData({ ...newData, [name]: value });
		};

	useEffect(() => {
		if (data) {
			setNewData(data);
			setImages(data?.image ? data?.image : false);
		}
	}, [data]);

	let handleSubmit = async e => {
		e?.preventDefault();
		let datum;
		if (!newData?.title) return;
		if (!data) {
			// return toast.info("Pleae fill out all fields");
			// if (!image) return toast.warn("Tour image required");
			datum = { ...newData, image };
		} else {
			if (image === data?.image) {
				datum = { ...newData };
			} else datum = { ...newData, image };
		}
		setNewLoad(true);
		await manageSlider(datum, data ? data?._id : false);
		setNewLoad(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && sliders?.isAdded) {
			setSubmit(false);
			setNewData(init);
			setImages(false);
			setIsOpen(false);
		}
		if (submit && sliders?.isUpdated) {
			setSubmit(false);
			setNewData(init);
			setImages(false);
			setIsOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, sliders?.isAdded, sliders?.isUpdated]);

	return (
		<>
			<ModalComponents
				title={data ? `Update ${data?.title} slider` : "Add new slider"}
				isOpen={isOpen}
				back={back}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<UploadPicture img={image} setImages={setImages} />
						<div className="mb-4">
							<label htmlFor="Name">Name</label>
							<input
								type="text"
								value={newData?.title}
								onChange={textChange("title")}
								className="form-control py-3"
								placeholder="Welcome"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="URL">Link URL</label>
							<input
								type="url"
								value={newData?.linkURL}
								onChange={textChange("linkURL")}
								className="form-control py-3"
								placeholder="Link URL"
								name="Link URL"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="Description">Description</label>
							<textarea
								style={{
									resize: "none",
									height: "10rem",
								}}
								value={newData?.description}
								onChange={textChange("description")}
								placeholder="Your description here"
								className="form-control py-3"
							/>
						</div>
						{data && (
							<div className="mb-4">
								<label htmlFor="Status">Status</label>
								<select
									name="Status"
									onChange={textChange("enabler")}
									value={newData?.enabler}
									className="form-control py-3 form-select"
									id="">
									<option value="enable">Enable</option>
									<option value="disable">Disable</option>
								</select>
							</div>
						)}
						<Buttons
							title={data ? "update" : "upload"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
							width={"w-50 w50 mx-auto"}
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

export const UploadPicture = ({ img, setImages }) => {
	let handleChangeImage = e => {
		let file = e.target.files[0];
		if (!file) {
			// return toast.error("No Image file included...");
		}

		if (
			file.type !== "image/jpeg" &&
			file.type !== "image/jpg" &&
			file.type !== "image/png"
		) {
			// return toast.error("Image format not supported");
		}
		setImages(file);
	};
	return (
		<div className="mb-3 mb-md-5">
			<h4 className="textColor mb-3 Lexend">Upload picture</h4>
			<div className="file_upload d-inline myCursor mb-5">
				<button
					title="Upload file"
					className="btn btn-outline-primary1 text-capitalize px-2 px-md-5 mx-1 mx-md-3">
					click to upload
				</button>
				<input
					title="Upload file"
					type="file"
					name="file"
					id="file"
					className="myCursor"
					accept="image/*"
					onChange={handleChangeImage}
				/>
				<div className="mb-3 mb-md-5" />
			</div>
			{img ? (
				<>
					<div className="row mx-0 g-4 mb-3 mb-md-5">
						<div className="col-md-4">
							<img
								src={img?.url ? img?.url : URL?.createObjectURL(img)}
								alt="Img"
								className="img-fluid fleetImg fleetImg2 rounded imgShow"
							/>
						</div>
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
};
