import React, { useContext, useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { GlobalState } from "@/Data/Context";
import { useNavigate } from "@/lib/router";

const ManageWallet = () => {
	let {
			setStateName,
			numberWithCommas,
			wallet,
			nairaSign,
			manager,
			marketer,
			developer,
			accountant,
			superadmin,
			user,
			reseller,
			topuser,
			customercare,
			allUsers,
			getAllUserTransactionAmount,
			standalone,
		} = useContext(GlobalState),
		navigate = useNavigate(),
		{ auth, permission } = useContext(GlobalState),
		[total, setTotal] = useState({
			wallet: "",
			bonus: "",
			referral: "",
			commission: "",
		});

	useEffect(() => {
		if (auth?.user?.privilege !== "superadmin") {
			let findTitle = "viewgeneralwalletdetails";

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
		let userReferral = allUsers?.details?.user?.referral || user?.referral || 0;
		let resellerReferral =
			allUsers?.details?.reseller?.referral || reseller?.referral || 0;
		let standaloneReferral =
			allUsers?.details?.standalone?.referral || standalone?.referral || 0;
		let customercareReferral =
			allUsers?.details?.customercare?.referral || customercare?.referral || 0;
		let managerReferral =
			allUsers?.details?.manager?.referral || manager?.referral || 0;
		let marketerReferral =
			allUsers?.details?.marketer?.referral || marketer?.referral || 0;
		let developerReferral =
			allUsers?.details?.developer?.referral || developer?.referral || 0;
		let accountantReferral =
			allUsers?.details?.accountant?.referral || accountant?.referral || 0;
		let superadminReferral =
			allUsers?.details?.superadmin?.referral || superadmin?.referral || 0;
		// Referral
		let userAvailable = allUsers?.details?.user?.wallet || user?.wallet || 0;
		let resellerAvailable =
			allUsers?.details?.reseller?.wallet || reseller?.wallet || 0;
		let standaloneAvailable =
			allUsers?.details?.standalone?.wallet || standalone?.wallet || 0;
		let customercareAvailable =
			allUsers?.details?.customercare?.wallet || customercare?.wallet || 0;
		let managerAvailable =
			allUsers?.details?.manager?.wallet || manager?.wallet || 0;
		let marketerAvailable =
			allUsers?.details?.marketer?.wallet || marketer?.wallet || 0;
		let developerAvailable =
			allUsers?.details?.developer?.wallet || developer?.wallet || 0;
		let accountantAvailable =
			allUsers?.details?.accountant?.wallet || accountant?.wallet || 0;
		let superadminAvailable =
			allUsers?.details?.superadmin?.wallet || superadmin?.wallet || 0;
		// Commission
		let userCommission =
			allUsers?.details?.user?.commission || user?.commission || 0;
		let resellerCommission =
			allUsers?.details?.reseller?.commission || reseller?.commission || 0;
		let standaloneCommission =
			allUsers?.details?.standalone?.commission || standalone?.commission || 0;
		let customercareCommission =
			allUsers?.details?.customercare?.commission ||
			customercare?.commission ||
			0;
		let managerCommission =
			allUsers?.details?.manager?.commission || manager?.commission || 0;
		let marketerCommission =
			allUsers?.details?.marketer?.commission || marketer?.commission || 0;
		let developerCommission =
			allUsers?.details?.developer?.commission || developer?.commission || 0;
		let accountantCommission =
			allUsers?.details?.accountant?.commission || accountant?.commission || 0;
		let superadminCommission =
			allUsers?.details?.superadmin?.commission || superadmin?.commission || 0;
		// Bonus
		let userBonus = allUsers?.details?.user?.bonus || user?.bonus || 0;
		let resellerBonus =
			allUsers?.details?.reseller?.bonus || reseller?.bonus || 0;
		let standaloneBonus =
			allUsers?.details?.standalone?.bonus || standalone?.bonus || 0;
		let customercareBonus =
			allUsers?.details?.customercare?.bonus || customercare?.bonus || 0;
		let managerBonus = allUsers?.details?.manager?.bonus || manager?.bonus || 0;
		let marketerBonus =
			allUsers?.details?.marketer?.bonus || marketer?.bonus || 0;
		let developerBonus =
			allUsers?.details?.developer?.bonus || developer?.bonus || 0;
		let accountantBonus =
			allUsers?.details?.accountant?.bonus || accountant?.bonus || 0;
		let superadminBonus =
			allUsers?.details?.superadmin?.bonus || superadmin?.bonus || 0;
		setTotal({
			...total,
			bonus:
				superadminBonus +
				accountantBonus +
				developerBonus +
				marketerBonus +
				customercareBonus +
				resellerBonus +
				standaloneBonus +
				userBonus +
				managerBonus,
			commission:
				superadminCommission +
				accountantCommission +
				developerCommission +
				marketerCommission +
				customercareCommission +
				resellerCommission +
				standaloneCommission +
				userCommission +
				managerCommission,
			wallet:
				superadminAvailable +
				accountantAvailable +
				developerAvailable +
				marketerAvailable +
				customercareAvailable +
				resellerAvailable +
				standaloneAvailable +
				userAvailable +
				managerAvailable,
			referral:
				superadminReferral +
				accountantReferral +
				developerReferral +
				marketerReferral +
				customercareReferral +
				resellerReferral +
				standaloneReferral +
				userReferral +
				managerReferral,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		allUsers,
		customercare,
		user,
		manager,
		marketer,
		developer,
		accountant,
		superadmin,
		reseller,
		standalone,
	]);

	useEffect(() => {
		setStateName("General Wallet");
		getAllUserTransactionAmount("user", "notransact");
		getAllUserTransactionAmount("reseller", "notransact");
		getAllUserTransactionAmount("customer-care", "notransact");
		getAllUserTransactionAmount("manager", "notransact");
		getAllUserTransactionAmount("superadmin", "notransact");
		getAllUserTransactionAmount("marketer", "notransact");
		getAllUserTransactionAmount("accountant", "notransact");
		getAllUserTransactionAmount("developer", "notransact");
		if (
			["Teetop Digital", "TEETOP DIGITAL"]?.includes(process.env.REACT_APP_NAME)
		)
			getAllUserTransactionAmount("standalone", "notransact");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setStateName("General Wallet");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<div className="rounded20 walletDiv p-3 px-md-5 mb-3">
					<div className="d-md-flex align-items-center h-100">
						<div className="px-3 text-dark h-100 py-3 py-md-5">
							<h3 className="fontReduceMini">Total Wallet balance</h3>
							<h1 className={`fw-bold text3 textMini`}>
								{nairaSign}{" "}
								{numberWithCommas(
									Number(
										wallet?.wallet_details?.general?.available ||
											total?.wallet ||
											0
									).toFixed(2)
								)}
							</h1>
							<h3 className="fontReduceMini mt-2">Total Commission balance</h3>
							<h1 className={`fw-bold text3 textMini`}>
								{nairaSign}{" "}
								{numberWithCommas(
									Number(
										wallet?.wallet_details?.general?.commission ||
											total?.commission ||
											0
									).toFixed(2)
								)}
							</h1>
							<h3 className="fontReduceMini mt-2">Total Bonus balance</h3>
							<h1 className={`fw-bold text3 textMini`}>
								{nairaSign}{" "}
								{numberWithCommas(
									Number(
										wallet?.wallet_details?.general?.bonus || total?.bonus || 0
									).toFixed(2)
								)}
							</h1>
							<h3 className="fontReduceMini mt-2">
								Total Referral Bonus balance
							</h3>
							<h1 className={`fw-bold text3 textMini`}>
								{nairaSign}{" "}
								{numberWithCommas(
									Number(
										wallet?.wallet_details?.general?.referral ||
											total?.referral ||
											0
									).toFixed(2)
								)}
							</h1>
						</div>
					</div>
				</div>
				<div className="row mx-0 g-3 g-md-4">
					<EachSectorBalance sector={user} sectorName={"User"} />
					<EachSectorBalance sector={reseller} sectorName={"Reseller"} />
					<EachSectorBalance sector={topuser} sectorName={"Topuser"} />
					{["Teetop Digital", "TEETOP DIGITAL"]?.includes(
						process.env.REACT_APP_NAME
					) && (
						<EachSectorBalance sector={standalone} sectorName={"Standalone"} />
					)}
					<EachSectorBalance sector={manager} sectorName={"Manager"} />
					<EachSectorBalance sector={accountant} sectorName={"Accountant"} />
					<EachSectorBalance sector={marketer} sectorName={"Marketer"} />
					{/* <EachSectorBalance sector={marketer} sectorName={"Marketer"} /> */}
					<EachSectorBalance sector={developer} sectorName={"Developer"} />
					<EachSectorBalance
						sector={customercare}
						sectorName={"Customer Care"}
					/>
					<EachSectorBalance sector={superadmin} sectorName={"Superadmin"} />
				</div>
			</Container>
		</div>
	);
};

export default ManageWallet;

const EachSectorBalance = ({ sector, sectorName }) => {
	let { nairaSign, numberWithCommas, allUsers } = useContext(GlobalState);
	return (
		<div className="col-12 col-md-6 p-3 mb-3">
			<div className="walletDiv rounded20 p-3 px-md-5">
				<div className="d-md-flex align-items-center h-100">
					<div className="px-3 text-dark h-100 py-3 py-md-5">
						<h3 className="fontReduceMini">{[sectorName]} Wallet balance</h3>
						<h1 className={`fw-bold text3 textMini`}>
							{nairaSign}{" "}
							{numberWithCommas(
								Number(
									allUsers?.details?.[sectorName?.toLowerCase()]?.wallet ||
										sector?.wallet ||
										0
								).toFixed(2)
							)}
						</h1>
						<h3 className="fontReduceMini mt-2">
							{[sectorName]} Commission balance
						</h3>
						<h1 className={`fw-bold text3 textMini`}>
							{nairaSign}{" "}
							{numberWithCommas(
								Number(
									allUsers?.details?.[sectorName?.toLowerCase()]?.commission ||
										sector?.commission ||
										0
								).toFixed(2)
							)}
						</h1>
						<h3 className="fontReduceMini mt-2">
							{[sectorName]} Bonus balance
						</h3>
						<h1 className={`fw-bold text3 textMini`}>
							{nairaSign}{" "}
							{numberWithCommas(
								Number(
									allUsers?.details?.[sectorName?.toLowerCase()]?.bonus ||
										sector?.bonus ||
										0
								).toFixed(2)
							)}
						</h1>
						<h3 className="fontReduceMini mt-2">
							{[sectorName]} Referral Bonus balance
						</h3>
						<h1 className={`fw-bold text3 textMini`}>
							{nairaSign}{" "}
							{numberWithCommas(
								Number(
									allUsers?.details?.[sectorName?.toLowerCase()]?.referral ||
										sector?.referral ||
										0
								).toFixed(2)
							)}
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
};
