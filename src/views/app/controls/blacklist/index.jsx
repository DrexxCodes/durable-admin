import React, { useContext, useEffect, useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { BsPen } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import Container from "@/components/ui/Container";
import { ModalComponents } from "@/features";
import { GlobalState } from "@/Data/Context";
import { Buttons, EmptyComponent } from "@/Utils";
import { useNavigate, useParams } from "@/lib/router";
import { NumericFormat } from "react-number-format";
import { MainPaginate, MainRanger } from "@/features/Transactions";

const ManageBlacklist = () => {
	let { setStateName, manageBlacklist } = useContext(GlobalState);
	useEffect(() => {
		setStateName("Blacklist Control");
		manageBlacklist("get", { type: "telephone" });
		manageBlacklist("get", { type: "smartCardNo" });
		manageBlacklist("get", { type: "meterNo" });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let navigate = useNavigate(),
		params = useParams(),
		controlsTab = [
			{
				name: "Telephone Number",
				type: "link",
				link: `/${params?.page}/${params?.id}/telephone`,
				color: "var(--tile)",
			},
			{
				name: "Smart Card Number",
				type: "link",
				link: `/${params?.page}/${params?.id}/smartCardNo`,
				color:
					"var(--tile)",
			},
			{
				textColor: "white",
				name: "Meter Number",
				type: "link",
				link: `/${params?.page}/${params?.id}/meterNo`,
				color: "var(--tile)",
			},
		];

	// useEffect(() => {
	// 	if (auth?.user?.privilege !== "superadmin") {
	// 		let findTitle = "viewblacklist";

	// 		let findPermit = permission?.data?.find(
	// 			item =>
	// 				item?.slug === findTitle && item?.user?.includes(auth?.user?._id)
	// 		);
	// 		if (!findPermit) {
	// 			navigate(-1);
	// 		}
	// 	}
	// }, [auth?.user, permission?.data, navigate]);

	return (
		<div className="bg-white aboutScreen">
			<Container>
				<div className="tw-grid tw-w-11/12 tw-gap-10  tw-mx-auto md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-py-16">
					{controlsTab?.map((item, i) => (
						<div
							onClick={() => {
								if (item?.type === "link") {
									navigate(item?.link);
								} else if (item?.type === "button") {
								}
							}}
							className="tw-flex tw-justify-between tw-px-6 tw-h-48 tw-shadow-md tw-items-center myCursor"
							key={i}>
							<div></div>
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
			</Container>
		</div>
	);
};

export default ManageBlacklist;

export const BlacklistDetails = ({ setData }) => {
	let { blacklist, manageBlacklist, getReload } = useContext(GlobalState),
		[state, setState] = useState(null),
		[load2, setLoad2] = useState({ isLoad: false, loadData: "" }),
		[search, setSearch] = useState(""),
		{ step } = useParams(),
		[isDelete, setIsDelete] = useState(null);

	useEffect(() => {
		if (blacklist?.isFound) setState(blacklist?.mainSearch);
		else
			setState(
				step === "meterNo"
					? blacklist?.meterNo
					: step === "smartCardNo"
					? blacklist?.smartCardNo
					: blacklist?.telephone
			);
	}, [
		blacklist?.mainSearch,
		blacklist?.isFound,
		blacklist?.telephone,
		step,
		blacklist?.meterNo,
		blacklist?.smartCardNo,
	]);

	useEffect(() => {
		if (search) {
			document.getElementById("Search").addEventListener("search", () => {
				getReload();
			});
			let handleSubmit = async () => {
				if (!search) return;

				await manageBlacklist("get", {
					search,
					type: step,
				});
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, step]);

	useEffect(() => {
		if (step) manageBlacklist("get", { type: step });
		getReload();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [step]);

	let [range, setRange] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	if (!state) return;

	const endOffset = itemOffset + range;

	const currentItems = state?.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(state?.length / range);

	const handlePageClick = event => {
		const newOffset = (event.selected * range) % state?.length;
		setItemOffset(newOffset);
	};

	// let handleLoadMore = async () => {
	// 	setLoading(true);

	// 	await getAutoBuy({
	// 		limit: Number(auto_buy?.paginate?.nextPage * auto_buy?.paginate?.limit),
	// 	});
	// 	setLoading(false);
	// };

	return (
		<>
			<div className="w-50 w50 my-3">
				<input
					type="search"
					name="search"
					id="Search"
					className="form-control w-100 py-3 borderColor2"
					placeholder="Type here to search"
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			</div>
			<MainRanger range={range} setRange={setRange} />
			<div className="pb-5 my-5 overflow-x-auto noScroll">
				<div className="bland row mx-0 py-3 px-0 text-capitalize Lexend fw-bold">
					<div className="col textTrunc Lexend">S/N</div>
					<div className="col textTrunc Lexend">Reference</div>
					<div className="col textTrunc Lexend">Action</div>
				</div>
				<div className="bg-white row mx-0">
					{state?.length === 0 ? (
						<EmptyComponent subtitle={"Blacklist state empty"} />
					) : (
						currentItems?.map((item, index) => (
							<div key={index} className="row mx-0 py-3 px-0 border-bottom">
								<div className="col textTrunc my-auto">{index + 1}</div>
								<div className="col textTrunc my-auto text-uppercase">
									{item?.reference}
								</div>
								<div className="col textTrunc my-auto btn-group">
									<button
										title="Edit Data plan"
										onClick={() => setData(item)}
										className="btn btn-success2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
										<BsPen />
									</button>
									<button
										onClick={async () => setIsDelete(item)}
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
			<MainPaginate handlePageClick={handlePageClick} pageCount={pageCount} />
			<ModalComponents
				isOpen={isDelete ? true : false}
				toggle={() => setIsDelete(null)}
				title={`Delete ${isDelete?.reference || ""} Reference`}>
				<div className="downH2 d-flex flex-column align-items-center">
					<div className="my-auto w-100">
						<p className="text2 Lexend text-center">Do you want to delete?</p>
						<div className="w-100 d-flex">
							<div className="btn-group mx-auto w-50">
								<Buttons
									onClick={async () => {
										setLoad2({ isLoad: true, loadData: isDelete?._id });
										await manageBlacklist("delete", isDelete);
										setLoad2({ isLoad: false, loadData: "" });
										setIsDelete(null);
									}}
									loading={load2?.isLoad && load2?.loadData === isDelete?._id}
									title={"yes"}
									css="btn btn-success2 text-uppercase py-3"
									width={"auto"}
								/>
								<button
									className="btn btn-danger text-uppercase py-3"
									onClick={() => setIsDelete(null)}>
									no
								</button>
							</div>
						</div>
					</div>
				</div>
			</ModalComponents>
		</>
	);
};

export const MakeBlacklist = ({ isOpen, back, datum }) => {
	const { blacklist, manageBlacklist } = useContext(GlobalState);
	let init = {},
		[data, setThisData] = useState(init),
		{ step } = useParams();

	let [newLoad, setNewLoad] = useState(false),
		[submit, setSubmit] = useState(false);

	useEffect(() => {
		if (datum) {
			setThisData({ ...datum });
		}
	}, [datum]);

	let handleSubmit = async e => {
		e?.preventDefault();
		if (!data?.reference || !step) return;

		setNewLoad(true);
		datum?._id
			? await manageBlacklist("put", data, datum?._id)
			: await manageBlacklist("post", { ...data, type: step });
		setNewLoad(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && blacklist?.isAdded) {
			setSubmit(false);
			setThisData(init);
			back();
		}
		if (submit && blacklist?.isUpdated) {
			setSubmit(false);
			setThisData(init);
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, blacklist?.isAdded, blacklist?.isUpdated]);

	return (
		<ModalComponents
			title={datum ? "Update Blacklist Reference" : "Add Blacklist Reference"}
			isOpen={isOpen}
			toggle={back}>
			<>
				<div className="mb-4">
					<label htmlFor="Reference">
						Reference{" "}
						{step?.replace(/([a-z0-9])([A-Z])/g, "$1 $2")?.toUpperCase()}
					</label>
					<NumericFormat
						className="form-control py-3"
						value={data?.reference}
						placeholder="08011111111"
						displayType="input"
						allowLeadingZeros={true}
						allowNegative={false}
						decimalScale={0}
						inputMode="tel"
						// thousandSeparator={true}
						onValueChange={val =>
							setThisData({ ...data, reference: val?.value })
						}
						maxLength={step === "meterNo" ? 15 : 11}
						renderText={(value, props) => <span {...props}>{value}</span>}
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
