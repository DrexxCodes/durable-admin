import React, { useContext, useState } from "react";
import { GlobalState } from "@/Data/Context";
import { ModalComponents } from "@/features";
import { Buttons } from "@/Utils";
import { formatCategoryName } from "./utils";

const EditCategoryModal = ({ back, datum }) => {
	const { manageCategory } = useContext(GlobalState);
	const [form, setForm] = useState({
		name: datum?.name || "",
		enabler: datum?.enabler || "enable",
	});
	const [loading, setLoading] = useState(false);

	const cleanName = formatCategoryName(form.name);
	const changed =
		cleanName !== formatCategoryName(datum?.name) ||
		form.enabler !== datum?.enabler;

	const submit = async e => {
		e?.preventDefault();
		if (!cleanName || !changed) return;
		setLoading(true);
		const ok = await manageCategory(
			{ name: cleanName, enabler: form.enabler },
			datum?._id,
			"edit"
		);
		setLoading(false);
		if (ok) back();
	};

	return (
		<ModalComponents
			title={`Update category ${datum?.name}`}
			isOpen
			toggle={back}>
			<form onSubmit={submit}>
				<div className="mb-4">
					<label htmlFor="categoryName">Category name</label>
					<input
						id="categoryName"
						type="text"
						autoFocus
						className="form-control py-3"
						value={form.name}
						onChange={e => setForm({ ...form, name: e.target.value })}
						placeholder="Category name"
					/>
					<small className="d-block mt-2 opacity-75">
						Saved as: <strong>{cleanName || "-"}</strong>. Renaming only changes
						the display name; the internal category ID used for purchases and
						transaction history stays the same.
					</small>
				</div>
				<div className="mb-4">
					<label htmlFor="categoryStatus">Status</label>
					<select
						id="categoryStatus"
						className="form-control py-3"
						value={form.enabler}
						onChange={e => setForm({ ...form, enabler: e.target.value })}>
						<option value="enable">Enabled</option>
						<option value="disable">Disabled</option>
					</select>
				</div>
				<Buttons
					type="submit"
					title={"update"}
					css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
					width={"w-50 w50"}
					loading={loading}
					disabled={!cleanName || !changed}
				/>
			</form>
		</ModalComponents>
	);
};

export default EditCategoryModal;
