import React, { useEffect } from "react";
import { useNavigate } from "@/lib/router";

const Home = () => {
	let navigate = useNavigate();
	useEffect(() => {
		navigate("/login", { replace: true });
	}, [navigate]);
	return <></>;
};

export default Home;
