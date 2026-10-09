import React, { useContext, useEffect, useState } from "react";
import { useParams } from "@/lib/router";
import Container from "@/components/ui/Container";
import { ModalComponents } from "@/features/DefaultHeader";
import { Buttons } from "@/Utils";
import moment from "moment";
const image = "/assets/logo.png";
import { GlobalState } from "@/Data/Context";

const Bundles = () => {
	let { setStateName } = useContext(GlobalState);
	let [active, setActive] = useState(0);
	useEffect(() => {
		setStateName(
			active === 2 ? "CG Transfer" : active === 3 ? "CG purchase" : "CG wallet"
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active]);
	let params = useParams();
	let bundlesTab = [
		{ name: "CG wallet", type: "link", link: `/${params?.page}` },
		{ name: "transfer", type: "button", link: "transfer" },
		{
			name: "transfer history",
			type: "link",
			link: `/${params?.page}/transfer`,
		},
		{
			name: "purchase history",
			type: "link",
			link: `/${params?.page}/purchase`,
		},
		{ name: "request", type: "button", link: "request" },
		{ name: "add new package", type: "button", link: "new" },
	];
	let [isNew, setIsNew] = useState(false),
		[isTransfer, setIsTransfer] = useState(false),
		[isRequest, setIsRequest] = useState(false),
		toggleNew = () => {
			setIsNew(!isNew);
		},
		toggleTransfer = () => {
			setIsTransfer(!isTransfer);
		},
		toggleRequest = () => {
			setIsRequest(!isRequest);
		};
	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<div className="btn-group w-100">
					{bundlesTab?.map((it, i) => (
						<button
							style={{ borderRadius: "30px" }}
							key={i}
							onClick={() => {
								if (it?.type === "link") {
									setActive(i);
								} else if (it?.type === "button") {
									if (it?.link === "new") toggleNew();
									if (it?.link === "transfer") toggleTransfer();
									if (it?.link === "request") toggleRequest();
								}
							}}
							className="btn btn-outline-primary1 py-3 mx-2 text-capitalize">
							{it?.name}
						</button>
					))}
				</div>
				<h4 className="text-capitalize my-3">
					{bundlesTab?.[active]?.name} bundles
				</h4>
				{active === 2 || active === 3 ? (
					<TransferHistory active={active} />
				) : (
					<CGWallet />
				)}
			</Container>
			<MakeRequest isOpen={isRequest} back={toggleRequest} />
			<MakeTransfer isOpen={isTransfer} back={toggleTransfer} />
			<MakeNew isOpen={isNew} back={toggleNew} />
		</div>
	);
};

export default Bundles;

const MakeRequest = ({ isOpen, back }) => {
	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="CG Request">
				<form>
					<div className="form mb-3">
						<label htmlFor="bundle">Choose bundle</label>
					</div>
					<div className="form mb-3">
						<label htmlFor="bundle">Pay</label>
					</div>
					<Buttons
						title={"submit"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
					/>
				</form>
			</ModalComponents>
		</>
	);
};

const MakeTransfer = ({ isOpen, back }) => {
	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="Transfer CG">
				<form>
					<div className="form mb-3">
						<label htmlFor="bundle">Choose bundle</label>
					</div>
					<div className="form mb-3">
						<label htmlFor="bundle">Pay</label>
					</div>
					<Buttons
						title={"submit"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
					/>
				</form>
			</ModalComponents>
		</>
	);
};

const MakeNew = ({ isOpen, back }) => {
	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="New CG Plan">
				<form>
					<div className="form mb-3">
						<label htmlFor="bundle">Choose bundle</label>
					</div>
					<div className="form mb-3">
						<label htmlFor="bundle">Pay</label>
					</div>
					<Buttons
						title={"submit"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
					/>
				</form>
			</ModalComponents>
		</>
	);
};

const TransferHistory = ({ active }) => {
	let userList = [
		{
			type: "Coperate gifting",
			createdAt: Date.now(),
			value: "50000",
			id: "1234567890",
			network: "MTN",
		},
	];

	return (
		<div className="pb-5 my-5">
			<div className="bland row mx-0 p-3 text-capitalize">
				<div className="col">type</div>
				<div className="col">network</div>
				<div className="col">{active !== 2 ? `sender's` : `receiver's`} ID</div>
				<div className="col">value</div>
				<div className="col">date</div>
			</div>
			<div className="bland2 row mx-0 p-3">
				{userList?.map((item, index) => (
					<div key={index} className="row mx-0 p-3">
						<div className="col my-auto">{item?.type}</div>
						<div className="col my-auto">{item?.network}</div>
						<div className="col my-auto">{item?.id}</div>
						<div className="col my-auto">{item?.value}</div>
						<div className="col my-auto">
							{moment(item?.createdAt).format("L")}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const CGWallet = () => {
	let bgArr = [
		"#F1EEEA",
		"#E5DDF2",
		"#E9F5FA",
		"#DBC7DA",
		"#E6EDE8",
		"#C7DBCD",
		"#FAE9EA",
		"#C7DBDB",
		"#EDE6E6",
		"#C7DBDB",
		"#E9EBFA",
		"rgba(186, 255, 174, 0.8)",
	];
	let walletType = [
		{
			name: "MTN Corporate Gifting",
			image,
			balance: "10GB",
		},
		{
			name: "Glo  Gifting",
			image,
			balance: "10GB",
		},
		{
			name: "Airtel Giting",
			image,
			balance: "10GB",
		},
		{
			name: "Etisalat Giting",
			image,
			balance: "10GB",
		},
		{
			name: "MTN Corporate Gifting",
			image,
			balance: "10GB",
		},
		{
			name: "Glo  Gifting",
			image,
			balance: "10GB",
		},
		{
			name: "Airtel Giting",
			image,
			balance: "10GB",
		},
		{
			name: "Etisalat Giting",
			image,
			balance: "10GB",
		},
		{
			name: "MTN Corporate Gifting",
			image,
			balance: "10GB",
		},
		{
			name: "Glo  Gifting",
			image,
			balance: "10GB",
		},
		{
			name: "Airtel Giting",
			image,
			balance: "10GB",
		},
		{
			name: "Etisalat Giting",
			image,
			balance: "10GB",
		},
	];

	return (
		<>
			<div className="cgWallet">
				{walletType?.map((it, i) => (
					<div
						key={i}
						className="shadow2 rounded20 p-3 myCursor eachProduct"
						style={{
							background: bgArr?.[i % bgArr?.length],
							height: "10rem",
						}}>
						<div className="d-flex align-items-center">
							<img src={it?.image} alt={it?.name} className="me-2" />
							<h5>{it?.name}</h5>
						</div>
						<h4>Balance: {it?.balance}</h4>
					</div>
				))}
			</div>
		</>
	);
};
