import React, { useContext, useEffect } from "react";
import { Link } from "@/lib/router";
import Container from "@/components/ui/Container";
import { useParams } from "@/lib/router";
import { GlobalState } from "@/Data/Context";
import Skeleton from "@/components/ui/Skeleton";
import { isSet } from "@/lib/loaded";
import { useGiveUp } from "@/hooks/useGiveUp";

const Administration = () => {
	let {
		setStateName,
		user,
		reseller,
		topuser,
		numberWithCommas,
		getUserPrivileges,
		manageUpgrade,
		getAllUserTransactionAmount,
		upgrade,
		standalone,
	} = useContext(GlobalState);
	const gaveUp = useGiveUp(); // counts show a skeleton until they arrive (or 15s pass)
	useEffect(() => {
		manageUpgrade();
		getUserPrivileges("user");
		getUserPrivileges("reseller");
		getUserPrivileges("topuser");
		getUserPrivileges("superadmin");
		getAllUserTransactionAmount("user");
		getAllUserTransactionAmount("reseller");
		getAllUserTransactionAmount("topuser");
		getAllUserTransactionAmount("superadmin");
		if (
			["Teetop Digital", "TEETOP DIGITAL"]?.includes(process.env.REACT_APP_NAME)
		) {
			getUserPrivileges("standalone");
			getAllUserTransactionAmount("standalone");
		}
		setStateName("manage general users");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let productArr = [
		{
			name: "Manage User",
			link: "/users",
			color: "var(--tile)",
			textColor: "white",
			number: user?.paginate?.total,
			loading: !isSet(user?.paginate?.total) && !gaveUp,
			show: true,
		},
		{
			name: "Manage Reseller",
			link: "/reseller",
			color: "var(--tile)",
			number: reseller?.paginate?.total,
			loading: !isSet(reseller?.paginate?.total) && !gaveUp,
			show: true,
		},
		{
			name: "Manage Topuser",
			link: "/topuser",
			color: "var(--tile)",
			textColor: "white",
			number: topuser?.paginate?.total,
			loading: !isSet(topuser?.paginate?.total) && !gaveUp,
			show: true,
		},
		{
			textColor: "black",
			name: "Manage Standalone",
			link: "/standalone",
			color: "var(--tile)",
			number: standalone?.paginate?.total,
			loading: !isSet(standalone?.paginate?.total) && !gaveUp,
			show: ["Teetop Digital", "TEETOP DIGITAL"]?.includes(
				process.env.REACT_APP_NAME
			),
		},
		{
			name: "Manage Upgrade request",
			link: "/upgrade",
			color: "var(--tile)",
			textColor: "white",
			number: upgrade?.paginate?.total,
			show: true,
		},
	];

	let params = useParams();

	return (
		<Container>
			<div className="row mx-0 g-2 g-md-4 py-4 py-md-5">
				{productArr
					?.filter(ic => ic?.show)
					?.map((item, i) => (
						<div className="col-6 col-md-4 productCard" key={i}>
							<Link
								to={
									item?.type === "button"
										? "#"
										: `/${params?.page}${item?.link}`
								}
								className="d-flex align-items-center justify-content-center text2 myCursor text-decoration-none h-100 eachProduct fontReduceBig textTrunc p-2 p-md-0 py-3 py-md-0 h-100 flex-column"
								style={{
									background: item?.color,
									borderRadius: "30px",
									color: item?.textColor ? item?.textColor : "#000",
								}}>
								<span className="textTrunc fontInherit">{item?.name}</span>
								<span className="textTrunc fontInherit textBig Lexend text5">
									{item?.loading ? (
										<Skeleton width="5rem" height="2rem" />
									) : item?.number ? (
										numberWithCommas(item?.number)
									) : (
										""
									)}
								</span>
							</Link>
						</div>
					))}
			</div>
		</Container>
	);
};

export default Administration;
