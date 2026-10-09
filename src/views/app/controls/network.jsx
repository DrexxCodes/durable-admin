import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "@/Data/Context";
import Container from "@/components/ui/Container";
import { Buttons, EmptyComponent } from "@/Utils";
import { ModalComponents } from "@/features";
import { BiTrashAlt } from "react-icons/bi";
import { BsPen } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import { UploadPicture } from "@/views/app/sliders";
import { useNavigate } from "@/lib/router";

const Network = () => {
	let { setStateName, auth, permission } = useContext(GlobalState);
	useEffect(() => {
		setStateName("Network Controls");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [isOpen, setIsOpen] = useState(false),
		[data, setNetwork] = useState(null),
		toggle = () => {
			if (data) setNetwork(null);
			setIsOpen(!isOpen);
		},
		navigate = useNavigate();

	useEffect(() => {
		if (auth?.user?.privilege !== "superadmin") {
			let findTitle = "viewmanagenetwork";

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
		if (data) {
			setIsOpen(true);
		}
	}, [data]);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<h4 className="Lexend">All network plans</h4>{" "}
				<div className="btn-group">
					<Buttons
						title={"create new"}
						css="btn-primary1 text-capitalize py-md-3 py-2 px-4 px-lg-5 my-md-4 my-2 mb-0"
						width={"w-auto"}
						onClick={toggle}
						style={{ borderRadius: "30px" }}
					/>
				</div>
				<NetworkBundleDetails setNetwork={setNetwork} />
			</Container>{" "}
			<MakeNetworkBundle isOpen={isOpen} back={toggle} datum={data} />
		</div>
	);
};

export default Network;

const NetworkBundleDetails = ({ setNetwork }) => {
	let { network, manageNetwork } = useContext(GlobalState),
		[state, setState] = useState(null),
		[load2, setLoad2] = useState({ isLoad: false, loadNetwork: "" });

	useEffect(() => {
		setState(network?.data);
	}, [network?.data]);

	if (!state) return;

	return (
		<>
			<div className="pb-5 my-5">
				<div className="bland row mx-0 py-3 px-0 text-capitalize Lexend fw-bold">
					<div className="col textTrunc d-none d-md-flex Lexend">S/N</div>
					<div className="col textTrunc Lexend">Image</div>
					<div className="col textTrunc Lexend">Name</div>
					<div className="col textTrunc Lexend">action </div>
				</div>
				<div className="bg-white row mx-0">
					{state?.length === 0 ? (
						<EmptyComponent subtitle={"NetworkBundle state empty"} />
					) : (
						state?.map((item, index) => (
							<div key={index} className="row mx-0 py-3 px-0 border-bottom">
								<div className="col d-none d-md-flex textTrunc my-auto">
									{index + 1}
								</div>
								<div className="col my-auto">
									<img
										src={item?.image?.url}
										alt={item?.image?.name}
										className="img-fluid rounded imgFluid"
										style={{
											height: "10rem",
											width: "auto",
										}}
									/>
								</div>
								<div className="col textTrunc my-auto">{item?.name}</div>
								<div className="col textTrunc my-auto btn-group">
									<button
										title="Edit Network plan"
										onClick={() => setNetwork(item)}
										className="btn btn-success2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
										<BsPen />
									</button>
									<button
										title="Delete Network plan"
										onClick={async () => {
											setLoad2({ isLoad: true, loadNetwork: item?._id });
											await manageNetwork(item, item?._id, "delete");
											setLoad2({ isLoad: false, loadNetwork: "" });
										}}
										className="btn btn-danger2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
										{load2?.isLoad && load2?.loadNetwork === item?._id ? (
											<ClipLoader color="white" size={16} />
										) : (
											<BiTrashAlt />
										)}
									</button>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</>
	);
};

const MakeNetworkBundle = ({ isOpen, back, datum }) => {
	let { network, manageNetwork } = useContext(GlobalState);
	let init = {
			name: "",
		},
		[state, setState] = useState(init),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			},
		[newLoad, setNewLoad] = useState(false),
		[submit, setSubmit] = useState(false),
		[image, setImages] = useState();

	useEffect(() => {
		if (datum) {
			setState(datum);
			setImages(datum?.image ? datum?.image : false);
		}
	}, [datum]);

	let handleSubmit = async e => {
		e?.preventDefault();
		if (!state?.name) return;

		let datee = state;

		if (!datum) {
			datee = { ...state, image };
		} else {
			if (image === datum?.image) {
				datee = { ...state };
			} else datee = { ...state, image };
		}
		datee = { ...datee, name: datee?.name?.trim() };

		setNewLoad(true);
		datum?._id
			? await manageNetwork(datee, datum?._id, "edit")
			: await manageNetwork(datee);
		setNewLoad(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && network?.isAdded) {
			setSubmit(false);
			setState(init);
			back();
		}
		if (submit && network?.isUpdated) {
			setSubmit(false);
			setState(init);
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, network?.isAdded, network?.isUpdated]);

	return (
		<>
			<ModalComponents
				title={datum?._id ? `update ${datum?.name}` : "add network plan"}
				isOpen={isOpen}
				back={back}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<UploadPicture img={image} setImages={setImages} />
						<div className="mb-4">
							<label htmlFor="value">Network name</label>
							<input
								type={"text"}
								placeholder="Network name"
								className="form-control py-3"
								value={state?.name}
								onChange={textChange("name")}
							/>
						</div>
						<Buttons
							title={datum?._id ? "update" : "create"}
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
