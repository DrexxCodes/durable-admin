import React, { useContext, useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { GlobalState } from "@/Data/Context";
const user = "/assets/avatar3.png";
import { toast } from "react-toastify";
import { BsImage } from "react-icons/bs";
import { Buttons, EyeToggle } from "@/Utils";
import { ModalComponents } from "@/features/DefaultHeader";
import { useParams, useNavigate } from "@/lib/router";
import moment from "moment";
import { Enable2FAComponent } from "@/views/public/login";
import { useDispatch } from "react-redux";
import axios from "axios";
import PocketfiBalance from "@/components/settings/PocketfiBalance";
import PocketfiBanks from "@/components/settings/PocketfiBanks";
import { POCKETFI_BANK_OPTIONS } from "@/constants/pocketfi";
import { UPDATE_USER } from "@/Data/Actions/ActionTypes";

const MainSettings = () => {
	const { auth, updateUser, setStateName } = useContext(GlobalState);

	useEffect(() => {
		setStateName("settings");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	let [state, setState] = useState(null),
		[logo, setLogo] = useState(false),
		[isOpen, setIsOpen] = useState(false),
		[loading, setLoading] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		},
		[active, setActive] = useState(0),
		navigate = useNavigate();

	useEffect(() => {
		setState(auth?.user);
	}, [auth?.user]);

	let handleChangeImage = e => {
			const file = e.target.files[0];
			let err = "";

			if (!file) return (err = `File, ${file?.name} does not exist`);
			if (!file.type.includes("image"))
				return (err = `File, ${file?.name} format not supported`);

			if (err) {
				return toast.error(err);
			} else {
				setLogo(file);
			}
		},
		handleSubmit = type => async e => {
			if (e) e.preventDefault();
			if (type === "profile-image") {
				if (!logo) return toast.info("Image required", { auth: 10000 });
				setLoading(true);
				await updateUser({ logo }, "profile-image");
				setLoading(false);
			} else {
				if (!state?.gender && !state?.bio)
					return toast.info("Gender or bio required", { auth: 10000 });
				setLoading(true);
				await updateUser(state);
				setLoading(false);
			}
		};

	let textChange =
		name =>
		({ target: { value } }) => {
			setState({ ...state, [name]: value });
		};

	// if (!state) return;

	return (
		<div className="py-4 bg-white aboutScreen">
			<Container className="py-5">
				<div className="d-flex justify-content-between align-items-center mb-3 px-md-4 px-2">
					<div>
						<h4 className="Lexend fw-600 fontReduceBig">My Account settings</h4>
						<div>
							<button
								onClick={() => setActive(0)}
								className={`btn ${
									active !== 0 ? "btn-light" : "btn-outline-primary1"
								}
								text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-dark`}>
								profile
							</button>
							<button
								onClick={() => setActive(1)}
								className={`btn ${
									active !== 1 ? "btn-light" : "btn-outline-primary1"
								}
								text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-dark`}>
								settings
							</button>
							<button
								onClick={() => setActive(2)}
								className={`btn ${
									active !== 2 ? "btn-light" : "btn-outline-primary1"
								}
								text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-dark`}>
								enabler
							</button>
							<button
								onClick={() => navigate("/settings/app")}
								className={`btn ${
									active !== 3 ? "btn-light" : "btn-outline-primary1"
								}
								text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-dark`}>
								App Settings
							</button>
						</div>
					</div>
					<div className="d-flex align-items-center">
						<img
							src={auth?.user?.avatar?.url ? auth?.user?.avatar?.url : user}
							alt={`img`}
							style={{
								height: "7rem",
								width: "7rem",
								objectFit: "cover",
								objectPosition: "center 15%",
							}}
							className="rounded-circle img-fluid mx-3"
						/>
						<div className="d-none d-md-block">
							<h5 className="Lexend">
								{auth?.user?.firstName} {auth?.user?.lastName}
							</h5>
							<small className="text-uppercase">{auth?.user?.privilege}</small>
						</div>
					</div>
				</div>
				{active === 2 ? (
					<EnablerSettings />
				) : active === 1 ? (
					<GeneralSettings />
				) : (
					<ProfileSetup
						state={state}
						textChange={textChange}
						handleChangeImage={handleChangeImage}
						handleSubmit={handleSubmit}
						toggle={toggle}
						logo={logo}
						loading={loading}
						isOpen={isOpen}
					/>
				)}
			</Container>
		</div>
	);
};

export default MainSettings;

const ProfileSetup = ({
	state,
	textChange,
	isOpen,
	toggle,
	logo,
	handleChangeImage,
	handleSubmit,
	loading,
}) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { auth, usecase } = useContext(GlobalState);

	let [isRequest, setIsRequest] = useState(""),
		closeRequest = () => {
			setIsRequest("");
		};

	return (
		<>
			<div className="px-md-4 px-2 mb-5">
				<h5 className="Lexend fw-600 fontReduceBig">Profile</h5>
				<p className="fontReduce2">Upload phone and personal details here</p>
				<h5 className="mt-3 Lexend fw-600 fontReduceBig">Photos</h5>
				<div className="d-flex align-items-center">
					<img
						src={state?.avatar?.url ? state?.avatar?.url : user}
						alt={`img`}
						style={{
							height: "4rem",
							width: "4rem",
							objectFit: "cover",
							objectPosition: "center 15%",
						}}
						className="rounded-circle img-fluid mx-3"
					/>
					<div className="d-flex align-items-center">
						{/* <button
							className={`btn btn-outline-primary1 text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-dark`}>
							remove
						</button> */}
						<button
							onClick={toggle}
							className={`btn btn-light text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-dark`}>
							change
						</button>
						<ModalComponents
							isOpen={isOpen}
							back={toggle}
							title="Update profile image">
							<div className="d-flex">
								<div className="mx-auto position-relative">
									<img
										src={
											logo
												? URL.createObjectURL(logo)
												: state?.avatar?.url
												? state?.avatar.url
												: user
										}
										alt={state?.firstName}
										style={{
											height: "15rem",
											width: "15rem",
										}}
										className="rounded-circle img-fluid mx-auto"
									/>
									<div className="file_upload d-flex myCursor mt-auto ms-auto justify-content-end">
										<BsImage
											size={22}
											title="Upload image"
											className="mx-2 myCursor statusIcon"
										/>
										<input
											title="Upload file"
											type="file"
											name="file"
											id="file"
											multiple
											className="myCursor"
											accept="image/*"
											onChange={handleChangeImage}
										/>
									</div>
									{logo && (
										<Buttons
											onClick={handleSubmit("profile-image")}
											loading={logo && loading}
											css="btn btn-primary1 text-capitalize py-3 my-4"
											title={"Update profile image"}
										/>
									)}
								</div>
							</div>
						</ModalComponents>
					</div>
				</div>
			</div>
			<ProfileForm state={state} textChange={textChange} />
			<div className="d-flex justify-content-end my-3">
				<div className="d-flex align-items-center">
					<Buttons
						onClick={handleSubmit("update")}
						loading={!logo && loading}
						width=""
						css="btn-primary1 text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-white"
						title={"save"}
					/>
					<button
						className={`btn btn-outline-primary1 text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-primary1`}>
						cancel
					</button>
				</div>
			</div>
			{!auth?.user?.isAdmin && (
				<div>
					{auth?.user?.privilege !== "reseller" &&
						usecase?.usecase?.resellerUpgrade === "enable" && (
							<button
								onClick={() => setIsRequest("reseller")}
								className="btn btn-primary1
								text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-3 fontReduce2 text-white">
								become a reseller
							</button>
						)}
					{auth?.user?.privilege !== "topuser" &&
						usecase?.usecase?.topuserUpgrade === "enable" && (
							<button
								onClick={() => setIsRequest("topuser")}
								className="btn btn-primary1
								text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-3 fontReduce2 text-white">
								become a topuser
							</button>
						)}
					{["Teetop Digital", "TEETOP DIGITAL"]?.includes(
						process.env.REACT_APP_NAME
					) &&
						auth?.user?.privilege !== "standalone" &&
						usecase?.usecase?.standaloneUpgrade === "enable" && (
							<button
								onClick={() => setIsRequest("standalone")}
								className="btn btn-primary1
								text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-3 fontReduce2 text-white">
								become a standalone
							</button>
						)}
				</div>
			)}
			<WalletPinBox />
			<PasswordBox />
			<Enable2FABox />
			<BecomeAgent isOpen={isRequest} back={closeRequest} />
		</>
	);
};

const BecomeAgent = ({ isOpen, back }) => {
	let {
		usecase,
		upgrade,
		numberWithCommas,
		manageUpgrade,
		returnErrors,
		nairaSignNeutral,
	} = useContext(GlobalState);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	let init = {
			privilege: isOpen,
			websiteURL: "",
			businessName: "",
			stateOfResidence: "",
			dateOfBirth: "",
			ninNumber: "",
		},
		[state, setState] = useState(init),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			},
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		handleSubmit = async () => {
			let errArr = [];

			if (!state?.businessName)
				errArr.push({
					msg: "Business name is required",
					param: "businessName",
				});
			if (!state?.stateOfResidence)
				errArr.push({
					msg: "State of residence is required",
					param: "stateOfResidence",
				});
			if (!state?.dateOfBirth)
				errArr.push({ msg: "Date of birth is required", param: "dateOfBirth" });
			if (!state?.ninNumber)
				errArr.push({ msg: "NIN number is required", param: "ninNumber" });
			if (errArr?.length > 0)
				return returnErrors({
					error: errArr,
				});

			setLoading(true);
			await manageUpgrade({ ...state, privilege: isOpen });
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (submit && upgrade?.isAdded) {
			back();
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, upgrade]);

	return (
		<>
			<ModalComponents
				isOpen={isOpen ? true : false}
				back={back}
				title={`Become a ${isOpen}`}>
				<div>
					<div className="mb-3">
						<label htmlFor="businessName">Business name</label>
						<input
							type="text"
							name="businessName"
							value={state?.businessName}
							onChange={textChange("businessName")}
							placeholder="Your Business Name"
							className="form-control py-3"
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="websiteURL">Website URL</label>
						<input
							type="url"
							name="websiteURL"
							value={state?.websiteURL}
							onChange={textChange("websiteURL")}
							placeholder="Your Website URL"
							className="form-control py-3"
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="ninNumber">NIN</label>
						<input
							type="text"
							name="ninNumber"
							value={state?.ninNumber}
							onChange={textChange("ninNumber")}
							placeholder="Your NIN number"
							className="form-control py-3"
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="stateOfResidence">State of Residence</label>
						<input
							type="text"
							name="stateOfResidence"
							value={state?.stateOfResidence}
							onChange={textChange("stateOfResidence")}
							placeholder="Your State of Residence"
							className="form-control py-3"
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="dateOfBirth">Date of birth</label>
						<input
							type="date"
							name="dateOfBirth"
							value={state?.dateOfBirth}
							onChange={textChange("dateOfBirth")}
							placeholder="Your Date of Birth"
							className="form-control py-3"
							max={moment().format("YYYY-MM-DD")}
						/>
					</div>
					<Buttons
						title={`Proceed ${nairaSignNeutral} ${
							isOpen === "reseller"
								? numberWithCommas(
										Number(usecase?.usecase?.resellerUpgradeFee).toFixed()
								  )
								: isOpen === "standalone"
								? numberWithCommas(
										Number(usecase?.usecase?.standaloneUpgradeFee).toFixed()
								  )
								: numberWithCommas(
										Number(usecase?.usecase?.topuserUpgradeFee).toFixed(2)
								  )
						} `}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
						loading={loading}
						onClick={handleSubmit}
					/>
				</div>
			</ModalComponents>
		</>
	);
};

