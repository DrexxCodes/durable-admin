import moment from "moment";
import React, { useContext, useEffect, useState, useRef } from "react";
const icon1 = "/assets/fresh-folk-teamwork.png";
const icon2 = "/assets/finance.png";
const icon3 = "/assets/support.png";
import { ThreeBoxBar } from "@/features/Users";
import { isSet } from "@/lib/loaded";
import { useGiveUp } from "@/hooks/useGiveUp";
import { GlobalState } from "@/Data/Context";
import { Buttons, EmptyComponent } from "@/Utils";
import LoadMore, { BottomTab } from "@/features/LoadMore";
import { useParams } from "@/lib/router";
import { ModalComponents } from "@/features/DefaultHeader";
import { useReactToPrint } from "react-to-print";
import { NetworkList2 } from "@/features/Products/airtime";
import { FindDetails } from "@/views/app/wallets/find-transactions";
import ReactPaginate from "react-paginate";
import Container from "@/components/ui/Container";
import { PatternFormat } from "react-number-format";
import qr from "qrcode";

export const defaultResult = {
	birthcountry: "nigeria",
	birthdate: "27-07-1998",
	birthlga: "Ijero",
	birthstate: "Ekiti",
	centralID: "57064672",
	educationallevel: "tertiary",
	emplymentstatus: "unemployed",
	firstname: "IFEOLUWA",
	gender: "m",
	heigth: "170",
	maritalstatus: "single",
	nin: "39738114999",
	nok_address1: "LEGBE VILLA",
	nok_firstname: "OLUWAFEMI",
	nok_lga: "Ijero",
	nok_middlename: "TOLULOPE",
	nok_state: "Ekiti",
	nok_surname: "ADARALEGBE",
	nok_town: "ILUKUNO-EKITI",
	nspokenlang: "YORUBA",
	photo:
		"/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0a\nHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIy\nMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAHSAV4DASIA\nAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQA\nAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3\nODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWm\np6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEA\nAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSEx\nBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElK\nU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3\nuLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDs6KWi\nkAlKKKKADFApaKACjHNFFABRRRQAlA60tJQAoFLR3pc0ALjikpaSgBRS00U4HFABilozSHFABS0l\nLigApRzSUo4oADxSUppKAClHFJS0ALmijFFABSUtIfagBaKB0opALRRRQAtFFA60AAopaCKAENAo\npcUAJSUtFAFWilpKYBiilooAKKKKAFopO9LQAlGKWigBKKDRQAtLSUtABmkooxQAopaSkoAU8UU3\nqaKAH96XrTNwJxQjqx2hgTQBJRmkzS5pALmkoopgGKWgUUAANLSDrS0AFFFFIAoopaACiiigBaKT\nNO7UAFFJSGgB2KUdKTNHPWgBD1pO9LSUAV+1FFFMAooooAKBRS0AJS0UtACDrRRRQAUUUtABSUUU\n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\npI+lFFW9xdCU0UUVQj//2Q==",
	profession: "STUDENT",
	religion: "christianity",
	residence_AdressLine1: "LEGBE VILLA",
	residence_Town: "ILOKUNO-EKITI",
	residence_lga: "Ijero",
	residence_state: "Ekiti",
	residencestatus: "birth",
	self_origin_lga: "Ijero",
	self_origin_place: "ILUKUNO-EKITI",
	self_origin_state: "Ekiti",
	signature: "***",
	surname: "ADARALEGBE",
	telephoneno: "08135373695",
	title: "mr",
	trackingId: "S7Y0O0ZLP000F2U",
};

const TransactionsFolder = ({ active = 0, subActive = 0 }) => {
	return (
		<>
			{active === 1 ? (
				<SubTransactionsFolder subActive={subActive} />
			) : (
				<SubMyTransactionsFolder subActive={subActive} />
			)}
		</>
	);
};

