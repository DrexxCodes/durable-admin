import React, { useContext, useEffect, useState } from "react";
import { Link } from "@/lib/router";
import Container from "@/components/ui/Container";
import { useParams } from "@/lib/router";
import { GlobalState } from "@/Data/Context";
import { Buttons } from "@/Utils";
import { ModalComponents } from "@/features";

const Administration = () => {
	let {
		setStateName,
		manager,
		marketer,
		developer,
		accountant,
		superadmin,
		numberWithCommas,
		getUserPrivileges,
		getPermission,
		customercare,
	} = useContext(GlobalState);
	useEffect(() => {
		setStateName("manage Admins");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		getUserPrivileges("manager");
		getUserPrivileges("marketer");
		getUserPrivileges("developer");
		getUserPrivileges("accountant");
		getUserPrivileges("customer-care");
		getUserPrivileges("superadmin");
		getPermission();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let productArr = [
		{
			name: "Manage Admins",
			link: "/manager",
			color: "var(--tile)",
			textColor: "white",
			number: manager?.paginate?.total,
		},
		{
			name: "Manage Marketer",
			link: "/marketer",
			color: "var(--tile)",
			textColor: "white",
			number: marketer?.paginate?.total,
		},
		{
			name: "Manage Developer",
			link: "/developer",
			color: "var(--tile)",
			number: developer?.paginate?.total,
		},
		{
			name: "Manage Accountant",
			link: "/accountant",
			color: "var(--tile)",
			textColor: "black",
			number: accountant?.paginate?.total,
		},
		{
			name: "Manage Customer Care",
			link: "/customer-care",
			color: "var(--tile)",
			textColor: "white",
			number: customercare?.paginate?.total,
		},
		{
			name: "Manage Superadmin",
			link: "/superadmin",
			color: "var(--tile)",
			textColor: "white",
			number: superadmin?.paginate?.total,
		},
	];

	let params = useParams();
	let [isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		};

	return (
		<Container>
			<div className="row mx-0 g-2 g-md-4 py-4 py-md-5">
				{productArr?.map((item, i) => (
					<div className="col-6 col-md-4 productCard" key={i}>
						<Link
							to={
								item?.type === "button" ? "#" : `/${params?.page}${item?.link}`
							}
							className="d-flex align-items-center justify-content-center text2 myCursor text-decoration-none h-100 eachProduct fontReduceBig textTrunc p-2 p-md-0 py-3 py-md-0 h-100 flex-column"
							style={{
								background: item?.color,
								borderRadius: "30px",
								color: item?.textColor ? item?.textColor : "#000",
							}}>
							<span className="textTrunc fontInherit">{item?.name}</span>
							<span className="textTrunc fontInherit textBig Lexend text5">
								{item?.number ? numberWithCommas(item?.number) : ""}
							</span>
						</Link>
					</div>
				))}
			</div>
			<ModalComponents title="assign role" isOpen={isOpen} back={toggle}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<div className="form mb-3">
							<label htmlFor="bundle">Choose user</label>
							<select className="form-control rounded10 py-3 form-select">
								<option value="ringo">John Doe</option>
							</select>
						</div>
						<div className="form mb-3">
							<label htmlFor="bundle">Role</label>
							<select className="form-control rounded10 py-3 form-select">
								<option value="ringo">Marketter</option>
							</select>
						</div>
						<Buttons
							title={"assign"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
							width={"w-50 w50"}
							onClick={toggle}
							style={{ borderRadius: "30px" }}
						/>
					</form>
				</div>
			</ModalComponents>
		</Container>
	);
};

export default Administration;
