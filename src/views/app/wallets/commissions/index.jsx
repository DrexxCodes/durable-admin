import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "@/Data/Context";
import Container from "@/components/ui/Container";
import { BonusCommission } from "@/features/Wallets";
import { TransactionToppers } from "@/features/Transactions";
import { Buttons } from "@/Utils";
import { useNavigate } from "@/lib/router";

const Commissions = () => {
	let { setStateName } = useContext(GlobalState),
		[active, setActive] = useState(0),
		tabControl = ["My Commission history", "general commission history"],
		navigate = useNavigate();

	useEffect(() => {
		setStateName(tabControl[active]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active]);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-3 py-md-5">
				<div className="d-flex items-center justify-content-between">
					<h5 className="Lexend text-capitalize">{tabControl[active]}</h5>
					<Buttons
						title={"Commission stat"}
						css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
						width={"w-25 w25"}
						onClick={() => navigate(`/wallets/commissions/stat`)}
						style={{ borderRadius: "30px" }}
					/>
				</div>
				<TransactionToppers
					active={active}
					setActive={setActive}
					title={"commission"}
				/>
				<BonusCommission general={active === 1} />
			</Container>{" "}
		</div>
	);
};

export default Commissions;
