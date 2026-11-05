import React, { useContext, useMemo, useState } from "react";
import { GlobalState } from "@/Data/Context";
import { ModalComponents } from "@/features";
import { Buttons } from "@/Utils";
import OptionGrid from "./OptionGrid";

/** Adds one more biller to a category's biller list. */
const AddBillerModal = ({ back, datum }) => {
	const { biller, manageCategory } = useContext(GlobalState);
	const [selected, setSelected] = useState("");
	const [loading, setLoading] = useState(false);

	const showInhouse = datum?.product?.name === "education";
	const listed = useMemo(
		() => (datum?.billerList || []).map(b => b?._id || b),
		[datum?.billerList]
	);
	const billers = useMemo(
		() =>
			biller?.data?.filter(item =>
				showInhouse ? true : !item?.billerId?.includes("inhouse")
			),
		[biller?.data, showInhouse]
	);

	const submit = async () => {
		if (!selected) return;
		setLoading(true);
		const ok = await manageCategory(
			{ biller: selected },
			`${datum?._id}/biller`,
			"edit"
		);
		setLoading(false);
		if (ok) back();
	};

	return (
		<ModalComponents title={"Add category biller"} isOpen toggle={back}>
			<h3 className="Lexend">Select Biller</h3>
			{/* billers already on the list are greyed out: the API rejects duplicates */}
			<OptionGrid
				options={billers}
				selected={selected}
				onSelect={setSelected}
				disabledIds={listed}
			/>
			<Buttons
				title={"add"}
				css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
				width={"w-50 w50"}
				onClick={submit}
				loading={loading}
				disabled={!selected}
			/>
		</ModalComponents>
	);
};

export default AddBillerModal;
