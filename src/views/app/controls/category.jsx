import React, { useContext, useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { GlobalState } from "@/Data/Context";
import { Buttons } from "@/Utils";
import { useNavigate } from "@/lib/router";
import {
	AddBillerModal,
	CATEGORY_MODAL,
	CategoryTable,
	CreateCategoryModal,
	DeleteCategoryModal,
	EditCategoryModal,
} from "@/features/Category";

const BULK_BTN =
	"btn-primary1 text-capitalize py-md-3 py-2 px-4 px-lg-5 my-md-4 my-2 mb-0";

const ManageCategory = () => {
	const { setStateName, toggleAvailabilty, auth, permission, getBiller } =
		useContext(GlobalState);
	const navigate = useNavigate();
	const [bulk, setBulk] = useState("");
	// one modal at a time; a modal is mounted only while open, so its form always starts fresh
	const [modal, setModal] = useState({ type: null, item: null });
	const open = (type, item = null) => setModal({ type, item });
	const close = () => setModal({ type: null, item: null });

	useEffect(() => {
		setStateName("Category Control");
		getBiller();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (auth?.user?.privilege !== "superadmin") {
			const allowed = permission?.data?.find(
				item =>
					item?.slug === "viewmanagecategory" &&
					item?.user?.includes(auth?.user?._id)
			);
			if (!allowed) navigate(-1);
		}
	}, [auth?.user, permission?.data, navigate]);

	const toggleAll = async enabler => {
		setBulk(enabler);
		await toggleAvailabilty("category", enabler);
		setBulk("");
	};

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<h4 className="Lexend">All category</h4>{" "}
				<div className="btn-group">
					<Buttons
						title={"create new"}
						css={BULK_BTN}
						width={"w-auto"}
						onClick={() => open(CATEGORY_MODAL.CREATE)}
						style={{ borderRadius: "30px" }}
					/>
					{["disable", "enable"].map(enabler => (
						<Buttons
							key={enabler}
							title={`${enabler} all`}
							css={`${BULK_BTN} mx-1 mx-md-2`}
							width={"w-auto"}
							onClick={() => toggleAll(enabler)}
							loading={bulk === enabler}
							style={{ borderRadius: "30px" }}
						/>
					))}
				</div>
				<CategoryTable
					onAddBiller={item => open(CATEGORY_MODAL.BILLER, item)}
					onEdit={item => open(CATEGORY_MODAL.EDIT, item)}
					onDelete={item => open(CATEGORY_MODAL.DELETE, item)}
				/>
			</Container>
			{modal.type === CATEGORY_MODAL.CREATE && (
				<CreateCategoryModal back={close} />
			)}
			{modal.type === CATEGORY_MODAL.BILLER && (
				<AddBillerModal back={close} datum={modal.item} />
			)}
			{modal.type === CATEGORY_MODAL.EDIT && (
				<EditCategoryModal back={close} datum={modal.item} />
			)}
			{modal.type === CATEGORY_MODAL.DELETE && (
				<DeleteCategoryModal back={close} datum={modal.item} />
			)}
		</div>
	);
};

export default ManageCategory;
