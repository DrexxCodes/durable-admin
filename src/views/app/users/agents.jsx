import React, { useContext, useEffect } from "react";
import Container from "@/components/ui/Container";
import { ThreeBoxBar, UserListOne } from "@/features/Users";
const icon1 = "/assets/5.png";
const icon2 = "/assets/x36.png";
const icon3 = "/assets/allura-online-searching.png";
import { Link } from "@/lib/router";
import { GlobalState } from "@/Data/Context";

const AgentsMain = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("agents");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let usersArr = [
		{
			icon: icon1,
			name: "total users",
			number: 6500,
			color: "var(--tile)",
			link: "/users",
		},
		{
			icon: icon2,
			name: "total referrals",
			number: 5000,
			color: "var(--tile)",
		},
		{
			icon: icon3,
			name: "total agents",
			number: 4000,
			color: "var(--tile)",
		},
	];
	return (
		<Container>
			<ThreeBoxBar list={usersArr} />
			<Link
				to={`/users`}
				style={{ borderRadius: "30px" }}
				className="btn-primary1 text-capitalize py-3 px-4 px-lg-5 my-4 btn">
				Users
			</Link>
			<UserListOne />
		</Container>
	);
};

export default AgentsMain;
