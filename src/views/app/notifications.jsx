import React, { useState, useContext, useEffect } from "react";
import Container from "@/components/ui/Container";
import { GlobalState } from "@/Data/Context";
import moment from "moment";
import { BiMessageSquareDots, BiTrashAlt } from "react-icons/bi";
import { BsBellFill, BsEye, BsLaptopFill } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { IoPlayOutline } from "react-icons/io5";
import { HiOutlinePause } from "react-icons/hi2";
import { useParams, useSearchParams } from "@/lib/router";
import { EmptyComponent, Buttons } from "@/Utils";

const user = "/assets/avatar3.png";
import { toast } from "react-toastify";
import LoadMore, { BottomTab } from "@/features/LoadMore";
import { ModalComponents } from "@/features/DefaultHeader";
import { UserTypeSelect } from "@/views/app/wallets/give-bonus";
import { MainPaginate, MainRanger } from "@/features/Transactions";
import { UploadPicture } from "@/views/app/sliders";

const MainNotification = () => {
	const {
		notifications,
		getNotificationsFrom,
		getNotificationsTo,
		setStateName,
	} = useContext(GlobalState);
	let [stateNotify, setStateNotify] = useState(null),
		[stateNotify2, setStateNotify2] = useState(null),
		[loading, setLoading] = useState(false),
		[active, setActive] = useState(0);

	useEffect(() => {
		setStateName("send notification");
		getNotificationsFrom();
		getNotificationsTo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let handleLoadMore = async () => {
		setLoading(true);
		await getNotificationsFrom({
			limit: Number(
				notifications?.notifications_paginate?.nextPage *
					notifications?.notifications_paginate?.limit
			),
		});
		setLoading(false);
	};

	let handleLoadMore2 = async () => {
		setLoading(true);
		await getNotificationsTo({
			limit: Number(
				notifications?.notify_paginate?.nextPage *
					notifications?.notify_paginate?.limit
			),
		});
		setLoading(false);
	};

	useEffect(() => {
		setStateNotify(notifications?.notifications);
	}, [notifications?.notifications]);

	useEffect(() => {
		setStateNotify2(notifications?.notify);
	}, [notifications?.notify]);

	if (!stateNotify || !stateNotify2) return <></>;

	let notifyTab = [
		{
			name: "Outgoing notifications",
		},
		{
			name: "Incoming notifications",
		},
	];

	return (
		<div className="bg-white aboutScreen bg-white">
			<Container className="py-5">
				<NotifyBlock />
				<>
					<div className="btn-group w-100 mt-5">
						{notifyTab.map((item, ind) => (
							<button
								className={`btn w-100 fontReduce ${
									active === ind ? "border-bottom rounded-none" : ""
								}`}
								onClick={() => setActive(ind)}
								key={ind}>
								{item?.name}
							</button>
						))}
					</div>
					{active === 1 ? (
						<>
							<NotificationTwo
								state={stateNotify2}
								paginate={notifications?.notify_paginate}
							/>
							<LoadMore
								next={notifications?.notify_paginate?.next}
								handleLoadMore={handleLoadMore2}
								loading={loading}
							/>
						</>
					) : (
						<>
							<Notification
								state={stateNotify}
								paginate={notifications?.notifications_paginate}
							/>
							<LoadMore
								next={notifications?.notifications_paginate?.next}
								handleLoadMore={handleLoadMore}
								loading={loading}
							/>
						</>
					)}
				</>
			</Container>
		</div>
	);
};

export default MainNotification;

const Notification = ({ state, paginate }) => {
	const { manageNotify, notifications } = useContext(GlobalState);
	let [state2, setState2] = useState(null),
		[isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		},
		[stateData, setStateData] = useState({
			title: "",
			message: "",
		}),
		textChange =
			name =>
			({ target: { value } }) => {
				setStateData({ ...stateData, [name]: value });
			},
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[isProgress, setProgress] = useState(null),
		[isDelete, setDelete] = useState(null),
		handleDelete = async () => {
			setLoading(true);
			await manageNotify(isDelete, isDelete?._id, "delete");
			setLoading(false);
			setSubmit(true);
		},
		handleProgress = async () => {
			setLoading(true);
			await manageNotify(isProgress, isProgress?._id, "status");
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (submit && notifications?.isDeleted) {
			setDelete(false);
			setProgress(false);
			setSubmit(false);
		}
	}, [submit, notifications?.isDeleted]);

	let [range, setRange] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;
	if (!state) return;

	const currentItems = state.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(state.length / range);

	const handlePageClick = event => {
		const newOffset = (event.selected * range) % state.length;
		setItemOffset(newOffset);
	};

	return (
		<div className="py-5">
			<MainRanger setRange={setRange} range={range} />
			{/* <SearchComponent /> */}
			<div className="list-group-item-secondary px-2 py-3 row mx-0">
				<span className="text-uppercase col fontReduce d-none d-md-flex">
					s/n
				</span>
				<span className="text-uppercase col text-center fontReduce">type</span>
				<span className="text-uppercase col text-center fontReduce">title</span>
				<span className="text-uppercase col text-center fontReduce">
					target
				</span>
				<span className="text-uppercase col text-center fontReduce">
					date&time
				</span>
				<span className="text-uppercase col textRight text-center fontReduce">
					action
				</span>
			</div>
			{currentItems?.length === 0 ? (
				<EmptyComponent subtitle={"No available data"} />
			) : (
				currentItems?.map((item, i) => (
					<div
						className={`row mx-0 ${(i + 1) % 3 === 0 ? "bg-light" : ""}`}
						key={i}>
						<span className="text-capitalize px-2 py-3 col fontReduce d-md-flex d-none">
							{i + 1}
						</span>

						<span className="px-1 py-3 col text-center text-capitalize fontReduce">
							{item?.type}
						</span>
						<span className="px-1 py-3 col text-center fontReduce">
							{item?.title}
						</span>
						<span className="px-1 py-3 col text-center fontReduce tw-capitalize">
							{item?.target}
						</span>
						<span className="px-1 py-3 col text-center fontReduce">
							{moment(item?.createdAt).format("DD/MM/YYYY hh:mm A")}
						</span>
						<span className="px-1 py-3 col text-md-right text-center myCursor fontReduce">
							<span className="d-flex align-items-center justify-content-center">
								{item?.status ? (
									<span
										className="me-2 myCursor"
										onClick={() => {
											setProgress(item);
										}}>
										{item?.status === "play" ? (
											<IoPlayOutline />
										) : (
											<HiOutlinePause />
										)}
									</span>
								) : (
									<span className="me-2"></span>
								)}
								<span
									onClick={() => {
										setIsOpen(true);
										setState2(item);
									}}>
									<BsEye className="me-2" />{" "}
								</span>
								<BiTrashAlt
									size={20}
									onClick={() => {
										setDelete(item);
									}}
									className="text-danger text-danger2 text-capitalize"
								/>
							</span>
						</span>
					</div>
				))
			)}
			<MainPaginate handlePageClick={handlePageClick} pageCount={pageCount} />
			<BottomTab state={state} paginate={paginate} />
			<MainNotify
				isOpen={isOpen}
				toggle={toggle}
				title={`view ${state2?.title} notification`}
				state={state2}
				textChange={textChange}
				readOnly
			/>
			<ModalComponents
				isOpen={isDelete ? true : false}
				back={() => {
					setDelete(false);
				}}
				success="text-danger text-danger2"
				title={`Delete Notification`}>
				<div className="downH2 d-flex flex-column">
					<div className="mb-3 text-center">
						Do you want to delete this notification?
					</div>
					<Buttons
						title={"delete"}
						css="btn-danger2 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
						loading={loading}
						onClick={handleDelete}
					/>
				</div>
			</ModalComponents>
			<ModalComponents
				isOpen={isProgress ? true : false}
				back={() => {
					setProgress(false);
				}}
				success="text-danger text-danger2"
				title={`${
					isProgress?.status === "play" ? "Pause" : "Play"
				} Notification`}>
				<div className="downH2 d-flex flex-column">
					<div className="mb-3 text-center">
						Do you want to {isProgress?.status === "play" ? "pause" : "play"}{" "}
						this notification?
					</div>
					<div className="w-100 d-flex">
						<div className="btn-group mx-auto w-50">
							<Buttons
								onClick={handleProgress}
								loading={loading}
								title={"yes"}
								css="btn btn-success2 text-uppercase py-3"
								width={"auto"}
							/>
							<button
								className="btn btn-danger text-uppercase py-3"
								onClick={() => setProgress(false)}>
								no
							</button>
						</div>
					</div>
				</div>
			</ModalComponents>
		</div>
	);
};

export const NotifyBlock = () => {
	const { sendNotification, notifications } = useContext(GlobalState);
	let params = useParams(),
		[getSearch] = useSearchParams();
	let notify = [
		{
			name: "create SMS",
			link: "sms",
			icon: <BiMessageSquareDots color="#3c0b5b" size={26} />,
			color: "#3c0b5b",
			background:
				"var(--tile)",
		},
		{
			name: "create push",
			link: "push",
			icon: <BsBellFill color="#3c0b5b" size={26} />,
			color: "#3c0b5b",
			background:
				"var(--tile)",
		},
		{
			name: "create in-app",
			link: "in-app",
			icon: <BsLaptopFill color="#3c0b5b" size={26} />,
			color: "#3c0b5b",
			background:
				"var(--tile)",
		},
		{
			name: "create email",
			link: "email",
			icon: <HiMail color="#3c0b5b" size={26} />,
			color: "#3c0b5b",
			background:
				"var(--tile)",
		},
	];

	let [state, setState] = useState(null),
		[isOpen, setIsOpen] = useState(false),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[image, setImages] = useState(null),
		toggle = () => {
			setIsOpen(!isOpen);
		},
		init = {
			title: "",
			message: "",
			user: "all",
			type: state?.link === "in-app" ? "notification" : state?.link,
			recipients:
				params?.page === "notifications" ? "" : getSearch?.get("user"),
		},
		[stateData, setStateData] = useState(init),
		textChange =
			name =>
			({ target: { value, type, title, checked } }) => {
				setStateData({
					...stateData,
					[name]:
						type === "radio" ? title : type === "checkbox" ? checked : value,
				});
			},
		handleSubmit = async e => {
			e?.preventDefault();
			let data =
				params?.page === "notifications"
					? {
							...stateData,
							type: state?.link === "in-app" ? "notification" : state?.link,
					  }
					: {
							...stateData,
							user: null,
							type: state?.link === "in-app" ? "notification" : state?.link,
					  };

			if (image) data.image = image;
			if (!data?.title || !data?.message)
				return toast.info("Notification title and message is required");
			setLoading(true);
			await sendNotification(data);
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (submit && notifications?.isAdded) {
			setSubmit(false);
			setIsOpen(false);
			setStateData(init);
			setImages(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, notifications?.isAdded]);

	return (
		<div className="tw-w-5/6 tw-mx-auto tw-grid tw-gap-7 lg:tw-grid-cols-4">
			{notify?.map((item, i) => (
				<div
					className="col p-2 miniBox eachProduct notifyBox"
					onClick={() => {
						setIsOpen(true);
						setState(item);
					}}
					key={i}>
					<div
						className="rounded h-100 py-3 px-5 myCursor d-flex flex-column"
						style={{
							background: item?.background,
						}}>
						<div className="d-flex align-items-center justify-content-center">
							<div
								className="d-flex align-items-center justify-content-center bg-white rounded-circle"
								style={{
									height: "4rem",
									width: "4rem",
								}}>
								{item?.icon}
							</div>
						</div>
						<h6 className="text-center text-capitalize text2p mt-auto lexendFont fontReduceBig">
							{item?.name}
						</h6>
					</div>
				</div>
			))}
			<MainNotify
				isOpen={isOpen}
				toggle={toggle}
				handleSubmit={handleSubmit}
				title={`Create ${state?.link} notification`}
				state={stateData}
				loading={loading}
				textChange={textChange}>
				{params?.page === "notifications" && (
					<>
						<UserTypeSelect
							state={stateData?.user}
							textChange={textChange}
							name="user"
						/>
						{state?.link === "in-app" && (
							<UploadPicture img={image} setImages={setImages} />
						)}
					</>
				)}
			</MainNotify>
		</div>
	);
};

export const DefaultNotification = () => {
	const { notifications, getNotificationsUser } = useContext(GlobalState);
	let [getSearch] = useSearchParams(),
		[state, setState] = useState(null),
		[loading, setLoading] = useState(false);

	let handleLoadMore = async () => {
		setLoading(true);

		await getNotificationsUser({
			user: getSearch?.get("user"),
			limit: Number(
				notifications?.paginate_user?.nextPage *
					notifications?.paginate_user?.limit
			),
		});
		setLoading(false);
	};

	useEffect(() => {
		if (getSearch?.get("user") && notifications?.user_notification)
			setState(notifications?.user_notification);
	}, [getSearch, notifications?.user_notification]);

	useEffect(() => {
		if (getSearch?.get("user"))
			getNotificationsUser({ user: getSearch?.get("user") });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getSearch]);
	// getNotificationsUser;

	return (
		<Container className="py-5">
			<div className="bg-white p-4 rounded mainHeight">
				<NotifyBlock />
				<Notification state={state} paginate={notifications?.paginate_user} />
				<LoadMore
					next={notifications?.paginate_user?.next}
					handleLoadMore={handleLoadMore}
					loading={loading}
				/>
			</div>
		</Container>
	);
};

export const NotificationTwo = ({ state, paginate }) => {
	const { auth, readNotification, manageNotify, notifications } =
		useContext(GlobalState);
	let [state2, setState2] = useState(null),
		[isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		},
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[isDelete, setDelete] = useState(null),
		[isReply, setIsReply] = useState(false),
		toggleNotify = () => {
			setIsReply(null);
		},
		handleDelete = async () => {
			setLoading(true);
			await manageNotify(isDelete, isDelete?._id, "delete");
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (isReply && notifications?.isAdded) {
			setIsReply(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isReply, notifications?.isAdded]);

	useEffect(() => {
		if (state2) {
			if (!state2?.isNotifiedTo?.includes(auth?.user?._id))
				manageNotify(null, state2?._id, "prior");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state2, auth?.user]);

	useEffect(() => {
		if (submit && notifications?.isDeleted) {
			setDelete(false);
			setSubmit(false);
		}
	}, [submit, notifications?.isDeleted]);

	useEffect(() => {
		if (isOpen && state2) {
			let markasRead = async () => {
				let unread = !state2?.isReadAdmin?.find(
					li => li?._id === auth?.user?._id
				);
				// console.log({ unread });
				if (unread) {
					await readNotification(state2?._id);
				}
			};
			markasRead();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state2, isOpen]);

	let [range, setRange] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;
	if (!state) return;

	const currentItems = state.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(state.length / range);

	const handlePageClick = event => {
		const newOffset = (event.selected * range) % state.length;
		setItemOffset(newOffset);
	};
	// console.log({ state2 });
	return (
		<div className="py-5">
			<MainRanger setRange={setRange} range={range} />
			<div className="list-group-item-secondary px-2 py-3 row mx-0">
				<span className="text-uppercase col fontReduce d-none d-md-flex">
					s/n
				</span>
				<span className="text-uppercase col text-center fontReduce">title</span>
				<span className="text-uppercase col text-center fontReduce">user</span>
				<span className="text-uppercase col text-center fontReduce">
					date&time
				</span>
				<span className="text-uppercase col textRight text-center fontReduce">
					action
				</span>
			</div>
			{currentItems?.length === 0 ? (
				<EmptyComponent subtitle={"No available data"} />
			) : (
				currentItems?.map((item, i) => (
					<div
						className={`row mx-0 ${(i + 1) % 3 === 0 ? "bg-light" : ""}`}
						key={i}>
						<span className="text-capitalize px-2 py-3 col fontReduce d-none d-md-flex">
							{i + 1}
						</span>
						<span className="px-1 py-3 col text-center text-capitalize fontReduce">
							{item?.title}
						</span>
						<span className="px-1 py-3 col text-center text-capitalize fontReduce textTrunc">
							{`${
								item?.admin
									? `${item?.admin?.firstName} ${item?.admin?.lastName}(admin)`
									: `${item?.user?.firstName} ${item?.user?.lastName}`
							}`}
						</span>
						<span className="px-1 py-3 col text-center fontReduce">
							{moment(item?.createdAt).format("DD/MM/YYYY hh:mm A")}
						</span>
						<span className="px-1 py-3 col text-md-right text-center myCursor fontReduce">
							<span className="d-flex align-items-center justify-content-center">
								<span
									onClick={() => {
										setIsOpen(true);
										setState2(item);
									}}>
									<BsEye className="me-2" />{" "}
								</span>
								<BiTrashAlt
									size={20}
									onClick={() => {
										setDelete(item);
									}}
									className="text-danger text-danger2 text-capitalize"
								/>
							</span>
						</span>
					</div>
				))
			)}
			<MainPaginate handlePageClick={handlePageClick} pageCount={pageCount} />
			<BottomTab state={state} paginate={paginate} />
			<ModalComponents
				isOpen={isOpen}
				back={toggle}
				title={`view ${state2?.title} notification`}>
				<div className="d-flex downH2 flex-column">
					<p className="d-grid listGrid">
						<span>Avatar:</span>{" "}
						{state2?.admin ? (
							<img
								src={
									state2?.admin?.avatar?.url ? state2?.admin?.avatar?.url : user
								}
								alt="Admin"
								style={{
									height: "10rem",
									width: "10rem",
									objectFit: "cover",
									objectPosition: "center 15%",
								}}
								className="rounded-circle img-fluid me-auto"
							/>
						) : (
							<img
								src={
									state2?.user?.avatar?.url ? state2?.user?.avatar?.url : user
								}
								alt="User"
								style={{
									height: "10rem",
									width: "10rem",
									objectFit: "cover",
									objectPosition: "center 15%",
								}}
								className="rounded-circle img-fluid me-auto"
							/>
						)}
					</p>
					<p className="d-grid listGrid">
						<span>User:</span>{" "}
						<span className="text-capitalize">
							{`${
								state2?.admin
									? `${state2?.admin?.firstName} ${state2?.admin?.lastName}(admin)`
									: `${state2?.user?.firstName} ${state2?.user?.lastName}`
							}`}
						</span>
					</p>
					<p className="d-grid listGrid">
						<span>Title:</span>{" "}
						<span className="text-capitalize">{state2?.title}</span>
					</p>
					<p className="d-grid listGrid">
						<span>Message:</span> <span className="">{state2?.message}</span>
					</p>
					<p className="d-grid listGrid">
						<span>Date&time:</span>{" "}
						<span className="">
							{moment(state2?.createdAt).format("DD/MM/YYYY hh:mm A")}
						</span>
					</p>
					<div className="ms-auto d-flex align-items-center">
						{state2?.title === "notification" && (
							<button
								onClick={() => {
									setIsReply(true);
								}}
								className="btn btn-light text-capitalize d-block ms-auto me-2">
								reply
							</button>
						)}
						<button
							className="btn btn-danger-2 btn-danger2 d-block ms-auto me-2"
							onClick={toggle}>
							Close
						</button>
					</div>
				</div>
			</ModalComponents>
			<ModalComponents
				isOpen={isDelete ? true : false}
				back={() => {
					setDelete(false);
				}}
				success="text-danger text-danger2"
				title={`Delete Notification`}>
				<div className="downH2 d-flex flex-column">
					<div className="mb-3 text-center">
						Do you want to delete this notification?
					</div>
					<div className="w-100 d-flex">
						<div className="btn-group mx-auto w-50">
							<Buttons
								onClick={handleDelete}
								loading={loading}
								title={"yes"}
								css="btn btn-success2 text-uppercase py-3"
								width={"auto"}
							/>
							<button
								className="btn btn-danger text-uppercase py-3"
								onClick={() => setDelete(false)}>
								no
							</button>
						</div>
					</div>
				</div>
			</ModalComponents>
			<AddNotification
				isOpen={isReply}
				back={toggleNotify}
				reply={state2?._id}
			/>
		</div>
	);
};

export const MainNotify = ({
	toggle,
	isOpen,
	title,
	children,
	handleSubmit,
	state,
	textChange,
	loading,
	readOnly,
}) => {
	return (
		<ModalComponents
			title={title ? title : "Notification"}
			back={toggle}
			isOpen={isOpen}>
			{children}
			<NotifyForm
				handleSubmit={handleSubmit}
				state={state}
				textChange={textChange}
				loading={loading}
				readOnly={readOnly}
			/>
		</ModalComponents>
	);
};

export const NotifyForm = ({
	handleSubmit,
	state,
	textChange,
	loading,
	readOnly,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			{readOnly && state?.image?._id && (
				<img
					src={state?.image?.url}
					alt={state?.image?.name}
					className={`img-fluid rounded imgFluid img-contain`}
					style={{
						height: "auto",
						width: "100%",
					}}
				/>
			)}
			<div className="form-floating mb-3">
				<input
					type="text"
					readOnly={readOnly}
					required
					name="Title"
					placeholder="Title"
					className="form-control bg-grey"
					value={state?.title}
					onChange={textChange("title")}
				/>
				<label htmlFor="title">Title</label>
			</div>
			<div className="form-floating mb-3">
				<input
					type="url"
					value={state?.linkURL}
					onChange={textChange("linkURL")}
					className="form-control bg-grey"
					placeholder="Link URL"
					readOnly={readOnly}
					name="Link URL"
				/>
				<label htmlFor="URL">Link URL</label>
			</div>
			<div className="form-floating mb-3">
				<textarea
					readOnly={readOnly}
					required
					name="Message"
					placeholder="Message"
					className="form-control bg-grey"
					value={state?.message}
					onChange={textChange("message")}
					style={{
						height: "10rem",
						resize: "none",
					}}
				/>
				<label htmlFor="message">Message</label>
			</div>
			{!readOnly && (
				<Buttons
					title={"send"}
					onClick={handleSubmit}
					css="btn btn-primary1 text-capitalize py-3 w-50 d-block mx-auto my-4"
					width={"w-50"}
					loading={loading}
				/>
			)}
		</form>
	);
};

export const AddNotification = ({ isOpen, back, reply, general }) => {
	let { manageNotify, notifications } = useContext(GlobalState);

	let init = {
			recipients: isOpen,
			message: "",
			reply,
			multiple: general ? general : "",
		},
		[state, setState] = useState(init),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			},
		handleSubmit = async e => {
			e?.preventDefault();
			setLoading(true);
			if (!state?.message) return;
			await manageNotify({
				...state,
				recipients: isOpen,
				reply: reply || "",
			});
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (notifications?.isAdded && submit) {
			back();
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [notifications?.isAdded, submit]);

	return (
		<>
			<ModalComponents
				isOpen={isOpen}
				back={back}
				title={general ? "General notification" : "Notification"}>
				<div className="mb-3">
					<label htmlFor="value">Message</label>
					<textarea
						className="form-control py-3 rounded10"
						value={state?.message}
						onChange={textChange("message")}
						style={{
							resize: "none",
							height: "10rem",
						}}
					/>
				</div>
				<Buttons
					title={"send"}
					css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
					width={"w-50"}
					style={{ borderRadius: "30px" }}
					loading={loading}
					onClick={handleSubmit}
				/>
			</ModalComponents>
		</>
	);
};
