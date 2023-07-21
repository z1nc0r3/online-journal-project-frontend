import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Container, Button, Typography, TextField } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import "../../../assets/css/list.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateUser = (props) => {
	const [formData, setFormData] = useState({
		fName: "",
		address: "",
		email: "",
		phone: "",
		estName: "",
		estAddress: ""
	});

	const { id } = useParams();

	const getSupervisorDetails = (event) => {
		axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/get/supervisor/${id}`).then((response) => {
			const data = response.data.user;

			if (data.login_error) {
				console.log("error");
			} else {
				setFormData((prevFormData) => ({
					...prevFormData,
					fName: data.fName,
					address: data.address,
					email: data.email,
					phone: data.phone,
					estName: data.estName,
					estAddress: data.estAddress
				}));
			}
		});
	};

	useEffect(() => {
		getSupervisorDetails();
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

	const handleSubmitSupervisor = (e) => {
		e.preventDefault();

		axios
			.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/update/supervisor/${id}`, formData)
			.then((response) => {
				toast.success("User data updated Successfully. Redirecting...");
				setTimeout(() => {
					window.location.href = "..";
				}, 3000);
			})
			.catch((error) => {
				toast.error("Error updating user data. Please try again." + error);
			});
	};

	const updateButton = () => {
		return (
			<>
				<Typography></Typography>
				<Button variant="contained" type="submit" className="update_button" sx={{ width: "100%", bgcolor: "#379fff", fontSize: "16px" }}>
					Update User Data
				</Button>
			</>
		);
	};

	const emailPhoneFields = () => {
		return (
			<>
				<Typography>Email </Typography>
				<TextField variant="outlined" required fullWidth name="email" type="email" value={formData.email} onChange={handleChange} />

				<Typography>Phone </Typography>
				<TextField variant="outlined" required fullWidth name="phone" type="number" value={formData.phone} onChange={handlePhoneChange} inputProps={{ maxLength: 10 }} />
			</>
		);
	};

	const establishmentFields = () => {
		return (
			<>
				<Typography>Name of the Establishment </Typography>
				<TextField variant="outlined" required fullWidth name="estName" type="text" value={formData.estName} onChange={handleChange} />

				<Typography>Address of the Establishment </Typography>
				<TextField variant="outlined" required fullWidth name="estAddress" type="text" value={formData.estAddress} onChange={handleChange} />
			</>
		);
	};

	return (
		<Container component="main" className="create_new_container" maxWidth={false}>
			<CssBaseline />

			<ToastContainer />

			<form onSubmit={handleSubmitSupervisor}>
				<Box className="create_new_form">
					<Box className="create_new_form_left">
						<Typography>Full Name </Typography>
						<TextField variant="outlined" required fullWidth name="fName" autoFocus type="text" value={formData.fName} onChange={handleFullNameChange} />

						{emailPhoneFields()}
					</Box>

					<Box className="create_new_form_right">
						{establishmentFields()}

						{updateButton()}
					</Box>
				</Box>
			</form>
		</Container>
	);
};

export default UpdateUser;
