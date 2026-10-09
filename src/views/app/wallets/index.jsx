import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "@/lib/router";
import Container from "@/components/ui/Container";
import { GlobalState } from "@/Data/Context";
import { MakeWallet } from "@/views/app/wallets/manual";

const ManageWallet = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("Manage Wallet");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let navigate = useNavigate(),
		params = useParams(),
		controlsTab = [
			{
				name: "my wallet",
				type: "link",
				link: `/${params?.page}/my-wallet`,
				color: "var(--tile)",
				textColor: "white",
			},
			{
				name: "general wallet details",
				type: "link",
				link: `/${params?.page}/manage-wallet`,
				color: "var(--tile)",
				textColor: "white",
			},
			{
				name: "Wallet provider stat",
				type: "link",
				link: `/${params?.page}/provider`,
				color: "var(--tile)",
			},
			{
				name: "general transaction stat",
				type: "link",
				link: `/${params?.page}/manage-transactions`,
				color: "var(--tile)",
				textColor: "white",
			},
			{
				name: "manage transaction stat",
				type: "link",
				link: `/${params?.page}/find-transactions`,
				color:
					"var(--tile)",
			},
			{
				name: "Data profit",
				type: "link",
				link: `/${params?.page}/bonus-data`,
				color:
					"var(--tile)",
				textColor: "white",
			},
			{
				name: "give bonus",
				type: "link",
				link: `/${params?.page}/give-bonus`,
				color: "var(--tile)",
				textColor: "white",
			},
			{
				name: "manual top up",
				type: "link",
				link: `/${params?.page}/manual`,
				color: "var(--tile)",
				textColor: "white",
			},
			// {
			// 	name: "manage bills plans",
			// 	type: "link",
			// 	link: `/${params?.page}/electricity`,
			// 	color: "var(--tile)",
			// },
			// {
			// 	name: "manage broadcast",
			// 	type: "link",
			// 	link: `/${params?.page}/broadcasts`,
			// 	color:
			// 		"var(--tile)",
			// },
			// {
			// 	name: "manual top up",
			// 	type: "link",
			// 	link: `/${params?.page}/manual`,
			// 	color: "var(--tile)",
			// 	textColor: "white",
			// },

			// {
			// 	name: "give bonus",
			// 	type: "link",
			// 	link: `/${params?.page}/bonus`,
			// 	color: "var(--tile)",
			// 	textColor: "white",
			// },
			{
				textColor: "white",
				name: "direct debit",
				type: "button",
				link: `debit`,
				color: "var(--tile)",
			},
			{
				type: "link",
				name: "Wallet funding",
				link: `/${params?.page}/wallet-funding`,
				color: "var(--tile)",
			},
		],
		[isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		};

	return (
		<div className="bg-white aboutScreen">
			<Container>
				<div className="row mx-0 g-2 g-md-4 py-4 py-md-5">
					{controlsTab?.map((item, i) => (
						<div className="col-6 col-md-4 productCard" key={i}>
							<span
								onClick={() => {
									if (item?.type === "link") {
										navigate(item?.link);
									} else if (item?.type === "button") {
										if (item?.link === "debit") toggle();
									}
								}}
								className="d-flex align-items-center justify-content-center text2 myCursor text-decoration-none h-100 eachProduct fontReduceBig textTrunc p-2 p-md-0 py-3 py-md-0 h-100"
								style={{
									background: item?.color,
									borderRadius: "30px",
									color: item?.textColor ? item?.textColor : "#000",
								}}>
								<span className="textTrunc fontInherit">{item?.name}</span>
							</span>
						</div>
					))}
				</div>
			</Container>
			<MakeWallet isOpen={isOpen} back={toggle} debit />
		</div>
	);
};

export default ManageWallet;
