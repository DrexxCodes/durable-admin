import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "@/Data/Context";
import Container from "@/components/ui/Container";
import { Buttons, EmptyComponent } from "@/Utils";
import { AddNewFaq } from "@/views/app/faqs";
import moment from "moment";
import { AddAndDelete } from "@/views/app/settings/app";
import { ModalComponents } from "@/features";
import { DELETE_FAQS } from "@/Data/Actions/ActionTypes";
import { returnErrors } from "@/Data/Reducer/ErrorReducer";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const Privacy = () => {
	let { setStateName, faqs, manageFaqs, auth } = useContext(GlobalState),
		[isOpen, setIsOpen] = useState(false),
		[datum, setDatum] = useState(null),
		toggle = () => {
			if (isOpen) if (datum) setDatum(false);
			setIsOpen(!isOpen);
		},
		[state, setState] = useState(null);

	useEffect(() => {
		if (datum?.type === "update") setIsOpen(true);
	}, [datum]);

	useEffect(() => {
		setState(faqs?.privacy);
	}, [faqs?.privacy]);

	useEffect(() => {
		setStateName("Manage Privacy Policy");
		manageFaqs("get", null, "privacy");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!state) return;

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				{auth?.user?.isAdmin && (
					<Buttons
						title={"add new Privacy Policy"}
						css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
						width={"w-25 w25"}
						onClick={toggle}
						style={{ borderRadius: "30px" }}
					/>
				)}
				<PrivacyTermsTable state={state} setDatum={setDatum} />
			</Container>
			<AddNewFaq
				isOpen={isOpen}
				toggle={toggle}
				datum={datum?.data}
				type={"privacy"}
			/>
			<DeleteModal
				setDatum={setDatum}
				type="faqs"
				name="privacy and policy"
				state={datum?.data}
				isOpen={datum?.type === "delete"}
			/>
		</div>
	);
};

export default Privacy;

export const PrivacyTermsTable = ({ state, setDatum }) => {
	return (
		<div className="py-3 py-md-5">
			<div className="bland row mx-0 py-3 px-0 text-capitalize Lexend fw-bold">
				<div className="col textTrunc Lexend d-none d-md-flex">S/N</div>
				<div className="col textTrunc Lexend">Title</div>
				<div className="col textTrunc Lexend">Content</div>
				<div className="col textTrunc Lexend">Date&time</div>
				<div className="col textTrunc Lexend">Actions</div>
			</div>
			{state?.length === 0 ? (
				<EmptyComponent subtitle={"Activity is empty"} />
			) : (
				state?.map((it, i) => (
					<div key={i} className="row mx-0 py-3 border-bottom myCursor">
						<div className="col my-auto text-capitalize fontReduce2 textTrunc py-3 py-md-4 d-none d-md-flex">
							{i + 1}
						</div>
						<div className="col my-auto text-capitalize fontReduce2 textTrunc py-3 py-md-4 textTrunc2">
							{it?.summary}
						</div>
						<div className="col my-auto fontReduce2 textTrunc py-3 py-md-4 textTrunc4 textTrunc5">
							{it?.details}
						</div>
						<div className="col my-auto fontReduce2 textTrunc py-3 py-md-4 textTrunc4">
							{moment(it?.createdAt).format("DD/MM/YYYY hh:mm:ss A")}
						</div>
						<div className="col my-auto fontReduce2 textTrunc py-3 py-md-4 textTrunc4">
							<AddAndDelete
								handleDelete={
									!setDatum
										? null
										: () => setDatum({ type: "delete", data: it })
								}
								handleEdit={
									!setDatum
										? null
										: () => setDatum({ type: "update", data: it })
								}
							/>
						</div>
					</div>
				))
			)}
		</div>
	);
};

export const DeleteModal = ({ isOpen, type, state, setDatum, name }) => {
	let dispatch = useDispatch(),
		[loading, setLoading] = useState(false);

	let handleDelete = async e => {
		e?.preventDefault();
		try {
			setLoading(true);
			var res = await axios.delete(
				`/api/v2/${type?.replace("-", "")}?id=${state?._id}`
			);

			dispatch({
				type: DELETE_FAQS,
				payload: state,
			});
			setLoading(false);
			setDatum(null);
			toast.success(res.data.msg, { autoClose: 5000 });
		} catch (err) {
			setLoading(false);
			if (err?.response?.status === 429 || err?.response?.status === 405)
				toast.error(err?.response?.data ? err?.response?.data : err?.message);
			console.log({ err });
			let error = err.response?.data?.data;
			if (error) {
				dispatch(returnErrors({ error, status: err?.response?.status }));
			}
		}
	};

	return (
		<>
			<ModalComponents
				isOpen={isOpen}
				toggle={() => {
					setDatum(false);
				}}
				size={"sm"}
				title={`Delete ${name}`}>
				<div className="mx-12">
					<form className="space-y-4">
						<div className="my-auto w-100">
							<p className="text2 Lexend text-center">
								Do you want to delete {state?.title || state?.summary || ""}?
							</p>
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
										onClick={() => setDatum(null)}>
										no
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</ModalComponents>
		</>
	);
};
