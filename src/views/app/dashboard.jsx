import React, { useContext, useState, useEffect, Fragment } from "react";
import Dashboard from "@/features/Dashboard";
import { GlobalState } from "@/Data/Context";
const icon1 = "/assets/group-4.png";
const icon2 = "/assets/group-3.png";
const icon3 = "/assets/group-3.png";
const icon4 = "/assets/group-5.png";
import moment from "moment";
import { ModalComponents } from "@/features";
import { isSet } from "@/lib/loaded";
import { useGiveUp } from "@/hooks/useGiveUp";

const MainDashboard = () => {
	const {
		wallet,
		allUsers,
		numberWithCommas,
		nairaSignNeutral,
		pendings,
		user,
		reseller,
	} = useContext(GlobalState);
	// A tile shows a skeleton until its numbers arrive (or 15s pass), instead of flashing "0" first.
	const gaveUp = useGiveUp();
	const pending = arrived => !arrived && !gaveUp;
	const w = wallet?.wallet_stat,
		wd = wallet?.wallet_details;
	let usersArr = [
		{
			name: "total users",
			number: numberWithCommas(
				Number(
					user?.paginate?.total ||
						user?.all?.length ||
						allUsers?.data?.filter(item => !item?.isAdmin)?.length
				) || 0
			),
			color: "var(--tile)",
			loading: pending(isSet(user?.paginate?.total) || user?.all?.length > 0 || allUsers?.data?.length > 0),
			link: "/users/users",
			icon: icon1,
			button: true,
		},
		{
			name: "total agents",
			number: numberWithCommas(
				reseller?.paginate?.total ||
					reseller?.all?.length ||
					Number(
						allUsers?.data?.filter(
							item => !item?.isAdmin && item?.privilege === "reseller"
						)?.length
					) ||
					0
			),
			color: "var(--tile)",
			loading: pending(isSet(reseller?.paginate?.total) || reseller?.all?.length > 0 || allUsers?.data?.length > 0),
			link: "/users/reseller",
			type: "amount",
			icon: icon2,
		},
		{
			name: `${moment().format("MMMM")}'s transactions`,
			number: `${nairaSignNeutral}${numberWithCommas(
				Number(
					wallet?.wallet_stat?.monthAmount ||
						wallet?.wallet_details?.transactions?.month ||
						wallet?.wallet_details?.month ||
						0
				).toFixed(2)
			)}`,
			color: "var(--tile)",
			loading: pending(isSet(w?.monthAmount) || isSet(wd?.transactions?.month) || isSet(wd?.month)),
			link: "/transactions",
			icon: icon3,
		},
		{
			name: "todays' sales",
			number: `${nairaSignNeutral}${numberWithCommas(
				Number(
					wallet?.wallet_stat?.dayAmount ||
						wallet?.wallet_details?.transactions?.day ||
						wallet?.wallet_details?.day ||
						0
				).toFixed(2)
			)}`,
			color: "var(--tile)",
			loading: pending(isSet(w?.dayAmount) || isSet(wd?.transactions?.day) || isSet(wd?.day)),
			link: "/transactions",
			icon: icon4,
		},
		{
			name: "total pendings",
			number: `${
				pendings?.paginate?.total
					? numberWithCommas(Number(pendings?.paginate?.total))
					: 0
			}`,
			color: "var(--tile)",
			loading: pending(isSet(pendings?.paginate)),
			link: "/transactions/pending",
			icon: icon1,
		},
		{
			name: "today's successful transaction count",
			number: numberWithCommas(
				Number(
					wallet?.wallet_stat?.dayCount ||
						wallet?.wallet_details?.transactions?.dayCount ||
						wallet?.wallet_details?.dayCount ||
						0
				)
			),
			color: "var(--tile)",
			loading: pending(isSet(w?.dayCount) || isSet(wd?.transactions?.dayCount) || isSet(wd?.dayCount)),
			icon: icon2,
			button: true,
		},
		{
			name: "today's successful data sold",
			number: `${numberWithCommas(
				Number(
					wallet?.wallet_stat?.dayDataCount ||
						wallet?.wallet_details?.transactions?.dayDataCount ||
						wallet?.wallet_details?.dayDataCount ||
						0
				).toFixed(2)
			)}GB`,
			color: "var(--tile)",
			loading: pending(isSet(w?.dayDataCount) || isSet(wd?.transactions?.dayDataCount) || isSet(wd?.dayDataCount)),
			icon: icon4,
			button: true,
		},
	];

	const { auth, notifications, getNotify, manageNotify } =
		useContext(GlobalState);

	let [notifyList, setNotifyList] = useState([]),
		[isOpen, setIsOpen] = useState(false),
		[keepOpen, setKeepOpen] = useState("open");

	useEffect(() => {
		getNotify("incoming");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (notifications?.incoming?.length > 0) {
			let res = notifications?.incoming?.filter(
				item =>
					(item?.priority &&
						!item?.isNotifiedTo?.includes(auth?.user?._id) &&
						!item?.status) ||
					(!item?.priority &&
						["user", "reseller", "topuser", "standalone"]?.includes(
							item?.user?.privilege
						) &&
						!item?.status &&
						!item?.isNotifiedTo?.includes(auth?.user?._id))
			);
			if (res?.length > 0) setNotifyList(res);
		}
	}, [notifications?.incoming, auth?.user]);

	useEffect(() => {
		if (notifyList?.length > 0 && !isOpen && keepOpen === "open") {
			setTimeout(() => {
				setIsOpen(true);
			}, 5000);
		} else {
			setIsOpen(false);
		}
		if (notifyList?.length === 0 || keepOpen !== "open") setIsOpen(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [notifyList?.length, keepOpen]);

	let markAsNotified = async () => {
		for (let m = 0; m < notifyList.length; m++) {
			await manageNotify(null, notifyList?.[m]?._id, "prior");
		}
		setIsOpen(false);
	};

	return (
		<>
			<Dashboard usersArr={usersArr} />
			<ModalComponents
				isOpen={isOpen}
				title="Be informed"
				size={"sm"}
				borderNone={"borderNone"}
				toggle={() => {
					setKeepOpen("close");
					markAsNotified();
				}}>
				<div className="downH2 d-flex flex-column">
					{notifyList?.map((item, i) => (
						<Fragment key={i}>
							<p className="fw-bold Lexend text-center w-100 my-0">
								<span className="fontInherit me-2">
									{i > 0 && <>{i + 1}.</>}
								</span>{" "}
								{item?.message}
							</p>
							<div className="flex mb-3 justify-between">
								{["user", "reseller", "topuser", "standalone"]?.includes(
									item?.user?.privilege
								) && (
									<small className="Lexend mb-3">
										{item?.user?.firstName} {item?.user?.lastName} |{" "}
										{item?.user?.email} | {item?.user?.privilege}
									</small>
								)}
							</div>
							<small className="d-block ms-auto Lexend mb-3">
								{moment(item?.createdAt).diff(moment(), "years") < 0
									? moment(item?.createdAt).format("DD/MM/YYYY hh:mm A")
									: moment(item?.createdAt).diff(moment(), "months") < 0
									? moment(item?.createdAt).format("DD/MM hh:mm A")
									: moment(item?.createdAt).diff(moment(), "days") < 0
									? moment(item?.createdAt).format("DD/MM hh:mm A")
									: moment(item?.createdAt).format("hh:mm A")}
							</small>
						</Fragment>
					))}
					<button
						onClick={() => {
							setKeepOpen("close");
							markAsNotified();
						}}
						className="btn btn-primary1 py-2 py-md-3 text-capitalize mx-auto my-3 px-3 px-md-5">
						close
					</button>
				</div>
			</ModalComponents>
		</>
	);
};

export default MainDashboard;
