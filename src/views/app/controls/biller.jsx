import React, { useContext, useEffect, useState } from "react";
// import { BiTrashAlt } from "react-icons/bi";
import { BsPen } from "react-icons/bs";
// import { ClipLoader } from "react-spinners";
import Container from "@/components/ui/Container";
import { ModalComponents } from "@/features";
import { GlobalState } from "@/Data/Context";
import { Buttons, EmptyComponent } from "@/Utils";
import { useNavigate } from "@/lib/router";

const ManageBillers = () => {
	let { setStateName, auth, permission, getBiller } = useContext(GlobalState);
	useEffect(() => {
		setStateName("Biller Control");
		getBiller()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [isOpenInit, setIsOpenInit] = useState(false),
		toggleInit = () => {
			if (isOpenInit) if (data) setData(null);
			setIsOpenInit(!isOpenInit);
		},
		[data, setData] = useState(null),
		navigate = useNavigate();

	useEffect(() => {
		if (auth?.user?.privilege !== "superadmin") {
			let findTitle = "viewmanagebiller";

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
		if (data) setIsOpenInit(true);
	}, [data]);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<h4 className="Lexend">All biller</h4>{" "}
				<div className="btn-group">
					<Buttons
						title={"create new"}
						css={`btn-primary1 text-capitalize py-md-3 py-2 px-4 px-lg-5 my-md-4 my-2 mb-0 ${process.env.NODE_ENV === 'production' ? "d-none":""}`}
						width={"w-auto"}
						onClick={toggleInit}
						style={{ borderRadius: "30px" }}
					/>
				</div>
				<BillerDetails setData={setData} />
			</Container>{" "}
			<MakeBiller isOpen={isOpenInit} back={toggleInit} datum={data} />
		</div>
	);
};

export default ManageBillers;

const BillerDetails = ({ setData }) => {
	let {
			biller,
			// manageBiller
		} = useContext(GlobalState),
		[state, setState] = useState(null);
	// [load2, setLoad2] = useState({ isLoad: false, loadData: "" });

	useEffect(() => {
		if (biller?.isFound) setState(biller?.mainSearch?.filter(item => !item?.billerId?.includes("inhouse")));
		else setState(biller?.data?.filter(item => !item?.billerId?.includes("inhouse")));
	}, [biller?.mainSearch, biller?.isFound, biller?.data]);

	if (!state) return;

	return (
		<>
			<div className="pb-5 my-5">
				<div className="bland row mx-0 py-3 px-0 text-capitalize Lexend fw-bold">
					<div className="col textTrunc Lexend">S/N</div>
					<div className="col textTrunc Lexend">name</div>
					<div className="col textTrunc Lexend">action</div>
				</div>
				<div className="bg-white row mx-0">
					{state?.length === 0 ? (
						<EmptyComponent subtitle={"Biller state empty"} />
					) : (
						state?.map((item, index) => (
							<div key={index} className="row mx-0 py-3 px-0 border-bottom">
								<div className="col textTrunc my-auto">{index + 1}</div>
								<div className="col textTrunc my-auto text-uppercase">
									{item?.name}
								</div>
								<div className="col textTrunc my-auto btn-group">
									<button
										title="Edit Data plan"
										onClick={() => setData(item)}
										className="btn btn-success2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
										<BsPen />
									</button>
									{/* <button
										onClick={async () => {
											setLoad2({ isLoad: true, loadData: item?._id });
											await manageBiller(item, item?._id, "delete");
											setLoad2({ isLoad: false, loadData: "" });
										}}
										className="btn btn-danger2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
										{load2?.isLoad && load2?.loadData === item?._id ? (
											<ClipLoader color="white" size={16} />
										) : (
											<BiTrashAlt />
										)}
									</button> */}
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</>
	);
};

const MakeBiller = ({ isOpen, back, datum }) => {
	const { biller, manageBiller } = useContext(GlobalState);
	let init = {
			name: "",
			password: "",
			email: "",
			apiKey: "",
			secondApiKey: "",
			thirdApiKey: "",
		},
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
		datum?._id
			? await manageBiller(data, datum?._id, "edit")
			: await manageBiller(data);
		setNewLoad(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && biller?.isAdded) {
			setSubmit(false);
			setThisData(init);
			back();
		}
		if (submit && biller?.isUpdated) {
			setSubmit(false);
			setThisData(init);
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, biller?.isAdded, biller?.isUpdated]);

	return (
		<ModalComponents
			title={datum ? "Update Biller" : "Add product"}
			isOpen={isOpen}
			toggle={back}>
			<>
				<div className="mb-4">
					<label htmlFor="Name">Biller name</label>
					<input
						type="text"
						className="form-control py-3"
						value={data?.name}
						onChange={e => setThisData({ ...data, name: e.target.value })}
						placeholder="Biller name"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="Name">Auth email</label>
					<input
						type="email"
						className="form-control py-3"
						value={data?.email}
						onChange={e => setThisData({ ...data, email: e.target.value })}
						placeholder="Auth email"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="Name">Auth password</label>
					<input
						type="password"
						className="form-control py-3"
						value={data?.password}
						onChange={e => setThisData({ ...data, password: e.target.value })}
						placeholder="Auth password"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="Name">Api key</label>
					<input
						type="text"
						className="form-control py-3"
						value={data?.apiKey}
						onChange={e => setThisData({ ...data, apiKey: e.target.value })}
						placeholder="Api key"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="Name">Secret key</label>
					<input
						type="text"
						className="form-control py-3"
						value={data?.secondApiKey}
						onChange={e =>
							setThisData({ ...data, secondApiKey: e.target.value })
						}
						placeholder="Secret key"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="Name">Public key</label>
					<input
						type="text"
						className="form-control py-3"
						value={data?.thirdApiKey}
						onChange={e =>
							setThisData({ ...data, thirdApiKey: e.target.value })
						}
						placeholder="Public key"
					/>
				</div>
				<Buttons
					title={datum ? "update" : "create"}
					css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
					width={"w-50 w50"}
					onClick={handleSubmit}
					loading={newLoad}
				/>
			</>
		</ModalComponents>
	);
};
