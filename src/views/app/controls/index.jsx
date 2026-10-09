import React, { useEffect, useContext } from "react";
import { useNavigate, useParams } from "@/lib/router";
import Container from "@/components/ui/Container";
import { GlobalState } from "@/Data/Context";

const Controls = () => {
	let {
		setStateName,
		//  getBillerData
	} = useContext(GlobalState);
	useEffect(() => {
		setStateName("Controls");
		// getBillerData("vtpass");
		// if (
		// 	![
		// 		"Moztelecom",
		// 		"Moavox Pay",
		// 		"Vickybest Telecom",
		// 		"V12 Pay",
		// 		"Fantastic Fisayo",
		// 		"Mel Data Services",
		// 		"Yema Telecommunications",
		// 		"SPRINT DATA",
		// 		"Vee's Telecom",
		// 		"Bliz",
		// 		"Allbrite Digitals",
		// 		"Noney Data Plug",
		// 		"Rosezee Telecom",
		// 		"Durable Telecommunications",
		// 		"MySub",
		// 		"M.O Data Plug",
		// 		"ALLAHU LATEEF INTEGRATED SERVICES LIMITED",
		// 	]?.includes(process.env.REACT_APP_NAME)
		// ) {
		// 	getBillerData("honourworld");
		// }
		// if (
		// 	![
		// 		"Vickybest Telecom",
		// 		"Fantastic Fisayo",
		// 		"Mel Data Services",
		// 		"Yema Telecommunications",
		// 		"SPRINT DATA",
		// 		"Vee's Telecom",
		// 		"Bliz",
		// 		"Allbrite Digitals",
		// 		"Noney Data Plug",
		// 		"Rosezee Telecom",
		// 		"Durable Telecommunications",
		// 		"MySub",
		// 		"M.O Data Plug",
		// 		"ALLAHU LATEEF INTEGRATED SERVICES LIMITED",
		// 	]?.includes(process.env.REACT_APP_NAME)
		// ) {
		// 	getBillerData("datastation");
		// }
		// if (
		// 	["Fantastic Fisayo", "Teetop Digital"]?.includes(
		// 		process.env.REACT_APP_NAME
		// 	)
		// ) {
		// 	getBillerData("clubkonnect");
		// }
		// if (
		// 	["Teetop Digital", "Kemtech Enterprises"]?.includes(
		// 		process.env.REACT_APP_NAME
		// 	)
		// ) {
		// 	getBillerData("husmo");
		// 	if (["Teetop Digital"]?.includes(process.env.REACT_APP_NAME))
		// 		getBillerData("rossytechs");
		// }
		// if (
		// 	[
		// 		"Vickybest Telecom",
		// 		// "V12 Pay",
		// 		"Fantastic Fisayo",
		// 		"Moztelecom",
		// 		"Moavox Pay",
		// 		"Mel Data Services",
		// 		"Yema Telecommunications",
		// 		"SPRINT DATA",
		// 		"Bliz",
		// 		"Vee's Telecom",
		// 		"Allbrite Digitals",
		// 		"Noney Data Plug",
		// 		"Rosezee Telecom",
		// 		"Durable Telecommunications",
		// 		"MySub",
		// 		"M.O Data Plug",
		// 		"ALLAHU LATEEF INTEGRATED SERVICES LIMITED",
		// 	]?.includes(process.env.REACT_APP_NAME)
		// ) {
		// 	getBillerData("teetop");
		// }
		// if (["Vickybest Telecom"]?.includes(process.env.REACT_APP_NAME)) {
		// 	getBillerData("datamesolution");
		// }
		// if (["SPRINT DATA"]?.includes(process.env.REACT_APP_NAME)) {
		// 	getBillerData("maskawasub");
		// }
		// if (["Vee's Telecom"]?.includes(process.env.REACT_APP_NAME)) {
		// 	getBillerData("vickybest");
		// }
		// if (
		// 	["Kemtech Enterprises", "V12 Pay"]?.includes(process.env.REACT_APP_NAME)
		// ) {
		// 	getBillerData("moavoxpay");
		// }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let navigate = useNavigate(),
		params = useParams(),
		controlsTab = [
			{
				name: "manage biller",
				type: "link",
				link: `/${params?.page}/biller`,
				color: "var(--tile)",
				textColor: "white",
				show: true,
			},
			{
				name: "manage network",
				type: "link",
				link: `/${params?.page}/network`,
				color: "var(--tile)",
				show: true,
			},
			{
				textColor: "white",
				name: "manage products",
				type: "link",
				link: `/${params?.page}/manage-products`,
				color: "var(--tile)",
				show: true,
			},
			{
				name: "manage category",
				type: "link",
				link: `/${params?.page}/category`,
				color: "var(--tile)",
				textColor: "white",
				show: true,
			},
			{
				name: "manage data plans",
				type: "link",
				link: `/${params?.page}/data`,
				color:
					"var(--tile)",
				show: true,
			},
			{
				name: "manage cables subscription",
				type: "link",
				link: `/${params?.page}/cables`,
				color: "var(--tile)",
				textColor: "white",
				show: true,
			},
			{
				name: "manage bills plans",
				type: "link",
				link: `/${params?.page}/electricity`,
				color: "var(--tile)",
				show: true,
			},
			{
				name: "manage education",
				type: "link",
				link: `/${params?.page}/education`,
				color:
					"var(--tile)",
				show: true,
			},
			{
				name: "manage CG Wallet",
				type: "link",
				link: `/${params?.page}/manage-cgwallet`,
				color: "var(--tile)",
				show: ["Teetop Digital", "Kemtech Enterprises"]?.includes(
					process.env.REACT_APP_NAME
				),
			},
			{
				name: "manage CG Wallet History",
				type: "link",
				link: `/${params?.page}/manage-cgwallet-history`,
				color: "var(--tile)",
				textColor: "white",
				show: ["Teetop Digital", "Kemtech Enterprises"]?.includes(
					process.env.REACT_APP_NAME
				),
			},
			{
				name: "manage blacklist",
				type: "link",
				link: `/${params?.page}/blacklist`,
				color: "var(--tile)",
				textColor: "white",
				show: true,
			},
		];

	return (
		<div className="bg-white aboutScreen">
			<Container>
				<div className="row mx-0 g-2 g-md-4 py-4 py-md-5">
					{controlsTab
						?.filter(it => it?.show)
						?.map((item, i) => (
							<div className="col-6 col-md-4 productCard" key={i}>
								<span
									onClick={() => {
										if (item?.type === "link") {
											navigate(item?.link);
										} else if (item?.type === "button") {
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
		</div>
	);
};

export default Controls;