const GeneralSettings = () => {
	const { settings, getSettings, nairaSign } = useContext(GlobalState);

	let [mtnCommission, setMTNCommission] = useState(""),
		[gloCommission, setGLOCommission] = useState(""),
		[airtelCommission, setAIRTELCommission] = useState(""),
		[mobile9Commission, set9MobileCommission] = useState(""),
		[mtnCardCommission, setMTNCardCommission] = useState(""),
		[gloCardCommission, setGLOCardCommission] = useState(""),
		[airtelCardCommission, setAIRTELCardCommission] = useState(""),
		[mobile9CardCommission, set9MobileCardCommission] = useState(""),
		[cablesCommission, setCablesCommission] = useState(""),
		[bulkSMSCharge, setbulkSMSCharge] = useState(""),
		[educationCommission, setEducationCommission] = useState(""),
		[electricityCommission, setElectricityCommission] = useState(""),
		[mtnResellerCommission, setMTNResellerCommission] = useState(""),
		[gloResellerCommission, setGLOResellerCommission] = useState(""),
		[airtelResellerCommission, setAIRTELResellerCommission] = useState(""),
		[mobile9ResellerCommission, set9MobileResellerCommission] = useState(""),
		[mtnCardResellerCommission, setMTNCardResellerCommission] = useState(""),
		[gloCardResellerCommission, setGLOCardResellerCommission] = useState(""),
		[airtelCardResellerCommission, setAIRTELCardResellerCommission] =
			useState(""),
		[mobile9CardResellerCommission, set9MobileCardResellerCommission] =
			useState(""),
		[cablesResellerCommission, setCablesResellerCommission] = useState(""),
		[educationResellerCommission, setEducationResellerCommission] =
			useState(""),
		[electricityResellerCommission, setElectricityResellerCommission] =
			useState(""),
		[mtnStandaloneCommission, setMTNStandaloneCommission] = useState(""),
		[gloStandaloneCommission, setGLOStandaloneCommission] = useState(""),
		[airtelStandaloneCommission, setAIRTELStandaloneCommission] = useState(""),
		[mobile9StandaloneCommission, set9MobileStandaloneCommission] =
			useState(""),
		[mtnCardStandaloneCommission, setMTNCardStandaloneCommission] =
			useState(""),
		[gloCardStandaloneCommission, setGLOCardStandaloneCommission] =
			useState(""),
		[airtelCardStandaloneCommission, setAIRTELCardStandaloneCommission] =
			useState(""),
		[mobile9CardStandaloneCommission, set9MobileCardStandaloneCommission] =
			useState(""),
		[cablesStandaloneCommission, setCablesStandaloneCommission] = useState(""),
		[educationStandaloneCommission, setEducationStandaloneCommission] =
			useState(""),
		[electricityStandaloneCommission, setElectricityStandaloneCommission] =
			useState(""),
		// [airtimeToCashCommission, setAirtimeToCashCommission] = useState(""),
		[stateData, setStateData] = useState(null),
		[loading, setLoading] = useState(false),
		[loadingType, setLoadingType] = useState(false),
		[submit, setSubmit] = useState(false);

	useEffect(() => {
		setStateData(settings?.settings);
	}, [settings?.settings]);
	useEffect(() => {
		if (stateData) {
			setMTNCommission(stateData?.mtnCommission);
			setGLOCommission(stateData?.gloCommission);
			setAIRTELCommission(stateData?.airtelCommission);
			set9MobileCommission(stateData?.mobile9Commission);
			setMTNCardCommission(stateData?.mtnCardCommission);
			setGLOCardCommission(stateData?.gloCardCommission);
			setAIRTELCardCommission(stateData?.airtelCardCommission);
			set9MobileCardCommission(stateData?.mobile9CardCommission);
			setCablesCommission(stateData?.cablesCommission);
			setbulkSMSCharge(stateData?.bulkSMSCharge);
			setEducationCommission(stateData?.educationCommission);
			setElectricityCommission(stateData?.electricityCommission);
			setMTNResellerCommission(stateData?.mtnResellerCommission);
			setGLOResellerCommission(stateData?.gloResellerCommission);
			setAIRTELResellerCommission(stateData?.airtelResellerCommission);
			set9MobileResellerCommission(stateData?.mobile9ResellerCommission);
			setMTNCardResellerCommission(stateData?.mtnCardResellerCommission);
			setGLOCardResellerCommission(stateData?.gloCardResellerCommission);
			setAIRTELCardResellerCommission(stateData?.airtelCardResellerCommission);
			set9MobileCardResellerCommission(
				stateData?.mobile9CardResellerCommission
			);
			setCablesResellerCommission(stateData?.cablesResellerCommission);
			setEducationResellerCommission(stateData?.educationResellerCommission);
			setElectricityResellerCommission(
				stateData?.electricityResellerCommission
			);
			setMTNStandaloneCommission(stateData?.mtnStandaloneCommission);
			setGLOStandaloneCommission(stateData?.gloStandaloneCommission);
			setAIRTELStandaloneCommission(stateData?.airtelStandaloneCommission);
			set9MobileStandaloneCommission(stateData?.mobile9StandaloneCommission);
			setMTNCardStandaloneCommission(stateData?.mtnCardStandaloneCommission);
			setGLOCardStandaloneCommission(stateData?.gloCardStandaloneCommission);
			setAIRTELCardStandaloneCommission(
				stateData?.airtelCardStandaloneCommission
			);
			set9MobileCardStandaloneCommission(
				stateData?.mobile9CardStandaloneCommission
			);
			setCablesStandaloneCommission(stateData?.cablesStandaloneCommission);
			setEducationStandaloneCommission(
				stateData?.educationStandaloneCommission
			);
			setElectricityStandaloneCommission(
				stateData?.electricityStandaloneCommission
			);
			// setAirtimeToCashCommission(stateData?.airtimeToCashCommission);
		}
	}, [stateData]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (submit && settings?.isUpdated) {
			setSubmit(false);
		}
	}, [settings?.isUpdated, submit]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// console.log({ settings });

	let handleSubmit = type => async () => {
		if (type === "mtnCommission") if (!mtnCommission) return;
		if (type === "gloCommission") if (!gloCommission) return;
		if (type === "airtelCommission") if (!airtelCommission) return;
		if (type === "mobile9Commission") if (!mobile9Commission) return;
		if (type === "mtnCardCommission") if (!mtnCardCommission) return;
		if (type === "gloCardCommission") if (!gloCardCommission) return;
		if (type === "airtelCardCommission") if (!airtelCardCommission) return;
		if (type === "mobile9CardCommission") if (!mobile9CardCommission) return;
		if (type === "cablesCommission") if (!cablesCommission) return;
		if (type === "bulkSMSCharge") if (!bulkSMSCharge) return;
		if (type === "electricityCommission") if (!electricityCommission) return;
		// if (type === "airtimeToCashCommission")
		// 	if (!airtimeToCashCommission) return;
		if (type === "educationCommission") if (!educationCommission) return;
		if (type === "mtnResellerCommission") if (!mtnResellerCommission) return;
		if (type === "gloResellerCommission") if (!gloResellerCommission) return;
		if (type === "airtelResellerCommission")
			if (!airtelResellerCommission) return;
		if (type === "mobile9ResellerCommission")
			if (!mobile9ResellerCommission) return;
		if (type === "mtnCardResellerCommission")
			if (!mtnCardResellerCommission) return;
		if (type === "gloCardResellerCommission")
			if (!gloCardResellerCommission) return;
		if (type === "airtelCardResellerCommission")
			if (!airtelCardResellerCommission) return;
		if (type === "mobile9CardResellerCommission")
			if (!mobile9CardResellerCommission) return;
		if (type === "cablesResellerCommission")
			if (!cablesResellerCommission) return;
		if (type === "electricityResellerCommission")
			if (!electricityResellerCommission) return;
		// if (type === "airtimeToCashCommission")
		// 	if (!airtimeToCashCommission) return;
		if (type === "educationResellerCommission")
			if (!educationResellerCommission) return;
		if (type === "mtnStandaloneCommission")
			if (!mtnStandaloneCommission) return;
		if (type === "gloStandaloneCommission")
			if (!gloStandaloneCommission) return;
		if (type === "airtelStandaloneCommission")
			if (!airtelStandaloneCommission) return;
		if (type === "mobile9StandaloneCommission")
			if (!mobile9StandaloneCommission) return;
		if (type === "mtnCardStandaloneCommission")
			if (!mtnCardStandaloneCommission) return;
		if (type === "gloCardStandaloneCommission")
			if (!gloCardStandaloneCommission) return;
		if (type === "airtelCardStandaloneCommission")
			if (!airtelCardStandaloneCommission) return;
		if (type === "mobile9CardStandaloneCommission")
			if (!mobile9CardStandaloneCommission) return;
		if (type === "cablesStandaloneCommission")
			if (!cablesStandaloneCommission) return;
		if (type === "electricityStandaloneCommission")
			if (!electricityStandaloneCommission) return;
		if (type === "educationStandaloneCommission")
			if (!educationStandaloneCommission) return;

		let data;
		if (type === "mtnCommission")
			data = {
				mtnCommission: mtnCommission ? mtnCommission : stateData?.mtnCommission,
			};
		if (type === "gloCommission")
			data = {
				gloCommission: gloCommission ? gloCommission : stateData?.gloCommission,
			};
		if (type === "airtelCommission")
			data = {
				airtelCommission: airtelCommission
					? airtelCommission
					: stateData?.airtelCommission,
			};
		if (type === "mobile9Commission")
			data = {
				mobile9Commission: mobile9Commission
					? mobile9Commission
					: stateData?.mobile9Commission,
			};
		if (type === "mtnCardCommission")
			data = {
				mtnCardCommission: mtnCardCommission
					? mtnCardCommission
					: stateData?.mtnCardCommission,
			};
		if (type === "gloCardCommission")
			data = {
				gloCardCommission: gloCardCommission
					? gloCardCommission
					: stateData?.gloCardCommission,
			};
		if (type === "airtelCardCommission")
			data = {
				airtelCardCommission: airtelCardCommission
					? airtelCardCommission
					: stateData?.airtelCardCommission,
			};
		if (type === "mobile9CardCommission")
			data = {
				mobile9CardCommission: mobile9CardCommission
					? mobile9CardCommission
					: stateData?.mobile9CardCommission,
			};
		if (type === "cablesCommission")
			data = {
				cablesCommission: cablesCommission
					? cablesCommission
					: stateData?.cablesCommission,
			};
		if (type === "bulkSMSCharge")
			data = {
				bulkSMSCharge: bulkSMSCharge || stateData?.bulkSMSCharge,
			};
		if (type === "educationCommission")
			data = {
				educationCommission: educationCommission
					? educationCommission
					: stateData?.educationCommission,
			};
		if (type === "electricityCommission")
			data = {
				electricityCommission: electricityCommission
					? electricityCommission
					: stateData?.electricityCommission,
			};
		if (type === "mtnResellerCommission")
			data = {
				mtnResellerCommission:
					mtnResellerCommission || stateData?.mtnResellerCommission,
			};
		if (type === "gloResellerCommission")
			data = {
				gloResellerCommission:
					gloResellerCommission || stateData?.gloResellerCommission,
			};
		if (type === "airtelResellerCommission")
			data = {
				airtelResellerCommission:
					airtelResellerCommission || stateData?.airtelResellerCommission,
			};
		if (type === "mobile9ResellerCommission")
			data = {
				mobile9ResellerCommission:
					mobile9ResellerCommission || stateData?.mobile9ResellerCommission,
			};
		if (type === "mtnCardResellerCommission")
			data = {
				mtnCardResellerCommission:
					mtnCardResellerCommission || stateData?.mtnCardResellerCommission,
			};
		if (type === "gloCardResellerCommission")
			data = {
				gloCardResellerCommission:
					gloCardResellerCommission || stateData?.gloCardResellerCommission,
			};
		if (type === "airtelCardResellerCommission")
			data = {
				airtelCardResellerCommission:
					airtelCardResellerCommission ||
					stateData?.airtelCardResellerCommission,
			};
		if (type === "mobile9CardResellerCommission")
			data = {
				mobile9CardResellerCommission:
					mobile9CardResellerCommission ||
					stateData?.mobile9CardResellerCommission,
			};
		if (type === "cablesResellerCommission")
			data = {
				cablesResellerCommission:
					cablesResellerCommission || stateData?.cablesResellerCommission,
			};
		if (type === "educationResellerCommission")
			data = {
				educationResellerCommission:
					educationResellerCommission || stateData?.educationResellerCommission,
			};
		if (type === "electricityResellerCommission")
			data = {
				electricityResellerCommission:
					electricityResellerCommission ||
					stateData?.electricityResellerCommission,
			};
		if (type === "mtnStandaloneCommission")
			data = {
				mtnStandaloneCommission:
					mtnStandaloneCommission || stateData?.mtnStandaloneCommission,
			};
		if (type === "gloStandaloneCommission")
			data = {
				gloStandaloneCommission:
					gloStandaloneCommission || stateData?.gloStandaloneCommission,
			};
		if (type === "airtelStandaloneCommission")
			data = {
				airtelStandaloneCommission:
					airtelStandaloneCommission || stateData?.airtelStandaloneCommission,
			};
		if (type === "mobile9StandaloneCommission")
			data = {
				mobile9StandaloneCommission:
					mobile9StandaloneCommission || stateData?.mobile9StandaloneCommission,
			};
		if (type === "mtnCardStandaloneCommission")
			data = {
				mtnCardStandaloneCommission:
					mtnCardStandaloneCommission || stateData?.mtnCardStandaloneCommission,
			};
		if (type === "gloCardStandaloneCommission")
			data = {
				gloCardStandaloneCommission:
					gloCardStandaloneCommission || stateData?.gloCardStandaloneCommission,
			};
		if (type === "airtelCardStandaloneCommission")
			data = {
				airtelCardStandaloneCommission:
					airtelCardStandaloneCommission ||
					stateData?.airtelCardStandaloneCommission,
			};
		if (type === "mobile9CardStandaloneCommission")
			data = {
				mobile9CardStandaloneCommission:
					mobile9CardStandaloneCommission ||
					stateData?.mobile9CardStandaloneCommission,
			};
		if (type === "cablesStandaloneCommission")
			data = {
				cablesStandaloneCommission:
					cablesStandaloneCommission || stateData?.cablesStandaloneCommission,
			};
		if (type === "educationStandaloneCommission")
			data = {
				educationStandaloneCommission:
					educationStandaloneCommission ||
					stateData?.educationStandaloneCommission,
			};
		if (type === "electricityStandaloneCommission")
			data = {
				electricityStandaloneCommission:
					electricityStandaloneCommission ||
					stateData?.electricityStandaloneCommission,
			};
		// if (type === "airtimeToCashCommission")
		// 	data = {
		// 		airtimeToCashCommission: airtimeToCashCommission
		// 			? airtimeToCashCommission
		// 			: stateData?.airtimeToCashCommission,
		// 	};
		// console.log({ data, state });
		setLoadingType(type);
		setLoading(true);
		await getSettings(data);
		setLoading(false);
		setLoadingType(false);
		setSubmit(false);
	};

	return (
		<Container className="px-lg-5  pt-3 pt-lg-0">
			<div className="mb-5">
				<h5 className="Lexend fw-600 fontReduceBig">General settings</h5>
			</div>
			<div className="row mx-0 g-3 g-md-4">
				<p className="fontReduce col-md-6">
					MTN commission: {stateData?.mtnCommission}%
				</p>
				<p className="fontReduce col-md-6">
					GLO commission: {stateData?.gloCommission}%
				</p>
				<p className="fontReduce col-md-6">
					AIRTEL commission: {stateData?.airtelCommission}%
				</p>
				<p className="fontReduce col-md-6">
					9MOBILE commission: {stateData?.mobile9Commission}%
				</p>
				<p className="fontReduce col-md-6">
					MTN Card commission: {stateData?.mtnCardCommission}%
				</p>
				<p className="fontReduce col-md-6">
					GLO Card commission: {stateData?.gloCardCommission}%
				</p>
				<p className="fontReduce col-md-6">
					AIRTEL Card commission: {stateData?.airtelCardCommission}%
				</p>
				<p className="fontReduce col-md-6">
					9MOBILE Card commission: {stateData?.mobile9CardCommission}%
				</p>
				<p className="fontReduce col-md-6">
					Electricity commission: {stateData?.electricityCommission}%
				</p>
				<p className="fontReduce col-md-6">
					Cables commission: {stateData?.cablesCommission}%
				</p>
				<p className="fontReduce col-md-6">
					Education commission: {stateData?.educationCommission}%
				</p>
				<p className="fontReduce col-md-6">
					MTN Reseller commission: {stateData?.mtnResellerCommission}%
				</p>
				<p className="fontReduce col-md-6">
					GLO Reseller commission: {stateData?.gloResellerCommission}%
				</p>
				<p className="fontReduce col-md-6">
					AIRTEL Reseller commission: {stateData?.airtelResellerCommission}%
				</p>
				<p className="fontReduce col-md-6">
					9MOBILE Reseller commission: {stateData?.mobile9ResellerCommission}%
				</p>
				<p className="fontReduce col-md-6">
					MTN Reseller Card commission: {stateData?.mtnCardResellerCommission}%
				</p>
				<p className="fontReduce col-md-6">
					GLO Reseller Card commission: {stateData?.gloCardResellerCommission}%
				</p>
				<p className="fontReduce col-md-6">
					AIRTEL Reseller Card commission:{" "}
					{stateData?.airtelCardResellerCommission}%
				</p>
				<p className="fontReduce col-md-6">
					9MOBILE Reseller Card commission:{" "}
					{stateData?.mobile9CardResellerCommission}%
				</p>
				<p className="fontReduce col-md-6">
					Electricity Reseller commission:{" "}
					{stateData?.electricityResellerCommission}%
				</p>
				<p className="fontReduce col-md-6">
					Cables Reseller commission: {stateData?.cablesResellerCommission}%
				</p>
				<p className="fontReduce col-md-6">
					Education Reseller commission:{" "}
					{stateData?.educationResellerCommission}%
				</p>
				{["Teetop Digital"]?.includes(process.env.REACT_APP_NAME) && (
					<>
						<p className="fontReduce col-md-6">
							MTN Standalone commission: {stateData?.mtnStandaloneCommission}%
						</p>
						<p className="fontReduce col-md-6">
							GLO Standalone commission: {stateData?.gloStandaloneCommission}%
						</p>
						<p className="fontReduce col-md-6">
							AIRTEL Standalone commission:{" "}
							{stateData?.airtelStandaloneCommission}%
						</p>
						<p className="fontReduce col-md-6">
							9MOBILE Standalone commission:{" "}
							{stateData?.mobile9StandaloneCommission}%
						</p>
						<p className="fontReduce col-md-6">
							MTN Standalone Card commission:{" "}
							{stateData?.mtnCardStandaloneCommission}%
						</p>
						<p className="fontReduce col-md-6">
							GLO Standalone Card commission:{" "}
							{stateData?.gloCardStandaloneCommission}%
						</p>
						<p className="fontReduce col-md-6">
							AIRTEL Standalone Card commission:{" "}
							{stateData?.airtelCardStandaloneCommission}%
						</p>
						<p className="fontReduce col-md-6">
							9MOBILE Standalone Card commission:{" "}
							{stateData?.mobile9CardStandaloneCommission}%
						</p>
						<p className="fontReduce col-md-6">
							Electricity Standalone commission:{" "}
							{stateData?.electricityStandaloneCommission}%
						</p>
						<p className="fontReduce col-md-6">
							Cables Standalone commission:{" "}
							{stateData?.cablesStandaloneCommission}%
						</p>
						<p className="fontReduce col-md-6">
							Education Standalone commission:{" "}
							{stateData?.educationStandaloneCommission}%
						</p>
						<p className="fontReduce col-md-6">
							Bulk SMS Fee: {nairaSign} {stateData?.bulkSMSCharge}
						</p>
					</>
				)}
			</div>
			<div className="row mx-0 g-4 pt-5">
				<GenCheck
					state={mtnCommission}
					setState={setMTNCommission}
					type={"mtnCommission"}
					label="MTN commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={gloCommission}
					setState={setGLOCommission}
					type={"gloCommission"}
					label="GLO commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={airtelCommission}
					setState={setAIRTELCommission}
					type={"airtelCommission"}
					label="AIRTEL commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={mobile9Commission}
					setState={set9MobileCommission}
					type={"mobile9Commission"}
					label="9MOBILE commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={mtnCardCommission}
					setState={setMTNCardCommission}
					type={"mtnCardCommission"}
					label="MTN Card commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={gloCardCommission}
					setState={setGLOCardCommission}
					type={"gloCardCommission"}
					label="GLO Card commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={airtelCardCommission}
					setState={setAIRTELCardCommission}
					type={"airtelCardCommission"}
					label="AIRTEL Card commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={mobile9CardCommission}
					setState={set9MobileCardCommission}
					type={"mobile9CardCommission"}
					label="9MOBILE Card commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={cablesCommission}
					setState={setCablesCommission}
					type={"cablesCommission"}
					label="CABLES commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={electricityCommission}
					setState={setElectricityCommission}
					type={"electricityCommission"}
					label="ELECTRICITY commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={educationCommission}
					setState={setEducationCommission}
					type={"educationCommission"}
					label="Education commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={mtnResellerCommission}
					setState={setMTNResellerCommission}
					type={"mtnResellerCommission"}
					label="MTN Reseller commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={gloResellerCommission}
					setState={setGLOResellerCommission}
					type={"gloResellerCommission"}
					label="GLO Reseller commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={airtelResellerCommission}
					setState={setAIRTELResellerCommission}
					type={"airtelResellerCommission"}
					label="AIRTEL Reseller commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={mobile9ResellerCommission}
					setState={set9MobileResellerCommission}
					type={"mobile9ResellerCommission"}
					label="9MOBILE Reseller commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={mtnCardResellerCommission}
					setState={setMTNCardResellerCommission}
					type={"mtnCardResellerCommission"}
					label="MTN Reseller Card commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={gloCardResellerCommission}
					setState={setGLOCardResellerCommission}
					type={"gloCardResellerCommission"}
					label="GLO Reseller Card commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={airtelCardResellerCommission}
					setState={setAIRTELCardResellerCommission}
					type={"airtelCardResellerCommission"}
					label="AIRTEL Reseller Card commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={mobile9CardResellerCommission}
					setState={set9MobileCardResellerCommission}
					type={"mobile9CardResellerCommission"}
					label="9MOBILE Reseller Card commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={cablesResellerCommission}
					setState={setCablesResellerCommission}
					type={"cablesResellerCommission"}
					label="CABLES Reseller commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={electricityResellerCommission}
					setState={setElectricityResellerCommission}
					type={"electricityResellerCommission"}
					label="ELECTRICITY Reseller commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={educationResellerCommission}
					setState={setEducationResellerCommission}
					type={"educationResellerCommission"}
					label="Education Reseller commission"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				{["Teetop Digital"]?.includes(process.env.REACT_APP_NAME) && (
					<>
						<GenCheck
							state={mtnStandaloneCommission}
							setState={setMTNStandaloneCommission}
							type={"mtnStandaloneCommission"}
							label="MTN Standalone commission"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
							input
							percentage
						/>
						<GenCheck
							state={gloStandaloneCommission}
							setState={setGLOStandaloneCommission}
							type={"gloStandaloneCommission"}
							label="GLO Standalone commission"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
							input
							percentage
						/>
						<GenCheck
							state={airtelStandaloneCommission}
							setState={setAIRTELStandaloneCommission}
							type={"airtelStandaloneCommission"}
							label="AIRTEL Standalone commission"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
							input
							percentage
						/>
						<GenCheck
							state={mobile9StandaloneCommission}
							setState={set9MobileStandaloneCommission}
							type={"mobile9StandaloneCommission"}
							label="9MOBILE Standalone commission"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
							input
							percentage
						/>
						<GenCheck
							state={mtnCardStandaloneCommission}
							setState={setMTNCardStandaloneCommission}
							type={"mtnCardStandaloneCommission"}
							label="MTN Standalone Card commission"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
							input
							percentage
						/>
						<GenCheck
							state={gloCardStandaloneCommission}
							setState={setGLOCardStandaloneCommission}
							type={"gloCardStandaloneCommission"}
							label="GLO Standalone Card commission"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
							input
							percentage
						/>
						<GenCheck
							state={airtelCardStandaloneCommission}
							setState={setAIRTELCardStandaloneCommission}
							type={"airtelCardStandaloneCommission"}
							label="AIRTEL Standalone Card commission"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
							input
							percentage
						/>
						<GenCheck
							state={mobile9CardStandaloneCommission}
							setState={set9MobileCardStandaloneCommission}
							type={"mobile9CardStandaloneCommission"}
							label="9MOBILE Standalone Card commission"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
							input
							percentage
						/>
						<GenCheck
							state={cablesStandaloneCommission}
							setState={setCablesStandaloneCommission}
							type={"cablesStandaloneCommission"}
							label="CABLES Standalone commission"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
							input
							percentage
						/>
						<GenCheck
							state={electricityStandaloneCommission}
							setState={setElectricityStandaloneCommission}
							type={"electricityStandaloneCommission"}
							label="ELECTRICITY Standalone commission"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
							input
							percentage
						/>
						<GenCheck
							state={educationStandaloneCommission}
							setState={setEducationStandaloneCommission}
							type={"educationStandaloneCommission"}
							label="Education Standalone commission"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
							input
							percentage
						/>
						<GenCheck
							state={bulkSMSCharge}
							setState={setbulkSMSCharge}
							type={"bulkSMSCharge"}
							label="Bulk SMS Fee"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
							input
							noFormat
						/>
					</>
				)}
				{/* <GenCheck
					state={airtimeToCashCommission}
					setState={setAirtimeToCashCommission}
					type={"airtimeToCashCommission"}
					label="Airtime to return percentage"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/> */}
			</div>
		</Container>
	);
};

