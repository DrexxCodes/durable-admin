import React, { useContext, useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { ModalComponents } from "@/features";
import { GlobalState } from "@/Data/Context";
import { Buttons } from "@/Utils";
import { useNavigate } from "@/lib/router";

const Billers = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("billers");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		},
		navigate = useNavigate();
	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<div className="d-flex justify-content-end">
					<Buttons
						title={"view history"}
						css="btn-primary1 text-capitalize py-3 my-4 px-5 mx-2"
						width={"w-auto"}
						onClick={() => {
							navigate("/inventory");
						}}
						style={{ borderRadius: "30px" }}
					/>
				</div>
				<BillersDetails toggle={toggle} />
			</Container>{" "}
			<ModalComponents title="choose biller" isOpen={isOpen} back={toggle}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<Buttons
							title={"ringo"}
							css="btn-primary1 text-uppercase py-3 px-4 px-lg-5 mx-auto my-4"
							width={"w-50 w50"}
							style={{ borderRadius: "30px" }}
						/>
						<Buttons
							title={"chosen"}
							css="btn-primary1 text-uppercase py-3 px-4 px-lg-5 mx-auto my-4"
							width={"w-50 w50"}
							style={{ borderRadius: "30px" }}
						/>
						<Buttons
							title={"rpi"}
							css="btn-primary1 text-uppercase py-3 px-4 px-lg-5 mx-auto my-4"
							width={"w-50 w50"}
							style={{ borderRadius: "30px" }}
						/>
						<Buttons
							title={"ogdams"}
							css="btn-primary1 text-uppercase py-3 px-4 px-lg-5 mx-auto my-4"
							width={"w-50 w50"}
							style={{ borderRadius: "30px" }}
						/>
						<Buttons
							title={"switch"}
							css="btn-outline-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
							width={"w-50 w50"}
							onClick={toggle}
							style={{ borderRadius: "30px" }}
						/>
					</form>
				</div>
			</ModalComponents>
		</div>
	);
};

export default Billers;

const BillersDetails = ({ toggle }) => {
	let historyList = [
		{
			name: "MTN_Airtime",
			biller: "ringo",
		},
	];

	return (
		<>
			<div className="pb-5 my-5">
				<div className="bland row mx-0 p-3 text-capitalize">
					<div className="col">product name</div>
					<div className="col">current biller</div>
					<div className="col">action </div>
				</div>
				<div className="bg-white row mx-0">
					{historyList?.map((item, index) => (
						<div key={index} className="row mx-0 p-3">
							<div className="col my-auto">{item?.name}</div>
							<div className="col my-auto">{item?.biller}</div>
							<div className="col my-auto">
								<p
									className="text-primary text-capitalize ms-2 myCursor"
									onClick={toggle}>
									switch biller
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};
