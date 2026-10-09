import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "@/Data/Context";
import Container from "@/components/ui/Container";
import { Buttons } from "@/Utils";
import { AddNewFaq } from "@/views/app/faqs";
import { DeleteModal, PrivacyTermsTable } from "@/views/app/settings/app/privacy";

const TermsCondition = () => {
	let { setStateName, faqs, manageFaqs, auth } = useContext(GlobalState),
		[isOpen, setIsOpen] = useState(false),
		[datum, setDatum] = useState(null),
		toggle = () => {
			if (isOpen) if (datum) setDatum(false);
			setIsOpen(!isOpen);
		},
		[state, setState] = useState(null);

	useEffect(() => {
		if (datum?.type === "update") setIsOpen(true);
	}, [datum]);

	useEffect(() => {
		setState(faqs?.terms);
	}, [faqs?.terms]);

	useEffect(() => {
		setStateName("Manage Terms and Conditions");
		manageFaqs("get", null, "terms");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!state) return;

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				{auth?.user?.isAdmin && (
					<Buttons
						title={"add new Terms and Condition"}
						css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
						width={"w-25 w25"}
						onClick={toggle}
						style={{ borderRadius: "30px" }}
					/>
				)}
				<PrivacyTermsTable state={state} setDatum={setDatum} />
			</Container>
			<AddNewFaq
				isOpen={isOpen}
				toggle={toggle}
				datum={datum?.data}
				type={"terms"}
			/>
			<DeleteModal
				setDatum={setDatum}
				type="faqs"
				name="terms and conditions"
				state={datum?.data}
				isOpen={datum?.type === "delete"}
			/>
		</div>
	);
};

export default TermsCondition;
