import React, { useContext, useEffect, useState } from "react";
import { BiPlusCircle, BiTrashAlt } from "react-icons/bi";
import { BsPen } from "react-icons/bs";
import { HiThumbDown, HiThumbUp } from "react-icons/hi";
import { ClipLoader } from "react-spinners";
import Container from "@/components/ui/Container";
import { ModalComponents } from "@/features";
import { GlobalState } from "@/Data/Context";
import { Buttons, EmptyComponent } from "@/Utils";
import { MainPaginate, MainRanger } from "@/features/Transactions";
import { useNavigate } from "@/lib/router";

const ManageCategory = () => {
	let { setStateName, toggleAvailabilty, auth, permission, getBiller } =
		useContext(GlobalState);
	useEffect(() => {
		setStateName("Category Control");
		getBiller();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [isOpenInit, setIsOpenInit] = useState(false),
		toggleInit = () => {
			if (isOpenInit) {
				if (type) setType("");
				if (data) setData(null);
			}
			setIsOpenInit(!isOpenInit);
		},
		[isOpenAdd, setIsOpenAdd] = useState(false),
		toggleAdd = () => {
			if (isOpenAdd) {
				if (type) setType("");
				if (data) setData(null);
			}
			setIsOpenAdd(!isOpenAdd);
		},
		[isOpenEdit, setIsOpenEdit] = useState(false),
		toggleEdit = () => {
			if (isOpenEdit) {
				if (type) setType("");
				if (data) setData(null);
			}
			setIsOpenEdit(!isOpenEdit);
		},
		[loading, setLoading] = useState(false),
		[data, setData] = useState(null),
		[type, setType] = useState(null),
		navigate = useNavigate();

	useEffect(() => {
		if (auth?.user?.privilege !== "superadmin") {
			let findTitle = "viewmanagecategory";

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
		if (type && data) {
			if (type === "biller") setIsOpenAdd(true);
			if (type === "edit") setIsOpenEdit(true);
		}
	}, [type, data]);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<h4 className="Lexend">All category</h4>{" "}
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
							await toggleAvailabilty("category", "disable");
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
							await toggleAvailabilty("category", "enable");
							setLoading("");
						}}
						loading={loading === "enable"}
						style={{ borderRadius: "30px" }}
					/>
				</div>
				<CategoryDetails setData={setData} setType={setType} />
			</Container>{" "}
			<ProductSelection isOpen={isOpenInit} back={toggleInit} />
			<BillerAddtion isOpen={isOpenAdd} back={toggleAdd} datum={data} />
			<UpdateCategory isOpen={isOpenEdit} back={toggleEdit} datum={data} />
		</div>
	);
};

export default ManageCategory;

