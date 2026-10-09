import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "@/lib/router";
import { GlobalState } from "@/Data/Context";
import Container from "@/components/ui/Container";
import { Buttons } from "@/Utils";
import { NetworkList } from "@/features/Products/airtime";

export let colorArr = [
	"#F1EEEA",
	"#E5DDF2",
	"#E9F5FA",
	"#DBC7DA",
	"#E6EDE8",
	"#C7DBCD",
	"#FAE9EA",
	"#C7DBDB",
	"#EDE6E6",
	"#C7DBDB",
	"#E9EBFA",
	"rgba(186, 255, 174, 0.80)",
];

const CgWallet = () => {
	let {
			auth,
			manageCGWalletUserHistory,
			manageCGWallets,
			numberWithCommas,
			wallet,
			setStateName,
			cgwalletUser,
			permission,
		} = useContext(GlobalState),
		navigate = useNavigate();

	useEffect(() => {
		setStateName("CG Wallet");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		manageCGWalletUserHistory("credit");
		manageCGWalletUserHistory("debit");
		manageCGWallets("get");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (auth?.user?.privilege !== "superadmin") {
			let findTitle = "cgwalletpurchase";

			let findPermit = permission?.data?.find(
				item =>
					item?.slug === findTitle && item?.user?.includes(auth?.user?._id)
			);
			if (!findPermit) {
				navigate(-1);
			}
		}
	}, [auth?.user, permission?.data, navigate]);

	let init = {
			network: "",
			cgwallet: "",
		},
		[state, setState] = useState(init),
		[data, setData] = useState(null),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		handleSubmit = async e => {
			e?.preventDefault();
			setLoading(true);
			console.log({ state });
			await manageCGWalletUserHistory("post", state);
			setLoading(false);
			setSubmit(true);
		},
		{ page, id } = useParams();

	useEffect(() => {
		if (state?.network)
			setData(
				cgwalletUser?.data?.filter(
					item =>
						item?.network?.name?.toUpperCase() === state?.network?.toUpperCase()
				)
			);
	}, [cgwalletUser?.data, state?.network]);

	useEffect(() => {
		if (submit && cgwalletUser?.isAdded) {
			setState(init);
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, cgwalletUser?.isAdded]);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<CgBalanceComponent cgBalance={wallet?.balance?.cgBalance} />
				<div className="d-flex justify-content-end align-items-center flex-column">
					<Buttons
						title={"View Purchase History"}
						onClick={() => navigate(`/${page}/${id}/credit`)}
						css={
							"d-block ms-auto Lexend btn-primary1 text-capitalize py-3 mb-2"
						}
						width={"auto"}
					/>
					<Buttons
						title={"View Usage History"}
						onClick={() => navigate(`/${page}/${id}/debit`)}
						css={
							"d-block ms-auto Lexend btn-primary1 text-capitalize py-3 mb-2"
						}
						width={"auto"}
					/>
				</div>
				<DefaultAuthComponent nozoom nobg>
					<h2 className="my-3 text-center Lexend">Stock Purchase</h2>
					<form className="w-100" onSubmit={handleSubmit}>
						<div className="mb-4">
							<label htmlFor="Newtwork">Network</label>
							<NetworkList
								state={state?.network}
								setState={i => {
									setState({ ...state, network: i });
								}}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="Education">
								{state?.network?.toUpperCase()} CG Wallet
							</label>
							<select
								className="form-control py-3 py-md-4 text-capitalize form-select"
								name="cgwallet"
								placeholder="Education"
								value={state?.cgwallet}
								onChange={e => setState({ ...state, cgwallet: e.target.value })}
								id="cgwallet">
								<option value="">
									select {state?.network?.toUpperCase()} CG Wallet
								</option>
								{data?.map((it, i) => (
									<option value={it?._id} key={i}>
										{it?.volume} {it?.size} {it?.category?.name} / NGN{" "}
										{numberWithCommas(
											it?.amount ? Number(it?.amount).toFixed(2) : 0
										)}
									</option>
								))}
							</select>
						</div>
						<Buttons
							title={"purchase"}
							css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
							width={"w-50"}
							style={{ borderRadius: "30px" }}
							loading={loading}
							onClick={handleSubmit}
						/>
					</form>
				</DefaultAuthComponent>
				{/* <AirtimeHistory /> */}
			</Container>
		</div>
	);
};

export default CgWallet;

export const DefaultAuthComponent = ({ children, nozoom, nobg }) => {
	return (
		<div
			className={`aboutScreen d-flex justify-content-center align-items-center py-md-5" ${
				nobg ? "" : "bg-select-blue"
			}`}>
			<div
				data-aos={nozoom ? "" : "zoom-in"}
				className="m-auto shadow px-3 py-5 rounded20 shadow2 w-100 bg-white"
				style={{
					maxWidth: "500px",
				}}>
				<Container className="px-lg-5 px-3">{children}</Container>
			</div>
		</div>
	);
};

export const CgBalanceComponent = ({ cgBalance, col }) => {
	let { numberWithCommas } = useContext(GlobalState);
	return (
		<div className="row mx-0 g-2 g-md-4 mb-4">
			{cgBalance?.map((it, i) => (
				<div className={`col-6 ${col || "col-md-3"} p-2 p-md-3`} key={i}>
					<div
						className="shadow2 rounded20 p-3 myCursor eachProduct CgWallet"
						style={{
							background: colorArr?.[i % colorArr?.length],
						}}>
						<div className="d-flex align-items-center">
							<img
								src={it?.network?.image?.url}
								alt={it?.category?.categoryId}
								className="me-md-2 mb-1 mb-md-0 rounded-circle object-cover"
								style={{
									height: "4rem",
									width: "4rem",
								}}
							/>
							<h5 className="fontReduceBig Lexend ms-2 ms-md-0">
								{it?.category?.name}
							</h5>
						</div>
						<h4 className="fontReduceBig">
							Balance:{" "}
							<span className="Lexend cgBalance">
								{numberWithCommas(Number(it?.volume || 0).toFixed(2))}
								{""}
								{it?.size}
							</span>
						</h4>
					</div>
				</div>
			))}
		</div>
	);
};
