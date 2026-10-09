import React, { Fragment, useContext, useEffect, useState } from "react";
import Container from "@/components/ui/Container";
const image1 = "/assets/other-06.png";
const image2 = "/assets/other-05.png";
const image4 = "/assets/other-07.png";
import { GlobalState } from "@/Data/Context";
import { useNavigate, useParams } from "@/lib/router";
import { ModalComponents } from "@/features";
import { Buttons, EmptyComponent } from "@/Utils";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";

const Inventory = () => {
	let {
			setStateName,
			vtpass,
			numberWithCommas,
			husmo,
			datastation,
			nairaSign,
			honourworld,
			getHonourworld,
			getHusmoBalance,
			getDataStationBalance,
			getVtpassBalance,
			auth,
			permission,
			getTeetopBalance,
			teetop,
			datamesolution,
			getDataMeSolutionBalance,
			moavoxpay,
			getProviderBalance,
			clubkonnect,
			connectsms,
			maskawasub,
			vickybest,
			rossytechs,
			kvdata,
			termii,
			gladtidingsdata,
			biller,
			ringo,
			getRingo,
			// uzobest,
			// getUzobestData,
			uzobestgsm,
			geodnatechsub,
			legitdataway,
			frankeyconnect,
			salompay,
			wapay,
			belloventures,
			pearstelecom,
			sirpdata,
			fordlink,
			mercyfound,
			edivatelecomm,
		} = useContext(GlobalState),
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

	useEffect(() => {
		setStateName("inventory");
		getVtpassBalance();
		if (
			![
				"Vickybest Telecom",
				"V12 Pay",
				"Fantastic Fisayo",
				"Mel Data Services",
				"SPRINT DATA",
				"Vee's Telecom",
				"Bliz",
				"Allbrite Digitals",
				"Noney Data Plug",
				"Rosezee Telecom",
				"Durable Telecommunications",
				"MySub",
				"M.O Data Plug",
				// "ALLAHU LATEEF INTEGRATED SERVICES LIMITED",
				"Giwa Digital",
				"QuickTopUp Telecom",
				"OG DATA",
				"OG NETWORK",
				"DONATEL TELECOM",
				"Ediva Telecoms",
				"GEEK VTU",
				"Marachdata",
				"Marachsub",
				"Josh Data",
				"Easyclick Telecom",
				"Jerrybod Telecom",
				"My Mobile VTU",
				"Vv Group",
			]?.includes(process.env.REACT_APP_NAME)
		) {
			getHonourworld();
		}
		if (
			![
				// "Vickybest Telecom",
				"Fantastic Fisayo",
				// "Mel Data Services",
				// "Yema Telecommunications",
				// "SPRINT DATA",
				"Bliz",
				"Allbrite Digitals",
				"Noney Data Plug",
				"Durable Telecommunications",
				"MySub",
				"Giwa Digital",
				"QuickTopUp Telecom",
				// "OG DATA",
				// "OG NETWORK",
				// "DONATEL TELECOM",
				"GEEK VTU",
				"Marachdata",
				"Marachsub",
				"Josh Data",
				"Jerrybod Telecom",
				// "My Mobile VTU",
			]?.includes(process.env.REACT_APP_NAME)
		) {
			getDataStationBalance();
		}
		if (
			[
				"Teetop Digital",
				"Kemtech Enterprises",
				"MercyFound Global",
				"DONATEL TELECOM",
			]?.includes(process.env.REACT_APP_NAME)
		)
			getHusmoBalance();
		if (
			[
				"Kemtech Enterprises",
				"V12 Pay",
				"Fantastic Fisayo",
				"Noney Data Plug",
				// "Vickybest Telecom",
				"Mel Data Services",
				"Yema Telecommunications",
				"Rosezee Telecom",
				"Giwa Digital",
				"OG DATA",
				"Vee's Telecom",
				"OG NETWORK",
				"DONATEL TELECOM",
				"Bliz",
				"Josh Data",
				"Jerrybod Telecom",
				"Easyclick Telecom",
				"My Mobile VTU",
			]?.includes(process.env.REACT_APP_NAME)
		)
			getProviderBalance();
		if (["Vv Group"]?.includes(process.env.REACT_APP_NAME))
			getProviderBalance("mercyfound");
		if (
			[
				"Fantastic Fisayo",
				"Teetop Digital",
				"ALLAHU LATEEF INTEGRATED SERVICES LIMITED",
			]?.includes(process.env.REACT_APP_NAME)
		)
			getProviderBalance("clubkonnect");
		if (["Teetop Digital"]?.includes(process.env.REACT_APP_NAME)) {
			getProviderBalance("connectsms");
			getProviderBalance("rossytechs");
			getProviderBalance("termii");
		}

		if (["Vickybest Telecom"]?.includes(process.env.REACT_APP_NAME)) {
			getDataMeSolutionBalance();
		}
		if (["SPRINT DATA", "GEEK VTU"]?.includes(process.env.REACT_APP_NAME)) {
			getProviderBalance("maskawasub");
		}
		if (
			[
				"Durable Telecommunications",
				"Noney Data Plug",
				"Mel Data Services",
				"Giwa Digital",
				"Fantastic Fisayo",
				"Vickybest Telecom",
				"OG DATA",
				"OG NETWORK",
				"GEEK VTU",
				"Vee's Telecom",
				"Houseaid",
				"Easyclick Telecom",
				"Moztelecom",
				"Moavox Pay",
				"Rosezee Telecom",
				"ALLAHU LATEEF INTEGRATED SERVICES LIMITED",
				"My Mobile VTU",
				"MercyFound Global",
				"Yema Telecommunications",
				"Vv Group",
			]?.includes(process.env.REACT_APP_NAME)
		) {
			getProviderBalance("gladtidingsdata");
		}
		if (
			[
				"Vee's Telecom",
				"Vickybest Telecom",
				"Rosezee Telecom",
				"Fantastic Fisayo",
				"OG DATA",
				"OG NETWORK",
			]?.includes(process.env.REACT_APP_NAME)
		) {
			getProviderBalance("geodnatechsub");
		}
		if (["Durable Telecommunications"]?.includes(process.env.REACT_APP_NAME)) {
			getProviderBalance("bello-ventures");
			getProviderBalance("fordlink");
			// getProviderBalance("sirpdata");
		}
		if (
			[
				// "Kemtech Enterprises",
				"Rosezee Telecom",
				"ALLAHU LATEEF INTEGRATED SERVICES LIMITED",
			]?.includes(process.env.REACT_APP_NAME)
		) {
			getProviderBalance("frankeyconnect");
		}
		if (
			["Rosezee Telecom", "Vee's Telecom"]?.includes(process.env.REACT_APP_NAME)
		) {
			getProviderBalance("legitdataway");
		}
		if (["My Mobile VTU"]?.includes(process.env.REACT_APP_NAME)) {
			getProviderBalance("pearstelecom");
		}
		if (["Mel Data Services"]?.includes(process.env.REACT_APP_NAME)) {
			getProviderBalance("salompay");
			getProviderBalance("edivatelecomm");
		}
		if (["Vickybest Telecom"]?.includes(process.env.REACT_APP_NAME)) {
			getProviderBalance("wapay");
		}
		if (["Giwa Digital"]?.includes(process.env.REACT_APP_NAME)) {
			getProviderBalance("uzobestgsm");
		}
		if (
			["Durable Telecommunications", "Marachdata", "Marachsub"]?.includes(
				process.env.REACT_APP_NAME
			)
		) {
			getProviderBalance("kvdata");
		}
		if (
			[
				"Vee's Telecom",
				"QuickTopUp Telecom",
				"V12 Pay",
				"My Mobile VTU",
			]?.includes(process.env.REACT_APP_NAME)
		) {
			getProviderBalance("vickybest");
		}
		if (
			[
				"Vickybest Telecom",
				// "V12 Pay",
				"Fantastic Fisayo",
				"Moztelecom",
				"Moavox Pay",
				"Mel Data Services",
				"Yema Telecommunications",
				"SPRINT DATA",
				"Bliz",
				"Vee's Telecom",
				"Allbrite Digitals",
				"Noney Data Plug",
				"Rosezee Telecom",
				"Durable Telecommunications",
				"MySub",
				"M.O Data Plug",
				"ALLAHU LATEEF INTEGRATED SERVICES LIMITED",
				"Giwa Digital",
				"OG DATA",
				"OG NETWORK",
				"DONATEL TELECOM",
				"Ediva Telecoms",
				"GEEK VTU",
				"Marachdata",
				"Marachsub",
				"Josh Data",
				"Easyclick Telecom",
				"Jerrybod Telecom",
				"My Mobile VTU",
			]?.includes(process.env.REACT_APP_NAME)
		) {
			getTeetopBalance();
		}
		if (process.env.NODE_ENV === "development") getRingo();
		// if (["Giwa Digital"]?.includes(process.env.REACT_APP_NAME)) {
		// 	getUzobestData();
		// }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="bg-white aboutScreen py-5">
			<Container>
				<div className="row mx-0 g-3 g-md-4">
					<div
						className={`px-3 col-12 col-md-4 ${
							process.env.NODE_ENV === "development" ? "" : "tw-hidden hidden"
						}`}>
						<div
							className="myCursor rounded10 miniHeight d-flex flex-column px-0 text-center"
							style={{
								background: "var(--brand-soft)",
							}}>
							<div
								// onClick={() => {
								// 	navigate(`/${page}/ringo`);
								// }}
								className="rounded10 py-3 py-md-4">
								<img
									src={image1}
									alt="Inventory"
									className="mx-auto img-fluid mb-3"
								/>
								<h3>
									<strong className="text-uppercase text2 text2New Lexend">
										Ringo
									</strong>
								</h3>
								<div>
									<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
										<span>Balance: </span>
										<span className="fontInherit Lexend">
											{nairaSign}{" "}
											{ringo?.data?.balance
												? numberWithCommas(
														Number(ringo?.data?.balance)?.toFixed(2)
												  )
												: 0}
										</span>{" "}
									</p>
									<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
										<span>Commission: </span>
										<span className="fontInherit Lexend">
											{nairaSign}{" "}
											{ringo?.data?.commission_balance
												? numberWithCommas(
														Number(ringo?.data?.commission_balance)?.toFixed(2)
												  )
												: 0}
										</span>{" "}
									</p>
									<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
										<span>Bonus: </span>
										<span className="fontInherit Lexend">
											{nairaSign}{" "}
											{ringo?.data?.bonus_balance
												? numberWithCommas(
														Number(ringo?.data?.bonus_balance)?.toFixed(2)
												  )
												: 0}
										</span>{" "}
									</p>
								</div>
								<div>
									{/* <p className="textColor2">{item?.user}</p> */}
									{/* <p className="text2 text2New">{item?.balance}</p> */}
								</div>
							</div>
							{/* <NavigateElseWhere uri={"https://b2b.ringo.ng"} /> */}
						</div>
					</div>
					{[
						"Teetop Digital",
						"Kemtech Enterprises",
						"MercyFound Global",
						"DONATEL TELECOM",
					]?.includes(process.env.REACT_APP_NAME) && (
						<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
							<div
								style={{
									background: "var(--brand-soft)",
								}}
								className="rounded10 h-100 py-3 py-md-4">
								<img
									src={image1}
									alt="Inventory"
									className="mx-auto img-fluid mb-3"
								/>
								<h3>
									<strong className="text-uppercase text2 text2New Lexend">
										{biller?.data?.find(it => it?.billerId === "husmo")?.name ||
											"Husmo"}
									</strong>
								</h3>
								<div>
									<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
										<span>Balance: </span>
										<span className="fontInherit Lexend">
											{nairaSign}{" "}
											{husmo?.data?.wallet_balance
												? numberWithCommas(
														Number(husmo?.data?.wallet_balance)?.toFixed(2)
												  )
												: 0}
										</span>{" "}
									</p>
								</div>
								<div>
									{/* <p className="textColor2">{item?.user}</p> */}
									{/* <p className="text2 text2New">{item?.balance}</p> */}
								</div>
							</div>
						</div>
					)}
					<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
						<div
							style={{
								background: "var(--brand-soft)",
							}}
							className="rounded10 h-100 py-3 py-md-4">
							<img
								src={image4}
								alt="Inventory"
								className="mx-auto img-fluid mb-3"
							/>
							<h3>
								<strong className="text-uppercase text2 text2New Lexend">
									{biller?.data?.find(it => it?.billerId === "vtpass")?.name ||
										"Vtpass"}
								</strong>
							</h3>
							<div>
								<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
									<span>Balance: </span>
									<span className="fontInherit Lexend">
										{nairaSign}{" "}
										{vtpass?.data?.balance
											? numberWithCommas(
													Number(vtpass?.data?.balance)?.toFixed(2)
											  )
											: 0}
									</span>{" "}
								</p>
							</div>
							<div></div>
						</div>
					</div>
					{![
						"Vickybest Telecom",
						"V12 Pay",
						"Fantastic Fisayo",
						"Mel Data Services",
						"SPRINT DATA",
						"Vee's Telecom",
						"Bliz",
						"Allbrite Digitals",
						"Noney Data Plug",
						"Rosezee Telecom",
						"Durable Telecommunications",
						"MySub",
						"M.O Data Plug",
						// "ALLAHU LATEEF INTEGRATED SERVICES LIMITED",
						"Giwa Digital",
						"QuickTopUp Telecom",
						"OG DATA",
						"OG NETWORK",
						"DONATEL TELECOM",
						"Ediva Telecoms",
						"GEEK VTU",
						"Marachdata",
						"Marachsub",
						"Josh Data",
						"Easyclick Telecom",
						"Jerrybod Telecom",
						"My Mobile VTU",
						"Vv Group",
					]?.includes(process.env.REACT_APP_NAME) && (
						<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
							<div
								style={{
									background: "var(--brand-soft)",
								}}
								className="rounded10 h-100 py-3 py-md-4">
								<img
									src={image2}
									alt="Inventory"
									className="mx-auto img-fluid mb-3"
								/>
								<h3>
									<strong className="text-uppercase text2 text2New Lexend">
										{biller?.data?.find(it => it?.billerId === "honourworld")
											?.name || "Honour World"}
									</strong>
								</h3>
								<div>
									<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
										<span>Balance: </span>
										<span className="fontInherit Lexend">
											{nairaSign}{" "}
											{honourworld?.data?.available
												? numberWithCommas(
														Number(honourworld?.data?.available)?.toFixed(2)
												  )
												: 0}
										</span>{" "}
									</p>
									{honourworld?.data?.cgBalance?.map((ic, a) => (
										<Fragment key={a}>
											{ic &&
												Object?.keys(ic)?.map((it, i) => (
													<p
														key={i}
														className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
														<span>{`${it?.replace(/[_]/g, " ")}`}: </span>
														<span className="fontInherit Lexend">
															{numberWithCommas(
																Number(ic?.[it] || 0)?.toFixed(2)
															)}
															GB
														</span>{" "}
													</p>
												))}
										</Fragment>
									))}
								</div>
								<div>
									{/* <p className="textColor2">{item?.user}</p> */}
									{/* <p className="text2 text2New">{item?.balance}</p> */}
								</div>
							</div>
						</div>
					)}
					{[
						"Fantastic Fisayo",
						"Teetop Digital",
						"ALLAHU LATEEF INTEGRATED SERVICES LIMITED",
					]?.includes(process.env.REACT_APP_NAME) && (
						<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
							<div
								style={{
									background: "var(--brand-soft)",
								}}
								className="rounded10 h-100 py-3 py-md-4">
								<img
									src={image2}
									alt="Inventory"
									className="mx-auto img-fluid mb-3"
								/>
								<h3>
									<strong className="text-uppercase text2 text2New Lexend">
										{biller?.data?.find(it => it?.billerId === "clubkonnect")
											?.name || "Club Konnect"}
									</strong>
								</h3>
								<div>
									<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
										<span>Balance: </span>
										<span className="fontInherit Lexend">
											{nairaSign}{" "}
											{clubkonnect?.data?.balance || clubkonnect?.balance || 0}
										</span>{" "}
									</p>
								</div>
								<div>
									{/* <p className="textColor2">{item?.user}</p> */}
									{/* <p className="text2 text2New">{item?.balance}</p> */}
								</div>
							</div>
						</div>
					)}
					{["Durable Telecommunications", "Marachdata", "Marachsub"]?.includes(
						process.env.REACT_APP_NAME
					) && (
						<>
							<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
								<div
									style={{
										background: "var(--brand-soft)",
									}}
									className="rounded10 h-100 py-3 py-md-4">
									<img
										src={image2}
										alt="Inventory"
										className="mx-auto img-fluid mb-3"
									/>
									<h3>
										<strong className="text-uppercase text2 text2New Lexend">
											{biller?.data?.find(it => it?.billerId === "kvdata")
												?.name || "KVdata"}
										</strong>
									</h3>
									<div>
										<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
											<span>Balance: </span>
											<span className="fontInherit Lexend">
												{nairaSign}{" "}
												{kvdata?.data?.wallet_balance
													? numberWithCommas(
															Number(kvdata?.data?.wallet_balance)?.toFixed(2)
													  )
													: 0}
											</span>{" "}
										</p>
									</div>
									<div>
										{/* <p className="textColor2">{item?.user}</p> */}
										{/* <p className="text2 text2New">{item?.balance}</p> */}
									</div>
								</div>
							</div>
						</>
					)}
					{[
						"Durable Telecommunications",
						"Noney Data Plug",
						"Mel Data Services",
						"Giwa Digital",
						"Fantastic Fisayo",
						"Vickybest Telecom",
						"OG DATA",
						"OG NETWORK",
						"GEEK VTU",
						"Vee's Telecom",
						"Houseaid",
						"Easyclick Telecom",
						"Moztelecom",
						"Moavox Pay",
						"Rosezee Telecom",
						"ALLAHU LATEEF INTEGRATED SERVICES LIMITED",
						"My Mobile VTU",
						"MercyFound Global",
						"Yema Telecommunications",
						"Vv Group",
					]?.includes(process.env.REACT_APP_NAME) && (
						<>
							<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
								<div
									style={{
										background: "var(--brand-soft)",
									}}
									className="rounded10 h-100 py-3 py-md-4">
									<img
										src={image1}
										alt="Inventory"
										className="mx-auto img-fluid mb-3"
									/>
									<h3>
										<strong className="text-uppercase text2 text2New Lexend">
											{biller?.data?.find(
												it => it?.billerId === "gladtidingsdata"
											)?.name || "Gladtidings data"}
										</strong>
									</h3>
									<div>
										<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
											<span>Balance: </span>
											<span className="fontInherit Lexend">
												{nairaSign}{" "}
												{gladtidingsdata?.data?.wallet_balance
													? numberWithCommas(
															Number(
																gladtidingsdata?.data?.wallet_balance
															)?.toFixed(2)
													  )
													: 0}
											</span>{" "}
										</p>
									</div>
									<div>
										{/* <p className="textColor2">{item?.user}</p> */}
										{/* <p className="text2 text2New">{item?.balance}</p> */}
									</div>
								</div>
							</div>
						</>
					)}
					{["Durable Telecommunications"]?.includes(
						process.env.REACT_APP_NAME
					) && (
						<>
							<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
								<div
									style={{
										background: "var(--brand-soft)",
									}}
									className="rounded10 h-100 py-3 py-md-4">
									<img
										src={image2}
										alt="Inventory"
										className="mx-auto img-fluid mb-3"
									/>
									<h3>
										<strong className="text-uppercase text2 text2New Lexend">
											{biller?.data?.find(
												it => it?.billerId === "bello-ventures"
											)?.name || "bello-ventures"}
										</strong>
									</h3>
									<div>
										<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
											<span>Balance: </span>
											<span className="fontInherit Lexend">
												{nairaSign}{" "}
												{belloventures?.data?.wallet_balance
													? numberWithCommas(
															Number(
																belloventures?.data?.wallet_balance
															)?.toFixed(2)
													  )
													: 0}
											</span>{" "}
										</p>
									</div>
									<div>
										{/* <p className="textColor2">{item?.user}</p> */}
										{/* <p className="text2 text2New">{item?.balance}</p> */}
									</div>
								</div>
							</div>
						</>
					)}
					{[
						"Vee's Telecom",
						"Rosezee Telecom",
						"Vickybest Telecom",
						"Fantastic Fisayo",
						"OG DATA",
						"OG NETWORK",
					]?.includes(process.env.REACT_APP_NAME) && (
						<>
							<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
								<div
									style={{
										background: "var(--brand-soft)",
									}}
									className="rounded10 h-100 py-3 py-md-4">
									<img
										src={image2}
										alt="Inventory"
										className="mx-auto img-fluid mb-3"
									/>
									<h3>
										<strong className="text-uppercase text2 text2New Lexend">
											{biller?.data?.find(
												it => it?.billerId === "geodnatechsub"
											)?.name || "geodnatech sub"}
										</strong>
									</h3>
									<div>
										<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
											<span>Balance: </span>
											<span className="fontInherit Lexend">
												{nairaSign}{" "}
												{geodnatechsub?.data?.wallet_balance
													? numberWithCommas(
															Number(
																geodnatechsub?.data?.wallet_balance
															)?.toFixed(2)
													  )
													: 0}
											</span>{" "}
										</p>
									</div>
									<div>
										{/* <p className="textColor2">{item?.user}</p> */}
										{/* <p className="text2 text2New">{item?.balance}</p> */}
									</div>
								</div>
							</div>
						</>
					)}
					{["Giwa Digital"]?.includes(process.env.REACT_APP_NAME) && (
						<>
							<div
								className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight"
								style={{
									background: "var(--brand-soft)",
								}}>
								<div
									// onClick={() => {
									// 	navigate(`/${page}/uzobest`);
									// }}
									className="rounded10 h-100 py-3 py-md-4">
									<img
										src={image4}
										alt="Inventory"
										className="mx-auto img-fluid mb-3"
									/>
									<h3>
										<strong className="text-uppercase text2 text2New Lexend">
											Uzobest GSM
										</strong>
									</h3>
									<div>
										<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
											<span>Balance: </span>
											<span className="fontInherit Lexend">
												{nairaSign}{" "}
												{uzobestgsm?.data?.wallet_balance
													? numberWithCommas(
															Number(uzobestgsm?.data?.wallet_balance)?.toFixed(
																2
															)
													  )
													: 0}
											</span>{" "}
										</p>
									</div>
									<div>
										{/* <p className="textColor2">{item?.user}</p> */}
										{/* <p className="text2 text2New">{item?.balance}</p> */}
									</div>
								</div>
							</div>
						</>
					)}
					{![
						// "Vickybest Telecom",
						"Fantastic Fisayo",
						// "Mel Data Services",
						// "Yema Telecommunications",
						// "SPRINT DATA",
						"Bliz",
						"Allbrite Digitals",
						"Noney Data Plug",
						"Durable Telecommunications",
						"MySub",
						"Giwa Digital",
						"QuickTopUp Telecom",
						// "OG DATA",
						// "OG NETWORK",
						// "DONATEL TELECOM",
						"GEEK VTU",
						"Marachdata",
						"Marachsub",
						"Josh Data",
						"Jerrybod Telecom",
						// "My Mobile VTU",
					]?.includes(process.env.REACT_APP_NAME) && (
						<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
							<div
								style={{
									background: "var(--brand-soft)",
								}}
								className="rounded10 h-100 py-3 py-md-4">
								<img
									src={image1}
									alt="Inventory"
									className="mx-auto img-fluid mb-3"
								/>
								<h3>
									<strong className="text-uppercase text2 text2New Lexend">
										{biller?.data?.find(it => it?.billerId === "datastation")
											?.name || "DataStation"}
									</strong>
								</h3>
								<div>
									<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
										<span>Balance: </span>
										<span className="fontInherit Lexend">
											{nairaSign}{" "}
											{datastation?.data?.wallet_balance
												? numberWithCommas(
														Number(datastation?.data?.wallet_balance)?.toFixed(
															2
														)
												  )
												: 0}
										</span>{" "}
									</p>
								</div>
								<div>
									{/* <p className="textColor2">{item?.user}</p> */}
									{/* <p className="text2 text2New">{item?.balance}</p> */}
								</div>
							</div>
						</div>
					)}
					{["Vv Group"]?.includes(process.env.REACT_APP_NAME) && (
						<>
							<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
								<div
									style={{
										background: "var(--brand-soft)",
									}}
									className="rounded10 h-100 py-3 py-md-4">
									<img
										src={image2}
										alt="Inventory"
										className="mx-auto img-fluid mb-3"
									/>
									<h3>
										<strong className="text-uppercase text2 text2New Lexend">
											{biller?.data?.find(it => it?.billerId === "mercyfound")
												?.name || "Mercyfound Global"}
										</strong>
									</h3>
									<div>
										<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
											<span>Balance: </span>
											<span className="fontInherit Lexend">
												{nairaSign}{" "}
												{mercyfound?.data?.available
													? numberWithCommas(
															Number(mercyfound?.data?.available)?.toFixed(2)
													  )
													: 0}
											</span>{" "}
										</p>
										{mercyfound?.data?.cgBalance?.map((ic, a) => (
											<Fragment key={a}>
												{ic &&
													Object?.keys(ic)?.map((it, i) => (
														<p
															key={i}
															className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
															<span>{`${it?.replace(/[_]/g, " ")}`}: </span>
															<span className="fontInherit Lexend">
																{numberWithCommas(
																	Number(ic?.[it] || 0)?.toFixed(2)
																)}
																GB
															</span>{" "}
														</p>
													))}
											</Fragment>
										))}
									</div>
									<div>
										{/* <p className="textColor2">{item?.user}</p> */}
										{/* <p className="text2 text2New">{item?.balance}</p> */}
									</div>
								</div>
							</div>
						</>
					)}
					{[
						"Kemtech Enterprises",
						"V12 Pay",
						"Noney Data Plug",
						"Fantastic Fisayo",
						// "Vickybest Telecom",
						"Mel Data Services",
						"Yema Telecommunications",
						"Rosezee Telecom",
						"Giwa Digital",
						"OG DATA",
						"Vee's Telecom",
						"OG NETWORK",
						"DONATEL TELECOM",
						"Bliz",
						"Josh Data",
						// "Jerrybod Telecom",
						"Easyclick Telecom",
						"My Mobile VTU",
					]?.includes(process.env.REACT_APP_NAME) && (
						<>
							<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
								<div
									style={{
										background: "var(--brand-soft)",
									}}
									className="rounded10 h-100 py-3 py-md-4">
									<img
										src={image4}
										alt="Inventory"
										className="mx-auto img-fluid mb-3"
									/>
									<h3>
										<strong className="text-uppercase text2 text2New Lexend">
											{biller?.data?.find(it => it?.billerId === "moavoxpay")
												?.name || "Moavox Pay"}
										</strong>
									</h3>
									<div>
										<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
											<span>Balance: </span>
											<span className="fontInherit Lexend">
												{nairaSign}{" "}
												{moavoxpay?.data?.available
													? numberWithCommas(
															Number(moavoxpay?.data?.available)?.toFixed(2)
													  )
													: 0}
											</span>{" "}
										</p>
										{moavoxpay?.data?.cgBalance?.map((ic, a) => (
											<Fragment key={a}>
												{ic &&
													Object?.keys(ic)?.map((it, i) => (
														<p
															key={i}
															className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
															<span>{`${it?.replace(/[_]/g, " ")}`}: </span>
															<span className="fontInherit Lexend">
																{numberWithCommas(
																	Number(ic?.[it] || 0)?.toFixed(2)
																)}
																GB
															</span>{" "}
														</p>
													))}
											</Fragment>
										))}
									</div>
									<div>
										{/* <p className="textColor2">{item?.user}</p> */}
										{/* <p className="text2 text2New">{item?.balance}</p> */}
									</div>
								</div>
							</div>
						</>
					)}
					{[
						"Vee's Telecom",
						"QuickTopUp Telecom",
						"V12 Pay",
						"My Mobile VTU",
					]?.includes(process.env.REACT_APP_NAME) && (
						<>
							<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
								<div
									style={{
										background: "var(--brand-soft)",
									}}
									className="rounded10 h-100 py-3 py-md-4">
									<img
										src={image1}
										alt="Inventory"
										className="mx-auto img-fluid mb-3"
									/>
									<h3>
										<strong className="text-uppercase text2 text2New Lexend">
											{biller?.data?.find(it => it?.billerId === "vickybest")
												?.name || "Vickybest"}
										</strong>
									</h3>
									<div>
										<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
											<span>Balance: </span>
											<span className="fontInherit Lexend">
												{nairaSign}{" "}
												{vickybest?.data?.available
													? numberWithCommas(
															Number(vickybest?.data?.available)?.toFixed(2)
													  )
													: 0}
											</span>{" "}
										</p>
										{vickybest?.data?.cgBalance?.map((ic, a) => (
											<Fragment key={a}>
												{ic &&
													Object?.keys(ic)?.map((it, i) => (
														<p
															key={i}
															className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
															<span>{`${it?.replace(/[_]/g, " ")}`}: </span>
															<span className="fontInherit Lexend">
																{numberWithCommas(
																	Number(ic?.[it] || 0)?.toFixed(2)
																)}
																GB
															</span>{" "}
														</p>
													))}
											</Fragment>
										))}
									</div>
									<div>
										{/* <p className="textColor2">{item?.user}</p> */}
										{/* <p className="text2 text2New">{item?.balance}</p> */}
									</div>
								</div>
							</div>
						</>
					)}
					{[
						"Vickybest Telecom",
						// "V12 Pay",
						"Fantastic Fisayo",
						"Moztelecom",
						"Moavox Pay",
						"Mel Data Services",
						"Yema Telecommunications",
						"SPRINT DATA",
						"Bliz",
						"Vee's Telecom",
						"Allbrite Digitals",
						"Noney Data Plug",
						"Rosezee Telecom",
						"Durable Telecommunications",
						"MySub",
						"M.O Data Plug",
						"ALLAHU LATEEF INTEGRATED SERVICES LIMITED",
						"Giwa Digital",
						"OG DATA",
						"OG NETWORK",
						"DONATEL TELECOM",
						"Ediva Telecoms",
						"GEEK VTU",
						"Marachdata",
						"Marachsub",
						"Josh Data",
						"Easyclick Telecom",
						"Jerrybod Telecom",
						"My Mobile VTU",
					]?.includes(process.env.REACT_APP_NAME) && (
						<>
							<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
								<div
									style={{
										background: "var(--brand-soft)",
									}}
									className="rounded10 h-100 py-3 py-md-4">
									<img
										src={image1}
										alt="Inventory"
										className="mx-auto img-fluid mb-3"
									/>
									<h3>
										<strong className="text-uppercase text2 text2New Lexend">
											{biller?.data?.find(it => it?.billerId === "teetop")
												?.name || "Teetop"}
										</strong>
									</h3>
									<div>
										<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
											<span>Balance: </span>
											<span className="fontInherit Lexend">
												{nairaSign}{" "}
												{teetop?.data?.available
													? numberWithCommas(
															Number(teetop?.data?.available)?.toFixed(2)
													  )
													: 0}
											</span>{" "}
										</p>
										{teetop?.data?.cgBalance?.map((ic, a) => (
											<Fragment key={a}>
												{ic &&
													Object?.keys(ic)?.map((it, i) => (
														<p
															key={i}
															className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
															<span>{`${it?.replace(/[_]/g, " ")}`}: </span>
															<span className="fontInherit Lexend">
																{numberWithCommas(
																	Number(ic?.[it] || 0)?.toFixed(2)
																)}
																GB
															</span>{" "}
														</p>
													))}
											</Fragment>
										))}
									</div>
									<div>
										{/* <p className="textColor2">{item?.user}</p> */}
										{/* <p className="text2 text2New">{item?.balance}</p> */}
									</div>
								</div>
							</div>
							{["SPRINT DATA", "GEEK VTU"]?.includes(
								process.env.REACT_APP_NAME
							) && (
								<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
									<div
										style={{
											background: "var(--brand-soft)",
										}}
										className="rounded10 h-100 py-3 py-md-4">
										<img
											src={image1}
											alt="Inventory"
											className="mx-auto img-fluid mb-3"
										/>
										<h3>
											<strong className="text-uppercase text2 text2New Lexend">
												{biller?.data?.find(it => it?.billerId === "maskawasub")
													?.name || "Maskawasub"}
											</strong>
										</h3>
										<div>
											<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
												<span>Balance: </span>
												<span className="fontInherit Lexend">
													{nairaSign}{" "}
													{maskawasub?.data?.wallet_balance
														? numberWithCommas(
																Number(
																	maskawasub?.data?.wallet_balance
																)?.toFixed(2)
														  )
														: 0}
												</span>{" "}
											</p>
										</div>
										<div>
											{/* <p className="textColor2">{item?.user}</p> */}
											{/* <p className="text2 text2New">{item?.balance}</p> */}
										</div>
									</div>
								</div>
							)}
							{["Vickybest Telecom"]?.includes(process.env.REACT_APP_NAME) && (
								<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
									<div
										style={{
											background: "var(--brand-soft)",
										}}
										className="rounded10 h-100 py-3 py-md-4">
										<img
											src={image1}
											alt="Inventory"
											className="mx-auto img-fluid mb-3"
										/>
										<h3>
											<strong className="text-uppercase text2 text2New Lexend">
												{biller?.data?.find(
													it => it?.billerId === "datamesolution"
												)?.name || "Datamestation"}
											</strong>
										</h3>
										<div>
											<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
												<span>Balance: </span>
												<span className="fontInherit Lexend">
													{nairaSign}{" "}
													{datamesolution?.data?.wallet_balance
														? numberWithCommas(
																Number(
																	datamesolution?.data?.wallet_balance
																)?.toFixed(2)
														  )
														: 0}
												</span>{" "}
											</p>
										</div>
										<div>
											{/* <p className="textColor2">{item?.user}</p> */}
											{/* <p className="text2 text2New">{item?.balance}</p> */}
										</div>
									</div>
								</div>
							)}
						</>
					)}
					{["Teetop Digital"]?.includes(process.env.REACT_APP_NAME) && (
						<>
							<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
								<div
									style={{
										background: "var(--brand-soft)",
									}}
									className="rounded10 h-100 py-3 py-md-4">
									<img
										src={image2}
										alt="Inventory"
										className="mx-auto img-fluid mb-3"
									/>
									<h3>
										<strong className="text-uppercase text2 text2New Lexend">
											{biller?.data?.find(it => it?.billerId === "rossytechs")
												?.name || "rossy techs"}
										</strong>
									</h3>
									<div>
										<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
											<span>Balance: </span>
											<span className="fontInherit Lexend">
												{nairaSign}{" "}
												{rossytechs?.data?.wallet_balance
													? numberWithCommas(
															Number(rossytechs?.data?.wallet_balance)?.toFixed(
																2
															)
													  )
													: 0}
											</span>{" "}
										</p>
									</div>
									<div>
										{/* <p className="textColor2">{item?.user}</p> */}
										{/* <p className="text2 text2New">{item?.balance}</p> */}
									</div>
								</div>
							</div>
							<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
								<div
									style={{
										background: "var(--brand-soft)",
									}}
									className="rounded10 h-100 py-3 py-md-4">
									<img
										src={image2}
										alt="Inventory"
										className="mx-auto img-fluid mb-3"
									/>
									<h3>
										<strong className="text-uppercase text2 text2New Lexend">
											{biller?.data?.find(it => it?.billerId === "connectsms")
												?.name || "Connect SMS"}
										</strong>
									</h3>
									<div>
										<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
											<span>Wallet: </span>
											<span className="fontInherit Lexend">
												{nairaSign}{" "}
												{connectsms?.data?.wallet || connectsms?.wallet || 0}
											</span>{" "}
										</p>
										<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
											<span>SMS: </span>
											<span className="fontInherit Lexend">
												{connectsms?.data?.sms || connectsms?.sms || 0}
											</span>{" "}
										</p>
									</div>
									<div>
										{/* <p className="textColor2">{item?.user}</p> */}
										{/* <p className="text2 text2New">{item?.balance}</p> */}
									</div>
								</div>
							</div>
							<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
								<div
									style={{
										background: "var(--brand-soft)",
									}}
									className="rounded10 h-100 py-3 py-md-4">
									<img
										src={image4}
										alt="Inventory"
										className="mx-auto img-fluid mb-3"
									/>
									<h3>
										<strong className="text-uppercase text2 text2New Lexend">
											{biller?.data?.find(it => it?.billerId === "termii")
												?.name || "Termii"}
										</strong>
									</h3>
									<div>
										<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
											<span>Wallet: </span>
											<span className="fontInherit Lexend">
												{nairaSign}{" "}
												{termii?.data?.balance || termii?.balance || 0}
											</span>{" "}
										</p>
									</div>
									<div>
										{/* <p className="textColor2">{item?.user}</p> */}
										{/* <p className="text2 text2New">{item?.balance}</p> */}
									</div>
								</div>
							</div>
						</>
					)}
					{[
						// "Kemtech Enterprises",
						"Rosezee Telecom",
						"ALLAHU LATEEF INTEGRATED SERVICES LIMITED",
					]?.includes(process.env.REACT_APP_NAME) && (
						<div
							className={`col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight ${
								process.env.NODE_ENV === "development" ? "" : "tw-hidden hidden"
							}`}>
							<div
								style={{
									background: "var(--brand-soft)",
								}}
								className="rounded10 h-100 py-3 py-md-4">
								<img
									src={image1}
									alt="Inventory"
									className="mx-auto img-fluid mb-3"
								/>
								<h3>
									<strong className="text-uppercase text2 text2New Lexend">
										{biller?.data?.find(it => it?.billerId === "frankeyconnect")
											?.name || "Frankey connect"}
									</strong>
								</h3>
								<div>
									<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
										<span>Balance: </span>
										<span className="fontInherit Lexend">
											{nairaSign}{" "}
											{frankeyconnect?.data?.wallet
												? numberWithCommas(
														Number(frankeyconnect?.data?.wallet)?.toFixed(2)
												  )
												: 0}
										</span>{" "}
									</p>
								</div>
								<div>
									{/* <p className="textColor2">{item?.user}</p> */}
									{/* <p className="text2 text2New">{item?.balance}</p> */}
								</div>
							</div>
						</div>
					)}
					{["My Mobile VTU"]?.includes(process.env.REACT_APP_NAME) && (
						<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
							<div
								style={{
									background: "var(--brand-soft)",
								}}
								className="rounded10 h-100 py-3 py-md-4">
								<img
									src={image4}
									alt="Inventory"
									className="mx-auto img-fluid mb-3"
								/>
								<h3>
									<strong className="text-uppercase text2 text2New Lexend">
										{biller?.data?.find(it => it?.billerId === "pearstelecom")
											?.name || "Pearstelecom"}
									</strong>
								</h3>
								<div>
									<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
										<span>Balance: </span>
										<span className="fontInherit Lexend">
											{nairaSign} {pearstelecom?.data?.balance || 0}
										</span>{" "}
									</p>
								</div>
								<div></div>
							</div>
						</div>
					)}
					{["Rosezee Telecom", "Vee's Telecom"]?.includes(
						process.env.REACT_APP_NAME
					) && (
						<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
							<div
								style={{
									background: "var(--brand-soft)",
								}}
								className="rounded10 h-100 py-3 py-md-4">
								<img
									src={image4}
									alt="Inventory"
									className="mx-auto img-fluid mb-3"
								/>
								<h3>
									<strong className="text-uppercase text2 text2New Lexend">
										{biller?.data?.find(it => it?.billerId === "legitdataway")
											?.name || "Legitdataway"}
									</strong>
								</h3>
								<div>
									<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
										<span>Balance: </span>
										<span className="fontInherit Lexend">
											{nairaSign} {legitdataway?.data?.balance || 0}
										</span>{" "}
									</p>
								</div>
								<div></div>
							</div>
						</div>
					)}
					{["Durable Telecommunications"]?.includes(
						process.env.REACT_APP_NAME
					) && (
						<>
							<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
								<div
									style={{
										background: "var(--brand-soft)",
									}}
									className="rounded10 h-100 py-3 py-md-4">
									<img
										src={image4}
										alt="Inventory"
										className="mx-auto img-fluid mb-3"
									/>
									<h3>
										<strong className="text-uppercase text2 text2New Lexend">
											{biller?.data?.find(it => it?.billerId === "fordlink")
												?.name || "Fordlink"}
										</strong>
									</h3>
									<div>
										<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
											<span>Balance: </span>
											<span className="fontInherit Lexend">
												{nairaSign}{" "}
												{fordlink?.data?.wallet_balance
													? numberWithCommas(
															Number(fordlink?.data?.wallet_balance)?.toFixed(2)
													  )
													: 0}
											</span>{" "}
										</p>
									</div>
								</div>
							</div>
							<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight tw-hidden hidden">
								<div
									style={{
										background: "var(--brand-soft)",
									}}
									className="rounded10 h-100 py-3 py-md-4">
									<img
										src={image4}
										alt="Inventory"
										className="mx-auto img-fluid mb-3"
									/>
									<h3>
										<strong className="text-uppercase text2 text2New Lexend">
											{biller?.data?.find(it => it?.billerId === "sirpdata")
												?.name || "Sirpdata"}
										</strong>
									</h3>
									<div>
										<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
											<span>Balance: </span>
											<span className="fontInherit Lexend">
												{nairaSign} {sirpdata?.data?.description?.balance || 0}
											</span>{" "}
										</p>
									</div>
									<div></div>
								</div>
							</div>
						</>
					)}
					{["Mel Data Services"]?.includes(process.env.REACT_APP_NAME) && (
						<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
							<div
								style={{
									background: "var(--brand-soft)",
								}}
								className="rounded10 h-100 py-3 py-md-4">
								<img
									src={image4}
									alt="Inventory"
									className="mx-auto img-fluid mb-3"
								/>
								<h3>
									<strong className="text-uppercase text2 text2New Lexend">
										{biller?.data?.find(it => it?.billerId === "salompay")
											?.name || "Salompay"}
									</strong>
								</h3>
								<div>
									<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
										<span>Balance: </span>
										<span className="fontInherit Lexend">
											{nairaSign} {salompay?.data?.balance || 0}
										</span>{" "}
									</p>
								</div>
								<div></div>
							</div>
						</div>
					)}
					{["Vickybest Telecom"]?.includes(process.env.REACT_APP_NAME) && (
						<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
							<div
								style={{
									background: "var(--brand-soft)",
								}}
								className="rounded10 h-100 py-3 py-md-4">
								<img
									src={image4}
									alt="Inventory"
									className="mx-auto img-fluid mb-3"
								/>
								<h3>
									<strong className="text-uppercase text2 text2New Lexend">
										{biller?.data?.find(it => it?.billerId === "wapay")?.name ||
											"Wapay"}
									</strong>
								</h3>
								<div>
									<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
										<span>Balance: </span>
										<span className="fontInherit Lexend">
											{nairaSign} {wapay?.data?.balance || 0}
										</span>{" "}
									</p>
								</div>
								<div></div>
							</div>
						</div>
					)}
					{["Mel Data Services"]?.includes(process.env.REACT_APP_NAME) && (
						<div className="col-12 col-md-4 p-3 text-center myCursor rounded10 miniHeight">
							<div
								style={{
									background: "var(--brand-soft)",
								}}
								className="rounded10 h-100 py-3 py-md-4">
								<img
									src={image2}
									alt="Inventory"
									className="mx-auto img-fluid mb-3"
								/>
								<h3>
									<strong className="text-uppercase text2 text2New Lexend">
										{biller?.data?.find(it => it?.billerId === "edivatelecomm")
											?.name || "Ediva telecomm"}
									</strong>
								</h3>
								<div>
									<p className="text-capitalize text2 text2New d-flex justify-content-between align-items-center px-3">
										<span>Balance: </span>
										<span className="fontInherit Lexend">
											{nairaSign} {edivatelecomm?.data?.balance || 0}
										</span>{" "}
									</p>
								</div>
								<div></div>
							</div>
						</div>
					)}
				</div>
			</Container>
		</div>
	);
};

export default Inventory;

export const AddNewFund = ({ isOpen, toggle }) => {
	let { returnErrors, biller, getBillerFunding, nairaSignNeutral } =
		useContext(GlobalState);
	let init = { amount: "" },
		{ id } = useParams(),
		[state, setState] = useState(init),
		[submit, setSubmit] = useState(false),
		[loading, setLoading] = useState(false);

	useEffect(() => {
		if (id && biller?.data) {
			biller?.data?.map(
				item =>
					item?.billerId === id && setState({ ...state, biller: item?._id })
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, biller?.data]);

	useEffect(() => {
		if (submit && biller?.isFunded) {
			toggle();
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [biller?.isFunded, submit]);

	let handleSubmit = async () => {
		setLoading(true);
		console.log({ state });
		await getBillerFunding(state);
		setLoading(false);
		setSubmit(true);
	};

	return (
		<>
			<ModalComponents
				isOpen={isOpen}
				toggle={toggle}
				title={`Add amount funded on ${id}`}>
				<div>
					<div className="mb-4">
						<label htmlFor="value">Amount</label>
						<input
							type={"number"}
							placeholder="500"
							className="form-control py-3"
							value={state?.amount}
							onChange={e => setState({ ...state, amount: e.target.value })}
							min={0}
						/>
						<Buttons
							title={"proceed"}
							css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
							width={"w-50"}
							loading={loading}
							style={{ borderRadius: "30px" }}
							onClick={async () => {
								if (Number(state?.amount) < 1)
									return returnErrors({
										error: [
											{
												msg: `Amount cannot be less than ${nairaSignNeutral} 1`,
												param: "amount",
											},
										],
									});
								await handleSubmit();
							}}
						/>
					</div>
				</div>
			</ModalComponents>
		</>
	);
};

export const BillerFundingHistory = () => {
	let { biller, numberWithCommas, returnErrors, nairaSign } =
		useContext(GlobalState);
	let { id } = useParams(),
		[state, setState] = useState(null),
		[total, setTotal] = useState(0),
		[total2, setTotal2] = useState(0);

	useEffect(() => {
		let getTotal = async () => {
			try {
				let res = await axios.post(`/api/v2/transactions/manage-transactions`, {
					provider: id,
				});

				let total = res?.data?.data?.monthly?.reduce(
					(ac, i) => (ac += Number(i?.dataTotal)),
					0
				);
				setTotal(total);
			} catch (err) {
				if (err) console.log(err.response?.data?.error, { err });
				if (err?.response?.status === 429 || err?.response?.status === 405)
					toast.error(err?.response?.data ? err?.response?.data : err?.message);
				let error = err.response?.data?.error;
				if (error) {
					returnErrors({ error, status: err?.response?.status });
				}
			}
		};
		getTotal();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	useEffect(() => {
		if (id && biller?.funding) {
			let filterItem = biller?.funding?.filter(item => item?.billerId === id);
			setState(filterItem);

			setTotal2(filterItem?.reduce((ac, i) => (ac += Number(i?.amount)), 0));
		}
	}, [id, biller?.funding]);

	if (!state) return;
	return (
		<div className="bg-white aboutScreen">
			<div className="py-3 py-md-5">
				<div className="bland row mx-0 py-3 px-0 text-capitalize Lexend fw-bold">
					<div className="col textTrunc Lexend">S/N</div>
					<div className="col textTrunc Lexend">User</div>
					<div className="col textTrunc Lexend">Amount</div>
					<div className="col textTrunc Lexend">Date</div>
				</div>
				{state?.length === 0 ? (
					<EmptyComponent subtitle={`${id} funding is empty`} />
				) : (
					<>
						{state?.map((it, i) => (
							<div key={i} className="row mx-0 py-3 border-bottom myCursor">
								<div className="col my-auto text-capitalize fontReduce2 textTrunc py-3 py-md-4">
									{i + 1}
								</div>
								<div className="col my-auto text-capitalize fontReduce2 textTrunc py-3 py-md-4">
									{it?.user?.firstName} {it?.user?.lastName}
								</div>
								<div className="col my-autofontReduce2 textTrunc py-3 py-md-4 textTrunc4">
									{nairaSign} {numberWithCommas(Number(it?.amount).toFixed(2))}
								</div>
								<div className="col my-autofontReduce2 textTrunc py-3 py-md-4 textTrunc4">
									{moment(it?.createdAt).format("L hh:mm A")}
								</div>
							</div>
						))}
						<div className="py-3">
							<h3 className="Lexend row mx-0 border-bottom py-3">
								<span className="col fontInherit Lexend">Total funding </span>
								<span className="col fontInherit Lexend">
									{nairaSign} {numberWithCommas(Number(total2).toFixed(2))}
								</span>
							</h3>
							{total && (
								<h3 className="Lexend row mx-0 border-bottom py-3">
									<span className="col fontInherit Lexend">
										Total expenses{" "}
									</span>
									<span className="col fontInherit Lexend">
										{" "}
										{nairaSign} {numberWithCommas(Number(total).toFixed(2))}
									</span>
								</h3>
							)}
							{total && total2 && (
								<h3 className="Lexend row mx-0 border-bottom py-3">
									<span className="col fontInherit Lexend">Balance </span>
									<span className="col fontInherit Lexend">
										{nairaSign}{" "}
										{numberWithCommas(Number(total2 - total).toFixed(2))}
									</span>
								</h3>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};
