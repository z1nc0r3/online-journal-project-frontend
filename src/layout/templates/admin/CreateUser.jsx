import React, { useState } from "react";
import axios from "axios";
import { Box, Container, Button, Typography, TextField, Select, MenuItem } from "@mui/material";
import Alert from "@mui/material/Alert";
import CssBaseline from "@mui/material/CssBaseline";
import "../../../assets/css/list.css";
import CreateMenu from "../../components/admin/CreateMenu";

const CreateUser = (props) => {
	const [formData, setFormData] = useState({
		fName: "",
		regNo: "",
		department: "",
		address: "",
		email: "",
		phone: "",
		estName: "",
		estAddress: "",
		startDate: "",
		duration: "",
		password: "",
		confirm_password: "",
	});

	const [passwordError, setPasswordError] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	// verify full name
	const handleFullNameChange = (e) => {
		const { value } = e.target;
		const fullNameRegex = /^[A-Za-z]+$/;

		if (value.match(fullNameRegex)) {
			setFormData((prevFormData) => ({
				...prevFormData,
				fName: value,
			}));
		}
	};

	// verify phone number
	const handlePhoneChange = (e) => {
		const { value } = e.target;
		const phoneRegex = /^[0-9]{0,10}$/;

		if (value.match(phoneRegex)) {
			setFormData((prevFormData) => ({
				...prevFormData,
				phone: value,
			}));
		}
	};

	// verify password
	const handlePasswordChange = () => {
		const value = formData.password;

		const hasMinimumLength = value.length >= 8;
		const hasUppercase = /[A-Z]/.test(value);
		const hasLowercase = /[a-z]/.test(value);
		const hasNumber = /[0-9]/.test(value);
		const hasSpecialCharacter = /[!@#$%^&*()]/.test(value);

		if (!hasMinimumLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecialCharacter) {
			setPasswordError("Password must be in standard format.");
			return false;
		} else {
			setPasswordError("");
			return true;
		}
	};

	// confirm password
	const handleConfirmPasswordChange = () => {
		if (formData.password !== formData.confirm_password) {
			setPasswordError("Passwords do not match.");
			return false;
		} else {
			setPasswordError("");
			return true;
		}
	};

	const handleSubmitTrainee = (e) => {
		e.preventDefault();

		if (!handlePasswordChange()) {
			setPasswordError("Password must be in standard format.");
			return;
		}

		if (!handleConfirmPasswordChange()) {
			setPasswordError("Passwords do not match.");
			return;
		}

		axios
			.post("http://127.0.0.1:8000/api/create/trainee", formData)
			.then((response) => {
				console.log(response.data);
				alert("Form submitted successfully!");
			})
			.catch((error) => {
				console.error(error);
				alert("Error submitting the form. Please try again.");
			});
	};

	switch (props.user) {
		case "trainee":
			return (
				<Container component="main" className="create_new_container" maxWidth={false}>
					<CssBaseline />

					<CreateMenu />

					<form onSubmit={handleSubmitTrainee}>
						<Box className="create_new_form">
							<Box className="create_new_form_left">
								<Typography>Full Name </Typography>
								<TextField variant="outlined" required fullWidth name="fName" autoFocus type="text" value={formData.fName} onChange={handleFullNameChange} />

								<Typography>Registration No </Typography>
								<TextField variant="outlined" required fullWidth name="regNo" type="text" value={formData.regNo} onChange={handleChange} />

								<Typography>Department </Typography>
								<TextField variant="outlined" required fullWidth name="department" type="text" value={formData.department} onChange={handleChange} />

								<Typography>Address </Typography>
								<TextField variant="outlined" required fullWidth name="address" type="text" value={formData.address} onChange={handleChange} />

								<Typography>Email </Typography>
								<TextField variant="outlined" required fullWidth name="email" type="email" value={formData.email} onChange={handleChange} />

								<Typography>Phone </Typography>
								<TextField variant="outlined" required fullWidth name="phone" type="number" value={formData.phone} onChange={handlePhoneChange} inputProps={{ maxLength: 10 }} />
							</Box>

							<Box className="create_new_form_right">
								<Typography>Name of the Establishment </Typography>
								<TextField variant="outlined" required fullWidth name="estName" type="text" value={formData.estName} onChange={handleChange} />

								<Typography>Address of the Establishment </Typography>
								<TextField variant="outlined" required fullWidth name="estAddress" type="text" value={formData.estAddress} onChange={handleChange} />

								<Typography>Training Period </Typography>
								<Box className="training_period" sx={{ display: "flex", flexDirection: "row" }}>
									<Box className="training_period_from">
										<Typography>From </Typography>
										<TextField variant="outlined" required fullWidth name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
									</Box>

									<Box className="training_period_to">
										<Typography>Duration </Typography>
										<Select variant="outlined" value={formData.duration} required fullWidth name="duration" type="text" onChange={handleChange}>
											<MenuItem value={3}>3 Months</MenuItem>
											<MenuItem value={6}>6 Months</MenuItem>
											<MenuItem value={9}>9 Months</MenuItem>
											<MenuItem value={12}>12 Months</MenuItem>
										</Select>
									</Box>
								</Box>

								<Typography>Password </Typography>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="password"
									type="password"
									value={formData.password}
									onChange={(e) => {
										setFormData({ ...formData, password: e.target.value });
										handlePasswordChange();
									}}
								/>

								{passwordError && <Alert severity="error">{passwordError}</Alert>}

								<Typography>Confirm Password </Typography>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="confirm_password"
									type="password"
									value={formData.confirm_password}
									onChange={(e) => {
										setFormData({ ...formData, confirm_password: e.target.value });
										handleConfirmPasswordChange();
									}}
								/>

								<Button variant="contained" type="submit" className="register_button" sx={{ width: "100%", bgcolor: "#379fff", fontSize: "16px" }}>
									Register
								</Button>
							</Box>
						</Box>
					</form>
				</Container>
			);
		default:
			return null;
	}
};

export default CreateUser;
