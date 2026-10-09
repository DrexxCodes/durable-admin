import React, { useState, useContext, useEffect } from "react";
import Container from "@/components/ui/Container";
import { Buttons } from "@/Utils";
import { GlobalState } from "@/Data/Context";
import LoadMore, { BottomTab } from "@/features/LoadMore";
import {
	TransactionDetails,
	NewPaginate,
	// PDFVerifyMode,
	NewPdfVerifyMode,
	// defaultResult,
} from "@/features/Transactions";
import { useNavigate } from "@/lib/router";
import { NumericFormat } from "react-number-format";

const MainBiz = () => {
	let navigate = useNavigate();

	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("NIN verification history");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<Buttons
					title={"Verify NIN"}
					css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
					width={"w-25 w25"}
					onClick={() => navigate("/products/verification/verify")}
					style={{ borderRadius: "30px" }}
				/>
				<MainVerifyHistory />
			</Container>
		</div>
	);
};

export default MainBiz;

const MainVerifyHistory = () => {
	let { verify, getServicesHistory, getReload } = useContext(GlobalState);

	let [data, setData] = useState(null),
		[search, setSearch] = useState(""),
		[thisData, setThisData] = useState(null);

	useEffect(() => {
		if (verify.isFound) {
			setData(verify.mainSearch);
		} else setData(verify.verify);
	}, [verify.verify, verify.isFound, verify.mainSearch]);

	useEffect(() => {
		if (search) {
			document.getElementById("Search").addEventListener("search", () => {
				getReload();
			});
			let handleSubmit = async () => {
				if (!search) return;

				await getServicesHistory("verify", {
					search,
				});
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		getReload();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getServicesHistory("verify");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [loading, setLoading] = useState(false);
	let handleLoadMore = async () => {
		setLoading(true);

		await getServicesHistory("verify", {
			page: Number(verify?.paginate?.nextPage),
			// limit: Number(verify?.paginate?.nextPage * verify?.paginate?.limit),
		});
		setLoading(false);
	};

	if (!data) return;

	return (
		<div className="py-5">
			<div className="w-50 w50 mb-3">
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
			<NewPaginate
				state={data}
				setState={setData}
				setThisData={setThisData}
				type={"verify"}
				criteria={
					{
						// id: params?.step,
					}
				}
				my="myall"
			/>
			<TransactionDetails
				thisData={thisData}
				setThisData={setThisData}
				type={"verify"}
				criteria={
					{
						// id: params?.step,
					}
				}
			/>
			<BottomTab state={data} paginate={verify?.paginate} />
			<LoadMore
				next={verify?.paginate?.next}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</div>
	);
};

export const VerifyFindPage = () => {
	let {
		setStateName,
		verify,
		buyServices,
		returnErrors,
		usecase,
		numberWithCommas,
	} = useContext(GlobalState);
	useEffect(() => {
		setStateName("Verify NIN");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [state, setState] = useState(""),
		[searchType, setSearchType] = useState("nin"),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		handleSubmit = async e => {
			e?.preventDefault();
			if (!state)
				return returnErrors({
					error: [{ msg: "NIN is required", param: "verify" }],
				});
			setLoading(true);
			await buyServices("verify", { verify: state, searchType });
			setLoading(false);
			setSubmit(true);
		},
		navigate = useNavigate();

	useEffect(() => {
		if (verify?.isAdded && submit) {
			setSubmit(false);
			setState("");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [verify?.isAdded, submit]);

	// console.log({ data: defaultResult?.photo });

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<Buttons
					title={"View History"}
					css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 ms-auto my-4"
					width={"w-25 w25"}
					onClick={() => navigate("/products/verification")}
					style={{ borderRadius: "30px" }}
				/>
				<div className="d-flex flex-column justify-content-center">
					<form className="w-50 w50 mx-auto" onSubmit={handleSubmit}>
						<p className="Lexend">
							Please verify your NIN status for just ₦{" "}
							{numberWithCommas(
								Number(usecase?.usecase?.verifyUser || 100).toFixed(2)
							)}
						</p>
						<p className="Lexend">
							To do so, kindly fill out the form below with your NIN/Telephone
							Number, and you will receive an instant response.
						</p>
						<NumericFormat
							placeholder="NIN/Telephone
							Number"
							className="form-control py-3"
							value={state}
							allowLeadingZeros={true}
							allowNegative={false}
							displayType="input"
							name="ninNumber"
							onValueChange={val =>
								setState(val?.value.replace(/[^0-9]*/g, ""))
							}
							maxLength={11}
							inputMode="tel"
							renderText={(value, props) => <span {...props}>{value}</span>}
							decimalScale={0}
							pattern="[0-9]"
						/>
						<small className="Lexend d-block">Verification Type</small>
						<div className="tw-grid tw-grid-cols-2 pb-4">
							<div className="tw-flex tw-gap-5 tw-items-center">
								<input
									type="radio"
									name="searchType"
									id="searchTypeNIN"
									value={searchType}
									onChange={e => setSearchType(e?.target?.title)}
									title="nin"
									checked={searchType === "nin"}
									className="tw-mt-1 tw-border-[#CCCCCC] tw-text-center"
								/>
								<label htmlFor="searchTypeNIN">NIN</label>
							</div>
							<div className="tw-flex tw-gap-5 tw-items-center">
								<input
									type="radio"
									name="searchType"
									id="searchTypePhone"
									value={searchType}
									onChange={e => setSearchType(e?.target?.title)}
									title="phone"
									checked={searchType === "phone"}
									className="tw-mt-1 tw-border-[#CCCCCC] tw-text-center"
								/>
								<label htmlFor="searchTypePhone">Telephone Number</label>
							</div>
						</div>
						<Buttons
							title={"Verify NIN"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
							width={"w-25 w25 mx-auto d-block mt-3"}
							onClick={handleSubmit}
							loading={loading}
							style={{ borderRadius: "30px" }}
						/>
					</form>
				</div>
				<div className="py-3 py-md-5">
					{verify?.isAdded && (
						<>
							{/* <PDFVerifyMode
							date={verify?.verify?.[0]?.createdAt}
							// thisData={{
							// 	...verify?.verify?.[0]?.properties,
							// 	result: defaultResult,
							// }}
							thisData={verify?.verify?.[0]?.properties}
							showOthers
						/> */}
							<NewPdfVerifyMode
								date={verify?.verify?.[0]?.createdAt}
								// thisData={{
								// 	...verify?.verify?.[0]?.properties,
								// 	result: defaultResult,
								// }}
								thisData={verify?.verify?.[0]?.properties}
								showOthers
							/>
						</>
					)}
				</div>
			</Container>
		</div>
	);
};
