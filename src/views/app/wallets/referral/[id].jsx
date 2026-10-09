import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "@/Data/Context";
import Container from "@/components/ui/Container";
import LoadMore, { BottomTab } from "@/features/LoadMore";
import moment from "moment";
import { EmptyComponent } from "@/Utils";
import { MainPaginate, MainRanger } from "@/features/Transactions";
import { BonusCommission } from "@/features/Wallets";

const Referral = () => {
	let { setStateName } = useContext(GlobalState),
		[active, setActive] = useState(0);

	useEffect(() => {
		setStateName("Referral history");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-3 py-md-5">
				<h5 className="Lexend">Referral History</h5>
				<div className="btn-group w-100 py-3">
					<button
						className={`btn py-3 text-capitalize fw-bold ${
							active === 0 ? "border-bottom textColor" : ""
						} rounded-0`}
						onClick={() => setActive(0)}>
						Referral User<span className="text-lowercase">(s)</span>
					</button>
					<button
						className={`btn py-3 text-capitalize fw-bold ${
							active === 1 ? "border-bottom textColor" : ""
						} rounded-0`}
						onClick={() => setActive(1)}>
						Referred Bonus
					</button>
				</div>
				{active === 1 ? (
					<BonusCommission type={"referral"} general={"general"} />
				) : (
					<ReferedUser />
				)}{" "}
			</Container>{" "}
		</div>
	);
};

export default Referral;

const ReferedUser = () => {
	const { getReferrals, referral, getReload } = useContext(GlobalState);

	let [state, setState] = useState(null),
		[search, setSearch] = useState(null);

	useEffect(() => {
		getReferrals({ general: "allCases" });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [loading, setLoading] = useState(false);
	let handleLoadMore = async () => {
		setLoading(true);

		await getReferrals({
			limit: Number(
				search
					? referral?.search_paginate?.nextPage *
							referral?.search_paginate?.limit
					: referral?.general_paginate?.nextPage *
							referral?.general_paginate?.limit
			),
			general: "allCases",
			search,
		});
		setLoading(false);
	};

	useEffect(() => {
		getReload();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (referral?.isFound) setState(referral?.mainSearch);
		else setState(referral?.all_referral);
	}, [referral, referral?.isFound, referral?.mainSearch]);

	useEffect(() => {
		if (search) {
			document.getElementById("Search").addEventListener("search", () => {
				getReload();
			});
			let handleSubmit = async () => {
				if (!search) return;

				await getReferrals({
					general: "allCases",
					search,
				});
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	let [range, setRange] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;
	if (!state) return;

	const currentItems = state.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(state.length / range);

	const handlePageClick = event => {
		const newOffset = (event.selected * range) % state.length;
		setItemOffset(newOffset);
	};

	return (
		<div className="py-5">
			<div className="w-50 w50 mb-3">
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
			<MainRanger setRange={setRange} range={range} />
			<div className="bland row mx-0 py-3 px-0 text-capitalize">
				<div className="col textTrunc fontReduce fw-bold Lexend">S/N</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Referee</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">User</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">date&time</div>
			</div>
			<div className="bland2 row mx-0">
				{currentItems?.length === 0 ? (
					<EmptyComponent subtitle={`Referral list is empty`} />
				) : (
					currentItems?.map((item, index) => (
						<div key={index} className="row mx-0 py-3 px-0">
							<div className="col textTrunc fontReduce2 my-auto textTrunc textTrunc3">
								{index + 1}
							</div>
							<div className="col textTrunc fontReduce2 my-auto">
								{item?.referee?.firstName} {item?.referee?.lastName}
							</div>
							<div className="col textTrunc fontReduce2 my-auto">
								{item?.user?.firstName} {item?.user?.lastName}
							</div>
							<div className="col textTrunc fontReduce2 my-auto">
								{moment(item?.createdAt).format("DD/MM/YYYY hh:mm A")}
							</div>
						</div>
					))
				)}
			</div>
			<MainPaginate handlePageClick={handlePageClick} pageCount={pageCount} />
			<BottomTab
				state={state}
				paginate={
					referral?.isFound ? referral?.search_paginate : referral?.all_paginate
				}
			/>
			<LoadMore
				next={
					referral?.isFound
						? referral?.search_paginate?.next
						: referral?.all_paginate?.next
				}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</div>
	);
};
