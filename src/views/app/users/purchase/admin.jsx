import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "@/lib/router";
import Container from "@/components/ui/Container";
import { GlobalState } from "@/Data/Context";
import {
	TransactionDetails,
	NewPaginate,
} from "@/features/Transactions";
import { Loader } from "@/Utils";

const UserPurchase = () => {
	const { allUsers, setStateName, manageUserActiveness } =
			useContext(GlobalState),
		[state, setState] = useState(null),
		[thisData, setThisData] = useState(null),
		items = useLocation()?.state;

	useEffect(() => {
		setStateName(
			`${items?.firstName || ""} ${items?.lastName || ""}'s purchase history`
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		let getUserDetails = async () => {
			await manageUserActiveness(
				items?._id,
				"purchase",
				null,
				"get",
				null,
				items?._id
			);
		};
		getUserDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [items?._id]);

	useEffect(() => {
		if (allUsers?.isFoundPurchase) setState(allUsers?.purchaseHistory);
	}, [allUsers?.purchaseHistory, allUsers?.isFoundPurchase]);

	if (!allUsers?.isFoundPurchaseLoading) if (!state) return;

	return (
		<div className="py-4 bg-white aboutScreen">
			{allUsers?.isFoundPurchaseLoading ? (
				<Loader />
			) : (
				<Container className="py-5">
					<NewPaginate
						state={state}
						setState={setState}
						setThisData={setThisData}
						type={"purchase"}
						criteria={{
							id: items?._id,
						}}
					/>
					<TransactionDetails
						thisData={thisData}
						setThisData={setThisData}
						type={"purchase"}
						criteria={{
							id: items?._id,
						}}
					/>
				</Container>
			)}
		</div>
	);
};

export default UserPurchase;
