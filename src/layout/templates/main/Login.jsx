import React, { useState } from "react";
import { Box, Container, Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import "../../../assets/css/login.css";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [role, setRole] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		const request = new Request("https://cors-anywhere.herokuapp.com/https://gist.githubusercontent.com/z1nc0r3/019e0500785237de404fc46586e914d7/raw/bc323469c9af12bd3c19ea0ae56fa2e8b6467720/credentials.json", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Headers": "Origin, X-Requested-With",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		});

		fetch(request)
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					setError(data.error);
				} else {
					setRole(data.role);
					// Redirect to the appropriate page based on the role
					switch (role) {
						case "Trainee":
							<Navigate to="/trainee" />;
							break;
						case "Supervisor":
							<Navigate to="/supervisor" />;
							break;
						case "Evaluator":
							<Navigate to="/evaluator" />;
							break;
						case "Super Admin":
							<Navigate to="/admin" />;
							break;
						default:
							<Navigate to="/login" />;
							break;
					}
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
						label="Username"
						name="username"
						autoComplete="username"
						autoFocus
						value={username}
						onChange={(event) => setUsername(event.target.value)}
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

					<Button variant="contained" type="submit" className="loginButton" sx={{ width: "100%", bgcolor: "#379fff", fontSize: "18px" }}>
						Login
					</Button>
				</Box>
			</form>
			{error && <p>{error}</p>}
		</Container>
	);
}

export default Login;
