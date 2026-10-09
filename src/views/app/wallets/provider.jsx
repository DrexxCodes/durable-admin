import React, { useContext, useEffect, useState } from "react";
import Container from "@/components/ui/Container";
// import { MainCalenderComponent } from "@/features/Dashboard";
import { GlobalState } from "@/Data/Context";
import moment from "moment";
import { MainPaginate, MainRanger } from "@/features/Transactions";
import { useNavigate } from "@/lib/router";
import { ClipLoader } from "react-spinners";

const Provider = () => {
	let { setStateName, stat, getProviderStat } = useContext(GlobalState);
	useEffect(() => {
		setStateName("Provider Wallet Stat");
		getProviderStat({ route: "/manage-wallet-provider" });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [active, setActive] = useState(0),
		[daily, setDaily] = useState(null),
		[weekly, setWeekly] = useState(null),
		[monthly, setMonthly] = useState(null),
		[year, setYear] = useState(),
		[loading, setLoading] = useState(false),
		navigate = useNavigate(),
		{ auth, permission } = useContext(GlobalState);
	// console.log({ generalYears });
	useEffect(() => {
		if (auth?.user?.privilege !== "superadmin") {
			let findTitle = "viewwalletproviderstat";

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
		setDaily(stat?.data?.daily);
		setWeekly(stat?.data?.weekly);
		setMonthly(stat?.data?.monthly);
	}, [stat?.data]);

	useEffect(() => {
		if (year) {
			let getr = async () => {
				setLoading(true);
				await getProviderStat({ route: "/manage-wallet-provider", year });
				setLoading(false);
			};
			getr();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [year]);

	let tabControl = ["Daily", "weekly", "monthly"];
	return (
		<div className="bg-white aboutScreen">
			<Container className="py-3 py-md-5">
				{/* <div className="row mx-0 d-none d-md-flex">
					<div className="col-md-8"></div>
					<MainCalenderComponent />
				</div> */}
				<div>
					<YearBox year={year} setYear={setYear} loading={loading} />
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
						<MainProviderStatData
							state={monthly}
							factor="month"
							year={!loading ? year : ""}
						/>
					) : active === 1 ? (
						<MainProviderStatData
							state={weekly}
							factor="week"
							year={!loading ? year : ""}
						/>
					) : (
						<MainProviderStatData
							state={daily}
							factor="day"
							year={!loading ? year : ""}
						/>
					)}
				</div>
			</Container>{" "}
		</div>
	);
};

export default Provider;

let MainProviderStatData = ({ state, factor, year }) => {
	let { numberWithCommas, nairaSign } = useContext(GlobalState),
		[total, setTotal] = useState(0);

	useEffect(() => {
		if (state) {
			let paystackTotal = state?.reduce(
				(ac, i) => (ac += Number(i?.paystackTotal)),
				0
			);
			let monnifyTotal = state?.reduce(
				(ac, i) => (ac += Number(i?.monnifyTotal)),
				0
			);
			let flutterTotal = state?.reduce(
				(ac, i) => (ac += Number(i?.flutterTotal)),
				0
			);
			let budpayTotal = state?.reduce(
				(ac, i) => (ac += Number(i?.budpayTotal)),
				0
			);
			let payvesselTotal = state?.reduce(
				(ac, i) => (ac += Number(i?.payvesselTotal)),
				0
			);
			let palmpayTotal = state?.reduce(
				(ac, i) => (ac += Number(i?.palmpayTotal)),
				0
			);
			let billstackTotal = state?.reduce(
				(ac, i) => (ac += Number(i?.billstackTotal)),
				0
			);
			let manualTotal = state?.reduce(
				(ac, i) => (ac += Number(i?.manualTotal)),
				0
			);
			setTotal(
				Number(paystackTotal) +
					Number(monnifyTotal) +
					Number(flutterTotal) +
					Number(manualTotal) +
					Number(payvesselTotal) +
					Number(palmpayTotal) +
					Number(billstackTotal) +
					Number(budpayTotal)
			);
		}
	}, [state]);

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
				<div className="bland row mx-0 py-3 px-0 text-capitalize">
					<div className="col textTrunc fontReduce fw-bold Lexend">S/N</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">Monnify</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						Flutterwave
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						Paystack
					</div>
					{["Kemtech Enterprises"]?.includes(process.env.REACT_APP_NAME) && (
						<div className="col textTrunc fontReduce fw-bold Lexend">
							Budpay
						</div>
					)}
					{["Kemtech Enterprises", "Vickybest Telecom"]?.includes(
						process.env.REACT_APP_NAME
					) && (
						<div className="col textTrunc fontReduce fw-bold Lexend">
							Palmpay
						</div>
					)}
					{["Vickybest Telecom"]?.includes(process.env.REACT_APP_NAME) && (
						<div className="col textTrunc fontReduce fw-bold Lexend">
							Billstack
						</div>
					)}
					{["Durable Telecommunications"]?.includes(
						process.env.REACT_APP_NAME
					) && (
						<div className="col textTrunc fontReduce fw-bold Lexend">
							Payvessel
						</div>
					)}
					<div className="col textTrunc fontReduce fw-bold Lexend">
						Manual total
					</div>
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
								{numberWithCommas(Number(item?.monnifyTotal).toFixed(2))}
								<span className="d-none d-md-inline ps-md-2 textTrunc">
									({numberWithCommas(item?.monnifyCount)} time
									{item?.monnifyCount !== 1 ? "s" : ""})
								</span>
							</div>
							<div className="col textTrunc fontReduce3 textTrunc2 my-auto">
								{nairaSign}{" "}
								{numberWithCommas(Number(item?.flutterTotal).toFixed(2))}
								<span className="d-none d-md-inline ps-md-2 textTrunc">
									({numberWithCommas(item?.flutterCount)} time
									{item?.flutterCount !== 1 ? "s" : ""})
								</span>
							</div>
							<div className="col textTrunc fontReduce3 textTrunc2 my-auto">
								{nairaSign}{" "}
								{numberWithCommas(Number(item?.paystackTotal).toFixed(2))}
								<span className="d-none d-md-inline ps-md-2 textTrunc">
									({numberWithCommas(item?.paystackCount)} time
									{item?.paystackCount !== 1 ? "s" : ""})
								</span>
							</div>
							{["Kemtech Enterprises"]?.includes(
								process.env.REACT_APP_NAME
							) && (
								<div className="col textTrunc fontReduce3 textTrunc2 my-auto">
									{nairaSign}{" "}
									{numberWithCommas(Number(item?.budpayTotal).toFixed(2))}
									<span className="d-none d-md-inline ps-md-2 textTrunc">
										({numberWithCommas(item?.budpayCount)} time
										{item?.budpayCount !== 1 ? "s" : ""})
									</span>
								</div>
							)}
							{["Kemtech Enterprises", "Vickybest Telecom"]?.includes(
								process.env.REACT_APP_NAME
							) && (
								<div className="col textTrunc fontReduce3 textTrunc2 my-auto">
									{nairaSign}{" "}
									{numberWithCommas(Number(item?.palmpayTotal).toFixed(2))}
									<span className="d-none d-md-inline ps-md-2 textTrunc">
										({numberWithCommas(item?.palmpayCount)} time
										{item?.palmpayCount !== 1 ? "s" : ""})
									</span>
								</div>
							)}
							{["Vickybest Telecom", "Durable Telecommunications"]?.includes(
								process.env.REACT_APP_NAME
							) && (
								<div className="col textTrunc fontReduce3 textTrunc2 my-auto">
									{nairaSign}{" "}
									{numberWithCommas(Number(item?.billstackTotal).toFixed(2))}
									<span className="d-none d-md-inline ps-md-2 textTrunc">
										({numberWithCommas(item?.billstackCount)} time
										{item?.billstackCount !== 1 ? "s" : ""})
									</span>
								</div>
							)}
							{["Durable Telecommunications"]?.includes(
								process.env.REACT_APP_NAME
							) && (
								<div className="col textTrunc fontReduce3 textTrunc2 my-auto">
									{nairaSign}{" "}
									{numberWithCommas(Number(item?.payvesselTotal).toFixed(2))}
									<span className="d-none d-md-inline ps-md-2 textTrunc">
										({numberWithCommas(item?.payvesselCount)} time
										{item?.payvesselCount !== 1 ? "s" : ""})
									</span>
								</div>
							)}
							<div className="col textTrunc fontReduce3 textTrunc2 my-auto">
								{nairaSign}{" "}
								{numberWithCommas(Number(item?.manualTotal).toFixed(2))}
								<span className="d-none d-md-inline ps-md-2 textTrunc">
									({numberWithCommas(item?.manualCount)} time
									{item?.manualCount !== 1 ? "s" : ""})
								</span>
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
								state?.reduce((ac, i) => (ac += Number(i?.monnifyTotal)), 0)
							).toFixed(2)
						)}
						<span className="d-none d-md-inline ps-md-2 textTrunc">
							(
							{numberWithCommas(
								state?.reduce((ac, i) => (ac += Number(i?.monnifyCount)), 0)
							)}{" "}
							time
							{state?.reduce((ac, i) => (ac += Number(i?.monnifyCount)), 0) !==
							1
								? "s"
								: ""}
							)
						</span>
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						{nairaSign}{" "}
						{numberWithCommas(
							Number(
								state?.reduce((ac, i) => (ac += Number(i?.flutterTotal)), 0)
							).toFixed(2)
						)}
						<span className="d-none d-md-inline ps-md-2 textTrunc">
							(
							{numberWithCommas(
								state?.reduce((ac, i) => (ac += Number(i?.flutterCount)), 0)
							)}{" "}
							time
							{state?.reduce((ac, i) => (ac += Number(i?.flutterCount)), 0) !==
							1
								? "s"
								: ""}
							)
						</span>
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						{nairaSign}{" "}
						{numberWithCommas(
							Number(
								state?.reduce((ac, i) => (ac += Number(i?.paystackTotal)), 0)
							).toFixed(2)
						)}
						<span className="d-none d-md-inline ps-md-2 textTrunc">
							(
							{numberWithCommas(
								state?.reduce((ac, i) => (ac += Number(i?.paystackCount)), 0)
							)}{" "}
							time
							{state?.reduce((ac, i) => (ac += Number(i?.paystackCount)), 0) !==
							1
								? "s"
								: ""}
							)
						</span>
					</div>
					{["Kemtech Enterprises", "Vickybest Telecom"]?.includes(
						process.env.REACT_APP_NAME
					) && (
						<div className="col textTrunc fontReduce fw-bold Lexend">
							{nairaSign}{" "}
							{numberWithCommas(
								Number(
									state?.reduce((ac, i) => (ac += Number(i?.palmpayTotal)), 0)
								).toFixed(2)
							)}
							<span className="d-none d-md-inline ps-md-2 textTrunc">
								(
								{numberWithCommas(
									state?.reduce((ac, i) => (ac += Number(i?.palmpayCount)), 0)
								)}{" "}
								time
								{state?.reduce(
									(ac, i) => (ac += Number(i?.palmpayCount)),
									0
								) !== 1
									? "s"
									: ""}
								)
							</span>
						</div>
					)}
					{["Vickybest Telecom", "Durable Telecommunications"]?.includes(
						process.env.REACT_APP_NAME
					) && (
						<div className="col textTrunc fontReduce fw-bold Lexend">
							{nairaSign}{" "}
							{numberWithCommas(
								Number(
									state?.reduce((ac, i) => (ac += Number(i?.billstackTotal)), 0)
								).toFixed(2)
							)}
							<span className="d-none d-md-inline ps-md-2 textTrunc">
								(
								{numberWithCommas(
									state?.reduce((ac, i) => (ac += Number(i?.billstackCount)), 0)
								)}{" "}
								time
								{state?.reduce(
									(ac, i) => (ac += Number(i?.billstackCount)),
									0
								) !== 1
									? "s"
									: ""}
								)
							</span>
						</div>
					)}
					{["Kemtech Enterprises"]?.includes(process.env.REACT_APP_NAME) && (
						<div className="col textTrunc fontReduce fw-bold Lexend">
							{nairaSign}{" "}
							{numberWithCommas(
								Number(
									state?.reduce((ac, i) => (ac += Number(i?.budpayTotal)), 0)
								).toFixed(2)
							)}
							<span className="d-none d-md-inline ps-md-2 textTrunc">
								(
								{numberWithCommas(
									state?.reduce((ac, i) => (ac += Number(i?.budpayCount)), 0)
								)}{" "}
								time
								{state?.reduce((ac, i) => (ac += Number(i?.budpayCount)), 0) !==
								1
									? "s"
									: ""}
								)
							</span>
						</div>
					)}
					{["Durable Telecommunications"]?.includes(
						process.env.REACT_APP_NAME
					) && (
						<div className="col textTrunc fontReduce fw-bold Lexend">
							{nairaSign}{" "}
							{numberWithCommas(
								Number(
									state?.reduce((ac, i) => (ac += Number(i?.payvesselTotal)), 0)
								).toFixed(2)
							)}
							<span className="d-none d-md-inline ps-md-2 textTrunc">
								(
								{numberWithCommas(
									state?.reduce((ac, i) => (ac += Number(i?.payvesselCount)), 0)
								)}{" "}
								time
								{state?.reduce(
									(ac, i) => (ac += Number(i?.payvesselCount)),
									0
								) !== 1
									? "s"
									: ""}
								)
							</span>
						</div>
					)}
					<div className="col textTrunc fontReduce fw-bold Lexend">
						{nairaSign}{" "}
						{numberWithCommas(
							Number(
								state?.reduce((ac, i) => (ac += Number(i?.manualTotal)), 0)
							).toFixed(2)
						)}
						<span className="d-none d-md-inline ps-md-2 textTrunc">
							(
							{numberWithCommas(
								state?.reduce((ac, i) => (ac += Number(i?.manualCount)), 0)
							)}{" "}
							time
							{state?.reduce((ac, i) => (ac += Number(i?.manualCount)), 0) !== 1
								? "s"
								: ""}
							)
						</span>
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

export const YearBox = ({ year, setYear, loading }) => {
	let { generalYears } = useContext(GlobalState);
	return (
		<div className="d-flex justify-end">
			<div className="ms-auto">
				{!loading ? (
					<select
						name="year"
						value={year}
						className="form-control form-select py-3"
						onChange={e => setYear(e?.target?.value)}
						id="">
						<option value="">Select a year</option>
						{generalYears?.map((it, x) => (
							<option value={it} key={x}>
								{it}
							</option>
						))}
					</select>
				) : (
					<ClipLoader />
				)}
			</div>
		</div>
	);
};