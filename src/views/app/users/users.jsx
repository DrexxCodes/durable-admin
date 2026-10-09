import React, { useContext, useEffect } from "react";
import Container from "@/components/ui/Container";
import { GlobalState } from "@/Data/Context";
import { AdminDetails, PrivilegeTopper } from "@/features/Users";

const Users = () => {
	let { setStateName, getUserPrivileges, getAllUserTransactionAmount } =
		useContext(GlobalState);
	useEffect(() => {
		setStateName("manage Users");
		getUserPrivileges("user");
		getAllUserTransactionAmount("user");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-3">
				<PrivilegeTopper privilege={"user"} />
			</Container>
			<Container className="py-5">
				<h4>Users</h4> <AdminDetails privilege="user" />
			</Container>{" "}
		</div>
	);
};

export default Users;
