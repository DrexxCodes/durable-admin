import React, { useContext, useEffect, useState } from "react";
import { Link } from "@/lib/router";
import Container from "@/components/ui/Container";
import { useParams } from "@/lib/router";
import { GlobalState } from "@/Data/Context";
import {
	BsPhone,
	BsTelephoneFill,
	BsPlugFill,
	BsWallet2,
	BsShieldCheck,
	// BsShieldCheck,
} from "react-icons/bs";
import { FaGraduationCap, FaMailBulk } from "react-icons/fa";
import { IoTvSharp } from "react-icons/io5";
import { AiOutlineSwap } from "react-icons/ai";
import { SiCoderwall } from "react-icons/si";
// import { GiRecycle } from "react-icons/gi";

export let productArr = [
	{
		name: "Airtime",
		link: "/airtime",
		color: "var(--tile)",
		textColor: "#ffffff",
		icon: <BsTelephoneFill className="iconDash tw-text-[#0ea5e9]" />,
		show: true,
	},
	{
		name: "Airtime to Cash",
		link: "/converter",
		color: "var(--tile)",
		textColor: "white",
		icon: <AiOutlineSwap className="iconDash tw-text-[#8b5cf6]" />,
		show: true,
	},
	{
		name: "Data",
		link: "/data",
		color: "var(--tile)",
		textColor: "white",
		icon: <BsPhone className="iconDash tw-text-[#2563eb]" />,
		show: true,
	},
	{
		name: "Electricity bills",
		link: "/electricity-bills",
		color: "var(--tile)",
		textColor: "white",
		icon: <BsPlugFill className="iconDash tw-text-[#e11d48]" />,
		show: true,
	},
	{
		name: "Cable Subscriptions",
		link: "/tv-subscriptions",
		color: "var(--tile)",
		textColor: "white",
		icon: <IoTvSharp className="iconDash tw-text-[#0ea5e9]" />,
		show: true,
	},
	{
		name: "Recharge Cards",
		link: "/airtime_pin",
		color: "var(--tile)",
		textColor: "white",
		icon: <SiCoderwall className="iconDash tw-text-[#22c55e]" />,
		show: true,
	},
	{
		name: "Education",
		link: "/education",
		color: "var(--tile)",
		icon: <FaGraduationCap className="iconDash tw-text-[#ca8a04]" />,
		show: true,
	},
	{
		name: "CG Wallet",
		link: "/cgwallet",
		color: "var(--tile)",
		textColor: "white",
		icon: <BsWallet2 className="iconDash" />,
		show: ["Teetop Digital", "Kemtech Enterprises", "Giwa Digital"]?.includes(
			process.env.REACT_APP_NAME
		),
	},
	{
		name: "Bulk SMS",
		link: "/bulk_sms",
		color: "var(--tile)",
		textColor: "white",
		icon: <FaMailBulk className="iconDash tw-text-[#8b5cf6]" />,
		show: ["Teetop Digital"]?.includes(process.env.REACT_APP_NAME),
	},
	{
		name: "Verification",
		link: "/verification",
		color: "var(--tile)",
		textColor: "black",
		icon: <BsShieldCheck className="iconDash" />,
		show: false,
		// show: ["MercyFound Global"]?.includes(process.env.REACT_APP_NAME),
		// icon2: Verify,
	},
	// {
	// 	name: "Auto Buy",
	// 	link: "/auto-buy",
	// 	color: "var(--tile)",
	// 	textColor: "white",
	// 	icon: <GiRecycle className="iconDash" />,
	// },
	// {
	// 	name: "Business verification",
	// 	link: "/biz",
	// 	color: "var(--tile)",
	// 	textColor: "black",
	// 	icon: <BsShieldCheck className="iconDash" />,
	// },
];

const Products = () => {
	let { setStateName, auth, getServicesHistory } = useContext(GlobalState);
	useEffect(() => {
		setStateName("all products");
		getServicesHistory("all");
		getServicesHistory("data");
		getServicesHistory("airtime");
		getServicesHistory("airtime_pin");
		getServicesHistory("electricity");
		getServicesHistory("education");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [state, setState] = useState([]);

	useEffect(() => {
		setState(productArr?.filter(it => it?.show));
	}, [auth?.user]);

	let params = useParams();

	return (
		<div className="bg-white aboutScreen">
			<Container>
				<div className="row mx-0 g-2 g-md-4 py-4 py-md-5">
					{state?.map((item, i) => (
						<div className="col-6 col-md-4 productCard" key={i}>
							<Link
								to={
									item?.link?.includes("converter")
										? item?.link
										: `/${params?.page}${item?.link}`
								}
								className="d-flex align-items-center justify-content-center text2 myCursor text-decoration-none h-100 eachProduct fontReduceBig textTrunc p-2 p-md-0 py-3 py-md-0 h-100"
								style={{
									background: item?.color,
									borderRadius: "30px",
									color: item?.textColor ? item?.textColor : "#000",
								}}>
								<span className="textTrunc fontInherit">{item?.name}</span>
							</Link>
						</div>
					))}
				</div>
			</Container>
		</div>
	);
};

export default Products;
