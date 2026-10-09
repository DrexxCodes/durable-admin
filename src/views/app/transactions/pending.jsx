import React, { useState, useContext, useEffect } from "react";
import Container from "@/components/ui/Container";
import {
	TransactionDetails,
	TransactionsData,
} from "@/features/Transactions";
import { GlobalState } from "@/Data/Context";
import LoadMore, { BottomTab } from "@/features/LoadMore";

const PendingTransactions = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("Pending Transactions");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="bg-white">
			<Container>
				<SubPendingTransactionsFolder />
			</Container>
		</div>
	);
};

export default PendingTransactions;

export const SubPendingTransactionsFolder = () => {
	const { pendings, getServicesHistoryPending, getReload } =
		useContext(GlobalState);

	let [loading, setLoading] = useState(false),
		[search, setSearch] = useState(""),
		[state, setState] = useState(null),
		[thisData, setThisData] = useState(null);

	useEffect(() => {
		if (search) {
			document.getElementById("Search").addEventListener("search", () => {
				getReload();
			});
			let handleSubmit = async () => {
				if (!search) return;

				await getServicesHistoryPending({
					search,
				});
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		if (pendings.isFound) {
			setState(pendings.mainSearch);
		} else setState(pendings.transactions);
	}, [pendings.transactions, pendings.isFound, pendings.mainSearch]);

	useEffect(() => {
		getReload();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getServicesHistoryPending();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let handleLoadMore = async () => {
		setLoading(true);

		if (search) {
			await getServicesHistoryPending({
				limit: Number(pendings?.paginate?.nextPage * pendings?.paginate?.limit),
				search,
			});
		} else {
			await getServicesHistoryPending({
				limit: Number(pendings?.paginate?.nextPage * pendings?.paginate?.limit),
			});
		}
		setLoading(false);
	};

	if (!state) return <></>;

	return (
		<div className="py-5">
			<div className="w-50 w50">
				<input
					type="search"
					name="search"
					id="Search"
					className="form-control w-100 py-3 borderColor2"
					placeholder="Type here to search"
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			</div>
			<TransactionsData
				state={state}
				setThisData={setThisData}
				setState={setState}
				type={"all"}
				criteria={{
					limit: pendings?.paginate?.limit,
					search: search ? search : "",
				}}
			/>
			<BottomTab
				state={state}
				paginate={search ? pendings?.search_paginate : pendings?.paginate}
			/>
			<LoadMore
				next={
					search ? pendings?.search_paginate?.next : pendings?.paginate?.next
				}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
			<TransactionDetails
				type={"all"}
				criteria={{
					limit: pendings?.paginate?.limit,
					search: search ? search : "",
				}}
				thisData={thisData}
				setThisData={setThisData}
			/>
		</div>
	);
};
