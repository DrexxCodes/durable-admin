import React from "react";

/** Grid of selectable cards used for the product / biller pickers. */
const OptionGrid = ({ options = [], selected, onSelect, disabledIds = [] }) => (
	<div className="row mx-0 g-3 g-md-4">
		{options.map(item => {
			const disabled = disabledIds.includes(item?._id);
			return (
				<div className="col-6 col-md-4 p-2" key={item?._id}>
					<button
						type="button"
						disabled={disabled}
						onClick={() => onSelect(item?._id)}
						className={`btn ${
							item?._id === selected ? "btn-primary1" : "btn-outline-primary1"
						} w-100 h-100 text-uppercase py-3 py-md-5 rounded20`}>
						{item?.name}
					</button>
				</div>
			);
		})}
	</div>
);

export default OptionGrid;
