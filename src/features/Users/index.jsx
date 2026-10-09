import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { BiCog } from "react-icons/bi";
import { useNavigate, useParams } from "@/lib/router";
import { GlobalState } from "@/Data/Context";
import { ModalComponents } from "@/features/DefaultHeader";
import { Buttons, EmptyComponent } from "@/Utils";
import { AddNotification } from "@/features/Notification";
import LoadMore, { BottomTab } from "@/features/LoadMore";
const avatar = "/assets/avatar3.png";
const icon1 = "/assets/analythics.png";
const icon2 = "/assets/oding.png";
const icon3 = "/assets/money.png";
import { ClipLoader } from "react-spinners";
import { HiThumbDown, HiThumbUp } from "react-icons/hi";
import { MakeBonus } from "@/views/app/wallets/give-bonus";
import { downloadExcel } from "react-export-table-to-excel";
import { MainPaginate, MainRanger } from "@/features/Transactions";
import { DataNetworkList } from "@/features/Products/airtime";
import { CgBalanceComponent } from "@/features/Products/CgWallet";
import { MakeWallet } from "@/views/app/wallets/manual";
import Skeleton from "@/components/ui/Skeleton";

const Users = () => {
	return <div>Users</div>;
};

export default Users;

export const ThreeBoxBar = ({ list, setSubActive }) => {
	let navigate = useNavigate();
	return (
		<>
			<div className="row mx-0 g-2 g-md-4 py-3 py-md-5">
				{list?.map((item, index) => (
					<div
						onClick={
							setSubActive
								? () => {
										setSubActive(index);
								  }
								: item?.link
								? () => {
										navigate(item?.link);
								  }
								: () => {}
						}
						className="col-6 col-md-4 productCard"
						key={index}>
						<div
							className="row mx-0 p-3 eachProduct rounded20 text-white h-100"
							// onClick={() => (item?.link ? navigate(item?.link) : {})}
							style={{
								background: item?.color,
							}}>
							<div className="col my-auto d-none d-md-flex">
								<img src={item?.icon} className="img-fluid" alt="Icon" />
							</div>
							<div className="col my-auto">
								<p className="text2 m-0">
									{item?.loading ? <Skeleton width="6rem" height="1.4rem" /> : item?.number}
								</p>
								<h6 className="text-capitalize fontReduce2">{item?.name}</h6>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export const UserListOne = () => {
	const { users, numberWithCommas, loadAllUser, getReload, nairaSign } =
		useContext(GlobalState);
	let [data, setData] = useState(null),
		[isOpen, setIsOpen] = useState(false),
		[loading, setLoading] = useState(false),
		[mainUser, setMainUser] = useState(null),
		toggle = () => {
			if (isOpen) {
				setMainUser(null);
			}
			setIsOpen(!isOpen);
		},
		navigate = useNavigate(),
		{ page } = useParams(),
		[isUser, setIsUser] = useState(null),
		toggleNotify = () => {
			setIsUser(null);
		},
		[isDisable, setIsDisable] = useState(null),
		toggleDisable = () => {
			setIsDisable(null);
		},
		[search, setSearch] = useState("");

	useEffect(() => {
		if (search) {
			document.getElementById("Search").addEventListener("search", () => {
				getReload();
			});
			let handleSubmit = async () => {
				if (!search) return;

				await loadAllUser({
					search,
				});
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		getReload();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let handleLoadMore = async () => {
		setLoading(true);
		if (search)
			await loadAllUser({
				limit: Number(
					users?.search_paginate?.nextPage * users?.search_paginate?.limit
				),
				search,
			});
		else
			await loadAllUser({
				limit: Number(users?.paginate?.nextPage * users?.paginate?.limit),
			});
		setLoading(false);
	};

	useEffect(() => {
		if (users?.isFound)
			setData(
				page === "dashboard"
					? users?.mainSearch?.slice(0, 10)
					: users?.mainSearch
			);
		else
			setData(page === "dashboard" ? users?.users?.slice(0, 10) : users?.users);
	}, [users?.users, page, users?.isFound, users?.mainSearch]);

	let [range, setRange] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;
	if (!data) return;

	const currentItems = data.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(data.length / range);

	const handlePageClick = event => {
		const newOffset = (event.selected * range) % data.length;
		setItemOffset(newOffset);
	};

	let actionArr = [
		{
			name: "Profile",
			type: "link",
			link: `/users/profile`,
		},
		{
			name: "wallet history",
			type: "link",
			link: `/users/wallet`,
		},
		{
			name: "purchase history",
			type: "link",
			link: `/users/purchase`,
		},
		{
			name: "notification",
			type: "button",
			link: `notification`,
		},
		{ name: "disable user", type: "button", link: `disable` },
	];

	return (
		<div className="pb-5 my-5">
			{page !== "dashboard" && (
				<>
					<div className="w-50 w50 mb-3">
						<input
							type="search"
							name="search"
							id="Search"
							className="form-control w-100 py-3 borderColor2"
							placeholder="Type here to search"
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
					</div>
					<MainRanger range={range} setRange={setRange} />
				</>
			)}
			<div className="bland row mx-0 py-3 text-capitalize">
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend">
					Name
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend">
					number
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend d-none d-md-flex">
					date
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend">
					balance
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend d-none d-md-flex">
					Email
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend d-none d-md-flex">
					Wallet ID
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend text-center">
					Action
				</div>
			</div>
			<div className="bland2 row mx-0">
				{currentItems?.length === 0 ? (
					<EmptyComponent subtitle={"Users' list is empty"} />
				) : (
					currentItems?.map((item, index) => (
						<div key={index} className="row mx-0 p-3 border-bottom">
							<div className="col fontReduce2 textTrunc my-auto">
								<div className="d-flex align-items-center w-100">
									<img
										src={item?.avatar ? item?.avatar?.url : avatar}
										alt="User"
										className="img-fluid rounded-circle d-none d-md-flex imgFluid"
										style={{
											height: "3rem",
											width: "3rem",
										}}
									/>
									<span className="fontInherit my-0 ps-0 ps-md-1 textTrunc textTrunc2 fontReduce w-100">
										{item?.lastName} {item?.firstName}
									</span>
								</div>
							</div>
							<div className="col fontReduce textTrunc my-auto">
								{item?.telephone}
							</div>
							<div className="col fontReduce2 textTrunc my-auto d-none d-md-flex">
								{moment(item?.createdAt).format("DD/MM/YYYY")}
							</div>
							<div className="col fontReduce2 textTrunc my-auto d-flex w-100">
								<span className="fontInherit d-none d-md-flex me-md-1">
									{nairaSign}
								</span>{" "}
								<span>
									{numberWithCommas(Number(item?.wallet?.available).toFixed(2))}
								</span>
							</div>
							<div className="col fontReduce2 textTrunc my-auto d-none d-md-flex">
								{item?.email}
							</div>
							<div className="col fontReduce2 textTrunc my-auto d-none d-md-flex">
								{item?.wallet?.wallet_id}
							</div>
							<div
								className="col fontReduce2 textTrunc my-auto myCursor text-center"
								onClick={() => {
									setMainUser(item);
									toggle();
								}}>
								<BiCog className="iconDash" />
							</div>
							<ModalComponents
								title={"Manage User"}
								isOpen={isOpen}
								back={toggle}>
								<div className="row mx-0 g-4 g-md-5">
									{actionArr?.map((a, i) => (
										<div className="col-6 px-3" key={i}>
											<button
												onClick={
													a?.type === "button"
														? a?.link === "notification"
															? () => {
																	setIsUser(mainUser?._id);
															  }
															: a?.link === "disable"
															? () => {
																	setIsDisable(mainUser);
															  }
															: null
														: () =>
																navigate(
																	`${a?.link}/${mainUser?._id}?name=${mainUser?.lastName}_${mainUser?.firstName}`
																)
												}
												className="btn btn-outline-primary1 text-capitalize w-100 py-3">
												{a?.link === "disable"
													? `${mainUser?.status ? "Disable" : "Activate"} user`
													: a?.name}
											</button>
										</div>
									))}
								</div>
							</ModalComponents>
						</div>
					))
				)}
			</div>
			{page !== "dashboard" && (
				<>
					<MainPaginate
						handlePageClick={handlePageClick}
						pageCount={pageCount}
					/>
					<BottomTab
						state={data}
						paginate={users?.isFound ? users?.search_paginate : users?.paginate}
					/>
					<LoadMore
						next={
							users?.isFound
								? users?.search_paginate?.next
								: users?.paginate?.next
						}
						handleLoadMore={handleLoadMore}
						loading={loading}
					/>
				</>
			)}
			<AddNotification isOpen={isUser} back={toggleNotify} />
			<DisableUser
				isOpen={isDisable}
				back={toggleDisable}
				toggleAll={() => {
					setMainUser(null);
					setIsOpen(false);
				}}
			/>
		</div>
	);
};

export const DisableUser = ({ isOpen, back, toggleAll }) => {
	const { manageUserActiveness, allUsers } = useContext(GlobalState);
	let [loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false);

	useEffect(() => {
		if (submit && allUsers?.isUpdated) {
			setSubmit(false);
			toggleAll();
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, allUsers?.isUpdated]);
	// console.log({ isOpen });
	return (
		<>
			<ModalComponents
				title={`${isOpen?.status ? "Suspend" : "Activate"} User`}
				back={back}
				isOpen={isOpen ? true : false}>
				<div className="downH2 d-flex">
					<div className="my-auto w-100">
						<form className="d-flex flex-column justify-content-center align-items-center h-100 w-100">
							<p className="text2p">
								Do you want to {isOpen?.status ? "Suspend" : "Activate"} this
								user?
							</p>
							<div className="btn-group mx-auto w-50">
								<Buttons
									loading={loading}
									onClick={async e => {
										e.preventDefault();
										setLoading(true);
										await manageUserActiveness(
											isOpen._id,
											isOpen?.status ? "suspend" : "activate"
										);
										setSubmit(true);
										setLoading(false);
									}}
									width="w-50"
									css="btn-success2 text-capitalize py-3 w-50"
									title={"yes"}
								/>
								<Buttons
									onClick={back}
									width="w-50"
									css="btn-primary1 text-capitalize py-3 w-50"
									title={"no"}
								/>
							</div>
						</form>
					</div>
				</div>
			</ModalComponents>
		</>
	);
};

export const DeleteUser = ({ isOpen, back, toggleAll }) => {
	const { manageUserPrivilege, allUsers } = useContext(GlobalState);
	let [loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		handleSubmit = async e => {
			e?.preventDefault();
			setLoading(true);
			await manageUserPrivilege(
				isOpen,
				isOpen._id,
				isOpen?.privilege,
				"delete"
			);
			setSubmit(true);
			setLoading(false);
		};

	useEffect(() => {
		if (submit && allUsers?.isDeleted) {
			setSubmit(false);
			toggleAll();
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, allUsers?.isDeleted]);
	// console.log({ isOpen });
	return (
		<>
			<ModalComponents title={`Delete User`} back={back} isOpen={isOpen}>
				<div className="downH2 d-flex">
					<div className="my-auto w-100">
						<form
							className="d-flex flex-column justify-content-center align-items-center h-100 w-100"
							onSubmit={handleSubmit}>
							<p className="text2p">Do you want to delete this user?</p>
							<div className="btn-group mx-auto w-50">
								<Buttons
									loading={loading}
									onClick={handleSubmit}
									width="w-50"
									css="btn-success2 text-capitalize py-3 w-50"
									title={"yes"}
								/>
								<Buttons
									onClick={back}
									width="w-50"
									css="btn-danger text-capitalize py-3 w-50"
									title={"no"}
								/>
							</div>
						</form>
					</div>
				</div>
			</ModalComponents>
		</>
	);
};

export const AdminDetails = ({ privilege, nopag }) => {
	let {
		getReload,
		getUserPrivileges,
		numberWithCommas,
		superadmin,
		manager,
		accountant,
		developer,
		marketer,
		topuser,
		reseller,
		user,
		auth,
		nairaSign,
		manageUserActiveness,
		getUsersForExport,
		getAllUserTransactionAmount,
		customercare,
		permission,
		standalone,
	} = useContext(GlobalState);

	let [data, setData] = useState(null),
		[isOpen, setIsOpen] = useState(false),
		[loading, setLoading] = useState(false),
		[load, setLoad] = useState({ isLoad: false, loadData: "" }),
		[mainUser, setMainUser] = useState(null),
		toggle = () => {
			if (isOpen) {
				setMainUser(null);
			}
			setIsOpen(!isOpen);
		},
		navigate = useNavigate(),
		{ page } = useParams(),
		[isUser, setIsUser] = useState(null),
		toggleNotify = () => {
			setIsUser(null);
		},
		[isDisable, setIsDisable] = useState(null),
		toggleDisable = () => {
			setIsDisable(null);
		},
		[isDeleted, setIsDeleted] = useState(null),
		toggleDeleted = () => {
			setIsDeleted(null);
		},
		[isSwitch, setIsSwitch] = useState(null),
		toggleSwitch = () => {
			setIsSwitch(null);
		},
		[search, setSearch] = useState(""),
		[columnUse, setColumnUse] = useState(null);

	useEffect(() => {
		if (search) {
			document.getElementById("Search").addEventListener("search", () => {
				getReload();
			});
			let handleSubmit = async () => {
				if (!search) return;

				await getUserPrivileges(privilege, {
					search,
				});
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		getReload();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getUserPrivileges(privilege, nopag);
		getAllUserTransactionAmount(privilege);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [privilege]);

	useEffect(() => {
		if (privilege === "superadmin") setColumnUse(superadmin);
		if (privilege === "manager") setColumnUse(manager);
		if (privilege === "marketer") setColumnUse(marketer);
		if (privilege === "accountant") setColumnUse(accountant);
		if (privilege === "developer") setColumnUse(developer);
		if (privilege === "topuser") setColumnUse(topuser);
		if (privilege === "reseller") setColumnUse(reseller);
		if (privilege === "standalone") setColumnUse(standalone);
		if (privilege === "user") setColumnUse(user);
		if (privilege === "customer-care") setColumnUse(customercare);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		privilege,
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

	let [isBonus, setIsBonus] = useState(false),
		toggleBonus = () => {
			setIsBonus("");
		};

	useEffect(() => {
		if (auth?.user?.privilege !== "superadmin") {
			let findTitle = "";
			if (privilege === "user") {
				findTitle = "viewuserlist";
			} else if (privilege === "reseller") {
				findTitle = "viewresellerlist";
			} else if (privilege === "standalone") {
				findTitle = "viewstandalonelist";
			} else if (privilege === "agent") {
				findTitle = "viewagentlist";
			} else if (privilege === "topuser") {
				findTitle = "viewtopuserlist";
			} else if (privilege === "manager") {
				findTitle = "viewmanagerlist";
			} else if (privilege === "marketer") {
				findTitle = "viewmarketerlist";
			} else if (privilege === "developer") {
				findTitle = "viewdeveloperlist";
			} else if (privilege === "accountant") {
				findTitle = "viewaccountantlist";
			} else if (privilege === "customer-care") {
				findTitle = "viewcustomercarelist";
			}

			let findPermit = permission?.data?.find(
				item =>
					item?.slug === findTitle && item?.user?.includes(auth?.user?._id)
			);
			if (!findPermit) {
				navigate(-1);
			}
		}
	}, [auth?.user, permission?.data, privilege, navigate]);

	let [isCgWallet, setIsCgWallet] = useState(null),
		[debit, setDebit] = useState(false);

	let [isCredit, setIsCredit] = useState(false),
		toggleCredit = () => {
			setIsCredit("");
		};

	let [isDebit, setIsDebit] = useState(false),
		toggleDebit = () => {
			setIsDebit("");
		};

	let handleLoadMore = async () => {
		setLoading(true);
		if (search)
			await getUserPrivileges(privilege, {
				limit: Number(
					columnUse?.search_paginate?.nextPage *
						columnUse?.search_paginate?.limit
				),
				search,
			});
		else
			await getUserPrivileges(privilege, {
				limit: Number(
					columnUse?.paginate?.nextPage * columnUse?.paginate?.limit
				),
			});
		setLoading(false);
	};

	useEffect(() => {
		if (columnUse?.isFound)
			setData(
				page === "dashboard"
					? columnUse?.mainSearch?.slice(0, 10)
					: columnUse?.mainSearch
			);
		else
			setData(
				page === "dashboard" ? columnUse?.data?.slice(0, 10) : columnUse?.data
			);
	}, [
		// eslint-disable-next-line react-hooks/exhaustive-deps
		columnUse?.data,
		page,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		columnUse?.isFound,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		columnUse?.mainSearch,
		privilege,
		manager?.isAdded,
		developer?.isAdded,
		superadmin?.isAdded,
		marketer?.isAdded,
		accountant?.isAdded,
		user?.isAdded,
		reseller?.isAdded,
		standalone?.isAdded,
		topuser?.isAdded,
		customercare?.isAdded,
		manager?.isUpdated,
		developer?.isUpdated,
		superadmin?.isUpdated,
		marketer?.isUpdated,
		accountant?.isUpdated,
		user?.isUpdated,
		reseller?.isUpdated,
		standalone?.isUpdated,
		topuser?.isUpdated,
		customercare?.isUpdated,
	]);
	let [range, setRange] = useState(10),
		[down, setDown] = useState(false);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;
	if (!data) return;

	const currentItems = data.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(data.length / range);

	const handlePageClick = event => {
		const newOffset = (event.selected * range) % data.length;
		setItemOffset(newOffset);
	};

	let actionArr = [
		{
			name: "Profile",
			type: "link",
			link: `/users/profile`,
		},
		{
			name: "wallet history",
			type: "link",
			link: `/users/wallet`,
		},
		{
			name: "purchase history",
			type: "link",
			link: `/users/purchase`,
		},
		{
			name: "notification",
			type: "button",
			link: `notification`,
		},
		{
			name: "give bonus",
			type: "button",
			link: `bonus`,
		},
		{ name: "disable user", type: "button", link: `disable` },
		{ name: "credit user", type: "button", link: `credit` },
		{ name: "debit user", type: "button", link: `debit` },
		{
			name: "Credit CG Wallet",
			type: "button",
			link: `cgwallet`,
		},
		{
			name: "Debit CG Wallet",
			type: "button",
			link: `cgwalletdebit`,
		},
		{ name: "switch privilege", type: "button", link: `switch` },
		{ name: "delete user", type: "button", link: `delete` },
	];

	if (["Teetop Digital"]?.includes(process.env.REACT_APP_NAME)) {
		actionArr = [
			...actionArr,
			{
				name: "wallet activity history",
				type: "link2",
				link: `/users/wallet/admin`,
			},
			{
				name: "transaction activity history",
				type: "link2",
				link: `/users/purchase/admin`,
			},
		];
	}

	// The user list is loaded only now (not at login): just this privilege, nothing is stored.
	let handleDownloadExcel = async () => {
		if (down) return;
		setDown(true);
		try {
			const list = await getUsersForExport(privilege);
			if (!list) return;
			const dataset = list
				.filter(item => item?.privilege === privilege)
				.map((item, i) => ({
					index: i + 1,
					firstName: item?.firstName,
					lastName: item?.lastName,
					email: item?.email,
					telephone: item?.telephone,
					wallet_id: item?.wallet?.wallet_id,
					createdAt: moment(item?.createdAt).format("Do MMMM, YYYY. hh:mm A"),
				}));
			downloadExcel({
				fileName: `${process.env.REACT_APP_NAME} User Data ${moment().format(
					"DDMMYYYYHHmmA"
				)}`,
				sheet: "User Data",
				tablePayload: {
					header: [
						"S/N",
						"Firstname",
						"Lastname",
						"Email",
						"Telephone",
						"Wallet ID",
						"Registered on",
					],
					body: dataset,
				},
			});
		} finally {
			setDown(false);
		}
	};

	return (
		<>
			<div className="py-5">
				{page !== "dashboard" && (
					<>
						<div className="w-50 w50 mb-3">
							<input
								type="search"
								name="search"
								id="Search"
								className="form-control w-100 py-3 borderColor2"
								placeholder="Type here to search"
								value={search}
								onChange={e => setSearch(e.target.value)}
							/>
						</div>
						{(columnUse?.paginate?.total || columnUse?.all?.length || 0) > 0 && (
							<>
								<div className="d-flex justify-content-end align-items-center w-100">
									<Buttons
										loading={down}
										onClick={handleDownloadExcel}
										title="download excel"
										css="btn-primary1 text-capitalize py-2 py-md-3 px-3 pm-md-5"
										width="btn"
									/>
								</div>
							</>
						)}
						<MainRanger range={range} setRange={setRange} />
					</>
				)}
				<div className="bland row mx-0 py-3 text-capitalize">
					<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend">
						Name
					</div>
					<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend">
						number
					</div>
					<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend d-none d-md-flex">
						date
					</div>
					<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend d-none d-md-flex">
						Email
					</div>
					<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend">
						balance
					</div>
					<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend d-none d-md-flex">
						Wallet ID
					</div>
					<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend text-center">
						Action
					</div>
				</div>
				<div className="bland2 row mx-0">
					{currentItems?.length === 0 ? (
						<EmptyComponent subtitle={`${privilege}' list is empty`} />
					) : (
						currentItems?.map((item, index) => (
							<div key={index} className="row mx-0 p-3 border-bottom">
								<div className="col fontReduce2 textTrunc my-auto">
									<div className="d-flex align-items-center w-100">
										<img
											src={item?.avatar ? item?.avatar?.url : avatar}
											alt="User"
											className="img-fluid rounded-circle d-none d-md-flex imgFluid"
											style={{
												height: "3rem",
												width: "3rem",
											}}
										/>
										<span className="fontInherit my-0 ps-0 ps-md-1 textTrunc textTrunc2 fontReduce w-100">
											{item?.firstName} {item?.lastName}
										</span>
									</div>
								</div>
								<div className="col fontReduce textTrunc my-auto">
									{item?.telephone}
								</div>
								<div className="col fontReduce2 textTrunc my-auto d-none d-md-flex">
									{moment(item?.createdAt).format("DD/MM/YYYY")}
								</div>
								<div className="col fontReduce2 textTrunc my-auto d-none d-md-flex">
									{item?.email}
								</div>
								<div className="col fontReduce2 textTrunc my-auto d-flex w-100">
									<span className="fontInherit d-none d-md-flex me-md-1">
										{nairaSign}
									</span>{" "}
									<span>
										{item?.wallet?.available
											? numberWithCommas(
													Number(item?.wallet?.available).toFixed(2)
											  )
											: 0}
									</span>
								</div>
								<div className="col fontReduce2 textTrunc my-auto d-none d-md-flex">
									{item?.wallet?.wallet_id}
								</div>
								<div className="col fontReduce2 textTrunc my-auto myCursor text-center d-flex align-items-center justify-content-end">
									{auth?.user?._id === item?._id ? null : (
										<>
											<span
												title={`${item?.status ? "Suspend" : "Activate"} ${
													item?.privilege
												}`}
												onClick={async () => {
													setLoad({ isLoad: true, loadData: item?._id });
													await manageUserActiveness(
														item._id,
														item?.status ? "suspend" : "activate"
													);
													setLoad({ isLoad: false, loadData: "" });
												}}
												className="text-capitalize p-1 p-md-2 fontReduce2">
												{load?.isLoad && load?.loadData === item?._id ? (
													<ClipLoader color="black" size={16} />
												) : item?.status ? (
													<HiThumbDown className="iconDash" color="green" />
												) : (
													<HiThumbUp className="iconDash" color="red" />
												)}
											</span>
											<span
												title="More actions"
												className="text-capitalize p-1 p-md-2 fontReduce2"
												onClick={
													auth?.user?._id === item?._id
														? () => {}
														: () => {
																setMainUser(item);
																toggle();
														  }
												}>
												<BiCog className="iconDash" />
											</span>
										</>
									)}
								</div>
							</div>
						))
					)}
				</div>
				<>
					<>
						{page !== "dashboard" && (
							<>
								<MainPaginate
									handlePageClick={handlePageClick}
									pageCount={pageCount}
								/>
							</>
						)}
						<BottomTab
							state={data}
							paginate={
								columnUse?.isFound
									? columnUse?.search_paginate
									: columnUse?.paginate
							}
						/>
						<LoadMore
							next={
								columnUse?.isFound
									? columnUse?.search_paginate?.next
									: columnUse?.paginate?.next
							}
							handleLoadMore={handleLoadMore}
							loading={loading}
						/>
					</>
				</>
			</div>
			<AddNotification isOpen={isUser} back={toggleNotify} />
			<MakeBonus isOpen={isBonus} back={toggleBonus} user={isBonus?._id} />
			<MakeWallet
				isOpen={isCredit}
				back={toggleCredit}
				user={isCredit?.wallet?.wallet_id}
				amount={isCredit?.wallet}
			/>
			<MakeWallet
				isOpen={isDebit}
				back={toggleDebit}
				user={isDebit?.wallet?.wallet_id}
				debit
				amount={isDebit?.wallet}
			/>
			<DisableUser
				isOpen={isDisable}
				back={toggleDisable}
				toggleAll={() => {
					setMainUser(null);
					setIsOpen(false);
				}}
			/>
			<DeleteUser
				isOpen={isDeleted}
				back={toggleDeleted}
				toggleAll={() => {
					setMainUser(null);
					setIsOpen(false);
				}}
			/>
			<SwitchUser
				isOpen={isSwitch}
				back={toggleSwitch}
				toggleAll={() => {
					setMainUser(null);
					setIsOpen(false);
				}}
			/>
			<CgWallet
				isOpen={isCgWallet}
				setIsOpen={setIsCgWallet}
				user={isCgWallet?._id}
				debit={debit}
				setDebit={setDebit}
				amount={isCgWallet?.wallet}
			/>
			<ModalComponents
				title={`Manage ${mainUser?.isAdmin ? "Admin" : "User"}`}
				isOpen={isOpen}
				back={toggle}>
				<div className="row mx-0 g-4 g-md-5">
					{actionArr
						?.filter(item =>
							mainUser?.isAdmin ? item?.link !== "switch" : item
						)
						?.filter(item =>
							!mainUser?.isAdmin ? item?.type !== "link2" : item
						)
						?.filter(item =>
							!["reseller", "standalone"]?.includes(mainUser?.privilege)
								? item?.link !== "cgwallet" && item?.link !== "cgwalletdebit"
								: item
						)
						?.map((a, i) => (
							<div className="col-6 px-3" key={i}>
								<button
									onClick={
										a?.type === "button"
											? a?.link === "notification"
												? () => {
														setIsUser(mainUser?._id);
												  }
												: a?.link === "bonus"
												? () => {
														setIsBonus(mainUser);
												  }
												: a?.link === "disable"
												? () => {
														setIsDisable(mainUser);
												  }
												: a?.link === "cgwallet"
												? () => {
														setIsCgWallet(mainUser);
												  }
												: a?.link === "cgwalletdebit"
												? () => {
														setIsCgWallet(mainUser);
														setDebit(mainUser);
												  }
												: a?.link === "credit"
												? () => {
														setIsCredit(mainUser);
												  }
												: a?.link === "debit"
												? () => {
														setIsDebit(mainUser);
												  }
												: a?.link === "delete"
												? () => {
														setIsDeleted(mainUser);
												  }
												: a?.link === "switch"
												? () => {
														setIsSwitch(mainUser);
												  }
												: null
											: a?.type === "link2"
											? () =>
													navigate(a?.link, {
														state: mainUser,
													})
											: () =>
													navigate(
														`${a?.link}/${mainUser?._id}?name=${mainUser?.firstName}_${mainUser?.lastName}`,
														{
															state: mainUser,
														}
													)
									}
									className="btn btn-outline-primary1 text-capitalize w-100 py-3">
									{a?.link === "disable"
										? `${mainUser?.status ? "Disable" : "Activate"} user`
										: a?.name}
								</button>
							</div>
						))}
				</div>
			</ModalComponents>
		</>
	);
};

export const MakeAdmin = ({ isOpen, back, datum, privilege }) => {
	let {
		manager,
		manageUserPrivilege,
		superadmin,
		accountant,
		developer,
		marketer,
		topuser,
		reseller,
		user,
		customercare,
		standalone,
	} = useContext(GlobalState);
	let init = {
			firstName: "",
			lastName: "",
			email: "",
			status: "active",
			telephone: "",
			privilege,
		},
		[state, setState] = useState(init),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			},
		[shouldEdit, setShouldEdit] = useState(false),
		[newLoad, setNewLoad] = useState(false),
		[submit, setSubmit] = useState(false),
		[columnUse, setColumnUse] = useState(null);

	useEffect(() => {
		if (datum) {
			setState(datum);
			setShouldEdit(true);
		}
	}, [datum]);

	let handleSubmit = async e => {
		e?.preventDefault();
		if (!state?.lastName || !state?.firstName || !state?.email) return;

		setNewLoad(true);
		await manageUserPrivilege(
			{ ...state, privilege },
			datum ? datum?._id : false,
			privilege
		);
		setNewLoad(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (privilege === "superadmin") setColumnUse(superadmin);
		if (privilege === "manager") setColumnUse(manager);
		if (privilege === "marketer") setColumnUse(marketer);
		if (privilege === "accountant") setColumnUse(accountant);
		if (privilege === "developer") setColumnUse(developer);
		if (privilege === "topuser") setColumnUse(topuser);
		if (privilege === "reseller") setColumnUse(reseller);
		if (privilege === "standalone") setColumnUse(standalone);
		if (privilege === "user") setColumnUse(user);
		if (privilege === "customer-care") setColumnUse(customercare);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		privilege,
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
		if (submit && columnUse?.isAdded) {
			setSubmit(false);
			setState(init);
			back();
		}
		if (submit && columnUse?.isUpdated) {
			setSubmit(false);
			setState(init);
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, columnUse?.isAdded, columnUse?.isUpdated]);

	return (
		<>
			<ModalComponents
				title={
					datum ? `update ${datum?.firstName} data` : `add ${privilege} data`
				}
				isOpen={isOpen}
				back={back}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<div className="mb-4">
							<label htmlFor="value">Firstname</label>
							<input
								type={"text"}
								placeholder="Name"
								className="form-control py-3"
								value={state?.firstName}
								onChange={textChange("firstName")}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="value">Lastname</label>
							<input
								type={"text"}
								placeholder="Name"
								className="form-control py-3"
								value={state?.lastName}
								onChange={textChange("lastName")}
							/>
						</div>
						{!shouldEdit && (
							<div className="mb-4">
								<label htmlFor="value">Email</label>
								<input
									type={"email"}
									placeholder="example@mail.com"
									className="form-control py-3"
									value={state?.email}
									onChange={textChange("email")}
								/>
							</div>
						)}
						<div className="mb-4">
							<label htmlFor="value">Telephone</label>
							<input
								type={"tel"}
								placeholder="080 0000 000"
								className="form-control py-3"
								value={state?.telephone}
								onChange={textChange("telephone")}
							/>
						</div>
						{shouldEdit && (
							<div className="mb-4">
								<label htmlFor="value">Status</label>
								<select
									name="Status"
									className="form-control py-3"
									value={state?.status}
									onChange={textChange("status")}
									id="">
									<option value="">Select status</option>
									<option value="enable">Active</option>
									<option value="disable">Inactive</option>
								</select>
							</div>
						)}
						<Buttons
							title={datum ? `update ${privilege}` : `add ${privilege}`}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
							width={"w-50 w50"}
							onClick={handleSubmit}
							style={{ borderRadius: "30px" }}
							loading={newLoad}
						/>
					</form>
				</div>
			</ModalComponents>
		</>
	);
};

export const PrivilegeTopper = ({ privilege }) => {
	let {
			numberWithCommas,
			superadmin,
			manager,
			accountant,
			developer,
			marketer,
			topuser,
			reseller,
			user,
			nairaSignNeutral,
			allUsers,
			customercare,
			standalone,
		} = useContext(GlobalState),
		[columnUse, setColumnUse] = useState(null);

	useEffect(() => {
		if (privilege === "superadmin") setColumnUse(superadmin);
		if (privilege === "manager") setColumnUse(manager);
		if (privilege === "marketer") setColumnUse(marketer);
		if (privilege === "accountant") setColumnUse(accountant);
		if (privilege === "developer") setColumnUse(developer);
		if (privilege === "topuser") setColumnUse(topuser);
		if (privilege === "reseller") setColumnUse(reseller);
		if (privilege === "standalone") setColumnUse(standalone);
		if (privilege === "user") setColumnUse(user);
		if (privilege === "customer-care") setColumnUse(customercare);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		privilege,
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

	let usersArr = [
		{
			icon: icon1,
			name: `total ${privilege ? privilege : "users"}`,
			number: columnUse?.paginate?.total
				? numberWithCommas(columnUse?.paginate?.total)
				: 0,
			color: "var(--tile)",
		},
		{
			icon: icon2,
			name: "total transactions",
			number: `${nairaSignNeutral}${numberWithCommas(
				Number(
					allUsers?.details?.[privilege?.replace("-", "")]?.transactions ||
						columnUse?.transactions ||
						0
				).toFixed(2)
			)}`,
			color: "var(--tile)",
			link: "/transactions",
		},
		{
			icon: icon3,
			name: "wallet balance",
			number: `${nairaSignNeutral}${numberWithCommas(
				Number(
					allUsers?.details?.[privilege?.replace("-", "")]?.wallet ||
						columnUse?.wallet ||
						0
				).toFixed(2)
			)}`,
			color: "var(--tile)",
			link: "/wallets/manage-wallet",
		},
	];
	return (
		<>
			<ThreeBoxBar list={usersArr} />
		</>
	);
};

const SwitchUser = ({ isOpen, back, toggleAll }) => {
	const { manageUserActiveness, user, reseller, topuser, standalone } =
		useContext(GlobalState);
	let [loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[privilege, setPrivilege] = useState(""),
		[columnUse, setColumnUse] = useState(null);

	useEffect(() => {
		setPrivilege(isOpen?.privilege);
	}, [isOpen?.privilege]);

	useEffect(() => {
		if (privilege === "topuser") setColumnUse(topuser);
		if (privilege === "reseller") setColumnUse(reseller);
		if (privilege === "standalone") setColumnUse(standalone);
		if (privilege === "user") setColumnUse(user);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [privilege, topuser, reseller, user, standalone]);

	useEffect(() => {
		if (submit && columnUse?.isUpdated) {
			setSubmit(false);
			toggleAll();
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, columnUse?.isUpdated]);
	// console.log({ isOpen });

	let switchcase = [
		{
			name: "Top user",
			case: "topuser",
		},
		{
			name: "Reseller",
			case: "reseller",
		},
		{
			name: "User",
			case: "user",
		},
	];
	if (
		["Teetop Digital", "TEETOP DIGITAL"]?.includes(process.env.REACT_APP_NAME)
	)
		switchcase = [...switchcase, { name: "Standalone", case: "standalone" }];

	return (
		<>
			<ModalComponents
				title={`Switch User Privilege`}
				back={back}
				isOpen={isOpen}>
				<div className="downH2 d-flex">
					<div className="my-auto w-100">
						<form className="d-flex flex-column justify-content-center align-items-center h-100 w-100">
							<div className="w-100 d-block py-5">
								<label htmlFor="Privilege" className="Lexend">
									Switch privilege from {isOpen?.privilege}
								</label>
								<div className="row mx-0 g-3">
									{switchcase?.map((item, i) => (
										<div className="col p-2" key={i}>
											<div
												className={`btn ${
													privilege === item?.case
														? "btn-primary1"
														: "btn-outline-primary1"
												} w-100 h-100 text-capitalize py-3 py-md-5 rounded20`}
												onClick={() => setPrivilege(item?.case)}>
												{item?.name}
											</div>
										</div>
									))}
								</div>
							</div>
							<div className="btn-group mx-auto w-50">
								<Buttons
									loading={loading}
									onClick={async e => {
										e.preventDefault();
										if (privilege === isOpen?.privilege) return;
										setLoading(true);
										await manageUserActiveness(isOpen._id, privilege, "put");
										setSubmit(true);
										setLoading(false);
									}}
									width="w-50"
									css="btn-success2 text-capitalize py-3 w-50"
									title={"yes"}
								/>
								<Buttons
									onClick={back}
									width="w-50"
									css="btn-primary1 text-capitalize py-3 w-50"
									title={"no"}
								/>
							</div>
						</form>
					</div>
				</div>
			</ModalComponents>
		</>
	);
};

export const CgWallet = ({
	isOpen,
	setIsOpen,
	user,
	debit,
	setDebit,
	amount,
}) => {
	let { manageCGWalletHistory, cgwalletHistory, category } =
		useContext(GlobalState);

	let init = {
			category: "",
			volume: "",
			size: "",
		},
		[state, setState] = useState(init),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		handleSubmit = async e => {
			e?.preventDefault();
			setLoading(true);
			console.log({
				state,
				newData: {
					...state,
					user,
					category: category?.data?.find(
						item => item?.categoryId === state?.category
					)?._id,
				},
			});
			await manageCGWalletHistory(debit && user ? "put" : "post", {
				...state,
				user,
				category: category?.data?.find(
					item => item?.categoryId === state?.category
				)?._id,
			});
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (submit && cgwalletHistory?.isAdded) {
			setState(init);
			setSubmit(false);
			setIsOpen(false);
			if (setDebit) setDebit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, cgwalletHistory?.isAdded]);

	return (
		<>
			<ModalComponents
				title={`
				${debit ? "Debit" : "Credit"}
				 CG Wallet`}
				isOpen={isOpen ? true : false}
				toggle={() => {
					setIsOpen(false);
					setState(init);
				}}>
				<h2 className="my-3 text-center Lexend">
					Stock
					{debit ? "Debit" : "Purchase"}
				</h2>
				{amount ? (
					<>
						<CgBalanceComponent cgBalance={amount?.cgBalance} col={"col-6"} />
					</>
				) : null}
				<form className="w-100" onSubmit={handleSubmit}>
					{/* <div className="mb-4">
						<label htmlFor="Category">Category</label>
						<select
							className="form-control py-3 py-md-4 text-capitalize form-select"
							name="category"
							placeholder="Category"
							value={data?.category}
							onChange={e => setState({ ...state, category: e.target.value })}
							id="category">
							<option value="">select category</option>
							{category?.data
								?.filter(item => item?.product?.name === "data")
								?.map((item, i) => (
									<option value={item?._id} key={i}>
										{item?.name}
									</option>
								))}
						</select>
					</div> */}
					<div className="mb-4">
						<label htmlFor="Category">Category</label>

						<DataNetworkList
							state={state?.category}
							setState={i => {
								setState({ ...state, category: i });
							}}
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="Name">Volume</label>
						<input
							type="number"
							className="form-control py-3"
							value={state?.volume}
							onChange={e => setState({ ...state, volume: e.target.value })}
							placeholder="Volume"
							min={0}
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="Size">Size</label>
						<select
							className="form-control py-3 py-md-4 text-capitalize form-select"
							name="size"
							placeholder="Size"
							value={state?.size}
							onChange={e => setState({ ...state, size: e.target.value })}
							id="size">
							<option value="">select size</option>
							<option value="MB">MB</option>
							<option value="GB">GB</option>
							<option value="TB">TB</option>
						</select>
					</div>
					{/* <div className="mb-4">
						<label htmlFor="Newtwork">Network</label>
						<NetworkList
							state={state?.network}
							setState={i => {
								setState({ ...state, network: i });
							}}
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="Education">{state?.network} Cgwallet</label>
						<select
							className="form-control py-3 py-md-4 text-capitalize form-select"
							name="cgwallet"
							placeholder="Education"
							value={state?.cgwallet}
							onChange={e => setState({ ...state, cgwallet: e.target.value })}
							id="cgwallet">
							<option value="">select cgwallet</option>
							{data?.map((it, i) => (
								<option value={it?._id} key={i}>
									{it?.volume} {it?.size} {it?.category?.name} / NGN{" "}
									{numberWithCommas(
										it?.amount ? Number(it?.amount).toFixed(2) : 0
									)}
								</option>
							))}
						</select>
					</div> */}
					<Buttons
						title={debit ? "debit" : "purchase"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
						loading={loading}
						onClick={handleSubmit}
					/>
				</form>
			</ModalComponents>
		</>
	);
};
