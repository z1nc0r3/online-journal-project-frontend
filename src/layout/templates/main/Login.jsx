import React, { useState, useEffect } from "react";
import { Box, Container, Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import "../../../assets/css/login.css";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [login_error, setError] = useState("");
	const [role, setRole] = useState("");

	// check for previous login and redirect accordingly
	const checkLoggedIn = () => {
		const role = localStorage.getItem("role");
		const authorized = localStorage.getItem("authorized");

		if (role && authorized) {
			window.location.href = `/${role}`;
		}
	};

	useEffect(() => {
		checkLoggedIn();
	}, []);

	useEffect(() => {
		loginError();
	}, [login_error]);

	const loginError = () => {
		return (
			login_error && (
				<Alert severity="error" sx={{ margin: "0 0 15px 0" }}>
					{login_error}
				</Alert>
			)
		);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		axios.post("http://127.0.0.1:8000/api/login/check", { email, password }).then((response) => {
			const data = response.data;
			console.log(data);

			if (data.login_error) {
				setError(data.login_error);
			} else {
				const { role } = data;
				localStorage.setItem("role", role);
				localStorage.setItem("authorized", true);
				window.location.href = `/${role}`;
			}
		});
	};

	return (
		<Container component="main" className="login_container" maxWidth="sm">
			<CssBaseline />

			<Typography component="h1" variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
				Sign In
			</Typography>

			<form onSubmit={handleSubmit}>
				<Box className="login_form">
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						type="email"
						label="Email"
						name="email"
						autoComplete="email"
						autoFocus
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<TextField
						className="password"
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						autoComplete="current-password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					<Container className="login_helper_container" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", marginBottom: "1rem" }}>
						<FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
						<Link href="#" variant="body2" sx={{ color: "#0057ff", textDecoration: "none" }}>
							Forgot password?
						</Link>
					</Container>

					{loginError()}

					<Button variant="contained" type="submit" className="loginButton" sx={{ width: "100%", bgcolor: "#379fff", fontSize: "18px" }}>
						Login
					</Button>
				</Box>
			</form>
		</Container>
	);
}

export default Login;
