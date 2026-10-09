import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "@/Data/Context";
import Container from "@/components/ui/Container";
import { BonusCommission } from "@/features/Wallets";
import LoadMore, { BottomTab } from "@/features/LoadMore";
import moment from "moment";
import { Buttons, EmptyComponent } from "@/Utils";
import { MainPaginate, MainRanger } from "@/features/Transactions";
import { useNavigate, useParams } from "@/lib/router";

const Referral = () => {
	let { setStateName, auth } = useContext(GlobalState),
		[active, setActive] = useState(0),
		navigate = useNavigate(),
		{ page, id } = useParams();

	useEffect(() => {
		setStateName("Referral history");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-3 py-md-5">
				<h5 className="Lexend">Referral History</h5>
				<small className="text2 Lexend">
					Referral Code: {auth?.user?.referralCode}
				</small>
				<Buttons
					title={"All Referred User"}
					css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 my-3 ms-auto"
					width={"w-25 w25"}
					onClick={() => navigate(`/${page}/${id}/all-referral`)}
					style={{ borderRadius: "30px" }}
				/>
				<div className="btn-group w-100 py-3">
					<button
						className={`btn py-3 text-capitalize fw-bold ${
							active === 0 ? "border-bottom textColor" : ""
						} rounded-0`}
						onClick={() => setActive(0)}>
						Referral Bonus
					</button>
					<button
						className={`btn py-3 text-capitalize fw-bold ${
							active === 1 ? "border-bottom textColor" : ""
						} rounded-0`}
						onClick={() => setActive(1)}>
						Referred User
					</button>
				</div>
				{active === 1 ? <ReferedUser /> : <BonusCommission type={"referral"} />}{" "}
			</Container>{" "}
		</div>
	);
};

export default Referral;

const ReferedUser = () => {
	const { getReferrals, referral } = useContext(GlobalState);

	let [state, setState] = useState(null);

	useEffect(() => {
		getReferrals();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [loading, setLoading] = useState(false);
	let handleLoadMore = async () => {
		setLoading(true);

		await getReferrals({
			limit: Number(
				referral?.general_paginate?.nextPage * referral?.general_paginate?.limit
			),
		});
		setLoading(false);
	};

	useEffect(() => {
		setState(referral?.general_referral);
	}, [referral]);

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
			<MainRanger setRange={setRange} range={range} />
			<div className="bland row mx-0 py-3 px-0 text-capitalize">
				<div className="col textTrunc fontReduce fw-bold Lexend">S/N</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">User</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">date</div>
			</div>
			<div className="bland2 row mx-0">
				{currentItems?.length === 0 ? (
					<EmptyComponent subtitle={`Referral list is empty`} />
				) : (
					currentItems?.map((item, index) => (
						<div key={index} className="row mx-0 py-3 px-0">
							<div className="col textTrunc fontReduce2 my-auto textTrunc textTrunc3 d-none d-md-flex">
								{index + 1}
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
			<BottomTab state={state} paginate={referral?.general_paginate} />
			<LoadMore
				next={referral?.general_paginate?.next}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</div>
	);
};