export const SubTransactionsFolder = ({ subActive = 0 }) => {
	const {
		transactions,
		getServicesHistory,
		getReload,
		getWalletStatMonthDay,
		getWalletStat,
	} = useContext(GlobalState);

	let [loading, setLoading] = useState(false),
		{ page } = useParams(),
		[search, setSearch] = useState(""),
		[streamline, setStreamline] = useState(""),
		[state, setState] = useState(null),
		[thisData, setThisData] = useState(null);

	useEffect(() => {
		if (search) {
			document.getElementById("Search").addEventListener("search", () => {
				getReload();
			});
			let handleSubmit = async () => {
				if (!search) return;

				await getServicesHistory("all", {
					search,
					streamline,
				});
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		getServicesHistory("all", { streamline });
		if (!streamline) {
			getWalletStatMonthDay("day");
			getWalletStatMonthDay("month");
			getWalletStat();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [streamline]);

	useEffect(() => {
		if (transactions.isFound) {
			setState(transactions.mainSearch);
		} else
			setState(
				subActive === 1
					? transactions?.month_transactions
					: subActive === 0
					? transactions?.day_transactions
					: transactions.transactions
			);
		if (subActive === 1) {
			setStreamline("month");
		}
		if (subActive === 0) {
			setStreamline("day");
		}
		if (subActive === 2) {
			setStreamline("");
		}
	}, [
		transactions.transactions,
		transactions.day_transactions,
		transactions.month_transactions,
		transactions.isFound,
		transactions.mainSearch,
		subActive,
	]);

	useEffect(() => {
		getReload();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let handleLoadMore = async () => {
			setLoading(true);

			if (search) {
				await getServicesHistory("all", {
					limit: Number(
						transactions?.paginate?.nextPage * transactions?.paginate?.limit
					),
					search,
					streamline,
				});
			} else {
				await getServicesHistory("all", {
					limit:
						subActive === 1
							? Number(
									transactions?.month_paginate?.nextPage *
										transactions?.month_paginate?.limit
							  )
							: subActive === 0
							? Number(
									transactions?.day_paginate?.nextPage *
										transactions?.day_paginate?.limit
							  )
							: Number(
									transactions?.paginate?.nextPage *
										transactions?.paginate?.limit
							  ),
					streamline,
				});
			}
			setLoading(false);
		},
		init = { category: "", network: "", type: "", status: "" },
		[stateFilter, setStateFilter] = useState(init),
		[isOpen, setIsOpen] = useState(false),
		toggle = () => {
			if (isOpen) setStateFilter(init);
			setIsOpen(!isOpen);
		},
		[loadingFilter, setLoadingFilter] = useState(false),
		[submit, setSubmit] = useState(false),
		textChange =
			name =>
			({ target: { value } }) => {
				setStateFilter({ ...stateFilter, [name]: value });
			},
		handleFind = async () => {
			setLoadingFilter(true);
			await getServicesHistory("all", {
				search,
				streamline,
				filter: `${
					stateFilter?.category ? `&category=${stateFilter?.category}` : ""
				}${stateFilter?.network ? `&network=${stateFilter?.network}` : ""}${
					stateFilter?.status ? `&status=${stateFilter?.status}` : ""
				}${stateFilter?.type ? `&caseType=${stateFilter?.type}` : ""}`,
			});
			setLoadingFilter(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (submit && transactions?.isFound) {
			setSubmit(false);
			toggle();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, transactions?.isFound]);

	if (!state) return <></>;

	return (
		<>
			{page === "transactions" && (
				<Buttons
					title={"filter"}
					css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mb-3"
					width={"w-25 w25"}
					onClick={toggle}
					style={{ borderRadius: "30px" }}
				/>
			)}
			{page !== "dashboard" && (
				<>
					<div className="w-50 w50">
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
				</>
			)}
			<NewPaginate
				state={page !== "dashboard" ? state : state?.slice(0, 10)}
				setThisData={setThisData}
				setState={setState}
				type={"all"}
				criteria={{
					limit:
						subActive === 1
							? transactions?.month_paginate?.limit
							: subActive === 0
							? transactions?.day_paginate?.limit
							: transactions?.paginate?.limit,
					search: search ? search : "",
					streamline,
				}}
			/>

			<>
				{page !== "dashboard" && (
					<>
						<BottomTab
							state={state}
							paginate={
								search
									? transactions?.search_paginate
									: subActive === 1
									? transactions?.month_paginate
									: subActive === 0
									? transactions?.day_paginate
									: transactions?.paginate
							}
						/>
						<LoadMore
							next={
								search
									? transactions?.search_paginate?.next
									: subActive === 1
									? transactions?.month_paginate?.next
									: subActive === 0
									? transactions?.day_paginate?.next
									: transactions?.paginate?.next
							}
							handleLoadMore={handleLoadMore}
							loading={loading}
						/>
					</>
				)}
			</>
			<TransactionDetails
				type={"all"}
				criteria={{
					limit:
						subActive === 1
							? transactions?.month_paginate?.limit
							: subActive === 0
							? transactions?.day_paginate?.limit
							: transactions?.paginate?.limit,
					search: search ? search : "",
					streamline,
				}}
				thisData={thisData}
				setThisData={setThisData}
			/>
			<FindDetails
				isOpen={isOpen}
				back={toggle}
				state={stateFilter}
				textChange={textChange}
				handleFind={handleFind}
				loading={loadingFilter}
				filter
			/>
		</>
	);
};

export const SubMyTransactionsFolder = ({ subActive = 0 }) => {
	const {
		transactions,
		getReload,
		getDataHistory,
		getWalletStatMonthDay,
		getWalletStat,
	} = useContext(GlobalState);

	let [loading2, setLoading2] = useState(false),
		{ page } = useParams(),
		[streamline, setStreamline] = useState(""),
		[search2, setSearch2] = useState(""),
		[state2, setState2] = useState(null),
		[thisData, setThisData] = useState(null);

	useEffect(() => {
		if (search2) {
			document.getElementById("Search").addEventListener("search", () => {
				getReload();
			});
			let handleSubmit = async () => {
				if (!search2) return;

				await getDataHistory(
					{
						search: search2,
						streamline,
					},
					"all"
				);
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search2]);

	useEffect(() => {
		getDataHistory({ streamline }, "all");
		if (!streamline) {
			getWalletStatMonthDay("day");
			getWalletStatMonthDay("month");
			getWalletStat();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [streamline]);

	useEffect(() => {
		if (transactions?.my_isFound) setState2(transactions?.my_mainSearch);
		else
			setState2(
				subActive === 1
					? transactions?.month_my_transactions
					: subActive === 0
					? transactions?.day_my_transactions
					: transactions.my_transactions
			);
		if (subActive === 1) {
			setStreamline("month");
		}
		if (subActive === 0) {
			setStreamline("day");
		}
		if (subActive === 2) {
			setStreamline("");
		}
	}, [
		transactions.my_transactions,
		transactions.day_my_transactions,
		transactions.month_my_transactions,
		transactions.my_isFound,
		transactions.my_mainSearch,
		subActive,
	]);

	useEffect(() => {
		getReload();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let handleLoadMore2 = async () => {
		setLoading2(true);
		if (search2) {
			await getDataHistory(
				{
					limit: Number(
						transactions?.my_search_paginate?.nextPage *
							transactions?.my_search_paginate?.limit
					),
					search: search2,
					streamline,
				},
				"all"
			);
		} else
			await getDataHistory(
				{
					limit:
						subActive === 1
							? Number(
									transactions?.month_my_paginate?.nextPage *
										transactions?.month_my_paginate?.limit
							  )
							: subActive === 0
							? Number(
									transactions?.day_my_paginate?.nextPage *
										transactions?.day_my_paginate?.limit
							  )
							: Number(
									transactions?.my_paginate?.nextPage *
										transactions?.my_paginate?.limit
							  ),
					streamline,
				},
				"all"
			);

		setLoading2(false);
	};

	if (!state2) return <></>;

	return (
		<>
			{page !== "dashboard" && (
				<>
					<div className="w-50 w50">
						<input
							type="search"
							name="search"
							id="Search"
							className="form-control w-100 py-3 borderColor2"
							placeholder="Type here to search"
							value={search2}
							onChange={e => setSearch2(e.target.value)}
						/>
					</div>
				</>
			)}
			<NewPaginate
				state={page !== "dashboard" ? state2 : state2?.slice(0, 10)}
				setThisData={setThisData}
				setState={setState2}
				type={""}
				criteria={{
					limit:
						subActive === 1
							? transactions?.month_my_paginate?.limit
							: subActive === 0
							? transactions?.day_my_paginate?.limit
							: transactions?.my_paginate?.limit,
					search: search2 ? search2 : "",
					streamline,
				}}
			/>

			<>
				{page !== "dashboard" && (
					<>
						<BottomTab
							state={state2}
							paginate={
								search2
									? transactions?.my_search_paginate
									: subActive === 1
									? transactions?.month_my_paginate
									: subActive === 0
									? transactions?.day_my_paginate
									: transactions?.my_paginate
							}
						/>
						<LoadMore
							next={
								search2
									? transactions?.my_search_paginate?.next
									: subActive === 1
									? transactions?.month_my_paginate?.next
									: subActive === 0
									? transactions?.day_my_paginate?.next
									: transactions?.my_paginate?.next
							}
							handleLoadMore={handleLoadMore2}
							loading={loading2}
						/>
					</>
				)}
			</>
			<TransactionDetails
				type={""}
				criteria={{
					limit:
						subActive === 1
							? transactions?.month_my_paginate?.limit
							: subActive === 0
							? transactions?.day_my_paginate?.limit
							: transactions?.my_paginate?.limit,
					search: search2 ? search2 : "",
					streamline,
				}}
				thisData={thisData}
				setThisData={setThisData}
			/>
		</>
	);
};

export const TransactionDetails = ({
	thisData,
	setThisData,
	type,
	criteria,
}) => {
	let { auth, manageTransaction, transactions } = useContext(GlobalState),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false);

	useEffect(() => {
		if (submit && transactions?.isDeleted) setThisData(false);
		if (submit && transactions?.isUpdated) setThisData(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [transactions?.isDeleted, submit, transactions?.isUpdated]);

	return (
		<>
			<ModalComponents
				isOpen={thisData ? true : false}
				toggle={() => setThisData(false)}
				title="Transaction details">
				<div className="downH2 d-flex flex-column">
					<PDFMode thisData={thisData} setThisData={setThisData} />
					{auth?.user?.isAdmin && (
						<div className="py-2 btn-group">
							{thisData?.code === 300 || !thisData?.properties?.resData ? (
								<Buttons
									title={"delete transaction"}
									css="btn btn-danger-2 btn-danger2 py-2 py-md-3 text-capitalize Lexend d-block"
									width={"mx-auto"}
									loading={loading === "mark-delete"}
									onClick={async () => {
										setLoading("mark-delete");
										await manageTransaction(
											thisData,
											type,
											criteria,
											null,
											"mark-delete"
										);
										setLoading("");
										setSubmit(true);
									}}
								/>
							) : null}
							{thisData?.code === 400 ? (
								<>
									<Buttons
										title={"fail transaction"}
										css="btn mx-md-2 btn-primary1 py-2 py-md-3 text-capitalize Lexend d-block"
										width={"mx-auto"}
										loading={loading === "mark-fail"}
										onClick={async () => {
											setLoading("mark-fail");
											await manageTransaction(
												thisData,
												type,
												criteria,
												null,
												"mark-fail"
											);
											setLoading("");
											setSubmit(true);
										}}
									/>
									<Buttons
										title={"validate transaction"}
										css="btn btn-success-2 btn-success2 py-2 py-md-3 text-capitalize Lexend d-block"
										width={"mx-auto"}
										loading={loading === "mark-success"}
										onClick={async () => {
											setLoading("mark-success");
											await manageTransaction(
												thisData,
												type,
												criteria,
												null,
												"mark-success"
											);
											setLoading("");
											setSubmit(true);
										}}
									/>
								</>
							) : null}
						</div>
					)}
				</div>
			</ModalComponents>
		</>
	);
};

const PDFMode = ({ thisData, setThisData }) => {
	let { numberWithCommas, auth, nairaSign, biller } = useContext(GlobalState);
	let ref = useRef();
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		contentRef: ref,
		documentTitle: `${
			process.env.REACT_APP_AGENT_NAME
		}-${thisData?.type?.toUpperCase()}-${moment(thisData.createdAt).format(
			"dddd, L"
		)}`,
		bodyClass: "p-2",
	});

	return (
		<>
			<div ref={ref}>
				<div className="printOnly d-none">
					<div className="d-flex justify-content-center flex-column bg-white">
						<img
							src={process.env.REACT_APP_IMAGE_URL}
							alt="Logo"
							className="mx-auto rounded"
							style={{ height: "70px", width: "auto" }}
						/>
						<div className="text-center">
							<h3 className="Lexend fw-bold">
								{process.env.REACT_APP_AGENT_NAME}
							</h3>
							<p className="my-0 Lexend">{thisData?.type?.toUpperCase()}</p>
							<p className="mt-0">
								Reciept:{" "}
								<span className="fontInherit Lexend">{thisData?.item_id}</span>{" "}
							</p>
						</div>
					</div>
					<hr />
				</div>
				<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
					<span>Id: </span>
					<span className="fontInherit Lexend">{thisData?.item_id}</span>{" "}
				</p>
				{auth?.user?.isAdmin && (
					<p className="text-capitalize border-bottom d-flex justify-content-between">
						<span>reference: </span>
						<span className="fontInherit Lexend">
							{thisData?.reference}
						</span>{" "}
					</p>
				)}
				<p className="text-capitalize border-bottom d-flex justify-content-between">
					<span>type: </span>
					<span className="fontInherit Lexend">{thisData?.type}</span>{" "}
				</p>
				<p className="text-capitalize border-bottom d-flex justify-content-between">
					<span>category: </span>
					<span className="fontInherit Lexend">
						{thisData?.transactionType?.replace(/[_]/g, " ")}
					</span>{" "}
				</p>
				<p className="text-capitalize border-bottom d-flex justify-content-between">
					<span>provider: </span>
					<span className="fontInherit Lexend text-uppercase">
						{biller?.data?.find(it => it?.billerId === thisData?.provider)
							?.name || thisData?.provider}
					</span>{" "}
				</p>
				<p className="text-capitalize border-bottom d-flex justify-content-between">
					<span>channel: </span>
					<span className="fontInherit Lexend text-uppercase">
						{thisData?.channel}
					</span>{" "}
				</p>
				<p className="text-capitalize border-bottom d-flex justify-content-between">
					<span>date: </span>
					<span className="fontInherit Lexend">
						{moment(thisData?.createdAt).format("DD/MM/YYYY HH:mm A")}
					</span>{" "}
				</p>
				{auth?.user?.isAdmin && (
					<>
						<p className="border-bottom d-flex justify-content-between">
							<span className="text-capitalize">User: </span>
							<span>
								<span className="fontInherit Lexend d-block text-capitalize">
									{thisData?.user?.lastName} {thisData?.user?.firstName}
								</span>{" "}
								<span className="fontInherit Lexend d-block">
									{thisData?.user?.telephone}
								</span>{" "}
								<span className="fontInherit Lexend d-block">
									{thisData?.user?.email}
								</span>{" "}
							</span>
						</p>
						{thisData?.deviceProperties && (
							<p className="border-bottom d-flex justify-content-between">
								<span className="text-capitalize">Device property: </span>
								<span>
									<span className="fontInherit Lexend d-block text-capitalize">
										OS: {thisData?.deviceProperties?.os?.name} -{" "}
										{thisData?.deviceProperties?.os?.version}
									</span>{" "}
									<span className="fontInherit Lexend d-block text-capitalize">
										client: {thisData?.deviceProperties?.client?.type} -{" "}
										{thisData?.deviceProperties?.client?.name}
									</span>{" "}
									<span className="fontInherit Lexend d-block text-capitalize">
										Device: {thisData?.deviceProperties?.device?.type} -{" "}
										{thisData?.deviceProperties?.device?.brand} -{" "}
										{thisData?.deviceProperties?.device?.model}
									</span>{" "}
									<span className="fontInherit Lexend d-block">
										IP: {thisData?.deviceProperties?.ip}
									</span>{" "}
								</span>
							</p>
						)}
					</>
				)}
				<p className="text-capitalize border-bottom d-flex justify-content-between">
					<span>
						{thisData?.type === "cables"
							? "Smart Card Number"
							: thisData?.type === "electricity"
							? "Meter Number"
							: "recipient"}
						:{" "}
					</span>
					<span className="fontInherit Lexend">
						{thisData?.type === "cables" ? (
							thisData?.properties?.smartCardNo
						) : thisData?.type === "electricity" ? (
							thisData?.properties?.meterNo
						) : thisData?.type === "airtime_pin" ? (
							thisData?.properties?.name_on_card
						) : thisData?.type === "airtime" ? (
							thisData?.properties?.phone
						) : thisData?.type === "education" ? (
							<>{thisData?.properties?.numberOfPin}</>
						) : thisData?.type === "bulk_sms" ? (
							<>{thisData?.properties?.recipient}</>
						) : thisData?.type === "data" ? (
							thisData?.properties?.phone
						) : thisData?.type === "biz" ? (
							thisData?.properties?.name
						) : thisData?.type === "verify" ? (
							thisData?.properties?.verify
						) : (
							""
						)}
					</span>{" "}
				</p>
				{!["data", "verify"]?.includes(thisData?.type) && (
					<p className="text-capitalize border-bottom d-flex justify-content-between">
						<span>usage: </span>
						<span className="fontInherit Lexend">
							{thisData?.type === "cables"
								? thisData?.properties?.packagename
									? thisData?.properties?.packagename
									: thisData?.properties?.type
								: thisData?.type === "airtime" ||
								  thisData?.type === "airtime_pin"
								? thisData?.properties?.network
								: thisData?.type === "electricity"
								? thisData?.properties?.disco
								: thisData?.type === "biz"
								? thisData?.properties?.result?.[0]?.rcNumber
								: thisData?.type === "education"
								? thisData?.properties?.type
								: thisData?.type === "bulk_sms"
								? thisData?.properties?.message
								: thisData?.type === "data"
								? thisData?.description
								: ""}
						</span>{" "}
					</p>
				)}
				<p className="text-capitalize border-bottom d-flex justify-content-between">
					<span>wallet type: </span>
					<span className="fontInherit Lexend">
						{thisData?.walletType?.replace(/[_]/g, " ")}
					</span>{" "}
				</p>
				<p className="text-capitalize border-bottom d-flex justify-content-between">
					<span>
						{thisData?.walletType === "CG_WALLET" ? "Volume" : "Amount"}:{" "}
					</span>
					<span className="fontInherit Lexend">
						{thisData?.walletType === "CG_WALLET" ? "" : nairaSign}{" "}
						{thisData?.walletType === "CG_WALLET" && thisData?.volume
							? numberWithCommas(Number(thisData?.volume).toFixed(2))
							: thisData?.properties?.amount
							? numberWithCommas(
									Number(thisData?.properties?.amount).toFixed(2)
							  )
							: 0}{" "}
						{thisData?.walletType === "CG_WALLET" ? "GB" : ""}
					</span>{" "}
				</p>
				{thisData?.prevBalance !== 0 || thisData?.balance !== 0 ? (
					<>
						<p className="text-capitalize border-bottom d-flex justify-content-between">
							<span>
								Previous {thisData?.walletType === "CG_WALLET" ? "CG" : ""}{" "}
								Wallet balance:{" "}
							</span>
							<span className="fontInherit Lexend">
								{thisData?.walletType === "CG_WALLET" ? "" : nairaSign}{" "}
								{thisData?.prevBalance
									? numberWithCommas(Number(thisData?.prevBalance).toFixed(2))
									: 0}{" "}
								{thisData?.walletType === "CG_WALLET" ? "GB" : ""}
							</span>{" "}
						</p>
						<p className="text-capitalize border-bottom d-flex justify-content-between">
							<span>
								Current {thisData?.walletType === "CG_WALLET" ? "CG" : ""}{" "}
								Wallet balance:{" "}
							</span>
							<span className="fontInherit Lexend">
								{thisData?.walletType === "CG_WALLET" ? "" : nairaSign}{" "}
								{thisData?.balance
									? numberWithCommas(Number(thisData?.balance).toFixed(2))
									: 0}{" "}
								{thisData?.walletType === "CG_WALLET" ? "GB" : ""}
							</span>{" "}
						</p>
					</>
				) : (
					<></>
				)}
				<p className="text-capitalize border-bottom d-flex justify-content-between">
					<span>Description: </span>
					<span className="fontInherit Lexend">
						{thisData?.description}
					</span>{" "}
				</p>
				{thisData?.type === "electricity" && thisData?.status && (
					<>
						<p className="text-capitalize border-bottom d-flex justify-content-between">
							<span>Token: </span>
							<span className="fontInherit Lexend">
								{thisData?.properties?.token}
							</span>{" "}
						</p>
						<p className="text-capitalize border-bottom d-flex justify-content-between">
							<span>Unit(s): </span>
							<span className="fontInherit Lexend">
								{thisData?.properties?.unit}
							</span>{" "}
						</p>
					</>
				)}
				{((thisData?.type === "education" && thisData?.status) ||
					(thisData?.type === "data" &&
						thisData?.status &&
						thisData?.properties?.network === "SPECTRANET")) && (
					<>
						<p className="text-capitalize border-bottom d-flex justify-content-between">
							<span>Pin(s): </span>
							<span className="fontInherit Lexend">
								{Array?.isArray(thisData?.properties?.data_pin) ? (
									thisData?.properties?.data_pin?.map((it, i) => (
										<span className="d-block Lexend" key={i}>
											{it?.Serial || it?.pin || it?.serial ? (
												<>
													{it?.Serial || it?.serial || it?.serialNumber}
													{" : "}
													{it?.Pin || it?.pin}
												</>
											) : (
												it
											)}
										</span>
									))
								) : (
									<span className="fontInherit Lexend">
										{thisData?.properties?.data_pin?.toString()}
									</span>
								)}
							</span>{" "}
						</p>
						{thisData?.type === "education" && (
							<>
								<p className="text-capitalize border-bottom d-flex justify-content-between">
									<span>number of pin(s): </span>
									<span className="fontInherit Lexend">
										{thisData?.properties?.numberOfPin}
									</span>{" "}
								</p>
							</>
						)}
					</>
				)}
				<p className="text-capitalize border-bottom d-flex justify-content-between text2Print">
					<span>API Response: </span>
					<span className="fontInherit Lexend">
						{thisData?.statusText}
					</span>{" "}
				</p>
				<p className="text-capitalize border-bottom d-flex justify-content-between text2Print">
					<span>Status: </span>
					<span
						className={`${
							thisData?.code === 200
								? "text-success text-succcess2"
								: thisData?.code === 400
								? "text-dark"
								: "text-danger text-danger2"
						} fw-bold fontInherit Lexend`}>
						{thisData?.code === 200
							? "successful"
							: thisData?.code === 400
							? "pending"
							: "failed"}
					</span>{" "}
				</p>
				<div className="printOnly d-none">
					<div className="d-flex justify-content-center flex-column bg-white text-uppercase text-center">
						<h4 className="Lexend">Thanks for your patronage</h4>
					</div>
				</div>
			</div>
			{thisData?.type === "airtime_pin" && thisData?.status ? (
				<PDFPinMode
					thisData={thisData?.properties}
					date={thisData?.createdAt}
				/>
			) : null}
			{thisData?.type === "verify" && thisData?.status ? (
				<>
					{/* <PDFVerifyMode
						// thisData={{
						// 	...thisData?.properties,
						// 	result: defaultResult,
						// }}
						thisData={thisData?.properties}
						date={thisData?.createdAt}
					/> */}
					<NewPdfVerifyMode
						// thisData={{
						// 	...thisData?.properties,
						// 	result: defaultResult,
						// }}
						thisData={thisData?.properties}
						date={thisData?.createdAt}
					/>
				</>
			) : null}
			<div className="ms-auto d-flex align-items-center">
				<button
					className="btn btn-danger btn-danger-2 btn-danger2 d-block ms-auto me-2"
					onClick={() => setThisData(false)}>
					Close
				</button>
				<button
					className="btn btn-primary1 d-block ms-auto"
					onClick={handlePrint}>
					Print
				</button>
			</div>
		</>
	);
};

const PDFPinMode = ({ thisData, date }) => {
	let { numberWithCommas, nairaSign } = useContext(GlobalState);
	let ref = useRef();
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		contentRef: ref,
		documentTitle: `${
			process.env.REACT_APP_NAME
		}-${thisData?.name_on_card?.toUpperCase()}-${moment(date).format(
			"dddd, L"
		)}`,
		bodyClass: "p-2",
	});

	return (
		<>
			<div ref={ref}>
				<div className="printOnly d-none">
					<div className="row mx-0 g-3">
						{thisData?.data_pin?.map((item, i) => (
							<div className="col-6 border-dash borderDashAll p-2" key={i}>
								<p className="Lexend text-center">{thisData?.name_on_card}</p>
								<div className="row mx-0 px-3 py-2">
									<div className="col-10">
										<p className="text-capitalize d-flex justify-content-between my-0">
											<span>REF: </span>
											<span className="fontInherit Lexend">
												{item?.pk}
											</span>{" "}
										</p>
										<p className="text-capitalize d-flex justify-content-between my-0">
											<span>PIN: </span>
											<span className="fontInherit Lexend">
												{item?.fields?.pin}
											</span>{" "}
										</p>
										<p className="text-capitalize d-flex justify-content-between my-0">
											<span>S/N: </span>
											<span className="fontInherit Lexend">
												{item?.fields?.serial}
											</span>{" "}
										</p>
										<p className="text-capitalize d-flex justify-content-between my-0">
											<span>Date: </span>
											<span className="fontInherit Lexend">
												{moment(date).format("MMMM DD, YYYY. hh:mm A")}
											</span>{" "}
										</p>
										<p className="text-center">{item?.fields?.load_code}</p>
									</div>
									<div className="col-2">
										<NetworkList2 state={thisData?.network} />
										<p className="text-center Lexend">
											{nairaSign}
											{numberWithCommas(item?.fields?.amount)}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="ms-auto d-flex align-items-center py-2">
				<button
					className="btn btn-primary1 d-block ms-auto"
					onClick={handlePrint}>
					Print card
				</button>
			</div>
		</>
	);
};

export const NewPdfVerifyMode = ({ thisData, date, showOthers }) => {
	let ref = useRef(),
		[qrcode, setQrcode] = useState();
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		contentRef: ref,
		documentTitle: `${
			process.env.REACT_APP_NAME
		}-${thisData?.verify?.toUpperCase()}-${moment(date).format("dddd, L")}`,
		bodyClass: "p-2",
	});

	useEffect(() => {
		if (thisData) {
			const createQr = async () => {
				try {
					console.log({ thisData });
					let newD = { ...thisData?.result };

					let newURI = {
						surname: newD?.surname,
						firstname: newD?.firstname,
						telephone: newD?.telephoneno,
						nin: newD?.nin,
						// birthdate: newD?.birthdate,
						// centralID:newD?.centralID,
						// gender: newD?.gender,
						// residence_AdressLine1: newD?.residence_AdressLine1,
						// residence_Town: newD?.residence_Town,
						// residence_lga: newD?.residence_lga,
						// residence_state: newD?.residence_state,
						// trackingId: newD?.trackingId,
					};
					const uri = await qr.toDataURL(JSON.stringify(newURI), {
						errorCorrectionLevel: "H",
						type: "image/jpeg",

						// quality: 1,
						margin: 1,
						width: 200,
						// color: {
						//   dark: "#000000",
						//   light: "#0000",
						// },
						scale: 10,
					});

					setQrcode(uri);
				} catch (error) {
					console.error({ msg: error.message, error });
					return { error: error?.message };
				}
			};
			createQr();
		}
	}, [thisData]);

	// console.log({qrCode});

	return (
		<>
			<div ref={ref}>
				<div className={`printOnly ${showOthers ? "" : "d-none"}`}>
					<div className="tw-bg-white tw-w-full tw-flex tw-items-center tw-justify-center">
						<div className="tw-w-1/2 print:tw-w-3/4 tw-mx-auto Kum">
							<div className="tw-bg-green-100 tw-border-b tw-border-b-black tw-px-6 tw-py-6 tw-relative">
								<div>
									{" "}
									<h2 className="tw-text-2xl tw-font-[900] tw-text-[#088935]">
										FEDERAL REPUBLIC OF NIGERIA
									</h2>
									<div>
										<strong className="tw-text-2xl tw-font-[900] tw-text-black">
											DIGITAL NIN SLIP
										</strong>
									</div>
								</div>
								<div className="tw-absolute tw-right-6 tw-top-6">
									{" "}
									<img
										className="tw-h-40 tw-w-40"
										src={qrcode || ""}
										alt={thisData?.result?.surname}
									/>
									<div className="tw-flex tw-justify-center tw-mt-2">
										<div>
											{" "}
											<h3 className="tw-text-3xl tw-font-[900] Kum tw-text-black tw-text-center">
												NGA
											</h3>
											<h6 className="tw-text-sm tw-font-extrabold Kum tw-text-black tw-text-center tw-uppercase">
												issue date
											</h6>
											<strong className="tw-text-[13px] Kum tw-font-semibold tw-text-center tw-text-[#555353] tw-uppercase">
												N/A
											</strong>
										</div>
									</div>
								</div>

								<div className="tw-mt-6">
									<div className="tw-flex tw-gap-6">
										<img
											className="tw-h-40 tw-w-40"
											src={`data:image/png;base64, ${thisData?.result?.photo}`}
											alt={thisData?.result?.surname}
										/>
										<div className="tw-space-y-2">
											<div>
												<div>
													{" "}
													<small className="tw-text-[13px] Kum tw-font-bold tw-text-[#707070] tw-uppercase">
														SURNAME/NOM
													</small>
												</div>
												<strong className="tw-text-[13px] Kum tw-font-bold tw-text-[#555353] tw-uppercase">
													{thisData?.result?.surname}
												</strong>
											</div>
											<div>
												<div>
													{" "}
													<small className="tw-text-[13px] Kum tw-font-bold tw-text-[#707070] tw-uppercase">
														Given names/prenoms
													</small>
												</div>
												<strong className="tw-text-[13px] Kum tw-font-bold tw-text-[#555353] tw-uppercase">
													{thisData?.result?.middlename
														? `${thisData?.result?.middlename}, `
														: ""}{" "}
													{thisData?.result?.firstname}
												</strong>
											</div>
											<div className="tw-flex tw-gap-6">
												<div>
													<div>
														{" "}
														<small className="tw-text-[13px] Kum tw-font-bold tw-text-[#707070] tw-uppercase">
															date of birth
														</small>
													</div>
													<strong className="tw-text-[13px] Kum tw-font-bold tw-text-[#555353] tw-uppercase">
														{thisData?.result?.birthdate
															? moment(thisData?.result?.birthdate).format(
																	"DD MMM YYYY"
															  )
															: null}
													</strong>
												</div>
												<div>
													<div>
														{" "}
														<small className="tw-text-[13px] Kum tw-font-bold tw-text-[#707070] tw-uppercase">
															sex/sexe
														</small>
													</div>
													<strong className="tw-text-[13px] Kum tw-font-bold tw-text-[#555353] tw-uppercase">
														{thisData?.result?.gender}
													</strong>
												</div>
											</div>
										</div>
									</div>
									<div className="tw-mt-4">
										<h4 className="tw-text-lg tw-font-extrabold tw-text-center Kum">
											National Identification Number (NIN)
										</h4>
										<PatternFormat
											value={thisData?.result?.nin}
											format="#### ### ####"
											displayType="text"
											className="tw-bg-transparent tw-text-4xl tw-text-center tw-leading-5 tw-font-semibold tw-text-black Kum tw-tracking-[7%]"
											renderText={(value, props) => <h6 {...props}>{value}</h6>}
										/>
									</div>
								</div>
							</div>
							<div className="tw-bg-white tw-px-6 tw-py-6">
								<div>
									<h2 className="tw-text-4xl tw-text-center tw-font-bold Kum tw-text-black tw-uppercase">
										disclaimer
									</h2>
									<h5 className="tw-text-xl tw-font-normal tw-text-center Satisfy tw-text-[#767171]">
										Trust, but certify
									</h5>
									<p className="tw-text-base tw-font-medium tw-w-5/6 tw-mx-auto tw-text-[#1b1b1b] tw-text-center Kum">
										Kindly ensure each time this ID is presented, that you
										verify the credentials using a Government-APPROVED
										verification resource. The details on the front of this NIN
										Slip must EXACTLY match the verification result.
									</p>
									<h2 className="tw-text-3xl tw-text-black tw-text-center tw-font-bold tw-uppercase">
										caution
									</h2>
									<p className="tw-text-sm Kum tw-font-medium tw-text-[#1b1b1b] tw-text-center tw-w-11/12 tw-mx-auto">
										If this NIN was not issued to the person on the front of
										this document, please DO NOT attempt to scan, photocopy or
										replicate the personal data container herein.
									</p>
									<p className="tw-text-sm Kum tw-font-medium tw-text-[#1b1b1b] tw-text-center tw-w-11/12 tw-mx-auto">
										You are only permitted to scan the barcodes for the purpose
										of identity verification.
									</p>
									<p className="tw-text-sm Kum tw-font-medium tw-text-[#1b1b1b] tw-text-center tw-w-11/12 tw-mx-auto">
										The FEDERAL GOVERNMENT of NIGERIA assumes no responsibility
										if you accept any variance in the scan result or do not scan
										the 2D barcode overleaf
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="ms-auto d-flex align-items-center py-2">
				<button
					className="btn btn-primary1 d-block ms-auto"
					onClick={handlePrint}>
					Print Slip
				</button>
			</div>
		</>
	);
};

export const TransactionsData = ({
	state,
	setThisData,
	setState,
	type,
	criteria,
}) => {
	const { numberWithCommas, manageTransaction, auth, nairaSign } =
			useContext(GlobalState),
		[isChecked, setIsChecked] = useState([]),
		{ page } = useParams(),
		[loading, setLoading] = useState(false);
	useEffect(() => {
		if (state) setIsChecked(state?.filter(item => item?.isCheckedFE));
	}, [state]);

	return (
		<div className="py-5">
			{page !== "dashboard" && isChecked?.length > 0 && (
				<div className="py-2 btn-group">
					<Buttons
						title={"delete selected"}
						css="btn btn-danger-2 btn-danger2 py-2 py-md-3 text-capitalize Lexend"
						width={"auto"}
						loading={loading === "mark-delete"}
						onClick={async () => {
							setLoading("mark-delete");
							await manageTransaction(
								isChecked,
								type,
								criteria,
								"multiple",
								"mark-delete"
							);
							setLoading("");
						}}
					/>
					<Buttons
						title={"fail selected"}
						css="btn btn-primary1 py-2 py-md-3 text-capitalize Lexend mx-md-3"
						width={"auto"}
						loading={loading === "mark-fail"}
						onClick={async () => {
							setLoading("mark-fail");
							await manageTransaction(
								isChecked,
								type,
								criteria,
								"multiple",
								"mark-fail"
							);
							setLoading("");
						}}
					/>
					<Buttons
						title={"validate selected"}
						css="btn btn-success-2 btn-success2 py-2 py-md-3 text-capitalize Lexend"
						width={"auto"}
						loading={loading === "mark-success"}
						onClick={async () => {
							setLoading("mark-success");
							await manageTransaction(
								isChecked,
								type,
								criteria,
								"multiple",
								"mark-success"
							);
							setLoading("");
						}}
					/>
				</div>
			)}
			<div className="row mx-0 py-3 bland">
				<div className="col textTrunc my-auto text-uppercase fontReduce2 fw-bold Lexend">
					s/n
				</div>
				<div className="col textTrunc my-auto text-uppercase fontReduce2 fw-bold Lexend d-none d-md-flex">
					ID
				</div>
				{page === "transactions" && (
					<div className="col textTrunc my-auto text-uppercase fontReduce2 fw-bold Lexend">
						type
					</div>
				)}
				{!["Kemtech Enterprises"]?.includes(process.env.REACT_APP_NAME) && (
					<div className="col textTrunc my-auto text-uppercase fontReduce2 fw-bold Lexend">
						usage
					</div>
				)}
				<div className="col textTrunc my-auto text-uppercase fontReduce2 fw-bold Lexend">
					recipient
				</div>
				<div className="col textTrunc my-auto text-uppercase fontReduce2 fw-bold Lexend d-none d-md-flex">
					channel
				</div>
				<div className="col my-auto text-uppercase fontReduce2 fw-bold Lexend d-none d-md-flex">
					date
				</div>
				{["Kemtech Enterprises"]?.includes(process.env.REACT_APP_NAME) && (
					<>
						<div className="col textTrunc my-auto text-uppercase fontReduce2 fw-bold Lexend">
							Previous
						</div>
						<div className="col textTrunc my-auto text-uppercase fontReduce2 fw-bold Lexend">
							Balance
						</div>
					</>
				)}
				<div className="col textTrunc my-auto text-uppercase fontReduce2 fw-bold Lexend">
					amount
				</div>
				{!["Kemtech Enterprises"]?.includes(process.env.REACT_APP_NAME) && (
					<div className="col textTrunc my-auto text-uppercase fontReduce2 fw-bold Lexend">
						status
					</div>
				)}
			</div>
			{state?.length === 0 ? (
				<EmptyComponent subtitle={"User purchase history is empty"} />
			) : (
				state?.map((it, i) => (
					<div
						key={i}
						className={`row mx-0 bland2 border-bottom myCursor ${
							it?.isCheckedFE ? "list-group-item-secondary" : ""
						}`}>
						<div className="col my-auto text-capitalize fontReduce3 textTrunc py-3 py-md-4 d-flex w-100 justify-content-evenly align-items-center h-100">
							<span className="fontInherit">
								{page !== "dashboard" && (
									<>
										{auth?.user?.isAdmin && !it?.status && (
											<input
												type={"checkbox"}
												className="form-control form-check-input myCursor"
												checked={it?.isCheckedFE}
												onChange={e => {
													let update = {
														...it,
														isCheckedFE: e.target.checked,
													};
													setState(
														state?.map(item =>
															item?._id === it?._id ? update : item
														)
													);
												}}
											/>
										)}
									</>
								)}
							</span>
							<span className="fontInherit">{i + 1}</span>
						</div>
						<div
							onClick={() => setThisData(it)}
							className="col my-auto text-capitalize d-none d-md-flex fontReduce2 textTrunc py-3 py-md-4 ">
							{it?.item_id}
						</div>
						{page === "transactions" && (
							<div
								onClick={() => setThisData(it)}
								className="col my-auto text-capitalize fontReduce2 textTrunc py-3 py-md-4 ">
								{it?.type}
							</div>
						)}
						{!["Kemtech Enterprises"]?.includes(process.env.REACT_APP_NAME) && (
							<div
								onClick={() => setThisData(it)}
								className="col my-auto fontReduce2 textTrunc py-3 py-md-4 ">
								{it?.type === "cables"
									? it?.properties?.packagename
										? it?.properties?.packagename
										: it?.properties?.type
									: it?.type === "airtime" || it?.type === "airtime_pin"
									? it?.properties?.network
									: it?.type === "electricity"
									? it?.properties?.disco
									: it?.type === "education"
									? it?.properties?.type
									: it?.type === "biz"
									? it?.properties?.name
									: it?.type === "bulk_sms"
									? it?.properties?.message
									: it?.type === "data"
									? it?.description
									: ""}
							</div>
						)}

						<div
							onClick={() => setThisData(it)}
							className="col my-auto fontReduce2 textTrunc py-3 py-md-4 ">
							{it?.type === "cables"
								? it?.properties?.smartCardNo
								: it?.type === "electricity"
								? it?.properties?.meterNo
								: it?.type === "airtime"
								? it?.properties?.phone
								: it?.type === "airtime_pin"
								? it?.properties?.name_on_card
								: it?.type === "biz"
								? it?.properties?.result?.[0]?.rcNumber
								: it?.type === "verify"
								? it?.properties?.verify || it?.properties?.name
								: it?.type === "education"
								? it?.properties?.numberOfPin
								: it?.type === "bulk_sms"
								? it?.properties?.recipient
								: it?.type === "data"
								? it?.properties?.phone
								: ""}
						</div>
						<div
							onClick={() => setThisData(it)}
							className="col my-auto d-none d-md-flex textTrunc py-3 py-md-4 text-uppercase">
							{it?.channel}
						</div>
						<div
							onClick={() => setThisData(it)}
							className="col my-auto d-none d-md-flex textTrunc py-3 py-md-4 fontReduce">
							{moment(it?.createdAt).format("DD/MM/YYYY HH:mm")}
						</div>
						{["Kemtech Enterprises"]?.includes(process.env.REACT_APP_NAME) && (
							<>
								<div
									onClick={() => setThisData(it)}
									className="col my-auto fontReduce2 textTrunc py-3 py-md-4 d-flex w-100">
									<span className="fontInherit d-none d-md-flex me-md-1">
										{it?.walletType === "CG_WALLET" ? "" : nairaSign}
									</span>{" "}
									<span className="fontInherit">
										{numberWithCommas(Number(it?.prevBalance || 0).toFixed(2))}{" "}
										{it?.walletType === "CG_WALLET" ? "GB" : ""}
									</span>
								</div>
								<div
									onClick={() => setThisData(it)}
									className="col my-auto fontReduce2 textTrunc py-3 py-md-4 d-flex w-100">
									<span className="fontInherit d-none d-md-flex me-md-1">
										{it?.walletType === "CG_WALLET" ? "" : nairaSign}
									</span>{" "}
									<span className="fontInherit">
										{numberWithCommas(Number(it?.balance || 0).toFixed(2))}{" "}
										{it?.walletType === "CG_WALLET" ? "GB" : ""}
									</span>
								</div>
							</>
						)}
						<div
							onClick={() => setThisData(it)}
							className={`col my-auto fontReduce2 textTrunc d-flex w-100 text-dark py-3 py-md-4  ${
								it?.code === 200
									? "list-group-item-success"
									: it?.code === 400
									? "list-group-item-warning"
									: "list-group-item-danger"
							}`}>
							<span className="fontInherit d-none d-md-flex me-md-1">
								{it?.walletType === "CG_WALLET" ? "" : nairaSign}
							</span>{" "}
							<span className="fontInherit">
								{it?.walletType === "CG_WALLET" && it?.volume
									? numberWithCommas(Number(it?.volume).toFixed(2))
									: it?.properties?.amount
									? numberWithCommas(Number(it?.properties?.amount).toFixed(2))
									: 0}{" "}
								{it?.walletType === "CG_WALLET" ? "GB" : ""}
							</span>
						</div>
						{!["Kemtech Enterprises"]?.includes(process.env.REACT_APP_NAME) && (
							<div
								onClick={() => setThisData(it)}
								className={`col textTrunc fontReduce3 text-uppercase my-auto ${
									it?.code === 200
										? "text-success"
										: it?.code === 400
										? "text-warning"
										: "text-danger"
								}`}>
								{it?.code === 200
									? "successful"
									: it?.code === 400
									? "pending"
									: "failed"}
							</div>
						)}
					</div>
				))
			)}
		</div>
	);
};

export default TransactionsFolder;

export const TransactionToppers = ({ active, setActive, title }) => {
	let [show, setShow] = useState(false),
		{ auth, permission } = useContext(GlobalState);

	useEffect(() => {
		if (auth?.user?.privilege === "superadmin") setShow(true);
		else {
			let findTitle = "";
			if (title === "transactions") {
				findTitle = "viewalltransactions";
			} else if (title === "data") {
				findTitle = "viewdatatransactions";
			} else if (title === "airtime") {
				findTitle = "viewairtimetransactions";
			} else if (title === "biz") {
				findTitle = "viewbiztransactions";
			} else if (title === "verify") {
				findTitle = "viewverifytransactions";
			} else if (title === "cables") {
				findTitle = "viewcablestransactions";
			} else if (title === "electricity") {
				findTitle = "viewelectricitytransactions";
			} else if (title === "education") {
				findTitle = "vieweducationtransactions";
			} else if (title === "withdrawal") {
				findTitle = "viewwithdrawal";
			} else if (title === "commission") {
				findTitle = "viewcommissionlist";
			}

			let findPermit = permission?.data?.find(
				item =>
					item?.slug === findTitle && item?.user?.includes(auth?.user?._id)
			);
			console.log({ findPermit, title });
			if (findPermit) setShow(true);
		}
		return () => setShow(false);
	}, [auth?.user, permission?.data, title]);

	return (
		<>
			{show && (
				<div className="bg-white">
					<Container>
						<div className="btn-group w-100 py-3">
							<button
								className={`btn py-3 text-capitalize fw-bold ${
									active === 0 ? "border-bottom textColor" : ""
								} rounded-0`}
								onClick={() => setActive(0)}>
								my {title}
							</button>
							<button
								className={`btn py-3 text-capitalize fw-bold ${
									active === 1 ? "border-bottom textColor" : ""
								} rounded-0`}
								onClick={() => setActive(1)}>
								general {title}
							</button>
						</div>
					</Container>
				</div>
			)}
		</>
	);
};

export const TopFolder = ({ active = 0, setSubActive }) => {
	let { setStateName, wallet, numberWithCommas, nairaSignNeutral } =
		useContext(GlobalState);
	useEffect(() => {
		setStateName("Transactions history");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const gaveUp = useGiveUp();
	const pending = arrived => !arrived && !gaveUp;
	const w = wallet?.wallet_stat,
		wt = wallet?.wallet_details?.transactions,
		wd = wallet?.wallet_details;
	let usersArr = [
		{
			icon: icon2,
			name: "Today's transactions",
			number: `${nairaSignNeutral}${numberWithCommas(
				Number(
					wallet?.wallet_stat?.dayAmount ||
						wallet?.wallet_details?.transactions?.day ||
						wallet?.wallet_details?.day ||
						0
				).toFixed(2)
			)}`,
			color:
				"var(--tile)",
			loading: pending(isSet(w?.dayAmount) || isSet(wt?.day) || isSet(wd?.day)),
		},
		{
			icon: icon3,
			name: `${moment().format("MMMM")}'s transactions`,
			number: `${nairaSignNeutral}${numberWithCommas(
				Number(
					wallet?.wallet_stat?.monthAmount ||
						wallet?.wallet_details?.transactions?.month ||
						wallet?.wallet_details?.month ||
						0
				).toFixed(2)
			)}`,
			color:
				"var(--tile)",
			loading: pending(isSet(w?.monthAmount) || isSet(wt?.month) || isSet(wd?.month)),
		},
		{
			icon: icon1,
			name: "Total Transactions",
			number: `${nairaSignNeutral}${numberWithCommas(
				Number(wallet?.wallet_details?.transactions?.total || 0).toFixed(2)
			)}`,
			color: "var(--tile)",
			loading: pending(isSet(wt?.total)),
		},
	];
	let usersArr2 = [
		{
			icon: icon2,
			name: "Today's transactions",
			number: `${nairaSignNeutral}${numberWithCommas(
				Number(wallet?.wallet_details?.transactions?.agent?.day || 0).toFixed(2)
			)}`,
			color:
				"var(--tile)",
			loading: pending(isSet(wt?.agent?.day)),
		},
		{
			icon: icon3,
			name: `${moment().format("MMMM")}'s transactions`,
			number: `${nairaSignNeutral}${numberWithCommas(
				Number(wallet?.wallet_details?.transactions?.agent?.month || 0).toFixed(
					2
				)
			)}`,
			color:
				"var(--tile)",
			loading: pending(isSet(wt?.agent?.month)),
		},
		{
			icon: icon1,
			name: "Total Transactions",
			number: `${nairaSignNeutral}${numberWithCommas(
				Number(wallet?.wallet_details?.transactions?.agent?.total || 0).toFixed(
					2
				)
			)}`,
			color: "var(--tile)",
			loading: pending(isSet(wt?.agent?.total)),
		},
	];

	return (
		<ThreeBoxBar
			list={active === 1 ? usersArr : usersArr2}
			setSubActive={setSubActive}
		/>
	);
};

export let NewPaginate = ({ state, setThisData, setState, type, criteria }) => {
	let [range, setRange] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
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
			<TransactionsData
				state={currentItems}
				setThisData={setThisData}
				setState={setState}
				type={type}
				criteria={criteria}
			/>
			<MainPaginate handlePageClick={handlePageClick} pageCount={pageCount} />
		</>
	);
};

export const MainPaginate = ({ handlePageClick, pageCount }) => (
	<ReactPaginate
		breakLabel="..."
		nextLabel=">"
		onPageChange={handlePageClick}
		pageRangeDisplayed={5}
		pageCount={pageCount}
		previousLabel="<"
		renderOnZeroPageCount={null}
		className="list-unstyled d-flex align-items-center justify-content-end py-3"
		pageClassName="mx-1 p-2 border rounded tex-capitalize text-decoration-none"
		previousClassName="text-decoration-none d-none"
		nextClassName="text-decoration-none d-none"
		activeClassName="list-group-item-primary"
	/>
);

export const MainRanger = ({ range, setRange }) => {
	let rangeArr = [10, 50, 100, 200, 500, 1000];

	return (
		<div className="py-3">
			<div className="col-3 col-md-1">
				<select
					className="form-control py-2 form-select"
					name="range"
					value={range}
					onChange={e => {
						setRange(Number(e.target.value));
					}}>
					{rangeArr?.map((item, i) => (
						<option key={i} value={item}>
							{item}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};
