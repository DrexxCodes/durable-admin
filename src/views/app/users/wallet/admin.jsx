import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "@/lib/router";
import { GlobalState } from "@/Data/Context";
import Container from "@/components/ui/Container";
import { Loader } from "@/Utils";
import { WalletHistoryList } from "@/views/app/users/wallet/[id]";

const UserWallet = () => {
	const { allUsers, setStateName, manageUserActiveness } =
			useContext(GlobalState),
		[state, setState] = useState(null),
		items = useLocation()?.state;

	useEffect(() => {
		setStateName(
			`${items?.firstName || ""} ${items?.lastName || ""}'s wallet history`
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		let getUserDetails = async () => {
			await manageUserActiveness(
				items?._id,
				"wallet",
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
		if (allUsers?.isFoundWallet) setState(allUsers?.walletHistory);
	}, [allUsers?.walletHistory, allUsers?.isFoundWallet]);

	if (!allUsers?.isFoundWalletLoading) if (!state) return;

	return (
		<div className="py-4 bg-white aboutScreen">
			{allUsers?.isFoundWalletLoading ? (
				<Loader />
			) : (
				<Container className="py-5">
					<WalletHistoryList state={state} />
				</Container>
			)}
		</div>
	);
};

export default UserWallet;
