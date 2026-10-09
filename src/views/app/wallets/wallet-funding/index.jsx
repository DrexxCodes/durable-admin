import React, { useEffect, useContext } from "react";
import { useNavigate, useParams } from "@/lib/router";
import Container from "@/components/ui/Container";
import { GlobalState } from "@/Data/Context";

const ManageWallet = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("Manage Provider Funding");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let navigate = useNavigate(),
		params = useParams(),
		controlsTab = [
			{
				name: "Monnify",
				type: "link",
				link: `/${params?.page}/${params?.id}/monnify`,
				color: "var(--tile)",
				textColor: "white",
			},
			{
				name: "Flutterwave",
				type: "link",
				link: `/${params?.page}/${params?.id}/flutterwave`,
				color: "var(--tile)",
				// textColor: "white",
			},
			{
				name: "Paystack",
				type: "link",
				link: `/${params?.page}/${params?.id}/paystack`,
				color:
					"var(--tile)",
			},
			{
				name: "Manual",
				type: "link",
				link: `/${params?.page}/${params?.id}/manual`,
				color: "var(--tile)",
				textColor: "white",
			},
			["Kemtech Enterprises"]?.includes(process.env.REACT_APP_NAME)
				? {
						name: "Budpay",
						type: "link",
						link: `/${params?.page}/${params?.id}/budpay`,
						color: "var(--tile)",
						url: "https://merchant.budpay.com/assets/front/img/BudPay-Logo3.png",
						textColor: "white",
				  }
				: null,
			["Durable Telecommunications"]?.includes(process.env.REACT_APP_NAME)
				? {
						name: "Payvessel",
						type: "link",
						link: `/${params?.page}/${params?.id}/payvessel`,
						color:
							"var(--tile)",
						textColor: "white",
				  }
				: null,
			["Vickybest Telecom", "Durable Telecommunications"]?.includes(
				process.env.REACT_APP_NAME
			)
				? {
						name: "BillStack",
						type: "link",
						link: `/${params?.page}/${params?.id}/billstack`,
						color: "var(--tile)",
						textColor: "white",
				  }
				: null,
			["Vickybest Telecom", "Kemtech Enterprises"]?.includes(
				process.env.REACT_APP_NAME
			)
				? {
						name: "Palmpay",
						type: "link",
						link: `/${params?.page}/${params?.id}/palmpay`,
						// color:
						// 	"var(--tile)",
						textColor: "white",
						color: "var(--tile)",
				  }
				: null,
			// {
			// 	name: "Data profit",
			// 	type: "link",
			// 	link: `/${params?.page}/${params?.id}/bonus-data`,
			// 	color:
			// 		"var(--tile)",
			// 	textColor: "white",
			// },
			// {
			// 	name: "give bonus",
			// 	type: "link",
			// 	link: `/${params?.page}/${params?.id}/give-bonus`,
			// 	color: "var(--tile)",
			// 	textColor: "white",
			// },
			// {
			// 	name: "manual top up",
			// 	type: "link",
			// 	link: `/${params?.page}/${params?.id}/manual`,
			// 	color: "var(--tile)",
			// 	textColor: "white",
			// },
			// {
			// 	textColor: "white",
			// 	name: "direct debit",
			// 	type: "button",
			// 	link: `debit`,
			// 	color: "var(--tile)",
			// },
			// {
			// 	name: "Wallet funding",
			// 	type: "link",
			// 	link: `/${params?.page}/${params?.id}/wallet-funding`,
			// 	color: "var(--tile)",
			// },
		];

	return (
		<div className="bg-white aboutScreen">
			<Container>
				<div className="row mx-0 g-2 g-md-4 py-4 py-md-5">
					{controlsTab
						?.filter(e => e)
						?.map((item, i) => (
							<div className="col-6 col-md-4 productCard" key={i}>
								<span
									onClick={() => {
										if (item?.type === "link") {
											navigate(item?.link);
										}
									}}
									className="d-flex align-items-center justify-content-center text2 myCursor text-decoration-none h-100 eachProduct fontReduceBig textTrunc p-2 p-md-0 py-3 py-md-0 h-100"
									style={{
										background: item?.color,
										borderRadius: "30px",
										color: item?.textColor|| "#000",
									}}>
									<span className="textTrunc fontInherit">{item?.name}</span>
								</span>
							</div>
						))}
				</div>
			</Container>
		</div>
	);
};

export default ManageWallet;
