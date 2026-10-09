import React from "react";
import { Buttons } from "@/Utils";
import { POCKETFI_BANK_OPTIONS } from "@/constants/pocketfi";

/**
 * Switch individual Pocketfi banks on/off for users.
 * `disabled` is the list of bank values that are OFF (matches `pocketfiBanksDisabled` in the DB).
 */
const PocketfiBanks = ({
	disabled,
	setDisabled,
	type,
	loading,
	loadingType,
	handleSubmit,
}) => {
	const off = disabled || [];

	const toggle = value =>
		setDisabled(
			off.includes(value) ? off.filter(it => it !== value) : [...off, value]
		);

	return (
		<div className="mb-3 d-flex justify-content-center col-md-6">
			<div className="w-75 w75">
				<label className="mb-3 textColor2 text-capitalize fontReduce">
					Pocketfi banks
				</label>
				<div className="form-control w-100 py-3 borderColor">
					{POCKETFI_BANK_OPTIONS.map(bank => (
						<div className="form-check form-switch my-2" key={bank.value}>
							<input
								className="form-check-input"
								type="checkbox"
								role="switch"
								id={`pocketfi-bank-${bank.value}`}
								checked={!off.includes(bank.value)}
								onChange={() => toggle(bank.value)}
							/>
							<label
								className="form-check-label"
								htmlFor={`pocketfi-bank-${bank.value}`}>
								{bank.label}
							</label>
						</div>
					))}
				</div>
				<Buttons
					loading={loadingType === type && loading}
					title="update"
					css="btn btn-primary1 text-capitalize py-3 w-75 w75 d-block mx-auto my-4"
					width={"w-75 w75"}
					onClick={handleSubmit(type)}
				/>
			</div>
		</div>
	);
};

export default PocketfiBanks;
