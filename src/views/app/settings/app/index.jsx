import React, { useEffect, useContext } from "react";
import { useNavigate, useParams } from "@/lib/router";
import Container from "@/components/ui/Container";
import { GlobalState } from "@/Data/Context";
import { BsPencil } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

export const AddAndDelete = ({ handleEdit, handleDelete }) => {
	return (
		<div className="tw-flex tw-items-center tw-gap-10">
			{handleEdit && (
				<span onClick={handleEdit} className="tw-text-main tw-opacity-40">
					<BsPencil />
				</span>
			)}
			{handleDelete && (
				<span onClick={handleDelete} className="tw-text-red tw-cursor-pointer">
					<RiDeleteBin6Line />
				</span>
			)}
		</div>
	);
};

const AppSettings = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("Manage App Settings");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let navigate = useNavigate(),
		{ page, id } = useParams(),
		controlsTab = [
			// {
			// 	name: "Service Icon",
			// 	type: "link",
			// 	link: `/${page}/${id}/serviceicon`,
			// 	color: "var(--tile)",
			// 	textColor: "white",
			// },
			{
				name: "Privacy Policy",
				type: "link",
				link: `/${page}/${id}/privacy`,
				color: "var(--tile)",
				textColor: "white",
			},
			{
				name: "Terms and Condition",
				type: "link",
				link: `/${page}/${id}/terms`,
				color: "var(--tile)",
			},
		];

	return (
		<div className="bg-white aboutScreen tw-py-10">
			<Container>
				<div className="tw-grid tw-grid-cols-4 tw-w-5/6 tw-mx-auto tw-gap-8">
					{controlsTab?.map((item, i) => (
						<div
							className="tw-bg-white tw-flex tw-justify-center tw-items-center tw-px-3 tw-capitalize tw-shadow-xl tw-h-28"
							key={i}>
							<span
								onClick={() => {
									if (item?.type === "link") {
										navigate(item?.link);
									} else if (item?.type === "button") {
										// if (item?.link === "debit") toggle();
									}
								}}
								className=""
								// style={{
								//   background: item?.color,
								//   borderRadius: "30px",
								//   color: item?.textColor ? item?.textColor : "#000",
								// }}
							>
								<span className="tw-text-xl tw-text-[#1b1b1b] tw-cursor-pointer tw-font-semiboold">
									{item?.name}
								</span>
							</span>
						</div>
					))}
				</div>
			</Container>
		</div>
	);
};

export default AppSettings;
