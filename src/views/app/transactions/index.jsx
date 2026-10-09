import React, { useState } from "react";
import Container from "@/components/ui/Container";
import TransactionsFolder, {
	TopFolder,
	TransactionToppers,
} from "@/features/Transactions";

const MainTransactions = () => {
	let [active, setActive] = useState(0),
		[subActive, setSubActive] = useState(0);
	return (
		<div className="bg-white">
			<Container>
				<TransactionToppers
					title={"transactions"}
					active={active}
					setActive={setActive}
				/>
				<TopFolder active={active} setSubActive={setSubActive} />
				{/* <Link
				to={`/transactions/add`}
				style={{ borderRadius: "30px" }}
				className="btn-primary1 text-capitalize py-3 px-4 px-lg-5 my-4 btn">
				Add new transaction
			</Link> */}
				<TransactionsFolder active={active} subActive={subActive} />
			</Container>
		</div>
	);
};

export default MainTransactions;
