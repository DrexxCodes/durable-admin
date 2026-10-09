import React, { useContext, useEffect } from "react";
import Container from "@/components/ui/Container";
import { GlobalState } from "@/Data/Context";
import { AdminDetails, PrivilegeTopper } from "@/features/Users";

const Standalone = () => {
	let { setStateName, getUserPrivileges, getAllUserTransactionAmount } =
		useContext(GlobalState);
	useEffect(() => {
		setStateName("manage Standalone");
		getUserPrivileges("standalone");
		getAllUserTransactionAmount("standalone");
		 // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-3">
				<PrivilegeTopper privilege={"standalone"} />
			</Container>
			<Container className="py-5">
				<h4>Standalone</h4> <AdminDetails privilege="standalone" />
			</Container>{" "}
		</div>
	);
};

export default Standalone;
