import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "@/lib/router";
import Container from "@/components/ui/Container";
import { AddNewFund, BillerFundingHistory } from "@/views/app/inventory";
import { GlobalState } from "@/Data/Context";
import { Buttons } from "@/Utils";

const BillerInventory = () => {
	let { setStateName, auth, permission } = useContext(GlobalState),
		{ id } = useParams();

	useEffect(() => {
		setStateName(`${id} inventory`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	let [isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		},
		navigate = useNavigate();

	useEffect(() => {
		if (auth?.user?.privilege !== "superadmin") {
			let findTitle = "viewinventory";

			let findPermit = permission?.data?.find(
				item =>
					item?.slug === findTitle && item?.user?.includes(auth?.user?._id)
			);
			if (!findPermit) {
				navigate(-1);
			}
		}
	}, [auth?.user, permission?.data, navigate]);
	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<Buttons
					title={"add funding"}
					css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
					width={"w-25 w25"}
					onClick={toggle}
					style={{ borderRadius: "30px" }}
				/>
				<BillerFundingHistory />
			</Container>
			<AddNewFund isOpen={isOpen} toggle={toggle} />
		</div>
	);
};

export default BillerInventory;
