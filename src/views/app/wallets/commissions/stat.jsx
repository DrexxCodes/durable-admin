import React, { useContext, useEffect, useState } from "react";
import Container from "@/components/ui/Container";
// import { MainCalenderComponent } from "../../Components/Dashboard";
import { GlobalState } from "@/Data/Context";
import moment from "moment";
import { MainPaginate, MainRanger } from "@/features/Transactions";
import { YearBox } from "@/views/app/wallets/provider";

const Transactions = () => {
	let { setStateName, stat, getProviderStat } = useContext(GlobalState);
	useEffect(() => {
		getProviderStat({ route: "/manage-commission" });
		setStateName("Commission Stat");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [active, setActive] = useState(0),
		[daily, setDaily] = useState(null),
		[weekly, setWeekly] = useState(null),
		[year, setYear] = useState(""),
		[loading, setLoading] = useState(null),
		[monthly, setMonthly] = useState(null);

	useEffect(() => {
		setDaily(stat?.commission?.daily);
		setWeekly(stat?.commission?.weekly);
		setMonthly(stat?.commission?.monthly);
	}, [stat?.commission]);

	useEffect(() => {
		if (year) {
			let getr = async () => {
				setLoading(true);
				await getProviderStat({ route: "/manage-commission", year });
				setLoading(false);
			};
			getr();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [year]);
	console.log({ stat: stat?.commission });
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
						<MainTransactionsStatData
							state={monthly}
							factor="month"
							year={loading ? "" : year}
						/>
					) : active === 1 ? (
						<MainTransactionsStatData
							state={weekly}
							factor="week"
							year={loading ? "" : year}
						/>
					) : (
						<MainTransactionsStatData
							state={daily}
							factor="day"
							year={loading ? "" : year}
						/>
					)}
				</div>
			</Container>{" "}
		</div>
	);
};

export default Transactions;

let MainTransactionsStatData = ({ state, factor, year }) => {
	let { numberWithCommas, nairaSign } = useContext(GlobalState),
		[total, setTotal] = useState(0);

	useEffect(() => {
		if (state) {
			let airtimeTotal = state?.reduce(
				(ac, i) => (ac += Number(i?.airtimeTotal)),
				0
			);
			let cablesTotal = state?.reduce(
				(ac, i) => (ac += Number(i?.cablesTotal)),
				0
			);
			let airtime_pinTotal = state?.reduce(
				(ac, i) => (ac += Number(i?.airtime_pinTotal)),
				0
			);
			let electricityTotal = state?.reduce(
				(ac, i) => (ac += Number(i?.electricityTotal)),
				0
			);
			let educationTotal = state?.reduce(
				(ac, i) => (ac += Number(i?.educationTotal)),
				0
			);
			setTotal(
				Number(airtimeTotal) +
					Number(cablesTotal) +
					Number(electricityTotal) +
					Number(educationTotal) +
					Number(airtime_pinTotal)
			);
		}
	}, [state]);

	let [range, setRange] = useState(10);
	console.log({ state });
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
					<div className="col textTrunc fontReduce fw-bold Lexend">Airtime</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">Cables</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						Electricity
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						Airtime pin
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						Education
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
								{numberWithCommas(Number(item?.airtimeTotal).toFixed(2))}
								<span className="d-none d-md-inline ps-md-2 textTrunc">
									({numberWithCommas(item?.airtimeCount)} time
									{item?.airtimeCount !== 1 ? "s" : ""})
								</span>
							</div>
							<div className="col textTrunc fontReduce3 textTrunc2 my-auto">
								{nairaSign}{" "}
								{numberWithCommas(Number(item?.cablesTotal).toFixed(2))}
								<span className="d-none d-md-inline ps-md-2 textTrunc">
									({numberWithCommas(item?.cablesCount)} time
									{item?.cablesCount !== 1 ? "s" : ""})
								</span>
							</div>
							<div className="col textTrunc fontReduce3 textTrunc2 my-auto">
								{nairaSign}{" "}
								{numberWithCommas(Number(item?.electricityTotal).toFixed(2))}
								<span className="d-none d-md-inline ps-md-2 textTrunc">
									({numberWithCommas(item?.electricityCount)} time
									{item?.electricityCount !== 1 ? "s" : ""})
								</span>
							</div>
							<div className="col textTrunc fontReduce3 textTrunc2 my-auto">
								{nairaSign}{" "}
								{numberWithCommas(Number(item?.airtime_pinTotal).toFixed(2))}
								<span className="d-none d-md-inline ps-md-2 textTrunc">
									({numberWithCommas(item?.airtime_pinCount)} time
									{item?.airtime_pinCount !== 1 ? "s" : ""})
								</span>
							</div>
							<div className="col textTrunc fontReduce3 textTrunc2 my-auto">
								{nairaSign}{" "}
								{numberWithCommas(Number(item?.educationTotal).toFixed(2))}
								<span className="d-none d-md-inline ps-md-2 textTrunc">
									({numberWithCommas(item?.educationCount)} time
									{item?.educationCount !== 1 ? "s" : ""})
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
								state?.reduce((ac, i) => (ac += Number(i?.airtimeTotal)), 0)
							).toFixed(2)
						)}
						<span className="d-none d-md-inline ps-md-2 textTrunc">
							(
							{numberWithCommas(
								state?.reduce((ac, i) => (ac += Number(i?.airtimeCount)), 0)
							)}{" "}
							time
							{state?.reduce((ac, i) => (ac += Number(i?.airtimeCount)), 0) !==
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
								state?.reduce((ac, i) => (ac += Number(i?.cablesTotal)), 0)
							).toFixed(2)
						)}
						<span className="d-none d-md-inline ps-md-2 textTrunc">
							(
							{numberWithCommas(
								state?.reduce((ac, i) => (ac += Number(i?.cablesCount)), 0)
							)}{" "}
							time
							{state?.reduce((ac, i) => (ac += Number(i?.cablesCount)), 0) !== 1
								? "s"
								: ""}
							)
						</span>
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						{nairaSign}{" "}
						{numberWithCommas(
							Number(
								state?.reduce((ac, i) => (ac += Number(i?.electricityTotal)), 0)
							).toFixed(2)
						)}
						<span className="d-none d-md-inline ps-md-2 textTrunc">
							(
							{numberWithCommas(
								state?.reduce((ac, i) => (ac += Number(i?.electricityCount)), 0)
							)}{" "}
							time
							{state?.reduce(
								(ac, i) => (ac += Number(i?.electricityCount)),
								0
							) !== 1
								? "s"
								: ""}
							)
						</span>
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						{nairaSign}{" "}
						{numberWithCommas(
							Number(
								state?.reduce((ac, i) => (ac += Number(i?.airtime_pinTotal)), 0)
							).toFixed(2)
						)}
						<span className="d-none d-md-inline ps-md-2 textTrunc">
							(
							{numberWithCommas(
								state?.reduce((ac, i) => (ac += Number(i?.airtime_pinCount)), 0)
							)}{" "}
							time
							{state?.reduce(
								(ac, i) => (ac += Number(i?.airtime_pinCount)),
								0
							) !== 1
								? "s"
								: ""}
							)
						</span>
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						{nairaSign}{" "}
						{numberWithCommas(
							Number(
								state?.reduce((ac, i) => (ac += Number(i?.educationTotal)), 0)
							).toFixed(2)
						)}
						<span className="d-none d-md-inline ps-md-2 textTrunc">
							(
							{numberWithCommas(
								state?.reduce((ac, i) => (ac += Number(i?.educationCount)), 0)
							)}{" "}
							time
							{state?.reduce(
								(ac, i) => (ac += Number(i?.educationCount)),
								0
							) !== 1
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
