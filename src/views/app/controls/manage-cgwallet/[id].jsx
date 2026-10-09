import React, { useState, useEffect, useContext } from "react";
import Container from "@/components/ui/Container";
import { Buttons } from "@/Utils";
import { CgWalletDetails, MakeCgWallet } from "@/views/app/controls/manage-cgwallet";
import { useNavigate, useParams } from "@/lib/router";
import { GlobalState } from "@/Data/Context";

const ManageCG = () => {
	let [isOpenInit, setIsOpenInit] = useState(false),
		toggleInit = () => {
			if (isOpenInit) if (data) setData(null);
			setIsOpenInit(!isOpenInit);
		},
		[data, setData] = useState(null),
		{ step } = useParams(),
		navigate = useNavigate(),
		{ auth, permission } = useContext(GlobalState);

	useEffect(() => {
		if (auth?.user?.privilege !== "superadmin") {
			let findTitle = "viewcgwallet";

			let findPermit = permission?.data?.find(
				item =>
					item?.slug === findTitle && item?.user?.includes(auth?.user?._id)
			);
			if (!findPermit) {
				navigate(-1);
			}
		}
	}, [auth?.user, permission?.data, navigate]);

	useEffect(() => {
		if (data) setIsOpenInit(true);
	}, [data]);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<h4 className="Lexend text-capitalize">
					All {step && step?.toUpperCase()} CG Plans
				</h4>{" "}
				<div className="btn-group">
					<Buttons
						title={"create new"}
						css="btn-primary1 text-capitalize py-md-3 py-2 px-4 px-lg-5 my-md-4 my-2 mb-0"
						width={"w-auto"}
						onClick={toggleInit}
						style={{ borderRadius: "30px" }}
					/>
				</div>
				<CgWalletDetails setData={setData} />
			</Container>{" "}
			<MakeCgWallet isOpen={isOpenInit} back={toggleInit} datum={data} />
		</div>
	);
};

export default ManageCG;
