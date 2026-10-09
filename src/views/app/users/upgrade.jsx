import React, { useContext, useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { ThreeBoxBar } from "@/features/Users";
const icon1 = "/assets/analythics.png";
const icon2 = "/assets/oding.png";
const icon3 = "/assets/money.png";
import { GlobalState } from "@/Data/Context";
import { Buttons, EmptyComponent } from "@/Utils";
const user = "/assets/avatar3.png";
import moment from "moment";
import { BiCog } from "react-icons/bi";
import { ModalComponents } from "@/features";
import { useNavigate } from "@/lib/router";

const UpgradeMain = () => {
	let { setStateName, upgrade, numberWithCommas, auth, permission } =
		useContext(GlobalState);
	useEffect(() => {
		setStateName("upgrade list");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let upgradeArr = [
			{
				icon: icon1,
				name: "total request",
				number: upgrade?.upgrade?.length
					? numberWithCommas(upgrade?.upgrade?.length)
					: 0,
				color: "var(--tile)",
			},
			{
				icon: icon2,
				name: "approved request",
				number: upgrade?.upgrade
					? numberWithCommas(
							upgrade?.upgrade?.filter(item => item?.statusText === "approved")
								?.length
					  )
					: 0,
				color: "var(--tile)",
			},
			{
				icon: icon3,
				name: "declined request",
				number: upgrade?.upgrade
					? numberWithCommas(
							upgrade?.upgrade?.filter(item => item?.statusText === "declined")
								?.length
					  )
					: 0,
				color: "var(--tile)",
			},
		],
		navigate = useNavigate();

	useEffect(() => {
		if (auth?.user?.privilege !== "superadmin") {
			let findTitle = "viewmanageupgrade";

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
			<Container>
				<ThreeBoxBar list={upgradeArr} />
				<UserListOne />
			</Container>
		</div>
	);
};

export default UpgradeMain;

export const UserListOne = () => {
	const { upgrade, manageUpgrade } = useContext(GlobalState);
	let [data, setData] = useState(null),
		[isOpen, setIsOpen] = useState(false),
		[loading, setLoading] = useState(false),
		[loading2, setLoading2] = useState(false),
		[submit, setSubmit] = useState(false),
		[mainUser, setMainUser] = useState(null),
		[reason, setReason] = useState(""),
		toggle = () => {
			if (isOpen) {
				setMainUser(null);
			}
			setIsOpen(!isOpen);
		};

	useEffect(() => {
		setData(upgrade?.upgrade);
	}, [upgrade?.upgrade]);

	useEffect(() => {
		if (submit && upgrade?.isUpdated) {
			setIsOpen(false);
			setMainUser(null);
			setSubmit(false);
			setReason("");
		}
	}, [submit, upgrade?.isUpdated]);

	if (!data) return;

	let handleSubmit = type => async () => {
		if (type === "decline") if (!reason) return;

		if (type === "approve") setLoading(true);
		else setLoading2(true);

		await manageUpgrade({ ...mainUser, reason }, type);
		if (type === "approve") setLoading2(false);
		else setLoading2(false);

		setSubmit(true);
	};

	return (
		<div className="pb-5 my-5">
			<div className="bland row mx-0 py-3 text-capitalize">
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend">
					Name
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend">
					date
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend">
					Email
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend">
					privilege
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend">
					status
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend text-center">
					Action
				</div>
			</div>
			<div className="bland2 row mx-0">
				{data?.length === 0 ? (
					<EmptyComponent subtitle={"Request list is empty"} />
				) : (
					data?.map((item, index) => (
						<div key={index} className="row mx-0 p-3 border-bottom">
							<div className="col fontReduce2 textTrunc my-auto">
								<div className="d-flex align-items-center w-100">
									<img
										src={item?.user?.avatar ? item?.user?.avatar?.url : user}
										alt="User"
										className="img-fluid rounded-circle d-none d-md-flex imgFluid"
										style={{
											height: "3rem",
											width: "3rem",
										}}
									/>
									<span className="fontInherit my-0 ps-0 ps-md-1 textTrunc textTrunc2 fontReduce w-100">
										{item?.user?.lastName} {item?.user?.firstName}
									</span>
								</div>
							</div>
							<div className="col fontReduce2 textTrunc my-auto ">
								{moment(item?.createdAt).format("L")}
							</div>
							<div className="col fontReduce2 textTrunc my-auto ">
								{item?.user?.email}
							</div>
							<div className="col fontReduce2 textTrunc my-auto  text-capitalize">
								{item?.user?.privilege}
							</div>
							<div className="col fontReduce2 textTrunc my-auto  text-capitalize">
								{item?.statusText}
							</div>
							<div
								className="col fontReduce2 textTrunc my-auto myCursor text-center"
								onClick={
									!item?.status
										? () => {
												setMainUser(item);
												toggle();
										  }
										: () => {}
								}>
								<BiCog className="iconDash" />
							</div>
						</div>
					))
				)}
			</div>
			<ModalComponents
				title={`Manage ${mainUser?.user?.lastName} ${mainUser?.user?.firstName}'s Request`}
				isOpen={isOpen}
				back={toggle}>
				<div className="mb-3">
					<label htmlFor="Decline">If decline, Give reason</label>
					<textarea
						name="Decline"
						className="form-control py-3"
						placeholder="Give reason for the decline"
						value={reason}
						onChange={e => setReason(e.target.value)}
						style={{
							resize: "none",
							height: "10rem",
						}}></textarea>
				</div>
				<div className="d-flex w-100">
					<div className="btn-group w-50 mx-auto">
						<Buttons
							title={"approve"}
							css="btn-success2 btn-success text-capitalize py-3 w-50 my-4 mx-auto"
							width={"w-50"}
							loading={loading}
							onClick={handleSubmit("approve")}
						/>
						<Buttons
							title={"decline"}
							css="btn-danger2 btn-danger text-capitalize py-3 w-50 my-4 mx-auto"
							width={"w-50"}
							loading={loading2}
							onClick={handleSubmit("decline")}
						/>
					</div>
				</div>
			</ModalComponents>
		</div>
	);
};
