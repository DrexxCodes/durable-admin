import React, { useContext, useEffect } from "react";
import Container from "@/components/ui/Container";
import { GlobalState } from "@/Data/Context";
import { AdminDetails, PrivilegeTopper } from "@/features/Users";

const Topuser = () => {
	let { setStateName, getUserPrivileges, getAllUserTransactionAmount } =
		useContext(GlobalState);
	useEffect(() => {
		setStateName("manage Topuser");
		getUserPrivileges("topuser");
		getAllUserTransactionAmount("topuser");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-3">
				<PrivilegeTopper privilege={"topuser"} />
			</Container>
			<Container className="py-5">
				<h4>Topuser</h4> <AdminDetails privilege="topuser" />
			</Container>{" "}
		</div>
	);
};

export default Topuser;
