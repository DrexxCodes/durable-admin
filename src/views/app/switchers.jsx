import React, { useContext, useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { ModalComponents } from "@/features";
import { GlobalState } from "@/Data/Context";
import { Buttons } from "@/Utils";
import { useNavigate } from "@/lib/router";
import { MainPaginate, MainRanger } from "@/features/Transactions";

const Switchers = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("Switchers");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let navigate = useNavigate();
	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<div className="d-flex justify-content-end">
					<Buttons
						title={"view history"}
						css="btn-primary1 text-capitalize py-3 my-4 px-5 mx-2"
						width={"w-auto"}
						onClick={() => {
							navigate("/inventory");
						}}
						style={{ borderRadius: "30px" }}
					/>
				</div>
				<BillersDetails />
			</Container>{" "}
		</div>
	);
};

export default Switchers;

const BillersDetails = () => {
	let { category, manageCategory } = useContext(GlobalState);

	let [state, setState] = useState(null),
		[select, setSelect] = useState(null),
		[newBiller, setNewBiller] = useState(null),
		[submit, setSubmit] = useState(false),
		[loading, setLoading] = useState(false);

	useEffect(() => {
		setState(category?.data);
	}, [category?.data]);

	let [isOpen, setIsOpen] = useState(false),
		toggle = () => {
			if (isOpen) setSelect(null);
			setIsOpen(!isOpen);
		};

	useEffect(() => {
		if (submit && category?.isUpdated) {
			toggle();
			setSubmit(false);
			setNewBiller("");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [category?.isUpdated, submit]);

	let handleSubmit = async () => {
		if (!newBiller) return;
		setLoading(true);
		await manageCategory(
			{
				category: select?._id,
				biller: newBiller,
			},
			"switch-biller"
		);
		setLoading(false);
		setSubmit(true);
	};

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
		<>
			<div className="py-5">
				<MainRanger setRange={setRange} range={range} />
				<div className="bland row mx-0 p-3 text-capitalize">
					<div className="col Lexend fw-bold">category name</div>
					<div className="col Lexend fw-bold">category product</div>
					<div className="col Lexend fw-bold">current biller</div>
					<div className="col Lexend fw-bold">action </div>
				</div>
				<div className="bg-white row mx-0">
					{currentItems?.map((item, index) => (
						<div key={index} className="row mx-0 p-3 border-bottom">
							<div className="col my-auto">{item?.name}</div>
							<div className="col my-auto text-uppercase">
								{item?.product?.name}
							</div>
							<div className="col my-auto text-uppercase">
								{item?.biller?.name}
							</div>
							<div className="col my-auto">
								<p
									className="text-primary text-capitalize ms-2 myCursor"
									onClick={() => {
										setSelect(item);
										toggle();
									}}>
									switch biller
								</p>
							</div>
						</div>
					))}
				</div>
				<MainPaginate handlePageClick={handlePageClick} pageCount={pageCount} />
			</div>
			<ModalComponents title="choose new biller" isOpen={isOpen} back={toggle}>
				<div className="downH2 d-flex">
					<form className="w-100">
						{select?.billerList?.map((item, i) => (
							<Buttons
								key={i}
								title={item?.name}
								css={`
									${newBiller === item?._id
										? "btn-primary1"
										: "btn-outline-primary1"} text-uppercase py-3 px-4 px-lg-5 mx-auto my-4
								`}
								width={"w-50 w50"}
								style={{ borderRadius: "30px" }}
								onClick={() => {
									setNewBiller(item?._id);
								}}
							/>
						))}
						<Buttons
							title={"switch"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
							width={"w-50 w50"}
							onClick={handleSubmit}
							loading={loading}
							style={{ borderRadius: "30px" }}
						/>
					</form>
				</div>
			</ModalComponents>
		</>
	);
};