const CategoryDetails = ({ setData, setType }) => {
	let { category, manageCategory } = useContext(GlobalState),
		[state, setState] = useState(null),
		[load, setLoad] = useState({ isLoad: false, loadData: "" }),
		[load2, setLoad2] = useState({ isLoad: false, loadData: "" });

	useEffect(() => {
		if (category?.isFound) setState(category?.mainSearch);
		else setState(category?.data);
	}, [category?.mainSearch, category?.isFound, category?.data]);

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
				<MainRanger setRange={setRange} range={range} />
				<div className="bland row mx-0 py-3 px-0 text-capitalize Lexend fw-bold d-none d-md-flex">
					<div className="col textTrunc Lexend">S/N</div>
					<div className="col textTrunc Lexend">name</div>
					<div className="col textTrunc Lexend">product</div>
					<div className="col textTrunc Lexend">biller</div>
					<div className="col textTrunc Lexend">biller List</div>
					<div className="col textTrunc Lexend">no of billers</div>
					<div className="col textTrunc Lexend">status</div>
					<div className="col textTrunc Lexend">action </div>
				</div>
				<div className="bg-white row mx-0">
					{currentItems?.length === 0 ? (
						<EmptyComponent subtitle={"Category state empty"} />
					) : (
						currentItems?.map((item, index) => (
							<div
								key={index}
								className="d-block d-md-flex row mx-0 py-3 px-0 border-bottom">
								<div className="col textTrunc my-auto d-none d-md-flex">
									{index + 1}
								</div>
								<div className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
									<span className="fontReduce d-md-none Lexend">Name:</span>
									<span className="text-uppercase">{item?.name}</span>
								</div>
								<div className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
									<span className="fontReduce d-md-none Lexend">Product:</span>
									<span className="text-uppercase">{item?.product?.name}</span>
								</div>
								<div className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
									<span className="fontReduce d-md-none Lexend">Biller:</span>
									<span className="text-uppercase">{item?.biller?.name}</span>
								</div>
								<div className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
									<span className="fontReduce d-md-none Lexend">
										Biller list:
									</span>
									<span className="text-uppercase">
										{item?.billerList?.length > 0
											? item?.billerList?.map((list, a) => (
													<span className="d-block text-uppercase" key={a}>
														{list?.name}
														{a === item?.billerList?.length - 1 ? "" : ","}
													</span>
											  ))
											: ""}
									</span>
								</div>
								<div
									onClick={() => {
										setType("biller");
										setData(item);
									}}
									className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
									<span className="fontReduce d-md-none Lexend">
										No of biller:
									</span>
									<div className="d-flex align-items-center">
										{item?.billerList?.length}
										<BiPlusCircle className="text-success ms-1" />
									</div>
								</div>
								<div
									className={`col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0 ${
										item?.enabler === "enable"
											? "text-success text-success2"
											: "text-danger text-danger2"
									}`}>
									<span className="fontReduce d-md-none Lexend">Status:</span>
									{item?.enabler}d
								</div>
								<div className="col textTrunc my-auto btn-group">
									<button
										title={`${
											item?.enabler === "enable" ? "Disable" : "Enable"
										} category`}
										onClick={async () => {
											setLoad({ isLoad: true, loadData: item?._id });
											await manageCategory(
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
										className="btn btn-primary1 text-capitalize py-3 p-1 p-md-2 w-100 fontReduce2">
										{load?.isLoad && load?.loadData === item?._id ? (
											<ClipLoader color="white" size={16} />
										) : item?.enabler === "enable" ? (
											<HiThumbDown />
										) : (
											<HiThumbUp />
										)}
									</button>
									<button
										title="Edit Data plan"
										onClick={() => {
											setType("edit");
											setData(item);
										}}
										className="btn btn-success2 text-capitalize py-3 p-1 p-md-2 w-100 fontReduce2">
										<BsPen />
									</button>
									<button
										title="Delete Data plan"
										onClick={async () => {
											setLoad2({ isLoad: true, loadData: item?._id });
											await manageCategory(item, item?._id, "delete");
											setLoad2({ isLoad: false, loadData: "" });
										}}
										className="btn btn-danger2 text-capitalize py-3 p-1 p-md-2 w-100 fontReduce2">
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
		</>
	);
};

const ProductSelection = ({ isOpen, back, datum }) => {
	const { products, biller, category, manageCategory } =
		useContext(GlobalState);
	let [active, setActive] = useState(0),
		init = { product: "", biller: "", name: "" },
		[data, setThisData] = useState(init),
		[showInhouse, setShowInhouse] = useState(false);

	useEffect(() => {
		if (datum) setActive(2);
	}, [datum]);

	useEffect(() => {
		if (data?.product) {
			let findProduct = products?.data?.find(it => {
				let checkProduct = data?.product?._id || data?.product,
					checkFind = it?._id || it;
				return checkFind === checkProduct;
			});
			setShowInhouse(findProduct && findProduct?.name === "education");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.product]);

	let [newLoad, setNewLoad] = useState(false),
		[submit, setSubmit] = useState(false);

	useEffect(() => {
		if (datum) {
			setThisData(datum);
		}
	}, [datum]);

	let handleSubmit = async e => {
		e?.preventDefault();
		if (!data?.name) return;

		setNewLoad(true);
		datum?._id
			? await manageCategory(
					{ ...data, name: data?.name?.trim() },
					datum?._id,
					"edit"
			  )
			: await manageCategory({ ...data, name: data?.name?.trim() });
		setNewLoad(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && category?.isAdded) {
			setSubmit(false);
			setThisData(init);
			back();
			setActive(0);
		}
		if (submit && category?.isUpdated) {
			setSubmit(false);
			setThisData(init);
			back();
			setActive(0);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, category?.isAdded, category?.isUpdated]);

	return (
		<ModalComponents
			title={datum ? "Update Category" : "Add category process"}
			isOpen={isOpen}
			toggle={back}>
			<>
				{active === 2 ? (
					<>
						<div className="mb-4">
							<label htmlFor="Name">Category name</label>
							<input
								type="text"
								className="form-control py-3"
								value={data?.name}
								onChange={e => setThisData({ ...data, name: e.target.value })}
								placeholder="Category name"
							/>
						</div>
						<div className="mx-auto d-block w-50">
							<div className="btn-group">
								{!datum && (
									<Buttons
										title={"prev"}
										css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
										width={"w-50 w50"}
										onClick={() => setActive(1)}
									/>
								)}
								<Buttons
									title={datum ? "update" : "create"}
									css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
									width={"w-50 w50"}
									onClick={handleSubmit}
									loading={newLoad}
								/>
							</div>
						</div>
					</>
				) : active === 1 ? (
					<>
						<h3 className="Lexend">Select Biller</h3>
						<div className="row mx-0 g-3 g-md-4">
							{biller?.data
								?.filter(item =>
									showInhouse ? item : !item?.billerId?.includes("inhouse")
								)
								?.map((item, i) => (
									<div
										className="col-6 col-md-4 p-2"
										onClick={() => {
											setThisData({ ...data, biller: item?._id });
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
										setActive(2);
									}}
								/>
							</div>
						</div>
					</>
				) : (
					<>
						<h3 className="Lexend">Select Product</h3>
						<div className="row mx-0 g-3 g-md-4">
							{products?.data?.map((item, i) => (
								<div
									className="col-6 col-md-4 p-2"
									onClick={() => {
										setThisData({ ...data, product: item?._id });
									}}
									key={i}>
									<button
										className={`btn ${
											item?._id === data?.product
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
								if (!data?.product) return;
								setActive(1);
							}}
						/>
					</>
				)}
			</>
		</ModalComponents>
	);
};

const BillerAddtion = ({ isOpen, back, datum }) => {
	const { biller, category, manageCategory, products } =
		useContext(GlobalState);
	let init = { biller: "" },
		[data, setThisData] = useState(init),
		[showInhouse, setShowInhouse] = useState(false);

	useEffect(() => {
		if (data?.product) {
			let findProduct = products?.data?.find(it => {
				let checkProduct = data?.product?._id || data?.product,
					checkFind = it?._id || it;
				return checkFind === checkProduct;
			});
			setShowInhouse(findProduct && findProduct?.name === "education");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.product]);

	let [newLoad, setNewLoad] = useState(false),
		[submit, setSubmit] = useState(false);

	useEffect(() => {
		if (datum) {
			setThisData(datum);
		}
	}, [datum]);

	let handleSubmit = async e => {
		e?.preventDefault();
		if (!data?.biller) return;

		setNewLoad(true);
		await manageCategory(data, `${datum?._id}/biller`, "edit");
		setNewLoad(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && category?.isUpdated) {
			setSubmit(false);
			setThisData(init);
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, category?.isUpdated]);

	return (
		<ModalComponents
			title={"Add category biller"}
			isOpen={isOpen}
			toggle={back}>
			<>
				<h3 className="Lexend">Select Biller</h3>
				<div className="row mx-0 g-3 g-md-4">
					{biller?.data
						?.filter(item =>
							showInhouse ? item : !item?.billerId?.includes("inhouse")
						)
						?.map((item, i) => (
							<div
								className="col-6 col-md-4 p-2"
								onClick={() => {
									setThisData({ ...data, biller: item?._id });
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
				<Buttons
					title={datum ? "add" : "create"}
					css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
					width={"w-50 w50"}
					onClick={handleSubmit}
					loading={newLoad}
				/>
			</>
		</ModalComponents>
	);
};

const UpdateCategory = ({ isOpen, back, datum }) => {
	const { category, manageCategory } = useContext(GlobalState);
	let init = { name: "", enabler: "" },
		[data, setThisData] = useState(init);

	let [newLoad, setNewLoad] = useState(false),
		[submit, setSubmit] = useState(false);

	useEffect(() => {
		if (datum) {
			setThisData(datum);
		}
	}, [datum]);

	let handleSubmit = async e => {
		e?.preventDefault();
		if (!data?.name) return;

		setNewLoad(true);
		await manageCategory(
			{ ...data, name: data?.name?.trim() },
			`${datum?._id}`,
			"edit"
		);
		setNewLoad(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && category?.isUpdated) {
			setSubmit(false);
			setThisData(init);
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, category?.isUpdated]);

	return (
		<ModalComponents
			title={`Update category ${datum?.name}`}
			isOpen={isOpen}
			toggle={back}>
			<>
				<div className="mb-4">
					<label htmlFor="Name">Category name</label>
					<input
						type="text"
						className="form-control py-3"
						value={data?.name}
						onChange={e => setThisData({ ...data, name: e.target.value })}
						placeholder="Category name"
					/>
				</div>
				<>
					<div className="mb-4">
						<label htmlFor="value">Status</label>
						<select
							name="Status"
							className="form-control py-3"
							value={data?.enabler}
							onChange={e => setThisData({ ...data, enabler: e.target.value })}
							id="">
							<option value="">Select status</option>
							<option value="enable">Enabled</option>
							<option value="disable">Disabled</option>
						</select>
					</div>
				</>
				<Buttons
					title={"update"}
					css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
					width={"w-50 w50"}
					onClick={handleSubmit}
					loading={newLoad}
				/>
			</>
		</ModalComponents>
	);
};