export const EnablerSettings = () => {
	const { usecase, getUseCase, numberWithCommas, nairaSign } =
		useContext(GlobalState);
	// console.log({ usecase });

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	let [cables, setCables] = useState(""),
		[education, setEducation] = useState(""),
		[electricity, setElectricity] = useState(""),
		[data, setData] = useState(""),
		[registration, setRegistration] = useState(""),
		[otpRegistration, setOtpRegistration] = useState(""),
		[fundWallet, setFundWallet] = useState(""),
		[transferFund, setTransferFund] = useState(""),
		[transferFundLimit, setTransferFundLimit] = useState(""),
		[duplicateTransactionTimer, setduplicateTransactionTimer] = useState(""),
		[duplicateTransactionTimerStatus, setduplicateTransactionTimerStatus] =
			useState(""),
		[autoFund, setAutoFund] = useState(""),
		[airtimeToCash, setAirtimeToCash] = useState(""),
		[airtime, setAirtime] = useState(""),
		[airtimeMini, setAirtimeMini] = useState(""),
		[airtimeMax, setAirtimeMax] = useState(""),
		[airtimeToCashMini, setAirtimeToCashMini] = useState(""),
		[airtimeToCashMax, setAirtimeToCashMax] = useState(""),
		[cardFundingMini, setcardFundingMini] = useState(""),
		[cardFundingMax, setcardFundingMax] = useState(""),
		[stateData, setStateData] = useState(null),
		[loading, setLoading] = useState(false),
		[loadingType, setLoadingType] = useState(false),
		[resellerUpgrade, setResellerUpgrade] = useState(""),
		[resellerUpgradeFee, setResellerUpgradeFee] = useState(""),
		[standaloneUpgrade, setStandaloneUpgrade] = useState(""),
		[standaloneUpgradeFee, setStandaloneUpgradeFee] = useState(""),
		[topuserUpgrade, setTopUserUpgrade] = useState(""),
		[topuserUpgradeFee, setTopUserUpgradeFee] = useState(""),
		[fundWalletFlutterwave, setfundWalletFlutterwave] = useState(""),
		[fundWalletPaystack, setfundWalletPaystack] = useState(""),
		[fundWalletMonnify, setfundWalletMonnify] = useState(""),
		[fundWalletMonnifyCard, setfundWalletMonnifyCard] = useState(""),
		[fundWalletBudpay, setfundWalletBudpay] = useState(""),
		[fundWalletPayvessel, setfundWalletPayvessel] = useState(""),
		[fundWalletPaymentpoint, setfundWalletPaymentpoint] = useState(""),
		[fundWalletPocketfi, setfundWalletPocketfi] = useState(""),
		[pocketfiBanksDisabled, setPocketfiBanksDisabled] = useState(null),
		[fundWalletPalmpay, setfundWalletPalmpay] = useState(""),
		[fundWalletBillStack, setfundWalletBillStack] = useState(""),
		[fundWalletBudpayCard, setfundWalletBudpayCard] = useState(""),
		[apiStatus, setapiStatus] = useState(""),
		[appStatus, setappStatus] = useState(""),
		[webStatus, setwebStatus] = useState(""),
		[adminStatus, setadminStatus] = useState(""),
		[bizReseller, setBizReseller] = useState(""),
		[bizStandalone, setBizStandalone] = useState(""),
		[bizUser, setBizUser] = useState(""),
		[referralBonus, setreferralBonus] = useState(""),
		[referralBonusType, setreferralBonusType] = useState(""),
		[referralBonusLimit, setreferralBonusLimit] = useState(""),
		[referralBonusMini, setreferralBonusMini] = useState(""),
		[referralBonusValue, setreferralBonusValue] = useState(""),
		[referralBonusFixed, setreferralBonusFixed] = useState(""),
		[referralCommission, setreferralCommission] = useState(""),
		[submit, setSubmit] = useState(false),
		ableToGenerateBudpay = false,
		ableToGeneratePayvessel = false,
		ableToGeneratePaymentpoint = false,
		ableToGeneratePocketfi = false,
		ableToGenerateBillstack = false,
		ableToGeneratePalmpay = false;

	if (process.env.REACT_APP_PAYMENT_GATEWAY) {
		let values = process.env.REACT_APP_PAYMENT_GATEWAY;
		values = values?.split(",")?.map(it => it?.trim());
		if (values?.includes("budpay")) ableToGenerateBudpay = true;
		if (values?.includes("payvessel")) ableToGeneratePayvessel = true;
		if (values?.includes("billstack")) ableToGenerateBillstack = true;
		if (values?.includes("palmpay")) ableToGeneratePalmpay = true;
		if (values?.includes("paymentpoint")) ableToGeneratePaymentpoint = true;
		if (values?.includes("pocketfi")) ableToGeneratePocketfi = true;
	}

	useEffect(() => {
		setStateData(usecase?.usecase);
	}, [usecase?.usecase]);

	useEffect(() => {
		if (stateData) {
			setCables(stateData?.cables);
			setEducation(stateData?.education);
			setElectricity(stateData?.electricity);
			setData(stateData?.data);
			setRegistration(stateData?.registration);
			setOtpRegistration(stateData?.otpRegistration);
			setFundWallet(stateData?.fundWallet);
			setTransferFund(stateData?.transferFund);
			setTransferFundLimit(stateData?.transferFundLimit);
			setduplicateTransactionTimer(stateData?.duplicateTransactionTimer);
			setduplicateTransactionTimerStatus(
				stateData?.duplicateTransactionTimerStatus
			);
			setAutoFund(stateData?.autoFund);
			setAirtimeToCash(stateData?.airtimeToCash);
			setAirtime(stateData?.airtime);
			setAirtimeMini(stateData?.airtimeMini);
			setAirtimeMax(stateData?.airtimeMax);
			setAirtimeToCashMini(stateData?.airtimeToCashMini);
			setAirtimeToCashMax(stateData?.airtimeToCashMax);
			setcardFundingMini(stateData?.cardFundingMini);
			setcardFundingMax(stateData?.cardFundingMax);
			setResellerUpgrade(stateData?.resellerUpgrade);
			setResellerUpgradeFee(stateData?.resellerUpgradeFee);
			setStandaloneUpgrade(stateData?.standaloneUpgrade);
			setStandaloneUpgradeFee(stateData?.standaloneUpgradeFee);
			setTopUserUpgrade(stateData?.topuserUpgrade);
			setTopUserUpgradeFee(stateData?.topuserUpgradeFee);
			setfundWalletFlutterwave(stateData?.fundWalletFlutterwave);
			setfundWalletPaystack(stateData?.fundWalletPaystack);
			setBizReseller(stateData?.bizReseller);
			setBizStandalone(stateData?.bizStandalone);
			setBizUser(stateData?.bizUser);
			setfundWalletMonnify(stateData?.fundWalletMonnify);
			setfundWalletMonnifyCard(stateData?.fundWalletMonnifyCard);
			setfundWalletPayvessel(stateData?.fundWalletPayvessel);
			setfundWalletPaymentpoint(stateData?.fundWalletPaymentpoint);
			setfundWalletPocketfi(stateData?.fundWalletPocketfi);
			setPocketfiBanksDisabled(stateData?.pocketfiBanksDisabled || []);
			setfundWalletPalmpay(stateData?.fundWalletPalmpay);
			setfundWalletBillStack(stateData?.fundWalletBillStack);
			setfundWalletBudpay(stateData?.fundWalletBudpay);
			setfundWalletBudpayCard(stateData?.fundWalletBudpayCard);
			setreferralBonus(stateData?.referralBonus);
			setreferralBonusType(stateData?.referralBonusType);
			setreferralBonusFixed(stateData?.referralBonusFixed);
			setreferralBonusValue(stateData?.referralBonusValue);
			setreferralBonusLimit(stateData?.referralBonusLimit);
			setreferralBonusMini(stateData?.referralBonusMini);
			setreferralCommission(stateData?.referralCommission);
			setapiStatus(stateData?.apiStatus);
			setappStatus(stateData?.appStatus);
			setwebStatus(stateData?.webStatus);
			setadminStatus(stateData?.adminStatus);
		}
	}, [stateData]);

	useEffect(() => {
		if (submit && usecase?.isUpdated) {
			setSubmit(false);
		}
	}, [usecase?.isUpdated, submit]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// console.log({ usecase });

	let handleSubmit = type => async () => {
		if (type === "cables") if (!cables) return;
		if (type === "education") if (!education) return;
		if (type === "electricity") if (!electricity) return;
		if (type === "airtime") if (!airtime) return;
		if (type === "data") if (!data) return;
		if (type === "registration") if (!registration) return;
		if (type === "otpRegistration") if (!otpRegistration) return;
		if (type === "transferFund") if (!transferFund) return;
		if (type === "transferFundLimit") if (!transferFundLimit) return;
		if (type === "duplicateTransactionTimer")
			if (!duplicateTransactionTimer) return;
		if (type === "duplicateTransactionTimerStatus")
			if (!duplicateTransactionTimerStatus) return;
		if (type === "airtimeToCash") if (!airtimeToCash) return;
		if (type === "fundWallet") if (!fundWallet) return;
		if (type === "airtimeMini") if (!airtimeMini) return;
		if (type === "airtimeMax") if (!airtimeMax) return;
		if (type === "airtimeToCashMini") if (!airtimeToCashMini) return;
		if (type === "airtimeToCashMax") if (!airtimeToCashMax) return;
		if (type === "cardFundingMini") if (!cardFundingMini) return;
		if (type === "cardFundingMax") if (!cardFundingMax) return;
		if (type === "autoFund") if (!autoFund) return;
		if (type === "resellerUpgrade") if (!resellerUpgrade) return;
		if (type === "resellerUpgradeFee") if (!resellerUpgradeFee) return;
		if (type === "standaloneUpgrade") if (!standaloneUpgrade) return;
		if (type === "standaloneUpgradeFee") if (!standaloneUpgradeFee) return;
		if (type === "topuserUpgrade") if (!topuserUpgrade) return;
		if (type === "topuserUpgradeFee") if (!topuserUpgradeFee) return;
		if (type === "fundWalletFlutterwave") if (!fundWalletFlutterwave) return;
		if (type === "fundWalletPaystack") if (!fundWalletPaystack) return;
		if (type === "bizReseller") if (!bizReseller) return;
		if (type === "bizStandalone") if (!bizStandalone) return;
		if (type === "bizUser") if (!bizUser) return;
		if (type === "fundWalletPayvessel") if (!fundWalletPayvessel) return;
		if (type === "fundWalletPaymentpoint") if (!fundWalletPaymentpoint) return;
		if (type === "fundWalletPocketfi") if (!fundWalletPocketfi) return;
		if (type === "pocketfiBanksDisabled")
			if (!Array.isArray(pocketfiBanksDisabled)) return;
		if (type === "fundWalletPalmpay") if (!fundWalletPalmpay) return;
		if (type === "fundWalletBillStack") if (!fundWalletBillStack) return;
		if (type === "fundWalletBudpay") if (!fundWalletBudpay) return;
		if (type === "fundWalletBudpayCard") if (!fundWalletBudpayCard) return;
		if (type === "apiStatus") if (!apiStatus) return;
		if (type === "appStatus") if (!appStatus) return;
		if (type === "webStatus") if (!webStatus) return;
		if (type === "adminStatus") if (!adminStatus) return;
		if (type === "fundWalletMonnify") if (!fundWalletMonnify) return;
		if (type === "fundWalletMonnifyCard") if (!fundWalletMonnifyCard) return;
		if (type === "referralBonus") if (!referralBonus) return;
		if (type === "referralBonusType") if (!referralBonusType) return;
		if (type === "referralBonusFixed") if (!referralBonusFixed) return;
		if (type === "referralBonusLimit") if (!referralBonusLimit) return;
		if (type === "referralBonusMini") if (!referralBonusMini) return;
		if (type === "referralBonusValue") if (!referralBonusValue) return;
		if (type === "referralCommission") if (!referralCommission) return;

		let datum;
		if (type === "cables")
			datum = {
				cables: cables ? cables : stateData?.cables,
			};
		if (type === "resellerUpgrade")
			datum = {
				resellerUpgrade: resellerUpgrade || stateData?.resellerUpgrade,
			};
		if (type === "resellerUpgradeFee")
			datum = {
				resellerUpgradeFee: resellerUpgradeFee || stateData?.resellerUpgradeFee,
			};
		if (type === "standaloneUpgrade")
			datum = {
				standaloneUpgrade: standaloneUpgrade || stateData?.standaloneUpgrade,
			};
		if (type === "standaloneUpgradeFee")
			datum = {
				standaloneUpgradeFee:
					standaloneUpgradeFee || stateData?.standaloneUpgradeFee,
			};
		if (type === "topuserUpgrade")
			datum = {
				topuserUpgrade: topuserUpgrade
					? topuserUpgrade
					: stateData?.topuserUpgrade,
			};
		if (type === "topuserUpgradeFee")
			datum = {
				topuserUpgradeFee: topuserUpgradeFee
					? topuserUpgradeFee
					: stateData?.topuserUpgradeFee,
			};
		if (type === "airtime")
			datum = {
				airtime: airtime ? airtime : stateData?.airtime,
			};
		if (type === "education")
			datum = {
				education: education ? education : stateData?.education,
			};
		if (type === "electricity")
			datum = {
				electricity: electricity ? electricity : stateData?.electricity,
			};
		if (type === "data")
			datum = {
				data: data ? data : stateData?.data,
			};
		if (type === "otpRegistration")
			datum = {
				otpRegistration: otpRegistration
					? otpRegistration
					: stateData?.otpRegistration,
			};
		if (type === "registration")
			datum = {
				registration: registration ? registration : stateData?.registration,
			};
		if (type === "fundWallet")
			datum = {
				fundWallet: fundWallet ? fundWallet : stateData?.fundWallet,
			};
		if (type === "transferFund")
			datum = {
				transferFund: transferFund ? transferFund : stateData?.transferFund,
			};
		if (type === "transferFundLimit")
			datum = {
				transferFundLimit: transferFundLimit
					? transferFundLimit
					: stateData?.transferFundLimit,
			};
		if (type === "duplicateTransactionTimer")
			datum = {
				duplicateTransactionTimer: duplicateTransactionTimer
					? duplicateTransactionTimer
					: stateData?.duplicateTransactionTimer,
			};
		if (type === "duplicateTransactionTimerStatus")
			datum = {
				duplicateTransactionTimerStatus:
					duplicateTransactionTimerStatus ||
					stateData?.duplicateTransactionTimerStatus,
			};
		if (type === "airtimeMini")
			datum = {
				airtimeMini: airtimeMini ? airtimeMini : stateData?.airtimeMini,
			};
		if (type === "airtimeMax")
			datum = {
				airtimeMax: airtimeMax ? airtimeMax : stateData?.airtimeMax,
			};
		if (type === "airtimeToCashMini")
			datum = {
				airtimeToCashMini: airtimeToCashMini
					? airtimeToCashMini
					: stateData?.airtimeToCashMini,
			};
		if (type === "airtimeToCashMax")
			datum = {
				airtimeToCashMax: airtimeToCashMax
					? airtimeToCashMax
					: stateData?.airtimeToCashMax,
			};
		if (type === "cardFundingMini")
			datum = {
				cardFundingMini: cardFundingMini
					? cardFundingMini
					: stateData?.cardFundingMini,
			};
		if (type === "cardFundingMax")
			datum = {
				cardFundingMax: cardFundingMax
					? cardFundingMax
					: stateData?.cardFundingMax,
			};
		if (type === "airtimeToCash")
			datum = {
				airtimeToCash: airtimeToCash ? airtimeToCash : stateData?.airtimeToCash,
			};
		if (type === "autoFund")
			datum = {
				autoFund: autoFund ? autoFund : stateData?.autoFund,
			};
		if (type === "fundWalletFlutterwave")
			datum = {
				fundWalletFlutterwave: fundWalletFlutterwave
					? fundWalletFlutterwave
					: stateData?.fundWalletFlutterwave,
			};
		if (type === "fundWalletMonnify")
			datum = {
				fundWalletMonnify: fundWalletMonnify
					? fundWalletMonnify
					: stateData?.fundWalletMonnify,
			};
		if (type === "fundWalletMonnifyCard")
			datum = {
				fundWalletMonnifyCard: fundWalletMonnifyCard
					? fundWalletMonnifyCard
					: stateData?.fundWalletMonnifyCard,
			};
		if (type === "fundWalletPaystack")
			datum = {
				fundWalletPaystack: fundWalletPaystack
					? fundWalletPaystack
					: stateData?.fundWalletPaystack,
			};
		if (type === "bizReseller")
			datum = {
				bizReseller: bizReseller || stateData?.bizReseller,
			};
		if (type === "bizStandalone")
			datum = {
				bizStandalone: bizStandalone || stateData?.bizStandalone,
			};
		if (type === "bizUser")
			datum = {
				bizUser: bizUser ? bizUser : stateData?.bizUser,
			};
		if (type === "fundWalletPaymentpoint")
			datum = {
				fundWalletPaymentpoint:
					fundWalletPaymentpoint || stateData?.fundWalletPaymentpoint,
			};
		if (type === "pocketfiBanksDisabled")
			datum = { pocketfiBanksDisabled };
		if (type === "fundWalletPocketfi")
			datum = {
				fundWalletPocketfi: fundWalletPocketfi || stateData?.fundWalletPocketfi,
			};
		if (type === "fundWalletPayvessel")
			datum = {
				fundWalletPayvessel:
					fundWalletPayvessel || stateData?.fundWalletPayvessel,
			};
		if (type === "fundWalletPalmpay")
			datum = {
				fundWalletPalmpay: fundWalletPalmpay || stateData?.fundWalletPalmpay,
			};
		if (type === "fundWalletBillStack")
			datum = {
				fundWalletBillStack:
					fundWalletBillStack || stateData?.fundWalletBillStack,
			};
		if (type === "fundWalletBudpay")
			datum = {
				fundWalletBudpay: fundWalletBudpay || stateData?.fundWalletBudpay,
			};
		if (type === "fundWalletBudpayCard")
			datum = {
				fundWalletBudpayCard:
					fundWalletBudpayCard || stateData?.fundWalletBudpayCard,
			};
		if (type === "apiStatus")
			datum = {
				apiStatus: apiStatus || stateData?.apiStatus,
			};
		if (type === "appStatus")
			datum = {
				appStatus: appStatus || stateData?.appStatus,
			};
		if (type === "webStatus")
			datum = {
				webStatus: webStatus || stateData?.webStatus,
			};
		if (type === "adminStatus")
			datum = {
				adminStatus: adminStatus || stateData?.adminStatus,
			};
		if (type === "referralBonus")
			datum = {
				referralBonus: referralBonus ? referralBonus : stateData?.referralBonus,
			};
		if (type === "referralBonusType")
			datum = {
				referralBonusType: referralBonusType
					? referralBonusType
					: stateData?.referralBonusType,
			};
		if (type === "referralBonusFixed")
			datum = {
				referralBonusFixed: referralBonusFixed
					? referralBonusFixed
					: stateData?.referralBonusFixed,
			};
		if (type === "referralBonusLimit")
			datum = {
				referralBonusLimit: referralBonusLimit || stateData?.referralBonusLimit,
			};
		if (type === "referralBonusMini")
			datum = {
				referralBonusMini: referralBonusMini || stateData?.referralBonusMini,
			};
		if (type === "referralBonusValue")
			datum = {
				referralBonusValue: referralBonusValue
					? referralBonusValue
					: stateData?.referralBonusValue,
			};
		if (type === "referralCommission")
			datum = {
				referralCommission: referralCommission
					? referralCommission
					: stateData?.referralCommission,
			};
		// console.log({ data, state });
		setLoadingType(type);
		setLoading(true);
		await getUseCase(datum);
		setLoading(false);
		setLoadingType(false);
		setSubmit(false);
	};

	return (
		<Container className="px-lg-5  pt-3 pt-lg-0">
			<div className="mb-5">
				<h5 className="Lexend fw-600 fontReduceBig">General Usecase</h5>
			</div>
			{stateData && (
				<div className="row mx-0 g-3 g-md-4">
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.airtime === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						Airtime: {`${stateData?.airtime}d`}
					</p>
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.cables === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						Cables: {`${stateData?.cables}d`}
					</p>
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.education === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						Education: {`${stateData?.education}d`}
					</p>
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.electricity === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						Electricity: {`${stateData?.electricity}d`}
					</p>
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.data === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						Data: {`${stateData?.data}d`}
					</p>
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.transferFund === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						wallet to wallet Transfer fund: {`${stateData?.transferFund}d`}
					</p>
					<p className="col-md-6 fontReduce text-capitalize">
						Transfer Fund limit:{" "}
						{numberWithCommas(Number(stateData?.transferFundLimit))}
					</p>
					<p className="col-md-6 fontReduce text-capitalize">
						Duplicate Transaction Timer:{" "}
						{numberWithCommas(Number(stateData?.duplicateTransactionTimer))}
					</p>
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.duplicateTransactionTimerStatus === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						Duplicate Transaction Timer Status:{" "}
						{`${stateData?.duplicateTransactionTimerStatus}d`}
					</p>
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.registration === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						Registration: {`${stateData?.registration}d`}
					</p>
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.otpRegistration === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						Use OTP for Registration: {`${stateData?.otpRegistration}d`}
					</p>
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.fundWallet === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						card Fund wallet: {`${stateData?.fundWallet}d`}
					</p>
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.autoFund === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						Automatic wallet funding: {`${stateData?.autoFund}d`}
					</p>
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.airtimeToCash === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						Airtime to cash: {`${stateData?.airtimeToCash}d`}
					</p>
					<p className="col-md-6 fontReduce text-capitalize">
						Minimum airtime purchase: {nairaSign}{" "}
						{numberWithCommas(Number(stateData?.airtimeMini).toFixed(2))}
					</p>
					<p className="col-md-6 fontReduce text-capitalize">
						Maximum airtime purchase: {nairaSign}{" "}
						{numberWithCommas(Number(stateData?.airtimeMax).toFixed(2))}
					</p>
					<p className="col-md-6 fontReduce text-capitalize">
						Minimum Card funding: {nairaSign}{" "}
						{numberWithCommas(Number(stateData?.cardFundingMini).toFixed(2))}
					</p>
					<p className="col-md-6 fontReduce text-capitalize">
						Maximum Card funding: {nairaSign}{" "}
						{numberWithCommas(Number(stateData?.cardFundingMax).toFixed(2))}
					</p>
					<p className="col-md-6 fontReduce text-capitalize">
						Minimum airtime to cash conversion: {nairaSign}{" "}
						{numberWithCommas(Number(stateData?.airtimeToCashMini).toFixed(2))}
					</p>
					<p className="col-md-6 fontReduce text-capitalize">
						Maximum airtime to cash conversion: {nairaSign}{" "}
						{numberWithCommas(Number(stateData?.airtimeToCashMax).toFixed(2))}
					</p>
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.resellerUpgrade === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						Reseller upgrade: {`${stateData?.resellerUpgrade}d`}
					</p>
					<p className="col-md-6 fontReduce text-capitalize">
						Reseller upgrade fee: {nairaSign}{" "}
						{numberWithCommas(Number(stateData?.resellerUpgradeFee).toFixed(2))}
					</p>
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.topuserUpgrade === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						Topuser upgrade: {`${stateData?.topuserUpgrade}d`}
					</p>
					<p className="col-md-6 fontReduce text-capitalize">
						Topuser upgrade fee: {nairaSign}{" "}
						{numberWithCommas(Number(stateData?.topuserUpgradeFee).toFixed(2))}
					</p>
					{["Teetop Digital", "TEETOP DIGITAL"]?.includes(
						process.env.REACT_APP_NAME
					) && (
						<>
							<p
								className={`col-md-6 fontReduce text-capitalize ${
									stateData?.standaloneUpgrade === "enable"
										? "text-success2 text-success-2 text-success"
										: "text-danger2"
								} `}>
								Standalone upgrade: {`${stateData?.standaloneUpgrade}d`}
							</p>
							<p className="col-md-6 fontReduce text-capitalize">
								Standalone upgrade fee: {nairaSign}{" "}
								{numberWithCommas(
									Number(stateData?.standaloneUpgradeFee).toFixed(2)
								)}
							</p>
						</>
					)}
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.fundWalletFlutterwave === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						Fund wallet through Flutterwave:{" "}
						{`${stateData?.fundWalletFlutterwave}d`}
					</p>
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.fundWalletPaystack === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						Fund wallet through Paystack: {`${stateData?.fundWalletPaystack}d`}
					</p>
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.fundWalletMonnify === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						Monnify Visibility: {`${stateData?.fundWalletMonnify}d`}
					</p>
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.fundWalletMonnifyCard === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						Monnify Card Payment: {`${stateData?.fundWalletMonnifyCard}d`}
					</p>
					{(["Kemtech Enterprises"]?.includes(process.env.REACT_APP_NAME) ||
						ableToGenerateBudpay) && (
						<>
							<p
								className={`col-md-6 fontReduce text-capitalize ${
									stateData?.fundWalletBudpay === "enable"
										? "text-success2 text-success-2 text-success"
										: "text-danger2"
								} `}>
								Budpay Visibility: {`${stateData?.fundWalletBudpay}d`}
							</p>
							<p
								className={`col-md-6 fontReduce text-capitalize ${
									stateData?.fundWalletBudpayCard === "enable"
										? "text-success2 text-success-2 text-success"
										: "text-danger2"
								} `}>
								Budpay Card Payment: {`${stateData?.fundWalletBudpayCard}d`}
							</p>
						</>
					)}
					{(["Durable Telecommunications"]?.includes(
						process.env.REACT_APP_NAME
					) ||
						ableToGeneratePaymentpoint) && (
						<>
							<p
								className={`col-md-6 fontReduce text-capitalize ${
									stateData?.fundWalletPaymentpoint === "enable"
										? "text-success2 text-success-2 text-success"
										: "text-danger2"
								} `}>
								Paymentpoint Visibility:{" "}
								{`${stateData?.fundWalletPaymentpoint}d`}
							</p>
						</>
					)}
					{(["Durable Telecommunications"]?.includes(
						process.env.REACT_APP_NAME
					) ||
						ableToGeneratePocketfi) && (
						<>
							<p
								className={`col-md-6 fontReduce text-capitalize ${
									stateData?.fundWalletPocketfi === "enable"
										? "text-success2 text-success-2 text-success"
										: "text-danger2"
								} `}>
								Pocketfi Visibility: {`${stateData?.fundWalletPocketfi}d`}
							</p>
							<p className="col-md-6 fontReduce">
								Pocketfi Banks:{" "}
								{POCKETFI_BANK_OPTIONS.filter(
									bank => !stateData?.pocketfiBanksDisabled?.includes(bank.value)
								)
									.map(bank => bank.label)
									.join(", ") || "None"}
							</p>
						</>
					)}
					{(["Durable Telecommunications"]?.includes(
						process.env.REACT_APP_NAME
					) ||
						ableToGeneratePayvessel) && (
						<>
							<p
								className={`col-md-6 fontReduce text-capitalize ${
									stateData?.fundWalletPayvessel === "enable"
										? "text-success2 text-success-2 text-success"
										: "text-danger2"
								} `}>
								Payvessel Visibility: {`${stateData?.fundWalletPayvessel}d`}
							</p>
							{/* <p
								className={`col-md-6 fontReduce text-capitalize ${
									stateData?.fundWalletBillStack === "enable"
										? "text-success2 text-success-2 text-success"
										: "text-danger2"
								} `}>
								Billstack Visibility: {`${stateData?.fundWalletBillStack}d`}
							</p> */}
							{/* <p
								className={`col-md-6 fontReduce text-capitalize ${
									stateData?.fundWalletBudpayCard === "enable"
										? "text-success2 text-success-2 text-success"
										: "text-danger2"
								} `}>
								Budpay Card Payment: {`${stateData?.fundWalletBudpayCard}d`}
							</p> */}
						</>
					)}
					{(["Vickybest Telecom", "Durable Telecommunications"]?.includes(
						process.env.REACT_APP_NAME
					) ||
						ableToGenerateBillstack) && (
						<>
							<p
								className={`col-md-6 fontReduce text-capitalize ${
									stateData?.fundWalletBillStack === "enable"
										? "text-success2 text-success-2 text-success"
										: "text-danger2"
								} `}>
								Billstack Visibility: {`${stateData?.fundWalletBillStack}d`}
							</p>
							{/* <p
								className={`col-md-6 fontReduce text-capitalize ${
									stateData?.fundWalletBudpayCard === "enable"
										? "text-success2 text-success-2 text-success"
										: "text-danger2"
								} `}>
								Budpay Card Payment: {`${stateData?.fundWalletBudpayCard}d`}
							</p> */}
						</>
					)}
					{([
						// "Vickybest Telecom",
						"Kemtech Enterprises",
					]?.includes(process.env.REACT_APP_NAME) ||
						ableToGeneratePalmpay) && (
						<>
							<p
								className={`col-md-6 fontReduce text-capitalize ${
									stateData?.fundWalletPalmpay === "enable"
										? "text-success2 text-success-2 text-success"
										: "text-danger2"
								} `}>
								Palmpay Visibility: {`${stateData?.fundWalletPalmpay}d`}
							</p>
							{/* <p
								className={`col-md-6 fontReduce text-capitalize ${
									stateData?.fundWalletBudpayCard === "enable"
										? "text-success2 text-success-2 text-success"
										: "text-danger2"
								} `}>
								Budpay Card Payment: {`${stateData?.fundWalletBudpayCard}d`}
							</p> */}
						</>
					)}
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.apiStatus === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						API Request: {`${stateData?.apiStatus}d`}
					</p>
					{/* {!["Vickybest Telecom", "Fantastic Fisayo"]?.includes(
						process.env.REACT_APP_NAME
					) && ( */}
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.appStatus === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						APP Request: {`${stateData?.appStatus}d`}
					</p>
					{/* )} */}
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.webStatus === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						Website Request: {`${stateData?.webStatus}d`}
					</p>
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.adminStatus === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						Admin Request: {`${stateData?.adminStatus}d`}
					</p>
					<p
						className={`col-md-6 fontReduce text-capitalize ${
							stateData?.referralBonus === "enable"
								? "text-success2 text-success-2 text-success"
								: "text-danger2"
						} `}>
						Referral Bonus: {`${stateData?.referralBonus}d`}
					</p>
					<p className="col-md-6 fontReduce text-capitalize">
						Referral bonus means: {stateData?.referralBonusType}
					</p>
					<p className="col-md-6 fontReduce text-capitalize">
						Referral bonus type: {stateData?.referralBonusFixed}
					</p>
					<p className="col-md-6 fontReduce text-capitalize">
						Referral bonus amount:{" "}
						{stateData?.referralBonusFixed === "fixed" ? nairaSign : null}{" "}
						{numberWithCommas(Number(stateData?.referralBonusValue).toFixed(2))}{" "}
						{stateData?.referralBonusFixed === "percentage" ? "%" : null}
					</p>
					<p className="col-md-6 fontReduce text-capitalize">
						Referral bonus limit:{" "}
						{numberWithCommas(Number(stateData?.referralBonusLimit))}
					</p>
					<p className="col-md-6 fontReduce text-capitalize">
						Referral bonus Minimum for Wallet:{" "}
						{stateData?.referralBonusMini
							? numberWithCommas(Number(stateData?.referralBonusMini))
							: null}
					</p>
					<p className="col-md-6 fontReduce text-capitalize">
						Referral upgrade bonus percentage:{" "}
						{numberWithCommas(Number(stateData?.referralCommission))}%
					</p>
				</div>
			)}
			<div className="row mx-0 g-4 pt-5">
				<GenCheck
					state={airtime}
					setState={setAirtime}
					type={"airtime"}
					label="airtime"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				<GenCheck
					state={cables}
					setState={setCables}
					type={"cables"}
					label="cables"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				<GenCheck
					state={education}
					setState={setEducation}
					type={"education"}
					label="education"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				<GenCheck
					state={electricity}
					setState={setElectricity}
					type={"electricity"}
					label="electricity"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				<GenCheck
					state={data}
					setState={setData}
					type={"data"}
					label="data"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				<GenCheck
					state={registration}
					setState={setRegistration}
					type={"registration"}
					label="registration"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				<GenCheck
					state={otpRegistration}
					setState={setOtpRegistration}
					type={"otpRegistration"}
					label="Otp registration"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				<GenCheck
					state={fundWallet}
					setState={setFundWallet}
					type={"fundWallet"}
					label="Card Fund Wallet"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				<GenCheck
					state={transferFund}
					setState={setTransferFund}
					type={"transferFund"}
					label="wallet to wallet Transfer fund"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				<GenCheck
					state={transferFundLimit}
					setState={setTransferFundLimit}
					type={"transferFundLimit"}
					label="wallet to wallet Transfer Fund Limit"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
				/>
				<GenCheck
					state={duplicateTransactionTimer}
					setState={setduplicateTransactionTimer}
					type={"duplicateTransactionTimer"}
					label="Possible duplicate transaction timer"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
				/>
				<GenCheck
					state={duplicateTransactionTimerStatus}
					setState={setduplicateTransactionTimerStatus}
					type={"duplicateTransactionTimerStatus"}
					label="Duplicate Transaction Timer Status"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				<GenCheck
					state={autoFund}
					setState={setAutoFund}
					type={"autoFund"}
					label="automatic wallet funding"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				<GenCheck
					state={airtimeToCash}
					setState={setAirtimeToCash}
					type={"airtimeToCash"}
					label="Airtime to cash"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				<GenCheck
					state={airtimeMini}
					setState={setAirtimeMini}
					type={"airtimeMini"}
					label="Minimum Airtime purchase"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
				/>
				<GenCheck
					state={airtimeMax}
					setState={setAirtimeMax}
					type={"airtimeMax"}
					label="Maximum Airtime purchase"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
				/>
				<GenCheck
					state={airtimeToCashMini}
					setState={setAirtimeToCashMini}
					type={"airtimeToCashMini"}
					label="Minimum Airtime to cash conversion"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
				/>
				<GenCheck
					state={airtimeToCashMax}
					setState={setAirtimeToCashMax}
					type={"airtimeToCashMax"}
					label="Maximum Airtime to cash conversion"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
				/>
				<GenCheck
					state={cardFundingMini}
					setState={setcardFundingMini}
					type={"cardFundingMini"}
					label="Minimum Card Funding"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
				/>
				<GenCheck
					state={cardFundingMax}
					setState={setcardFundingMax}
					type={"cardFundingMax"}
					label="Maximum Card Funding"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
				/>
				<GenCheck
					state={resellerUpgrade}
					setState={setResellerUpgrade}
					type={"resellerUpgrade"}
					label="Reseller upgrade"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				<GenCheck
					state={resellerUpgradeFee}
					setState={setResellerUpgradeFee}
					type={"resellerUpgradeFee"}
					label="Reseller upgrade fee"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
				/>
				<GenCheck
					state={topuserUpgrade}
					setState={setTopUserUpgrade}
					type={"topuserUpgrade"}
					label="Topuser upgrade"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				{["Teetop Digital", "TEETOP DIGITAL"]?.includes(
					process.env.REACT_APP_NAME
				) && (
					<>
						<GenCheck
							state={standaloneUpgrade}
							setState={setStandaloneUpgrade}
							type={"standaloneUpgrade"}
							label="Standalone upgrade"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
						/>
						<GenCheck
							state={standaloneUpgradeFee}
							setState={setStandaloneUpgradeFee}
							type={"standaloneUpgradeFee"}
							label="Standalone upgrade fee"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
							input
						/>
					</>
				)}
				<GenCheck
					state={topuserUpgradeFee}
					setState={setTopUserUpgradeFee}
					type={"topuserUpgradeFee"}
					label="Topuser upgrade fee"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
				/>
				<GenCheck
					state={fundWalletFlutterwave}
					setState={setfundWalletFlutterwave}
					type={"fundWalletFlutterwave"}
					label="Fund wallet through Flutterwave"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				<GenCheck
					state={fundWalletPaystack}
					setState={setfundWalletPaystack}
					type={"fundWalletPaystack"}
					label="Fund wallet through Paystack"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				<GenCheck
					state={fundWalletMonnify}
					setState={setfundWalletMonnify}
					type={"fundWalletMonnify"}
					label="Monnify visibility"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				<GenCheck
					state={fundWalletMonnifyCard}
					setState={setfundWalletMonnifyCard}
					type={"fundWalletMonnifyCard"}
					label="Monnify Card Payment"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				{(["Durable Telecommunications"]?.includes(
					process.env.REACT_APP_NAME
				) ||
					ableToGeneratePaymentpoint) && (
					<>
						<GenCheck
							state={fundWalletPaymentpoint}
							setState={setfundWalletPaymentpoint}
							type={"fundWalletPaymentpoint"}
							label="Paymentpoint visibility"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
						/>
					</>
				)}
				{(["Durable Telecommunications"]?.includes(
					process.env.REACT_APP_NAME
				) ||
					ableToGeneratePocketfi) && (
					<>
						<GenCheck
							state={fundWalletPocketfi}
							setState={setfundWalletPocketfi}
							type={"fundWalletPocketfi"}
							label="Pocketfi visibility"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
						/>
						<PocketfiBanks
							disabled={pocketfiBanksDisabled}
							setDisabled={setPocketfiBanksDisabled}
							type={"pocketfiBanksDisabled"}
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
						/>
						<PocketfiBalance />
					</>
				)}
				{(["Durable Telecommunications"]?.includes(
					process.env.REACT_APP_NAME
				) ||
					ableToGeneratePayvessel) && (
					<>
						<GenCheck
							state={fundWalletPayvessel}
							setState={setfundWalletPayvessel}
							type={"fundWalletPayvessel"}
							label="Payvessel visibility"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
						/>
						{/* <GenCheck
							state={fundWalletBillStack}
							setState={setfundWalletPayvessel}
							type={"fundWalletBillStack"}
							label="BillStack visibility"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
						/> */}
						{/* <GenCheck
							state={fundWalletBudpayCard}
							setState={setfundWalletBudpayCard}
							type={"fundWalletBudpayCard"}
							label="Budpay Card Payment"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
						/> */}
					</>
				)}
				{(["Vickybest Telecom", "Durable Telecommunications"]?.includes(
					process.env.REACT_APP_NAME
				) ||
					ableToGenerateBillstack) && (
					<>
						<GenCheck
							state={fundWalletBillStack}
							setState={setfundWalletBillStack}
							type={"fundWalletBillStack"}
							label="BillStack visibility"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
						/>
					</>
				)}
				{([
					// "Kemtech Enterprises",
					"Vickybest Telecom",
				]?.includes(process.env.REACT_APP_NAME) ||
					ableToGeneratePalmpay) && (
					<>
						<GenCheck
							state={fundWalletPalmpay}
							setState={setfundWalletPalmpay}
							type={"fundWalletPalmpay"}
							label="Palmpay visibility"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
						/>
					</>
				)}
				{(["Kemtech Enterprises"]?.includes(process.env.REACT_APP_NAME) ||
					ableToGenerateBudpay) && (
					<>
						<GenCheck
							state={fundWalletBudpay}
							setState={setfundWalletBudpay}
							type={"fundWalletBudpay"}
							label="Budpay visibility"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
						/>
						<GenCheck
							state={fundWalletBudpayCard}
							setState={setfundWalletBudpayCard}
							type={"fundWalletBudpayCard"}
							label="Budpay Card Payment"
							loading={loading}
							loadingType={loadingType}
							handleSubmit={handleSubmit}
						/>
					</>
				)}
				<GenCheck
					state={apiStatus}
					setState={setapiStatus}
					type={"apiStatus"}
					label="API Request"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				{!["Vickybest Telecom", "Fantastic Fisayo"]?.includes(
					process.env.REACT_APP_NAME
				) && (
					<GenCheck
						state={appStatus}
						setState={setappStatus}
						type={"appStatus"}
						label="APP Request"
						loading={loading}
						loadingType={loadingType}
						handleSubmit={handleSubmit}
					/>
				)}
				<GenCheck
					state={webStatus}
					setState={setwebStatus}
					type={"webStatus"}
					label="Website Request"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				<GenCheck
					state={adminStatus}
					setState={setadminStatus}
					type={"adminStatus"}
					label="Admin Request"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				<GenCheck
					state={referralBonus}
					setState={setreferralBonus}
					type={"referralBonus"}
					label="Referral Bonus"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
				/>
				<GenCheck
					state={referralBonusType}
					setState={setreferralBonusType}
					type={"referralBonusType"}
					label="Referral Bonus Means"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					arr={[
						{ value: "wallet", title: "Wallet" },
						{ value: "transaction", title: "Transaction" },
					]}
				/>
				<GenCheck
					state={referralBonusFixed}
					setState={setreferralBonusFixed}
					type={"referralBonusFixed"}
					label="Referral Bonus Type"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					arr={[
						{ value: "fixed", title: "Fixed" },
						{ value: "percentage", title: "Percentage" },
					]}
				/>
				<GenCheck
					state={referralBonusValue}
					setState={setreferralBonusValue}
					type={"referralBonusValue"}
					label="Referral bonus Value"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
				/>
				<GenCheck
					state={referralBonusLimit}
					setState={setreferralBonusLimit}
					type={"referralBonusLimit"}
					label="Referral bonus limit"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
				/>
				<GenCheck
					state={referralBonusMini}
					setState={setreferralBonusMini}
					type={"referralBonusMini"}
					label="Referral bonus Minimum for Wallet"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
				/>
				<GenCheck
					state={referralCommission}
					setState={setreferralCommission}
					type={"referralCommission"}
					label="Referral upgrade bonus percentage"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/>
				<GenCheck
					state={duplicateTransactionTimer}
					setState={setduplicateTransactionTimer}
					type={"duplicateTransactionTimer"}
					label="Duplicate Transaction Timer (mins)"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
				/>
			</div>
		</Container>
	);
};

let GenCheck = ({
	state,
	setState,
	type,
	loading,
	loadingType,
	label,
	handleSubmit,
	input,
	percentage,
	arr,
}) => {
	return (
		<div className="mb-3 d-flex justify-content-center col-md-6">
			<div className="w-75 w75">
				<label
					htmlFor="Price"
					className="mb-3 textColor2 text-capitalize fontReduce">
					{label}
				</label>
				{input ? (
					<input
						type="number"
						name="Price"
						className="form-control w-100 py-3 borderColor"
						placeholder={percentage ? "2%" : "2,000"}
						value={state}
						onChange={e => setState(e.target.value)}
						min={0}
					/>
				) : (
					<select
						type="number"
						name="Price"
						className="form-control w-100 py-3 borderColor form-select"
						placeholder="Enable"
						value={state}
						onChange={e => setState(e.target.value)}>
						<option value="">Select one</option>
						{arr ? (
							arr?.map((item, i) => (
								<option value={item?.value} key={i}>
									{item?.title}
								</option>
							))
						) : (
							<>
								<option value="enable">Enabled</option>
								<option value="disable">Disabled</option>
							</>
						)}
					</select>
				)}
				<Buttons
					loading={loadingType === type && loading}
					title="update"
					css="btn btn-primary1 text-capitalize py-3 w-75 w75 d-block mx-auto my-4"
					width={"w-75 w75"}
					onClick={handleSubmit(type)}
				/>
			</div>
		</div>
	);
};

export const ProfileForm = ({ state, textChange }) => {
	let params = useParams(),
		{ auth } = useContext(GlobalState),
		[typePass, setTypePass] = useState(false),
		[typePass2, setTypePass2] = useState(false);

	return (
		<div className="row mx-0 g-3 g-md-5">
			<div className="col-md-6">
				<label className="dmMonoFont text-uppercase" htmlFor="firstName">
					First Name
				</label>
				<input
					type="text"
					className="form-control py-3 dmMonoFont"
					name="firstName"
					value={state?.firstName ?? ""}
					onChange={textChange("firstName")}
					readOnly={params?.page === "users"}
				/>
			</div>
			<div className="col-md-6">
				<label className="dmMonoFont text-uppercase" htmlFor="lastName">
					Last Name
				</label>
				<input
					type="text"
					className="form-control py-3 dmMonoFont"
					name="lastName"
					value={state?.lastName ?? ""}
					onChange={textChange("lastName")}
					readOnly={params?.page === "users"}
				/>
			</div>
			<div className="col-md-6">
				<label className="dmMonoFont text-uppercase" htmlFor="bvnNumber">
					BVN Number
				</label>
				{/* <input
					type="text"
					className="form-control py-3 dmMonoFont"
					name="bvnNumber"
					value={state?.bvnNumber ?? ""}
					onChange={textChange("bvnNumber")}
					placeholder="BVN Number"
					maxLength={11}
					readOnly={params?.page === "users"}
				/> */}
				<div className="relative">
					<div className="flex h-full w-full items-center">
						<input
							readOnly={auth?.user?.bvnNumber || params?.page === "users"}
							type={typePass2 ? "tel" : "password"}
							maxLength={11}
							required
							style={{
								border: "none !important",
							}}
							name="bvnNumber"
							className="form-control py-3 dmMonoFont"
							value={state?.bvnNumber ?? ""}
							onChange={textChange("bvnNumber")}
							placeholder="BVN Number"
						/>
						{!auth?.user?.bvnNumber && (
							<div className="absolute top-4 right-4">
								<EyeToggle typePass={typePass2} setTypePass={setTypePass2} />
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="col-md-6">
				<label className="dmMonoFont text-uppercase" htmlFor="ninNumber">
					NIN Number
				</label>
				{/* <input
					type="text"
					className="form-control py-3 dmMonoFont"
					name="ninNumber"
					value={state?.ninNumber ?? ""}
					onChange={textChange("ninNumber")}
					maxLength={11}
					readOnly={params?.page === "users"}
				/> */}
				<div className="relative">
					<div className="flex h-full w-full items-center">
						<input
							readOnly={auth?.user?.ninNumber || params?.page === "users"}
							type={typePass ? "tel" : "password"}
							maxLength={11}
							required
							style={{
								border: "none !important",
							}}
							name="ninNumber"
							className="form-control py-3 dmMonoFont"
							value={state?.ninNumber ?? ""}
							onChange={textChange("ninNumber")}
							placeholder="NIN Number"
						/>
						{!auth?.user?.ninNumber && (
							<div className="absolute top-4 right-4">
								<EyeToggle typePass={typePass} setTypePass={setTypePass} />
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="col-md-6">
				<label className="dmMonoFont text-uppercase" htmlFor="gender">
					Gender
				</label>
				<input
					type="text"
					className="form-control py-3 dmMonoFont"
					name="gender"
					value={state?.gender ?? ""}
					onChange={textChange("gender")}
					placeholder="Gender"
					readOnly={params?.page === "users"}
				/>
			</div>
			<div className="col-md-6">
				<label className="dmMonoFont text-uppercase" htmlFor="bio">
					Bio
				</label>
				<textarea
					style={{
						height: "10rem",
						resize: "none",
					}}
					className="form-control py-3 dmMonoFont"
					name="bio"
					placeholder="Brief description"
					value={state?.bio ?? ""}
					onChange={textChange("bio")}
					readOnly={params?.page === "users"}
				/>
			</div>
		</div>
	);
};

export const PasswordBox = () => {
	let { updatePassword, auth } = useContext(GlobalState);
	let init = {
			oldPassword: "",
			newPassword: "",
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
			e.preventDefault();
			if (!state?.oldPassword || !state?.newPassword) return;
			setLoading(true);
			await updatePassword(state);
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (submit && auth?.isPassword) {
			setState(init);
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, auth?.isPassword]);

	return (
		<div className="py-4 py-md-5">
			<h6 className="Lexend fw-600 fontReduceBig text-uppercase mt-3 mt-md-5">
				change password
			</h6>
			<small className="">
				Please enter your current password to change your password.
			</small>
			<div className="row mx-0 g-5 col-md-8 mt-3">
				<div className="col-md-6">
					<label className="dmMonoFont text-uppercase" htmlFor="password">
						old Password
					</label>
					<input
						type="password"
						className="form-control py-3 dmMonoFont"
						name="password"
						placeholder="Old Password"
						value={state?.oldPassword ?? ""}
						onChange={textChange("oldPassword")}
					/>
				</div>
				<div className="col-md-6">
					<label className="dmMonoFont text-uppercase" htmlFor="password">
						new Password
					</label>
					<input
						type="password"
						className="form-control py-3 dmMonoFont"
						name="password"
						placeholder="New Password"
						value={state?.newPassword ?? ""}
						onChange={textChange("newPassword")}
					/>
				</div>
			</div>
			<div className="d-flex align-items-center my-3">
				<Buttons
					onClick={handleSubmit}
					loading={loading}
					css="btn-primary1 text-capitalize px-md-4 px-3 fontReduce mx-md-3 mx-2 py-2 text-white"
					title={"save"}
					width="w-auto"
				/>
				<button
					onClick={() => setState(init)}
					type="button"
					className={`btn btn-outline-primary1 text-capitalize px-md-4 px-3 fontReduce mx-md-3 mx-2 py-2 text-primary1`}>
					cancel
				</button>
			</div>
		</div>
	);
};

export const WalletPinBox = () => {
	let { manageWalletPin, wallet } = useContext(GlobalState);
	let init = {
			pin: "",
			oldPin: "",
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
			e.preventDefault();
			if (wallet?.balance?.wallet_pin)
				if (!state?.pin || !state?.oldPin) return;
				else if (!state?.pin) return;
			setLoading(true);
			await manageWalletPin(
				wallet?.balance?.wallet_pin ? "put" : "post",
				state
			);
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (submit && wallet?.isWalletPin) {
			setState(init);
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, wallet?.isWalletPin]);

	return (
		<form
			onSubmit={handleSubmit}
			className="py-4 py-md-5 border-top border-bottom">
			<h6 className="Lexend fw-600 fontReduceBig text-uppercase mt-3 mt-md-5">
				manage transaction pin
			</h6>
			<small className="">
				{wallet?.balance?.wallet_pin
					? `Please enter your current pin to change your pin.`
					: `Add transaction pin`}
			</small>
			<div className="row mx-0 g-5 col-md-8 mt-3">
				{wallet?.balance?.wallet_pin && (
					<div className="col-md-6">
						<label className="dmMonoFont text-uppercase" htmlFor="password">
							old pin <small className="text-muted">4 digits</small>
						</label>
						<input
							type="number"
							className="form-control py-3 dmMonoFont"
							name="password"
							placeholder="Old pin"
							value={state?.oldPin ?? ""}
							onChange={textChange("oldPin")}
							maxLength={4}
						/>
					</div>
				)}
				<div className="col-md-6">
					<label className="dmMonoFont text-uppercase" htmlFor="password">
						Pin<small className="text-muted">4 digits</small>
					</label>
					<input
						type="number"
						className="form-control py-3 dmMonoFont"
						name="password"
						placeholder="Pin"
						value={state?.pin ?? ""}
						onChange={textChange("pin")}
						maxLength={4}
					/>
				</div>
			</div>
			<div className="d-flex align-items-center my-3">
				<Buttons
					onClick={handleSubmit}
					loading={loading}
					css="btn-primary1 text-capitalize px-md-4 px-3 fontReduce mx-md-3 mx-2 py-2 text-white"
					title={"save"}
					width="w-auto"
				/>
				<button
					onClick={() => setState(init)}
					type="button"
					className={`btn btn-outline-primary1 text-capitalize px-md-4 px-3 fontReduce mx-md-3 mx-2 py-2 text-primary1`}>
					cancel
				</button>
			</div>
		</form>
	);
};

export const Enable2FABox = () => {
	let { auth } = useContext(GlobalState);
	let [step, setStep] = useState(""),
		[code, setCode] = useState(""),
		[qr, setQr] = useState(""),
		dispatch = useDispatch(),
		[is2FAType, setIs2FAType] = useState(""),
		[loading, setLoading] = useState(false),
		[showSettings, setShowSetting] = useState(false),
		handleSubmit = async e => {
			e.preventDefault();
			if (step !== "enable") if (!code) return;
			if (step === "enable") if (!is2FAType) return;
			setLoading(true);
			try {
				let url = `/api/v1/user/is2fa-initiate`;
				if (step === "validate") url = `/api/v1/user/is2fa-validate`;
				if (step === "disable") url = `/api/v1/user/is2fa-disable`;
				var res;
				let dd = {
					image: process.env.REACT_APP_IMAGE_URL,
					name: process.env.REACT_APP_NAME,
				};
				if (step === "enable")
					res = await axios.post(url, { ...dd, type: is2FAType });
				else res = await axios.put(url, { ...dd, token: code });
				console.log({ res: res?.data }, step);
				toast.success(res.data.msg || res?.data?.message);
				setStep(step === "enable" ? "validate" : "");
				if (step !== "enable")
					dispatch({ type: UPDATE_USER, payload: res?.data });
				else {
					setQr(res?.data?.data || res?.data?.qr);
				}
				setLoading(false);
			} catch (err) {
				console.log({ err });
				let error = err.response?.data?.error;
				if (error) {
					error.forEach(error => toast.error(error.msg || error?.message));
				}

				if (err?.response?.status === 429) toast.error(err?.response?.data);
				setLoading(false);
			}
			setLoading(false);
		},
		handleSubmit2 = async e => {
			e?.preventDefault();
			if (auth?.user?.is2FAEnabled !== "enable") return;
			if (auth?.user?.is2FAType !== "mail") return;
			setLoading(true);
			try {
				let dd = {
					image: process.env.REACT_APP_IMAGE_URL,
					name: process.env.REACT_APP_NAME,
				};
				let url = `/api/v1/user/is2fa-initiate`;
				var res = await axios.put(url, dd);
				console.log({ res: res?.data }, step);
				toast.success(res.data.msg || res?.data?.message);
				setLoading(false);
			} catch (err) {
				console.log({ err });
				let error = err.response?.data?.error;
				if (error) {
					error.forEach(error => toast.error(error.msg || error?.message));
				}

				if (err?.response?.status === 429) toast.error(err?.response?.data);
				setLoading(false);
			}
			setLoading(false);
		},
		handleSubmit3 = async e => {
			e?.preventDefault();
			try {
				let dd = {
					image: process.env.REACT_APP_IMAGE_URL,
					name: process.env.REACT_APP_NAME,
				};
				let url = `/api/v1/user/is2fa-initiate`;
				var res = await axios.get(url, dd);
				console.log({ res: res?.data }, step);
				// toast.success(res.data.msg || res?.data?.message);
				setShowSetting(true);
			} catch (err) {
				console.log({ err });
				// let error = err.response?.data?.error;
				// if (error) {
				// 	error.forEach(error => toast.error(error.msg || error?.message));
				// }

				if (err?.response?.status === 429) toast.error(err?.response?.data);
			}
		},
		switchcase = [
			{
				name: "Google Authenticator App",
				case: "authenticator",
			},
			{
				name: "Email",
				case: "mail",
			},
		];

	useEffect(() => {
		handleSubmit3();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (auth?.user?.is2FAType) setIs2FAType(auth?.user?.is2FAType);
	}, [auth?.user]);

	useEffect(() => {
		if (
			auth?.user?.is2FAType === "mail" &&
			step &&
			step === "disable" &&
			auth?.user?.is2FAEnabled === "enable"
		) {
			handleSubmit2();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth?.user, step]);

	// 	const onSubmit = async (type: "initiate" | "disable" | "validate") => {
	//   await onSubmitAPI({
	//     url: `/user/authenticator/is2fa-${type}`,
	//     type: type === "initiate" && !isToDisable ? "post" : "put",
	//     data: { type: mode, token: code },
	//     setResponse: (d: any) => {
	//       if (type === "initiate") setQrData(d);
	//       if (["validate", "disable"]?.includes(type)) {
	//         setMode("password");
	//         apiCall({
	//           type: "get",
	//           url: "/user",
	//           getter: (d: any) => dispatch(getUserDetails(d)),
	//         });
	//       }
	//     },
	//     loadingValue: type === "initiate" ? "initiate" : "",
	//   });
	// };

	// useEffect(() => {
	//   if (mode && user?.is2FAEnabled === "disable") {
	//     onSubmit("initiate");
	//   }
	//   if (
	//     isToDisable &&
	//     user?.is2FAEnabled === "enable" &&
	//     user?.is2FAType !== "authenticator"
	//   ) {
	//     onSubmit("initiate");
	//   }
	//   // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [mode, user?.is2FAEnabled, isToDisable, user?.is2FAType]);

	// console.log({ step, user: auth?.user });

	return (
		<form className="py-4 py-md-5">
			{showSettings ? (
				<>
					<h6 className="Lexend fw-600 fontReduceBig text-uppercase mt-3 mt-md-5">
						2FA Authentication Settings
					</h6>
					<small className="">
						{/* Please enter your current password to change your password. */}
					</small>
					<div className="d-flex align-items-center my-3">
						<Buttons
							onClick={() =>
								setStep(
									auth?.user?.is2FAEnabled === "enable" ? "disable" : "enable"
								)
							}
							loading={loading}
							css={`
								${auth?.user?.is2FAEnabled === "enable"
									? "btn-danger2"
									: "btn-primary1"} text-capitalize px-md-4 px-3 fontReduce mx-md-3 mx-2 py-2 text-white
							`}
							title={
								auth?.user?.is2FAEnabled === "enable"
									? "Disable 2FA"
									: "Enable 2FA"
							}
							width="w-auto"
							type="button"
						/>
					</div>
					<ModalComponents
						isOpen={step}
						toggle={() => setStep(null)}
						title={`${
							auth?.user?.is2FAEnabled === "enable" ? "Disable" : "Enable"
						} 2FA Authentication`}>
						{step !== "enable" ? (
							<>
								{step === "validate" && qr ? (
									<>
										<small className="mb-4 tw-text-base tw-font-medium d-block">
											Please scan the qrcode and input the token in your
											Authenticator App
										</small>
										<img src={qr} alt="QRCode" className="img-fluid mx-auto" />
										<Buttons
											onClick={() => setQr("")}
											title={"Input Token"}
											css="btn btn-primary1 text-capitalize py-3 w-100 my-4"
											type="button"
										/>
									</>
								) : (
									<Enable2FAComponent
										handleSubmit={handleSubmit}
										loading={loading}
										code={code}
										setCode={setCode}
										subtext={`Enter code from your ${
											auth?.user?.is2FAType === "authenticator"
												? "Authenticator App"
												: "Email"
										}`}
									/>
								)}
							</>
						) : (
							<div className="d-flex flex-column mx-auto">
								<div className="w-100 d-block py-5">
									<label htmlFor="Privilege" className="Lexend">
										Select Type
									</label>
									<div className="row mx-0 g-3">
										{switchcase?.map((item, i) => (
											<div className="col p-2" key={i}>
												<div
													className={`btn ${
														is2FAType === item?.case
															? "btn-primary1"
															: "btn-outline-primary1"
													} w-100 h-100 text-capitalize py-3 py-md-5 rounded20`}
													onClick={() => setIs2FAType(item?.case)}>
													{item?.name}
												</div>
											</div>
										))}
									</div>
								</div>
								<div className="d-flex align-items-center my-3 mx-auto">
									<Buttons
										onClick={handleSubmit}
										loading={loading}
										css="btn-primary1 text-capitalize px-md-4 px-3 fontReduce mx-md-3 mx-2 py-2 text-white"
										title={"Enable"}
										width="w-auto"
									/>
									<button
										onClick={() => setStep("")}
										className={`btn btn-outline-primary1 text-capitalize px-md-4 px-3 fontReduce mx-md-3 mx-2 py-2 text-primary1`}>
										cancel
									</button>
								</div>
							</div>
						)}
					</ModalComponents>
				</>
			) : (
				<></>
			)}
		</form>
	);
};