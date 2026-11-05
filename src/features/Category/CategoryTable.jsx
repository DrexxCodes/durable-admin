import React, { useContext, useEffect, useMemo, useState } from "react";
import { GlobalState } from "@/Data/Context";
import { EmptyComponent } from "@/Utils";
import { MainPaginate, MainRanger } from "@/features/Transactions";
import CategoryRow from "./CategoryRow";
import { CATEGORY_COLUMNS } from "./constants";

const CategoryTable = ({ onAddBiller, onEdit, onDelete }) => {
	const { category } = useContext(GlobalState);
	const list = useMemo(
		() => (category?.isFound ? category?.mainSearch : category?.data),
		[category?.isFound, category?.mainSearch, category?.data]
	);

	const [range, setRange] = useState(10);
	const [offset, setOffset] = useState(0);
	const total = list?.length || 0;

	// after a delete / filter the current page can disappear: step back to the last real page
	useEffect(() => {
		if (offset > 0 && offset >= total) {
			setOffset(Math.max(0, (Math.ceil(total / range) - 1) * range));
		}
	}, [total, range, offset]);

	if (!list) return null;

	const items = list.slice(offset, offset + range);

	return (
		<div className="py-5">
			<MainRanger
				range={range}
				setRange={value => {
					setRange(value);
					setOffset(0);
				}}
			/>
			<div className="bland row mx-0 py-3 px-0 text-capitalize Lexend fw-bold d-none d-md-flex">
				{CATEGORY_COLUMNS.map(col => (
					<div className="col textTrunc Lexend" key={col}>
						{col}
					</div>
				))}
			</div>
			<div className="bg-white row mx-0">
				{items.length === 0 ? (
					<EmptyComponent subtitle={"Category state empty"} />
				) : (
					items.map((item, index) => (
						<CategoryRow
							key={item?._id}
							item={item}
							serial={offset + index + 1}
							onAddBiller={onAddBiller}
							onEdit={onEdit}
							onDelete={onDelete}
						/>
					))
				)}
			</div>
			<MainPaginate
				handlePageClick={e => setOffset((e.selected * range) % (total || 1))}
				pageCount={Math.ceil(total / range)}
			/>
		</div>
	);
};

export default CategoryTable;
