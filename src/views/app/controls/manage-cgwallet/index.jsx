import React, { useContext, useEffect, useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { BsPen } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import Container from "@/components/ui/Container";
import { ModalComponents } from "@/features";
import { GlobalState } from "@/Data/Context";
import { Buttons, EmptyComponent } from "@/Utils";
import { useNavigate, useParams } from "@/lib/router";
import {
	DataNetworkList,
	NetworkList2,
} from "@/features/Products/airtime";

const ManageCgWallet = () => {
	let { setStateName, manageCGWallets, auth, permission, network } =
		useContext(GlobalState);
	useEffect(() => {
		setStateName("CG Wallet Control");
		manageCGWallets("get");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let navigate = useNavigate(),
		params = useParams(),
		controlsTab = [
			{
				name: "MTN",
				type: "link",
				link: `/${params?.page}/${params?.id}/mtn`,
				color: "var(--tile)",
			},
			{
				name: "GLO",
				type: "link",
				link: `/${params?.page}/${params?.id}/glo`,
				color:
					"var(--tile)",
			},
			{
				textColor: "white",
				name: "AIRTEL",
				type: "link",
				link: `/${params?.page}/${params?.id}/airtel`,
				color: "var(--tile)",
			},
			{
				name: "9MOBILE",
				type: "link",
				link: `/${params?.page}/${params?.id}/9mobile`,
				color: "var(--tile)",
				textColor: "white",
			},
		];

	useEffect(() => {
		if (auth?.user?.privilege !== "superadmin") {
			let findTitle = "viewcgwallet";

			let findPermit = permission?.data?.find(
				item =>
					item?.slug === findTitle && item?.user?.includes(auth?.user?._id)
			);
			if (!findPermit) {
				navigate(-1);
			}
		}
	}, [auth?.user, permission?.data, navigate]);

	return (
		<div className="bg-white aboutScreen">
			<Container>
				{network?.data?.length > 0 ? (
					<>
						<div className="tw-grid tw-w-11/12 tw-gap-10  tw-mx-auto md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-py-16">
							{network?.data?.map((item, i) => (
								<div
									onClick={() =>
										navigate(
											`/${params?.page}/${
												params?.id
											}/${item?.name?.toLowerCase()}`
										)
									}
									className="tw-flex tw-justify-between tw-px-6 tw-h-48 tw-shadow-md tw-items-center myCursor"
									key={i}>
									<div>
										{/* <img src={item.icon2} alt="" className="tw-h-16" /> */}
										<NetworkList2 state={item?.name?.toUpperCase()} />
									</div>
									<span
										className="d-flex align-items-center justify-content-center text2  text-decoration-none h-100 eachProduct fontReduceBig textTrunc p-2 p-md-0 py-3 py-md-0 h-100"
										// style={{
										//   background: item?.color,
										//   borderRadius: "30px",
										//   color: item?.textColor ? item?.textColor : "#000",
										// }}
									>
										<span className="tw-text-xl tw-text-[#1b1b1b] tw-font-medium text-capitalize">
											{item?.name}
										</span>
									</span>
								</div>
							))}
						</div>
					</>
				) : (
					<div className="row mx-0 g-2 g-md-4 py-4 py-md-5">
						{controlsTab?.map((item, i) => (
							<div className="col-6 productCard" key={i}>
								<span
									onClick={() => {
										if (item?.type === "link") {
											navigate(item?.link);
										} else if (item?.type === "button") {
										}
									}}
									className="d-flex align-items-center justify-content-center text2 myCursor text-decoration-none h-100 eachProduct fontReduceBig textTrunc p-2 p-md-0 py-3 py-md-0 h-100"
									style={{
										background: item?.color,
										borderRadius: "30px",
										color: item?.textColor ? item?.textColor : "#000",
									}}>
									<span className="textTrunc fontInherit fw-bold">
										{item?.name}
									</span>
								</span>
							</div>
						))}
					</div>
				)}
			</Container>
		</div>
	);
};

export default ManageCgWallet;

export const CgWalletDetails = ({ setData }) => {
	let { cgwallet, manageCGWallets, numberWithCommas } = useContext(GlobalState),
		[state, setState] = useState(null),
		[load2, setLoad2] = useState({ isLoad: false, loadData: "" }),
		{ step } = useParams();

	useEffect(() => {
		if (cgwallet?.isFound)
			setState(
				cgwallet?.mainSearch?.filter(
					item => item?.network?.name?.toLowerCase() === step
				)
			);
		else
			setState(
				cgwallet?.data?.filter(
					item => item?.network?.name?.toLowerCase() === step
				)
			);
	}, [cgwallet?.mainSearch, cgwallet?.isFound, cgwallet?.data, step]);

	if (!state) return;

	return (
		<>
			<div className="pb-5 my-5 overflow-x-auto noScroll">
				<div className="bland row mx-0 py-3 px-0 text-capitalize Lexend fw-bold">
					<div className="col textTrunc Lexend">S/N</div>
					<div className="col textTrunc Lexend">Network</div>
					<div className="col textTrunc Lexend">Category</div>
					<div className="col textTrunc Lexend">Volume</div>
					<div className="col textTrunc Lexend">Amount</div>
					<div className="col textTrunc Lexend">Status</div>
					<div className="col textTrunc Lexend">Action</div>
				</div>
				<div className="bg-white row mx-0">
					{state?.length === 0 ? (
						<EmptyComponent subtitle={"CgWallet state empty"} />
					) : (
						state?.map((item, index) => (
							<div key={index} className="row mx-0 py-3 px-0 border-bottom">
								<div className="col textTrunc my-auto">{index + 1}</div>
								{/* <div className="col textTrunc my-auto text-uppercase">
									{item?.network?.name}
								</div> */}
								<div className="col textTrunc my-auto fontReduce2">
									{/* {item?.network} */}
									<NetworkList2 state={item?.network?.name?.toUpperCase()} />
								</div>
								<div className="col textTrunc my-auto text-uppercase">
									{item?.category?.name}
								</div>
								<div className="col textTrunc my-auto text-uppercase">
									{numberWithCommas(item?.volume || 0)} {item?.size}
								</div>
								<div className="col textTrunc my-auto text-uppercase">
									NGN {numberWithCommas(item?.amount || 0)}
								</div>
								{/* <div className="col textTrunc my-auto text-uppercase">
									{item?.enabler}d
								</div> */}
								<div
									className={`col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0 ${
										item?.enabler === "enable"
											? "text-success text-success2"
											: "text-danger text-danger2"
									}`}>
									{/* <span className="fontReduce d-md-none Lexend">Status:</span> */}
									{item?.enabler}d
								</div>
								<div className="col textTrunc my-auto btn-group">
									<button
										title="Edit Data plan"
										onClick={() => setData(item)}
										className="btn btn-success2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
										<BsPen />
									</button>
									<button
										onClick={async () => {
											setLoad2({ isLoad: true, loadData: item?._id });
											await manageCGWallets("delete", item);
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
			</div>
		</>
	);
};

export const MakeCgWallet = ({ isOpen, back, datum }) => {
	const { cgwallet, manageCGWallets, category } = useContext(GlobalState);
	let init = {
			size: "GB",
			volume: "",
			amount: "",
			category: "",
			enabler: "enable",
		},
		[data, setThisData] = useState(init),
		textChange =
			name =>
			({ target: { value } }) => {
				setThisData({ ...data, [name]: value });
			},
		{ step } = useParams();

	let [newLoad, setNewLoad] = useState(false),
		[submit, setSubmit] = useState(false);

	useEffect(() => {
		if (datum) {
			setThisData({ ...datum, category: datum?.category?.categoryId });
		}
	}, [datum]);

	let handleSubmit = async e => {
		e?.preventDefault();
		if (!data?.category || !data?.volume || !data?.amount) return;

		setNewLoad(true);
		datum?._id
			? await manageCGWallets(
					"put",
					{
						...data,
						category: category?.data?.find(
							item => item?.categoryId === data?.category
						)?._id,
					},
					datum?._id
			  )
			: await manageCGWallets("post", {
					...data,
					category: category?.data?.find(
						item => item?.categoryId === data?.category
					)?._id,
			  });
		setNewLoad(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && cgwallet?.isAdded) {
			setSubmit(false);
			setThisData(init);
			back();
		}
		if (submit && cgwallet?.isUpdated) {
			setSubmit(false);
			setThisData(init);
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, cgwallet?.isAdded, cgwallet?.isUpdated]);

	return (
		<ModalComponents
			title={datum ? "Update CG Wallet" : "Add CG Wallet"}
			isOpen={isOpen}
			toggle={back}>
			<>
				<div className="mb-4">
					<label htmlFor="Category">Category</label>

					<DataNetworkList
						state={data?.category}
						setState={i => {
							setThisData({ ...data, category: i });
						}}
						filter={step}
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="Name">Amount</label>
					<input
						type="number"
						min={0}
						className="form-control py-3"
						value={data?.amount}
						onChange={e => setThisData({ ...data, amount: e.target.value })}
						placeholder="CgWallet Amount"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="Name">Volume</label>
					<input
						type="number"
						className="form-control py-3"
						value={data?.volume}
						onChange={e => setThisData({ ...data, volume: e.target.value })}
						placeholder="Volume"
						min={0}
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="Size">Size</label>
					<select
						className="form-control py-3 py-md-4 text-capitalize form-select"
						name="size"
						placeholder="Size"
						value={data?.size}
						onChange={textChange("size")}
						id="size">
						<option value="">select size</option>
						<option value="MB">MB</option>
						<option value="GB">GB</option>
						<option value="TB">TB</option>
					</select>
				</div>
				{datum?._id && (
					<>
						<div className="mb-4">
							<label htmlFor="value">Status</label>
							<select
								name="Status"
								className="form-control py-3"
								value={data?.enabler}
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
