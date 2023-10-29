import React, { useState, useEffect } from "react";
import { Box, Container, Button } from "@mui/material";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Popover from '@mui/material/Popover';
import Cookies from "js-cookie";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "../../../assets/css/login.css";

function Login() {
	const [anchorEl, setAnchorEl] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [login_error, setError] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleCheckboxChange = (event) => {
		setRememberMe(event.target.checked);
	}

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	// check for previous login and redirect accordingly
	const checkLoggedIn = () => {
		const role = Cookies.get("role");
		const authorized = Cookies.get("authorized");

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

		axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/login/check`, { email, password }).then((response) => {
			const data = response.data;

			if (data.login_error) {
				setError(data.login_error);
			} else {
				const { role, user_id, fName } = data;
				const expires = rememberMe ? 3 : 0.5;

				Cookies.set("role", role, { expires });
				Cookies.set("user_id", user_id, { expires });
				Cookies.set("fName", fName, { expires });
				Cookies.set("authorized", true, { expires });
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
						type={showPassword ? "text" : "password"}
						autoComplete="current-password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						InputProps={{
							endAdornment: (
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => setShowPassword(!showPassword)}
									onMouseDown={(event) => event.preventDefault()}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							),
						}}
					/>
					<Container className="login_helper_container" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", marginBottom: "1rem" }}>
						<FormControlLabel control={<Checkbox value="remember" color="primary" defaultChecked={false} onChange={handleCheckboxChange} />} label="Remember me" />
						<Link variant="body2" sx={{ color: "#0057ff", textDecoration: "none", cursor: "pointer" }} onClick={handleClick}>
							Forgot password?
						</Link>

						<Popover
							id={id}
							open={open}
							anchorEl={anchorEl}
							onClose={handleClose}
							anchorOrigin={{
								vertical: 'center',
								horizontal: 'right',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							className="forgot-pw-container"
						>
							<Box>
								<Typography className="forgot-pw-tooltip">Please contact the system administrator to reset your password.</Typography>
							</Box>
						</Popover>

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