import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "@/lib/router";
import AuthLayout from "@/components/layout/AuthLayout";
import { safeNext } from "@/lib/redirect";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { GlobalState } from "@/Data/Context";
import { Buttons } from "@/Utils";
import { VerifyMail } from "@/views/public/forget-password";

const Login = () => {
	const {
		loginUser,
		// getSetTempUser,
		auth,
		loginUser2FA,
	} = useContext(GlobalState);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	let [typePass, setTypePass] = useState(false),
		init = {
			email: "",
			password: "",
		},
		[stateData, setStateData] = useState(init),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[step, setStep] = useState(1),
		[code, setCode] = useState(""),
		navigate = useNavigate(),
		textChange =
			name =>
			({ target: { value } }) => {
				setStateData({ ...stateData, [name]: value });
			};

	let handleSubmit = async e => {
			e.preventDefault();
			if (!stateData?.password || !stateData?.email) return;
			setLoading(true);
			await loginUser(stateData);
			// getSetTempUser("auth");
			setLoading(false);
			setSubmit(true);
		},
		handleSubmit2 = async e => {
			e?.preventDefault();
			if (!code) return;
			setLoading(true);
			await loginUser2FA({ token: code });
			// getSetTempUser("auth");
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (submit && auth?.isLoggedIn) {
			setSubmit(false);
			navigate(safeNext(new URLSearchParams(window.location.search).get("next")) || "/");
		}
		if (submit && auth?.is2FA) {
			setSubmit(false);
			setStep(2);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, auth?.isLoggedIn, auth?.is2FA]);

	return (
		<>
			<DefaultAuthComponent>
				<h3 className="text-capitalize Lexend">Welcome back</h3>
				<small className="mb-4 d-block">
					{step !== 1
						? `Please input the token in your ${
								auth?.is2FAType === "authenticator"
									? "Authenticator App"
									: "Email"
						  }`
						: `Welcome back! Please enter your details.`}
				</small>
				{step !== 1 ? (
					<Enable2FAComponent
						handleSubmit={handleSubmit2}
						loading={loading}
						code={code}
						setCode={setCode}
						subtext={`Enter code from your ${
							auth?.is2FAType === "authenticator"
								? "Authenticator App"
								: "Email"
						}`}
					/>
				) : (
					<>
						<form>
							<label htmlFor="email">Email</label>
							<div className="mb-3">
								<input
									type="email"
									required
									name="email"
									className="form-control py-3"
									value={stateData.email}
									onChange={textChange("email")}
									// onPaste={e => e?.preventDefault()}
								/>
							</div>
							<label htmlFor="Password">Password</label>
							<div className="mb-5 show-hide position-relative">
								<input
									type={typePass ? "text" : "password"}
									required
									name="password"
									className="form-control py-3"
									value={stateData.password}
									onChange={textChange("password")}
								/>
								<span className="" onClick={() => setTypePass(!typePass)}>
									{!typePass ? <BsEye /> : <BsEyeSlash />}
								</span>
							</div>
							<p className="my-4 Lexend">
								Forgot my login details{" "}
								<Link
									to={`/forget-password`}
									className="text-decoration-none textColor2 fw-600">
									Get help signing in
								</Link>{" "}
							</p>
							<Buttons
								onClick={handleSubmit}
								loading={loading}
								title={"sign in"}
								css="btn btn-primary1 text-capitalize py-3 w-100 my-4"
							/>
						</form>
						<div className="my-3 d-flex align-items-center justify-content-between">
							<Link
								to={`/activate`}
								className="btn text-capitalize Lexend fw-600">
								verify mail
							</Link>{" "}
						</div>
					</>
				)}
			</DefaultAuthComponent>
		</>
	);
};

export default Login;

export const DefaultAuthComponent = ({ children }) => <AuthLayout>{children}</AuthLayout>;

export const Enable2FAComponent = ({
	handleSubmit,
	code,
	setCode,
	loading,
	subtext,
}) => {
	return (
		<>
			<h3 className="text-capitalize">OTP</h3>
			<form onSubmit={handleSubmit}>
				<VerifyMail
					code={code}
					setCode={setCode}
					text="confirm Token"
					numInputs={6}
					subtext={subtext}
					isInputSecure
				/>
				<Buttons
					onClick={handleSubmit}
					loading={loading}
					css="btn btn-primary1 text-capitalize py-3 w-100 my-4"
					title="confirm Token"
					type="button"
				/>
			</form>
		</>
	);
};
