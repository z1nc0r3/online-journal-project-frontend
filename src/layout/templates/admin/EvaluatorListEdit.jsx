import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Container, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../../../assets/css/list.css";
import CreateMenu from "../../components/admin/CreateMenu";

function EvaluatorListEdit(){

    const [formData, setFormData] = useState({
		fullname: "",
		regno: "",
		department: "",
		address: "",
		email: "",
		phone: "",
		est_name: "",
		est_address: "",
		training_from: "",
		training_to: "",
		trainingPeriod: "",
		password: "",
		confirm_password: ""
	});

    const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleFullNameChange = (e) => {
		const { value } = e.target;
		const fullNameRegex = /^[A-Za-z]+$/;

		// Verify full name format (letters only)
		if (value.match(fullNameRegex)) {
			setFormData((prevFormData) => ({
				...prevFormData,
				fullname: value,
			}));
		}
	};

	const handleEmailChange = (e) => {
		const { value } = e.target;
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

		// Verify email format
		if (value.match(emailRegex)) {
			setFormData((prevFormData) => ({
				...prevFormData,
				email: value,
			}));
		}
	};

	const handlePasswordChange = (e) => {
		const { value } = e.target;

		// Password policy verifications
		const hasMinimumLength = value.length >= 8;
		const hasUppercase = /[A-Z]/.test(value);
		const hasLowercase = /[a-z]/.test(value);
		const hasNumber = /[0-9]/.test(value);
		const hasSpecialCharacter = /[!@#$%^&*()]/.test(value);

		// Verify password meets all requirements
		if (hasMinimumLength && hasUppercase && hasLowercase && hasNumber && hasSpecialCharacter) {
			setFormData((prevFormData) => ({
				...prevFormData,
				password: value,
			}));
		}
	};

	const handleConfirmPasswordChange = (e) => {
		const { value } = e.target;
		const { password } = formData;

		// Verify if confirm password matches the password
		if (value === password) {
			setFormData((prevFormData) => ({
				...prevFormData,
				confirm_password: value,
			}));
		}
	};

	const handlePhoneChange = (e) => {
		const { value } = e.target;
		const phoneRegex = /^[0-9]{0,10}$/; // Updated regex to allow maximum of 10 numbers

		// Verify phone format (limit to 10 numbers)
		if (value.match(phoneRegex)) {
			setFormData((prevFormData) => ({
				...prevFormData,
				phone: value,
			}));
		}
	};

	const handleDateChange = (e) => {
		const { name, value } = e.target;

		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));

		const { training_from, training_to } = formData;

		// Verify end date is ahead of start date
		if (name === "training_to" && training_from && training_to) {
			const isEndDateValid = new Date(training_to) > new Date(training_from);

			if (!isEndDateValid) {
				// Perform the necessary action if end date is not ahead of start date
				// For example, show an error message or disable a submit button
			}
		}
	};

    const handleSubmit = (e) => {
		e.preventDefault();
		// Perform form submission logic here
		console.log(formData);
	};

    return (
        <Container component="main" className="create_new_container" maxWidth={false}>
            <CssBaseline />
 
            <form onSubmit={handleSubmit}>
                <Box className="create_new_form" component="form">
                    <Box className="create_new_form_left">
                        <Typography>Assigned Supervisor </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Full Name"
                            name="fullname"
                            autoFocus
                            type="text"
                            value={formData.fullname}
                            onChange={handleFullNameChange}
                        />
    
                        <Typography>Registration No </Typography>
                        <TextField 
                            variant="outlined" 
                            margin="normal" 
                            required 
                            fullWidth 
                            label="Registration No" 
                            name="regno" 
                            type="text" 
                            onChange={handleChange} 
                        />
    
                        <Typography>Department </Typography>
                        <TextField 
                            variant="outlined" 
                            margin="normal" 
                            required 
                            fullWidth 
                            label="Department" 
                            name="department" 
                            type="text" 
                            value={formData.department} 
                            onChange={handleChange} 
                        />
    
                        <Typography>Address </Typography>
                        <TextField 
                            variant="outlined" 
                            margin="normal" 
                            required 
                            fullWidth 
                            label="Address" 
                            name="address" 
                            type="text" 
                            value={formData.address} 
                            onChange={handleChange} />
    
                        <Typography>Email </Typography>
                        <TextField 
                            variant="outlined" 
                            margin="normal" 
                            required 
                            fullWidth 
                            label="Email" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleEmailChange} />
    
                        <Typography>Phone </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Phone"
                            name="phone"
                            type="number"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            inputProps={{ maxLength: 10 }}
                        />
                    </Box>
    
                    <Box className="create_new_form_right">
                        <Typography>Name of the Establishment </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Establishment Name"
                            name="est_name"
                            type="text"
                            value={formData.est_name}
                            onChange={handleChange}
                        />
    
                        <Typography>Address of the Establishment </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Establishment Address"
                            name="est_address"
                            type="text"
                            value={formData.est_address}
                            onChange={handleChange}
                        />
    
                        <Typography>Training Period </Typography>
                        <Box className="training_period" sx={{ display: "flex", flexDirection: "row" }}>
                            <Box className="training_period_from">
                                <Typography>From </Typography>
                                <TextField variant="outlined" margin="normal" required fullWidth name="training_from" type="date" value={formData.training_from} onChange={handleChange} />
                            </Box>
    
                            <Box className="training_period_to">
                                <Typography>To </Typography>
                                <TextField variant="outlined" margin="normal" required fullWidth name="training_to" type="date" value={formData.training_to} onChange={handleDateChange} />
                            </Box>
                        </Box>
    
                        <Typography>Password </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handlePasswordChange}
                        />
    
                        <Typography>Confirm Password </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Confirm Password"
                            name="confirm_password"
                            type="password"
                            value={formData.confirm_password}
                            onChange={handleConfirmPasswordChange}
                        />
    
                        <Button variant="contained" type="submit" className="register_button" sx={{ width: "100%", bgcolor: "#379fff", fontSize: "16px" }}>
                            Update
                        </Button>
                    </Box>
                </Box>
            </form>
        </Container>
    );

}
export default EvaluatorListEdit;
