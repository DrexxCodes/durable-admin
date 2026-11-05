import React, { useContext, useState } from "react";
import { BiPlusCircle, BiTrashAlt } from "react-icons/bi";
import { BsPen } from "react-icons/bs";
import { HiThumbDown, HiThumbUp } from "react-icons/hi";
import { ClipLoader } from "react-spinners";
import { GlobalState } from "@/Data/Context";
import { BTN_BASE } from "./constants";

const CELL =
	"col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0";

const Label = ({ children }) => (
	<span className="fontReduce d-md-none Lexend">{children}</span>
);

const CategoryRow = ({ item, serial, onAddBiller, onEdit, onDelete }) => {
	const { manageCategory } = useContext(GlobalState);
	const [toggling, setToggling] = useState(false);
	const enabled = item?.enabler === "enable";

	// only the changed field is sent (the old code posted the whole populated row)
	const toggle = async () => {
		setToggling(true);
		await manageCategory(
			{ enabler: enabled ? "disable" : "enable" },
			item?._id,
			"edit"
		);
		setToggling(false);
	};

	return (
		<div className="d-block d-md-flex row mx-0 py-3 px-0 border-bottom">
			<div className="col textTrunc my-auto d-none d-md-flex">{serial}</div>
			<div className={CELL}>
				<Label>Name:</Label>
				<span className="text-uppercase">{item?.name}</span>
			</div>
			<div className={CELL}>
				<Label>Product:</Label>
				<span className="text-uppercase">{item?.product?.name}</span>
			</div>
			<div className={CELL}>
				<Label>Biller:</Label>
				<span className="text-uppercase">{item?.biller?.name}</span>
			</div>
			<div className={CELL}>
				<Label>Biller list:</Label>
				<span className="text-uppercase">
					{item?.billerList?.map((list, a) => (
						<span className="d-block text-uppercase" key={list?._id || a}>
							{list?.name}
							{a === item.billerList.length - 1 ? "" : ","}
						</span>
					))}
				</span>
			</div>
			<div className={CELL} onClick={() => onAddBiller(item)}>
				<Label>No of biller:</Label>
				<div className="d-flex align-items-center">
					{item?.billerList?.length}
					<BiPlusCircle className="text-success ms-1" />
				</div>
			</div>
			<div
				className={`${CELL} ${
					enabled ? "text-success text-success2" : "text-danger text-danger2"
				}`}>
				<Label>Status:</Label>
				{item?.enabler}d
			</div>
			<div className="col textTrunc my-auto btn-group">
				<button
					title={`${enabled ? "Disable" : "Enable"} category`}
					onClick={toggle}
					disabled={toggling}
					className={`${BTN_BASE} btn-primary1`}>
					{toggling ? (
						<ClipLoader color="white" size={16} />
					) : enabled ? (
						<HiThumbDown />
					) : (
						<HiThumbUp />
					)}
				</button>
				<button
					title="Edit category"
					onClick={() => onEdit(item)}
					className={`${BTN_BASE} btn-success2`}>
					<BsPen />
				</button>
				<button
					title="Delete category"
					onClick={() => onDelete(item)}
					className={`${BTN_BASE} btn-danger2`}>
					<BiTrashAlt />
				</button>
			</div>
		</div>
	);
};

export default React.memo(CategoryRow);
