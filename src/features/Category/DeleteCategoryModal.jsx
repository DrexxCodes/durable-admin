import React, { useContext, useState } from "react";
import { GlobalState } from "@/Data/Context";
import { ModalComponents } from "@/features";
import { Buttons } from "@/Utils";
import { formatCategoryName } from "./utils";

const DeleteCategoryModal = ({ back, datum }) => {
	const { manageCategory } = useContext(GlobalState);
	const [typed, setTyped] = useState("");
	const [loading, setLoading] = useState(false);

	// typing the name makes an accidental delete (which cascades) very unlikely
	const matches =
		!!typed.trim() &&
		formatCategoryName(typed) === formatCategoryName(datum?.name);

	const submit = async e => {
		e?.preventDefault();
		if (!matches) return;
		setLoading(true);
		const ok = await manageCategory(datum, datum?._id, "delete");
		setLoading(false);
		if (ok) back();
	};

	return (
		<ModalComponents title={"Delete category"} isOpen toggle={back}>
			<form onSubmit={submit}>
				<p className="Lexend">
					You are about to permanently delete{" "}
					<strong className="text-uppercase">{datum?.name}</strong>
					{datum?.product?.name ? (
						<> ({String(datum.product.name).toUpperCase()})</>
					) : null}
					.
				</p>
				<p className="fontReduce">
					This also removes everything under it: its plans, prices, cable and
					wallet packages. It cannot be undone. The delete is refused while any
					user still holds a data balance in this category. Disable it instead
					if you only want to hide it.
				</p>
				<div className="mb-4">
					<label htmlFor="confirmName">
						Type <strong className="text-uppercase">{datum?.name}</strong> to
						confirm
					</label>
					<input
						id="confirmName"
						type="text"
						autoFocus
						autoComplete="off"
						className="form-control py-3"
						value={typed}
						onChange={e => setTyped(e.target.value)}
						placeholder="Category name"
					/>
				</div>
				<div className="btn-group w-100">
					<Buttons
						title={"cancel"}
						css="btn-outline-primary1 text-capitalize py-3"
						width={"w-50"}
						onClick={back}
					/>
					<Buttons
						type="submit"
						title={"delete"}
						css="btn-danger2 text-capitalize py-3"
						width={"w-50"}
						loading={loading}
						disabled={!matches}
					/>
				</div>
			</form>
		</ModalComponents>
	);
};

export default DeleteCategoryModal;
