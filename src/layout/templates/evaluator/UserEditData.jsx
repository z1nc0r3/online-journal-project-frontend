import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Container, Button, Typography, TextField, Select, MenuItem } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import "../../../assets/css/list.css";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

const UpdateUser = () => {
	const [formData, setFormData] = useState({
		fName: "",
		department: "",
		email: "",
		phone: "",
	});

	const id = Cookies.get("user_id");

	const getTraineeDetails = (event) => {
		axios.get(`${API_URL}/api/get/evaluator/${id}`).then((response) => {
			const data = response.data.user;

			if (data.login_error) {
				console.log("error");
			} else {
				setFormData((prevFormData) => ({
					...prevFormData,
					fName: data.fName,
					department: data.department,
					email: data.email,
					phone: data.phone,
				}));
			}
		});
	};

	useEffect(() => {
		getTraineeDetails();
	}, []);

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
		const fullNameRegex = /^[A-Za-z\s.]*$/;

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

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post(`${API_URL}/api/update/evaluator/${id}`, formData)
			.then((response) => {
				toast.success("User data updated Successfully. Redirecting...");
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			})
			.catch((error) => {
				toast.error("Error updating user data. Please try again." + error);
			});
	};

	const submitButton = () => {
		return (
			<>
				<Typography></Typography>
				<Button variant="contained" type="submit" className="update_button" sx={{ width: "100%", bgcolor: "#379fff", fontSize: "16px" }}>
					Update User Data
				</Button>
			</>
		);
	};

	const departmentList = () => {
		return (
			<>
				<Typography>Department </Typography>
				<Select variant="outlined" value={formData.department} required fullWidth name="department" type="text" onChange={handleChange} disabled>
					<MenuItem value={"Computer Science"}>Computer Science</MenuItem>
					<MenuItem value={"Physics"}>Physics</MenuItem>
					<MenuItem value={"Zoology"}>Zoology</MenuItem>
					<MenuItem value={"Mathematics"}>Mathematics</MenuItem>
					<MenuItem value={"Statistics"}>Statistics</MenuItem>
					<MenuItem value={"Fisheries"}>Fisheries</MenuItem>
					<MenuItem value={"Biology"}>Biology</MenuItem>
				</Select>
			</>
		);
	};

	const emailPhoneFields = () => {
		return (
			<>
				<Typography>Email </Typography>
				<TextField component={'span'} variant="outlined" required fullWidth name="email" type="email" value={formData.email} onChange={handleChange} disabled />

				<Typography>Phone </Typography>
				<TextField variant="outlined" required fullWidth name="phone" type="number" value={formData.phone} onChange={handlePhoneChange} inputProps={{ maxLength: 10 }} />
			</>
		);
	};

	return (
		<Container component="main" className="list_container create_new_container trainee_list" maxWidth={false}>
			<CssBaseline />

			<ToastContainer />

			<form onSubmit={handleSubmit}>
				<Box className="create_new_form">
					<Box className="create_new_form_left">
						<Typography>Full Name </Typography>
						<TextField variant="outlined" required fullWidth name="fName" autoFocus type="text" value={formData.fName} onChange={handleFullNameChange} disabled />
						{emailPhoneFields()}
					</Box>

					<Box className="create_new_form_right">
						{departmentList()}
						{submitButton()}
					</Box>
				</Box>
			</form>
		</Container>
	);
};

export default UpdateUser;