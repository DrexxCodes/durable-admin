import React, { useContext, useEffect } from "react";
import Container from "@/components/ui/Container";
import { GlobalState } from "@/Data/Context";
import { AdminDetails, PrivilegeTopper } from "@/features/Users";

const Reseller = () => {
	let { setStateName, getUserPrivileges, getAllUserTransactionAmount } =
		useContext(GlobalState);
	useEffect(() => {
		setStateName("manage Reseller");
		getUserPrivileges("reseller");
		getAllUserTransactionAmount("reseller");
		 // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-3">
				<PrivilegeTopper privilege={"reseller"} />
			</Container>
			<Container className="py-5">
				<h4>Reseller</h4> <AdminDetails privilege="reseller" />
			</Container>{" "}
		</div>
	);
};

export default Reseller;
