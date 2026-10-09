import React, { useContext } from "react";
import moment from "moment";
import { GlobalState } from "@/Data/Context";
import { Buttons } from "@/Utils";
import { usePocketfiBalance } from "@/hooks/usePocketfiBalance";

/** Pocketfi wallet balance card, shown next to the Pocketfi visibility control in Settings. */
const PocketfiBalance = () => {
	const { numberWithCommas, nairaSign } = useContext(GlobalState);
	const { balance, loading, error, fetchedAt, refresh } = usePocketfiBalance();

	return (
		<div className="mb-3 d-flex justify-content-center col-md-6">
			<div className="w-75 w75">
				<label className="mb-3 textColor2 text-capitalize fontReduce">
					Pocketfi balance
				</label>
				<div className="form-control w-100 py-3 borderColor">
					{balance === null ? (
						<span className="text-muted">Not checked yet</span>
					) : (
						<span className="fw-bold">
							{nairaSign} {numberWithCommas(balance)}
						</span>
					)}
				</div>
				{error && <p className="text-danger2 fontReduce mt-2 mb-0">{error}</p>}
				{fetchedAt && !error && (
					<p className="text-muted fontReduce mt-2 mb-0">
						Updated {moment(fetchedAt).format("hh:mm:ss A")}
					</p>
				)}
				<Buttons
					loading={loading}
					title={balance === null ? "check balance" : "refresh balance"}
					css="btn btn-primary1 text-capitalize py-3 w-75 w75 d-block mx-auto my-4"
					width={"w-75 w75"}
					onClick={refresh}
				/>
			</div>
		</div>
	);
};

export default PocketfiBalance;
