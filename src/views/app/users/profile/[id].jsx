import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams, useLocation } from "@/lib/router";
import Container from "@/components/ui/Container";
import { GlobalState } from "@/Data/Context";
const userImg = "/assets/avatar3.png";
import { Buttons } from "@/Utils";
import { ModalComponents } from "@/features";
import { CgBalanceComponent } from "@/features/Products/CgWallet";
import { EditData } from "@/Data/Reducer/AuthReducer";

const UserProfile = () => {
	const {
			allUsers,
			getUserProfile,
			numberWithCommas,
			setStateName,
			nairaSign,
			manageUserActiveness,
			getPermission,
			permission,
			superadmin,
			manager,
			marketer,
			developer,
			topuser,
			reseller,
			user,
			accountant,
			customercare,
			standalone,
		} = useContext(GlobalState),
		[state, setState] = useState(null),
		[loading, setLoading] = useState(""),
		[data, setData] = useState({
			email: state?.email,
			telephone: state?.telephone,
		}),
		params = useParams(),
		[getSearch] = useSearchParams(),
		[isOpen, setIsOpen] = useState(false),
		[permit, setPermit] = useState(null),
		[submit, setSubmit] = useState(false),
		[columnUse, setColumnUse] = useState(null),
		location = useLocation();

	useEffect(() => {
		if (location?.state?.privilege === "superadmin") setColumnUse(superadmin);
		if (location?.state?.privilege === "manager") setColumnUse(manager);
		if (location?.state?.privilege === "marketer") setColumnUse(marketer);
		if (location?.state?.privilege === "accountant") setColumnUse(accountant);
		if (location?.state?.privilege === "developer") setColumnUse(developer);
		if (location?.state?.privilege === "topuser") setColumnUse(topuser);
		if (location?.state?.privilege === "reseller") setColumnUse(reseller);
		if (location?.state?.privilege === "standalone") setColumnUse(standalone);
		if (location?.state?.privilege === "customer-care")
			setColumnUse(customercare);
		if (location?.state?.privilege === "user") setColumnUse(user);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		location?.state,
		superadmin,
		manager,
		marketer,
		accountant,
		developer,
		topuser,
		reseller,
		user,
		customercare,
		standalone,
	]);

	useEffect(() => {
		setPermit(permission?.data);
	}, [permission?.data]);

	useEffect(() => {
		if (submit && allUsers?.isUpdated) {
			setState({
				email: state?.email,
				telephone: state?.telephone,
			});
			setIsOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, allUsers?.isUpdated]);

	useEffect(() => {
		setStateName(
			`${
				getSearch?.get("name")
					? getSearch?.get("name")?.split("_")?.join(" ")
					: ""
			}'s profile`
		);
		getPermission();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (columnUse?.all?.length > 0) {
			columnUse?.all?.map(item => item?._id === params?.step && setState(item));
		} else
			allUsers?.data?.map(item => item?._id === params?.step && setState(item));
	}, [allUsers?.data, params?.step, columnUse?.all]);

	// The profile opens from the Users page list when the user is in it. When it is not (page
	// refreshed, link opened directly, another page of the list) fetch just this one user,
	// instead of relying on every user having been downloaded at login.
	useEffect(() => {
		if (!params?.step) return;
		if (location?.state?.privilege && !columnUse) return; // list still being picked
		const inList =
			columnUse?.all?.some(item => item?._id === params?.step) ||
			allUsers?.data?.some(item => item?._id === params?.step);
		if (inList || state?._id === params?.step) return;

		let cancelled = false;
		getUserProfile(params?.step).then(found => {
			if (!cancelled && found) setState(prev => prev || found);
		});
		return () => {
			cancelled = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params?.step, columnUse, columnUse?.all, allUsers?.data]);

	if (!state) return;

	return (
		<div className="py-4 bg-white aboutScreen">
			<Container className="py-5">
				<div className="px-md-4 px-2 mb-5 col-lg-10">
					<div className="row mx-0 g-3 g-md-4">
						<div className="col-md order-2 order-md-1">
							<p>
								Contact:{" "}
								<strong>
									<a
										className="text-dark text-decoration-none"
										href={`tel:${state?.telephone}`}>
										{state?.telephone}
									</a>
								</strong>{" "}
							</p>
							<p>
								Email:{" "}
								<strong>
									<a
										className="text-dark text-decoration-none"
										href={`mailto:${state?.email}`}>
										{state?.email}
									</a>
								</strong>{" "}
							</p>
							<p>
								Joined since{" "}
								<strong>
									{moment(state?.createdAt).format("Do, MMMM YYYY")}
								</strong>{" "}
							</p>
						</div>
						<div className="col-md order-3 order-md-2">
							<p className="text-capitalize">
								Type: <strong>{state?.privilege}</strong>{" "}
							</p>
							<p>
								Wallet ID: <strong>{state?.wallet?.wallet_id}</strong>{" "}
							</p>
							<p>
								Status:{" "}
								<strong className="text-capitalize">{state?.statusText}</strong>{" "}
							</p>
						</div>
						<div className="col-md order-1 order-md-3">
							<img
								src={state?.avatar?.url ? state?.avatar?.url : userImg}
								alt={`img`}
								style={{
									height: "10rem",
									width: "10rem",
									objectFit: "cover",
									objectPosition: "center 15%",
								}}
								className="rounded-circle img-fluid mx-auto d-block"
							/>
							<div className="my-1">
								<h5 className="Lexend text-center">
									{state?.firstName} {state?.lastName}
								</h5>
							</div>
						</div>
					</div>
					<div className="row g-3 py-4 mx-0 align-items-center">
						<div className="col-6 col-lg-3 px-2">
							<Buttons
								loading={loading === "password"}
								onClick={async e => {
									e.preventDefault();
									setLoading("password");
									await manageUserActiveness(
										state._id,
										"password",
										null,
										null,
										data
									);
									setLoading("");
								}}
								width="auto"
								css="btn-primary1 text-capitalize py-3 px-md-5"
								title={"reset password"}
							/>
						</div>
						<div className="col-6 col-lg-3 px-2">
							<Buttons
								loading={loading === "wallet"}
								onClick={async e => {
									e.preventDefault();
									setLoading("wallet");
									await manageUserActiveness(
										state._id,
										"wallet",
										null,
										null,
										data
									);
									setLoading("");
								}}
								width="auto"
								css="btn-primary1 text-capitalize py-3 px-md-5"
								title={"reset wallet pin"}
							/>
						</div>
						<div className="col-6 col-lg-3 px-2">
							<Buttons
								loading={loading === "login"}
								onClick={async e => {
									e.preventDefault();
									setLoading("login");
									await manageUserActiveness(
										state._id,
										"login",
										null,
										null,
										data
									);
									setLoading("");
								}}
								width="auto"
								css="btn-primary1 text-capitalize py-3 px-md-5"
								title={"reset login deactivation"}
							/>
						</div>
						<div className="col-6 col-lg-3 px-2">
							<Buttons
								onClick={async e => setIsOpen(true)}
								// onClick={async e => {
								// 	e.preventDefault();
								// 	setLoading("login");
								// 	await manageUserActiveness(
								// 		state._id,
								// 		"login",
								// 		null,
								// 		null,
								// 		data
								// 	);
								// 	setLoading("");
								// }}
								width="auto"
								css="btn-primary1 text-capitalize py-3 px-md-5"
								title={"Change Email/Telephone"}
							/>
						</div>
					</div>
					<div
						className="rounded20 text-white p-4 my-3"
						style={{
							background: "var(--tile)",
							minHeight: "179px",
						}}>
						<h4 className="text-uppercase mb-3 Lexend">About me</h4>
						<p>{state?.bio}</p>
					</div>
					<div className="row mx-0 g-3 g-md-5">
						<div className="col-6 col-md p-2 order-1">
							<button className="btn btn-outline-primary1 w-100 h-100 text-capitalize py-3 py-md-5 rounded20">
								<span className="d-block">Commissions</span>
								<span>
									{nairaSign}{" "}
									{state?.wallet?.commission
										? numberWithCommas(
												Number(state?.wallet?.commission).toFixed(2)
										  )
										: 0}
								</span>
							</button>
						</div>
						<div className="col-6 col-md p-2 order-3 order-md-2">
							<button className="btn btn-outline-primary1 w-100 h-100 text-capitalize py-3 py-md-5 rounded20">
								<span className="d-block">Wallet</span>
								<span>
									{nairaSign}{" "}
									{state?.wallet?.available
										? numberWithCommas(
												Number(state?.wallet?.available).toFixed(2)
										  )
										: 0}
								</span>
							</button>
						</div>
						<div className="col-6 col-md p-2 order-2 order-md-3">
							<button className="btn btn-outline-primary1 w-100 h-100 text-capitalize py-3 py-md-5 rounded20">
								<span className="d-block">Bonus</span>
								<span>
									{nairaSign}{" "}
									{state?.wallet?.bonus
										? numberWithCommas(Number(state?.wallet?.bonus).toFixed(2))
										: 0}
								</span>
							</button>
						</div>
					</div>
					<CgBalanceComponent cgBalance={state?.wallet?.cgBalance} />
					{state?.isAdmin && state?.privilege !== "superadmin" && (
						<div className="py-5">
							<h3 className="Lexend text2">Permission Settings</h3>
							<div className="row mx-0 g-3">
								{permit
									?.sort((a, b) => a.name.localeCompare(b.name))
									?.map((item, i) => (
										<div
											className="col-6 col-md-4 p-2 d-flex align-items-center"
											key={i}>
											<PermissionCheck
												user={state?._id}
												item={item}
												setPermit={setPermit}
												permit={permit}
												i={i}
											/>
											<label
												htmlFor={`permission${i}`}
												className="text-capitalize Lexend my-0">
												{item?.name}
											</label>
										</div>
									))}
							</div>
							<Buttons
								loading={loading === "permission"}
								onClick={async e => {
									e.preventDefault();
									setLoading("permission");
									await getPermission({ permission: permit, user: state?._id });
									setLoading("");
								}}
								width="auto"
								css="btn-primary1 text-capitalize py-3 px-md-5 ms-auto mt-3 Lexend"
								title={"Update permission"}
							/>
						</div>
					)}
				</div>
			</Container>{" "}
			<ModalComponents
				isOpen={isOpen}
				toggle={() => {
					setIsOpen(false);
					setData({ email: state?.email, telephone: state?.telephone });
				}}
				title={"Change Email/Telephone"}>
				<div className="mb-3">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						required
						name="email"
						className="form-control py-3"
						value={data?.email}
						onChange={e => setData({ ...data, email: e.target.value })}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="telephone">Phone number</label>
					<input
						type="tel"
						required
						name="telephone"
						className="form-control py-3"
						value={data?.telephone}
						onChange={e => setData({ ...data, telephone: e.target.value })}
						maxLength={11}
					/>
				</div>
				<Buttons
					loading={loading === "details"}
					onClick={async e => {
						e.preventDefault();
						setLoading("details");
						await manageUserActiveness(state._id, "details", null, null, data);
						setLoading("");
						setSubmit(true);
					}}
					width="auto"
					css="btn-primary1 text-capitalize py-3 px-md-5 mx-auto"
					title={"Change Email/Telephone"}
				/>
			</ModalComponents>
		</div>
	);
};

export default UserProfile;

const PermissionCheck = ({ user, item, permit, setPermit, i }) => {
	let [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		let findUser = item?.user?.find(item => item === user);
		if (findUser) setIsChecked(true);
		else setIsChecked(false);
	}, [user, item]);

	return (
		<span className="ms-3">
			<input
				type="checkbox"
				name={`permission${i}`}
				id={`permission${i}`}
				className="form-check-input form-check form-check-inline"
				checked={isChecked}
				onChange={e => {
					let newItem = item;
					if (e.target.checked)
						newItem = { ...newItem, user: [...newItem?.user, user] };
					else
						newItem = {
							...newItem,
							user: newItem?.user?.filter(item => item !== user),
						};
					setPermit(EditData(permit, newItem));
				}}
			/>
		</span>
	);
};