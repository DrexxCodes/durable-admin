import React, { useContext, useEffect } from "react";
import { GlobalState } from "@/Data/Context";
import { useParams, useNavigate } from "@/lib/router";
import Container from "@/components/ui/Container";

const ManageCgWalletHistory = () => {
	let { setStateName, manageCGWalletHistory, auth, permission } =
		useContext(GlobalState);
	useEffect(() => {
		setStateName("CG Wallet History");
		manageCGWalletHistory("debit");
		manageCGWalletHistory("credit");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let navigate = useNavigate(),
		params = useParams(),
		controlsTab = [
			{
				textColor: "white",
				name: "Purchase",
				type: "link",
				link: `/${params?.page}/${params?.id}/credit`,
				color: "var(--tile)",
			},
			{
				name: "Usage",
				type: "link",
				link: `/${params?.page}/${params?.id}/debit`,
				color: "var(--tile)",
				textColor: "white",
			},
		];

	useEffect(() => {
		if (auth?.user?.privilege !== "superadmin") {
			let findTitle = "viewcgwallethistory";

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
				<div className="row mx-0 g-2 g-md-4 py-4 py-md-5">
					{controlsTab?.map((item, i) => (
						<div className="col-6 productCard" key={i}>
							<span
								onClick={() => {
									if (item?.type === "link") {
										navigate(item?.link);
									} else if (item?.type === "button") {
									}
								}}
								className="d-flex align-items-center justify-content-center text2 myCursor text-decoration-none h-100 eachProduct fontReduceBig textTrunc p-2 p-md-0 py-3 py-md-0 h-100 text-uppercase"
								style={{
									background: item?.color,
									borderRadius: "30px",
									color: item?.textColor ? item?.textColor : "#000",
								}}>
								<span className="textTrunc fontInherit fw-bold">
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

export default ManageCgWalletHistory;
