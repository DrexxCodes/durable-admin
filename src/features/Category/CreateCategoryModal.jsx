import React, { useContext, useMemo, useState } from "react";
import { GlobalState } from "@/Data/Context";
import { ModalComponents } from "@/features";
import { Buttons } from "@/Utils";
import OptionGrid from "./OptionGrid";

const STEP = { PRODUCT: 0, BILLER: 1, NAME: 2 };
const NAV = "btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4";

const CreateCategoryModal = ({ back }) => {
	const { products, biller, manageCategory } = useContext(GlobalState);
	const [step, setStep] = useState(STEP.PRODUCT);
	const [data, setData] = useState({ product: "", biller: "", name: "" });
	const [loading, setLoading] = useState(false);

	const showInhouse = useMemo(
		() => products?.data?.find(p => p?._id === data.product)?.name === "education",
		[products?.data, data.product]
	);
	const billers = useMemo(
		() =>
			biller?.data?.filter(item =>
				showInhouse ? true : !item?.billerId?.includes("inhouse")
			),
		[biller?.data, showInhouse]
	);

	const submit = async e => {
		e?.preventDefault();
		if (!data.name.trim()) return;
		setLoading(true);
		const ok = await manageCategory({ ...data, name: data.name.trim() });
		setLoading(false);
		if (ok) back();
	};

	return (
		<ModalComponents title={"Add category process"} isOpen toggle={back}>
			{step === STEP.PRODUCT && (
				<>
					<h3 className="Lexend">Select Product</h3>
					<OptionGrid
						options={products?.data}
						selected={data.product}
						onSelect={product => setData({ ...data, product })}
					/>
					<Buttons
						title={"next"}
						css={NAV}
						width={"w-50 w50"}
						disabled={!data.product}
						onClick={() => setStep(STEP.BILLER)}
					/>
				</>
			)}
			{step === STEP.BILLER && (
				<>
					<h3 className="Lexend">Select Biller</h3>
					<OptionGrid
						options={billers}
						selected={data.biller}
						onSelect={b => setData({ ...data, biller: b })}
					/>
					<div className="mx-auto d-block w-50">
						<div className="btn-group">
							<Buttons
								title={"prev"}
								css={NAV}
								width={"w-50 w50"}
								onClick={() => setStep(STEP.PRODUCT)}
							/>
							<Buttons
								title={"next"}
								css={NAV}
								width={"w-50 w50"}
								onClick={() => setStep(STEP.NAME)}
							/>
						</div>
					</div>
				</>
			)}
			{step === STEP.NAME && (
				<form onSubmit={submit}>
					<div className="mb-4">
						<label htmlFor="newCategoryName">Category name</label>
						<input
							id="newCategoryName"
							type="text"
							autoFocus
							className="form-control py-3"
							value={data.name}
							onChange={e => setData({ ...data, name: e.target.value })}
							placeholder="Category name"
						/>
					</div>
					<div className="mx-auto d-block w-50">
						<div className="btn-group">
							<Buttons
								title={"prev"}
								css={NAV}
								width={"w-50 w50"}
								onClick={() => setStep(STEP.BILLER)}
							/>
							<Buttons
								type="submit"
								title={"create"}
								css={NAV}
								width={"w-50 w50"}
								loading={loading}
								disabled={!data.name.trim()}
							/>
						</div>
					</div>
				</form>
			)}
		</ModalComponents>
	);
};

export default CreateCategoryModal;
