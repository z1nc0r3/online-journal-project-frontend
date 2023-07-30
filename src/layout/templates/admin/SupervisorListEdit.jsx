import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Container, Button, Typography, TextField } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import "../../../assets/css/list.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlertDialog from "../../components/main/AlertDialog";

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

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
		axios.get(`${API_URL}/api/get/supervisor/${id}`).then((response) => {
			const data = response.data.user;

			if (data.error) {
				console.log(data.error);
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
			.post(`${API_URL}/api/update/supervisor/${id}`, formData)
			.then((response) => {
				toast.success("User data updated Successfully. Redirecting...");
				setTimeout(() => {
					window.location.href = "..";
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

	// Handle reset password & delete user feature
	const [isResetAlertOpen, setResetAlertOpen] = useState(false);
	const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false);

	const handleOpenResetAlert = useCallback((e) => {
		e.preventDefault();
		setResetAlertOpen(true);
	}, []);

	const handleOpenDeleteAlert = useCallback((e) => {
		e.preventDefault();
		setDeleteAlertOpen(true);
	}, []);

	const handleCloseAlert = useCallback(() => {
		setResetAlertOpen(false);
		setDeleteAlertOpen(false);
	}, []);

	const showToast = (message, isError = false) => {
		if (isError) {
			toast.error(message);
		} else {
			toast.success(message);
		}
	};

	const handleResetPassword = useCallback(
		async (e) => {
			handleCloseAlert();

			try {
				const response = await axios.post(`${API_URL}/api/reset/password/${id}`);
				if (response.status === 200) {
					showToast("Password Reset Successfully.");
				} else {
					showToast("Error resetting password. Please try again.", true);
				}
			} catch (error) {
				showToast("Error resetting password. Please try again.", true);
			}
		},
		[id, handleCloseAlert]
	);

	const handleDeleteUser = useCallback(async () => {
		handleCloseAlert();

		try {
			const response = await axios.post(`${API_URL}/api/delete/${id}`);
			if (response.status === 200) {
				showToast("User deleted successfully. Redirecting...");
				setTimeout(() => {
					window.location.href = "..";
				}, 2000);
			} else {
				showToast("Error deleting user. Please try again.", true);
			}
		} catch (error) {
			showToast("Error deleting user. Please try again.", true);
		}
	}, [id, handleCloseAlert]);

	const userControllers = () => {
		return (
			<Box className="user_controller_container">
				<Button variant="contained" onClick={handleOpenResetAlert} className="user_controller_button reset_button" sx={{ width: "100%", bgcolor: "#379fff", fontSize: "16px" }}>
					Reset Password
				</Button>
				<AlertDialog
					open={isResetAlertOpen}
					onClose={handleCloseAlert}
					onAgree={handleResetPassword}
					onDisagree={handleCloseAlert}
					title="Reset Password"
					description="Are you sure you want to reset this user's password?"
					sub_description="This action cannot be undone."
					agreeText="Reset"
					disagreeText="No"
				/>

				<Button variant="contained" onClick={handleOpenDeleteAlert} className="user_controller_button delete_button" sx={{ width: "100%", bgcolor: "#379fff", fontSize: "16px" }}>
					Delete User
				</Button>
				<AlertDialog
					open={isDeleteAlertOpen}
					onClose={handleCloseAlert}
					onAgree={handleDeleteUser}
					onDisagree={handleCloseAlert}
					title="Delete User"
					description="Are you sure you want to delete this user?"
					sub_description="This action cannot be undone."
					agreeText="Delete"
					disagreeText="No"
				/>
			</Box>
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
			{userControllers()}
		</Container>
	);
};

export default UpdateUser;
