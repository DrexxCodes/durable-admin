import React, { useContext, useState, useEffect } from "react";
import { useParams, useSearchParams } from "@/lib/router";
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
		params = useParams(),
		[getSearch] = useSearchParams(),
		[thisData, setThisData] = useState(null);

	useEffect(() => {
		setStateName(
			`${
				getSearch?.get("name")
					? getSearch?.get("name")?.split("_")?.join(" ")
					: ""
			}'s purchase history`
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		let getUserDetails = async () => {
			await manageUserActiveness(params?.step, "purchase", null, "get");
		};
		getUserDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params?.step]);

	useEffect(() => {
		if (allUsers?.isFoundPurchase) setState(allUsers?.purchaseHistory);
	}, [allUsers?.purchaseHistory, params?.step, allUsers?.isFoundPurchase]);

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
							id: params?.step,
						}}
					/>
					<TransactionDetails
						thisData={thisData}
						setThisData={setThisData}
						type={"purchase"}
						criteria={{
							id: params?.step,
						}}
					/>
				</Container>
			)}
		</div>
	);
};

export default UserPurchase;
