import React, { useContext, useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { GlobalState } from "@/Data/Context";
import { Buttons } from "@/Utils";
import {
	AdminDetails,
	MakeAdmin,
	PrivilegeTopper,
} from "@/features/Users";

const Marketer = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("Manage Marketers");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		};

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-3">
				<PrivilegeTopper privilege={"marketer"} />
			</Container>
			<Container className="py-5">
				<h4>Marketers</h4>{" "}
				<div className="btn-group">
					<Buttons
						title={"add new"}
						css="btn-primary1 text-capitalize py-md-3 py-2 px-4 px-lg-5 my-md-4 my-2 mb-0"
						width={"w-auto"}
						onClick={toggle}
						style={{ borderRadius: "30px" }}
					/>
				</div>
				<AdminDetails privilege="marketer" />
			</Container>{" "}
			<MakeAdmin isOpen={isOpen} back={toggle} privilege="marketer" />
		</div>
	);
};

export default Marketer;
