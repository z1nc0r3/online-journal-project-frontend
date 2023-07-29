import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Container, Button, Typography, TextField, Select, MenuItem } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import "../../../assets/css/list.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateUser = () => {
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
	});

	const id = localStorage.getItem("user_id");

	const getTraineeDetails = (event) => {
		axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/get/trainee/${id}`).then((response) => {
			const data = response.data.user;

			if (data.login_error) {
				console.log("error");
			} else {
				setFormData((prevFormData) => ({
					...prevFormData,
					fName: data.fName,
					regNo: data.regNo,
					department: data.department,
					address: data.address,
					email: data.email,
					phone: data.phone,
					estName: data.estName,
					estAddress: data.estAddress,
					startDate: data.startDate,
					duration: data.duration,
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
			.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/update/trainee/${id}`, formData)
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
				<TextField component={'span'} variant="outlined" required fullWidth name="email" type="email" value={formData.email} onChange={handleChange} disabled/>

				<Typography>Phone </Typography>
				<TextField variant="outlined" required fullWidth name="phone" type="number" value={formData.phone} onChange={handlePhoneChange} inputProps={{ maxLength: 10 }} />
			</>
		);
	};

	const establishmentFields = () => {
		return (
			<>
				<Typography>Name of the Establishment </Typography>
				<TextField variant="outlined" required fullWidth name="estName" type="text" value={formData.estName} onChange={handleChange} disabled/>

				<Typography>Address of the Establishment </Typography>
				<TextField variant="outlined" required fullWidth name="estAddress" type="text" value={formData.estAddress} onChange={handleChange} disabled/>
			</>
		);
	};

	return (
		<Container component="main" className="create_new_container" maxWidth={false}>
			<CssBaseline />

			<ToastContainer />

			<form onSubmit={handleSubmit}>
				<Box className="create_new_form">
					<Box className="create_new_form_left">
						<Typography>Full Name </Typography>
						<TextField variant="outlined" required fullWidth name="fName" autoFocus type="text" value={formData.fName} onChange={handleFullNameChange} disabled/>

						<Typography>Registration No </Typography>
						<TextField variant="outlined" required fullWidth name="regNo" type="text" value={formData.regNo} onChange={handleChange} disabled/>

						<Typography>Address </Typography>
						<TextField variant="outlined" required fullWidth name="address" type="text" value={formData.address} onChange={handleChange} />

						{emailPhoneFields()}
					</Box>

					<Box className="create_new_form_right">
						{departmentList()}

						{establishmentFields()}

						<Box className="training_period" sx={{ display: "flex", flexDirection: "row" }}>
							<Box className="training_period_from">
								<Typography>Starting From </Typography>
								<TextField variant="outlined" required fullWidth name="startDate" type="date" value={formData.startDate} onChange={handleChange} disabled/>
							</Box>

							<Box className="training_period_to">
								<Typography>Duration </Typography>
								<Select variant="outlined" value={formData.duration} required fullWidth name="duration" type="text" onChange={handleChange}disabled>
									<MenuItem value={3}>3 Months</MenuItem>
									<MenuItem value={6}>6 Months</MenuItem>
									<MenuItem value={9}>9 Months</MenuItem>
									<MenuItem value={12}>12 Months</MenuItem>
								</Select>
							</Box>
						</Box>

						{submitButton()}
					</Box>
				</Box>
			</form>
		</Container>
	);
};

export default UpdateUser;
