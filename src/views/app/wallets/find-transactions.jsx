import React, { useContext, useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { GlobalState } from "@/Data/Context";
import moment from "moment";
import { Buttons } from "@/Utils";
import { ModalComponents } from "@/features";
import { MainPaginate, MainRanger } from "@/features/Transactions";
import { useNavigate } from "@/lib/router";

const FindTransactions = () => {
	let { setStateName, stat } = useContext(GlobalState);
	useEffect(() => {
		setStateName("Manage Transactions Stat");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [daily, setDaily] = useState(null),
		[weekly, setWeekly] = useState(null),
		[monthly, setMonthly] = useState(null),
		navigate = useNavigate(),
		{ auth, permission } = useContext(GlobalState);

	useEffect(() => {
		if (auth?.user?.privilege !== "superadmin") {
			let findTitle = "viewmanagetransactionstat";

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
		setDaily(stat?.finder?.daily);
		setWeekly(stat?.finder?.weekly);
		setMonthly(stat?.finder?.monthly);
	}, [stat?.finder]);

	return <MainTransFinder weekly={weekly} daily={daily} monthly={monthly} />;
};

export const MainTransFinder = ({
	weekly,
	daily,
	monthly,
	notype = false,
	dataEnd,
}) => {
	let { findProviderStat, stat, getDataTransactionStat } =
		useContext(GlobalState);

	let [isOpen, setIsOpen] = useState(false),
		[active, setActive] = useState(0),
		init = { category: "", provider: "", network: "", type: "" },
		[state, setState] = useState(init),
		toggle = () => {
			if (isOpen) setState(init);
			setIsOpen(!isOpen);
		},
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			},
		handleFind = async () => {
			setLoading(true);
			if (dataEnd) await getDataTransactionStat(state);
			else await findProviderStat(state);
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (submit && stat?.findLoad) {
			toggle();
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, stat?.findLoad]);

	let tabControl = ["Daily", "weekly", "monthly"];

	return (
		<>
			<div className="bg-white aboutScreen">
				<Container className="py-3 py-md-5">
					<Buttons
						title={"query selection options"}
						css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
						width={"w-25 w25"}
						onClick={toggle}
						style={{ borderRadius: "30px" }}
					/>
					<div>
						<div className="btn-group w-100 py-3">
							{tabControl?.map((item, i) => (
								<button
									key={i}
									className={`btn py-3 text-capitalize fw-bold ${
										active === i ? "border-bottom textColor" : ""
									} rounded-0`}
									onClick={() => setActive(i)}>
									{item}
								</button>
							))}
						</div>
						{active === 2 ? (
							<MainFindTransactionsStatData
								state={monthly}
								factor="month"
								year={!loading ? state?.year : ""}
							/>
						) : active === 1 ? (
							<MainFindTransactionsStatData
								state={weekly}
								factor="week"
								year={!loading ? state?.year : ""}
							/>
						) : (
							<MainFindTransactionsStatData
								state={daily}
								factor="day"
								year={!loading ? state?.year : ""}
							/>
						)}
					</div>
				</Container>{" "}
			</div>
			<FindDetails
				isOpen={isOpen}
				back={toggle}
				state={state}
				textChange={textChange}
				handleFind={handleFind}
				loading={loading}
				notype={notype}
				showYear
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
	notype,
	filter,
	showYear,
}) => {
	let { network, category, biller, generalYears } = useContext(GlobalState);
	return (
		<>
			<ModalComponents
				isOpen={isOpen}
				toggle={back}
				title={`${filter ? "Filter" : "Query"} selection`}>
				<>
					{!notype && (
						<div className="mb-4">
							<label htmlFor="Type">Type</label>
							<select
								className="form-control py-3 py-md-4 text-capitalize form-select"
								name="type"
								placeholder="Type"
								value={state?.type}
								onChange={textChange("type")}
								id="type">
								<option value="">select type</option>
								<option value="data">Data</option>
								<option value="airtime">Airtime</option>
								<option value="cables">Cables subscription</option>
								<option value="electricity">Bills payment</option>
								<option value="airtime_pin">Recharge Card</option>
								<option value="education">Education</option>
							</select>
						</div>
					)}
					<div className="mb-4">
						<label htmlFor="Provider">Provider</label>
						<select
							className="form-control py-3 py-md-4 text-capitalize form-select"
							name="provider"
							placeholder="Provider"
							value={state?.provider}
							onChange={textChange("provider")}
							id="provider">
							<option value="">select provider</option>
							{biller?.data?.map((item, i) => (
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
							{category?.data?.map((item, i) => (
								<option value={item?.categoryId} key={i}>
									{item?.name}
								</option>
							))}
						</select>
					</div>
					{filter && (
						<div className="mb-4">
							<label htmlFor="Status">Status</label>
							<select
								className="form-control py-3 py-md-4 text-capitalize form-select"
								name="status"
								placeholder="Status"
								value={state?.status}
								onChange={textChange("status")}
								id="status">
								<option value="">select status</option>
								<option value={200}>Successful</option>
								<option value={400}>Pending</option>
								<option value={300}>Failed</option>
							</select>
						</div>
					)}
					{showYear && (
						<div className="mb-4">
							<select
								className="form-control py-3 py-md-4 text-capitalize form-select"
								value={state?.year}
								onChange={textChange("year")}
								name="year"
								id="">
								<option value="">Select a year</option>
								{generalYears?.map((it, x) => (
									<option value={it} key={x}>
										{it}
									</option>
								))}
							</select>
						</div>
					)}
					<Buttons
						title={filter ? "Filter" : "Query"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						onClick={handleFind}
						loading={loading}
						style={{ borderRadius: "30px" }}
					/>
				</>
			</ModalComponents>
		</>
	);
};

export default FindTransactions;

let MainFindTransactionsStatData = ({ state, factor, year }) => {
	let { numberWithCommas, nairaSign } = useContext(GlobalState),
		[total, setTotal] = useState(0);

	useEffect(() => {
		if (state) {
			let dataTotal = state?.reduce((ac, i) => (ac += Number(i?.dataTotal)), 0);
			setTotal(Number(dataTotal));
		}
	}, [state]);

	let [range, setRange] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	if (!state) return;

	const endOffset = itemOffset + range;

	const currentItems = state.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(state.length / range);

	const handlePageClick = event => {
		const newOffset = (event.selected * range) % state.length;
		setItemOffset(newOffset);
	};

	return (
		<>
			<MainRanger setRange={setRange} range={range} />
			<div className="py-5">
				<div className="bland row mx-0 py-3 px-0 text-capitalize">
					<div className="col textTrunc fontReduce fw-bold Lexend">S/N</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">Value</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">Count</div>
				</div>
				<div className="bland2 row mx-0">
					{currentItems?.map((item, index) => (
						<div key={index} className="row mx-0 py-3 px-0 border-bottom">
							<div className="col text-capitalize textTrunc fontReduce3 textTrunc2 my-auto">
								{factor === "day"
									? moment().dayOfYear(item?.[factor])?.format("Do MMM")
									: factor === "week"
									? moment().week(item?.[factor])?.format("Do MMMM")
									: moment()
											.month(item?.[factor] - 1)
											?.format("MMMM")}
								, {/* {factor} {item?.[factor]} */}
								{year || moment().format("YYYY")}
							</div>
							<div className="col textTrunc fontReduce3 textTrunc2 my-auto">
								{nairaSign}{" "}
								{numberWithCommas(Number(item?.dataTotal).toFixed(2))}
							</div>
							<div className="col textTrunc fontReduce3 textTrunc2 my-auto">
								({numberWithCommas(item?.dataCount)} time
								{item?.dataCount !== 1 ? "s" : ""})
							</div>
						</div>
					))}
				</div>
				<MainPaginate handlePageClick={handlePageClick} pageCount={pageCount} />
				<div className="bland row mx-0 py-3 px-0 text-capitalize">
					<div className="col textTrunc fontReduce fw-bold Lexend"></div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						{nairaSign}{" "}
						{numberWithCommas(
							Number(
								state?.reduce((ac, i) => (ac += Number(i?.dataTotal)), 0)
							).toFixed(2)
						)}
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						{numberWithCommas(
							state?.reduce((ac, i) => (ac += Number(i?.dataCount)), 0)
						)}{" "}
						time
						{state?.reduce((ac, i) => (ac += Number(i?.dataCount)), 0) !== 1
							? "s"
							: ""}
					</div>
				</div>
				<div className="py-3">
					<h2 className="Lexend">
						Total: {nairaSign} {numberWithCommas(Number(total).toFixed(2))}
					</h2>
				</div>
			</div>
		</>
	);
};
