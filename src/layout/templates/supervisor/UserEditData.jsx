import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Container, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import "../../../assets/css/list.css";
import "react-toastify/dist/ReactToastify.css";

function UserEditData() {
	const [formData, setFormData] = useState({
		fName: "",
		email: "",
		phone: "",
		estName: "",
		estAddress: ""
	});

	const getSupervisorDetails = (event) => {
		axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/get/supervisor/${Cookies.get("user_id")}`).then((response) => {
			const data = response.data.user;

			if (data.login_error) {
				console.log("error");
			} else {
				setFormData((prevFormData) => ({
					...prevFormData,
					fName: data.fName,
					email: data.email,
					phone: data.phone,
					estName: data.estName,
					estAddress: data.estAddress,
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
			.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/update/supervisor/${Cookies.get("user_id")}`, formData)
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
				<TextField variant="outlined" required fullWidth name="email" type="email" value={formData.email} onChange={handleChange} disabled />

				<Typography>Phone </Typography>
				<TextField variant="outlined" required fullWidth name="phone" type="number" value={formData.phone} onChange={handlePhoneChange} inputProps={{ maxLength: 10 }} />
			</>
		);
	};

	const establishmentFields = () => {
		return (
			<>
				<Typography>Name of the Establishment </Typography>
				<TextField variant="outlined" required fullWidth name="estName" type="text" value={formData.estName} onChange={handleChange} disabled />

				<Typography>Address of the Establishment </Typography>
				<TextField variant="outlined" required fullWidth name="estAddress" type="text" value={formData.estAddress} onChange={handleChange} disabled />
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

						<Typography>Full Name</Typography>
						<TextField
							variant="outlined"
							required
							fullWidth
							autoFocus
							type="text"
							value={formData.fName}
							onChange={handleFullNameChange}
							disabled
						/>
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

export default UserEditData;