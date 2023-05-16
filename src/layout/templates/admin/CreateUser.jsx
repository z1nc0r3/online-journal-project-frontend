import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Container, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../../../assets/css/list.css";
import CreateMenu from "../../components/admin/CreateMenu";

function CreateUser(props) {
	switch (props.user) {
		case "trainee":
			return (
				<Container component="main" className="create_new_container" maxWidth={false}>
					<CssBaseline />

					<CreateMenu />

					<Box className="create_new_form" component="form">
						<Box className="create_new_form_left">
							<Typography>Assigned Supervisor </Typography>
							<TextField variant="outlined" margin="normal" required fullWidth label="Full Name" name="fullname" autoComplete="fullname" autoFocus />

							<Typography>Registration No </Typography>
							<TextField variant="outlined" margin="normal" required fullWidth label="Registration No" name="regno" autoComplete="regno" autoFocus />

							<Typography>Department </Typography>
							<TextField variant="outlined" margin="normal" required fullWidth label="Department" name="department" autoComplete="department" autoFocus />

							<Typography>Address </Typography>
							<TextField variant="outlined" margin="normal" required fullWidth label="Address" name="address" autoComplete="address" autoFocus />

							<Typography>Email </Typography>
							<TextField variant="outlined" margin="normal" required fullWidth label="Email" name="email" autoComplete="email" autoFocus />

							<Typography>Phone </Typography>
							<TextField variant="outlined" margin="normal" required fullWidth label="Phone" name="phone" autoComplete="phone" autoFocus />
						</Box>

						<Box className="create_new_form_right">
							<Typography>Name of the Establishement </Typography>
							<TextField variant="outlined" margin="normal" required fullWidth label="Establishement Name" name="establishement_name" autoComplete="establishement_name" autoFocus />

							<Typography>Address of the Establishement </Typography>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								label="Establishement Address"
								name="establishement_address"
								autoComplete="establishement_address"
								autoFocus
							/>

							<Typography>Training Period </Typography>
							<Box className="training_period" sx={{display: "flex", flexDirection: "row"}}>
								<Box className="training_period_from">
								<Typography>From </Typography>
								<TextField variant="outlined" margin="normal" required fullWidth label="From" name="from" autoComplete="from" autoFocus />
								</Box>

								<Box className="training_period_to">
								<Typography>To </Typography>
								<TextField variant="outlined" margin="normal" required fullWidth label="To" name="to" autoComplete="to" autoFocus />
								</Box>
							</Box>

							<Typography>Password </Typography>
							<TextField variant="outlined" margin="normal" required fullWidth label="Password" name="password" autoComplete="password" autoFocus />

							<Typography>Confirm Password </Typography>
							<TextField variant="outlined" margin="normal" required fullWidth label="Confirm Password" name="confirm_password" autoComplete="confirm_password" autoFocus />
						</Box>
					</Box>
				</Container>
			);
		case "supervisor":
			return (
				<Container component="main" className="create_new_container" maxWidth={false}>
					<CssBaseline />

					<CreateMenu />

					<Box className="create_new_form" component="form">
						<TextField className="username" variant="outlined" margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus />

						<TextField
							className="password"
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
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
				</Container>
			);
		case "evaluator":
			return (
				<Container component="main" className="create_new_container" maxWidth={false}>
					<CssBaseline />

					<CreateMenu />

					<Box className="create_new_form" component="form">
						<TextField className="username" variant="outlined" margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus />

						<TextField
							className="password"
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
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
				</Container>
			);
		default:
			return (
				<Container component="main" className="create_new_container" maxWidth={false}>
					<CssBaseline />

					<CreateMenu />

					<Box className="create_new_form" component="form">
						<TextField className="username" variant="outlined" margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus />

						<TextField
							className="password"
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
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
				</Container>
			);
	}
}

export default CreateUser;
