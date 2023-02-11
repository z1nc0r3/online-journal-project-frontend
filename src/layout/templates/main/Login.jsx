import React from "react";
import { Box, Container, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import "../../../assets/css/login.css";

function Login() {
	function print() {
		console.log("submitted successfully.");
	}

	return (
		<Container component="main" className="login_container" maxWidth="sm">
			<CssBaseline />

			<Typography component="h1" variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
				Welcome back !
			</Typography>

			<Typography component="h1" variant="h6" sx={{ fontWeight: "normal", color: "white" }}>
				Please enter your credentials to Login
			</Typography>

			<Box className="login_form" component="form" onSubmit={print}>
				<Typography component="h1" variant="h5" sx={{ fontWeight: "bold", color: "#0085ff", marginBottom: "1rem" }}>
					Login
				</Typography>

				<TextField className="username" variant="outlined" margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus />

				<TextField className="password" variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />

				<Container className="login_helper_container" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", marginBottom: "1rem" }}>
					<FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
					<Link href="#" variant="body2" sx={{ color: "#0057ff" }}>
						Forgot password?
					</Link>
				</Container>

				<Button variant="contained" type="submit" className="loginButton" sx={{ width: "100%", bgcolor: "#379fff", fontSize: "18px" }}>
					Login
				</Button>
			</Box>
		</Container>
	);
}

export default Login;
