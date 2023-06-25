import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Container, Button, Typography, TextField, Select, MenuItem } from "@mui/material";
import Alert from "@mui/material/Alert";
import CssBaseline from "@mui/material/CssBaseline";
import "../../../assets/css/list.css";
import CreateMenu from "../../components/admin/CreateMenu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

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

	useEffect(() => {
		handlePasswordChange();
	}, [formData.password]);

	useEffect(() => {
		handleConfirmPasswordChange();
	}, [formData.confirm_password]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleBlur = (event) => {
		const { name, value } = event.target;
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

	const handleSubmit = (e, userType) => {
		e.preventDefault();

		if (!handlePasswordChange()) {
			setPasswordError("Password must be in standard format.");
			return;
		}

		if (!handleConfirmPasswordChange()) {
			setPasswordError("Passwords do not match.");
			return;
		}

		setPasswordError("");

		let url;
		switch (userType) {
			case "trainee":
				url = "http://127.0.0.1:8000/api/create/trainee";
				break;
			case "supervisor":
				url = "http://127.0.0.1:8000/api/create/supervisor";
				break;
			case "evaluator":
				url = "http://127.0.0.1:8000/api/create/evaluator";
				break;
			default:
				return;
		}

		axios
			.post(url, formData)
			.then((response) => {
				toast.success("New User Created Successfully. Redirecting...");
				setTimeout(() => {
					window.location.href = userType; // Replace "new-page-url" with your desired URL
				}, 3000); // 3 seconds delay before redirecting
			})
			.catch((error) => {
				toast.error("Error submitting the form. Please try again." + error);
			});
	};

	const handleSubmitTrainee = (e) => {
		handleSubmit(e, "trainee");
	};

	const handleSubmitSupervisor = (e) => {
		handleSubmit(e, "supervisor");
	};

	const handleSubmitEvaluator = (e) => {
		handleSubmit(e, "evaluator");
	};

	const passwordFields = () => {
		return (
			<>
				<Typography>Password </Typography>
				<TextField
					variant="outlined"
					required
					fullWidth
					name="password"
					type="password"
					onChange={(e) => {
						setFormData({ ...formData, password: e.target.value });
						handlePasswordChange();
					}}
					onBlur={handleBlur}
				/>

				{passwordError && (
					<Alert severity="error" sx={{ marginTop: "10px" }}>
						{passwordError}
					</Alert>
				)}

				<Typography>Confirm Password </Typography>
				<TextField
					variant="outlined"
					required
					fullWidth
					name="confirm_password"
					type="password"
					onChange={(e) => {
						setFormData({ ...formData, confirm_password: e.target.value });
						handleConfirmPasswordChange();
					}}
					onBlur={handleBlur}
				/>

				<Button variant="contained" type="submit" className="register_button" sx={{ width: "100%", bgcolor: "#379fff", fontSize: "16px" }}>
					Create User
				</Button>
			</>
		);
	};

	const departmentList = () => {
		return (
			<>
				<Typography>Department </Typography>
				<Select variant="outlined" value={formData.department} required fullWidth name="department" type="text" onChange={handleChange}>
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
				<TextField variant="outlined" required fullWidth name="email" type="email" value={formData.email} onChange={handleChange} />

				<Typography>Phone </Typography>
				<TextField variant="outlined" required fullWidth name="phone" type="number" value={formData.phone} onChange={handlePhoneChange} inputProps={{ maxLength: 10 }} />
			</>
		);
	};

	const [selectedFile, setSelectedFile] = useState(null);

	//bulk data entry
	const bulkdataentry = () => {

		const handleFileUpload = (e) => {
			const file = e.target.files[0];
			setSelectedFile(file);
		}
		
		return (
			<>
			<Typography>Upload File</Typography>
			<input type="file" accept=".txt" onChange={handleFileUpload} />
		  
			<Button
				variant="contained"
				type="submit"
				className="register_button"
				name="bulk_register"
				onClick={handleBulkDataUpload}
				sx={{ width: "100%", bgcolor: "#379fff", fontSize: "16px" }}>
				Import
			</Button>
			</>
		);
		  
	};

	const handleBulkDataUpload = () => {
		if (selectedFile) {
		  const formData = new FormData();
		  formData.append("file", selectedFile);
	  
		  axios
			.post("http://your-php-api-endpoint", formData)
			.then((response) => {
			  toast.success("Bulk data uploaded successfully.");
			})
			.catch((error) => {
			  toast.error("Error uploading bulk data. Please try again.");
			});
		} else {
		  toast.error("Please select a file.");
		}
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

	switch (props.user) {
		case "trainee":
			return (
				<Container component="main" className="create_new_container" maxWidth={false}>
					<CssBaseline />

					<CreateMenu />

					<ToastContainer />

					<form onSubmit={handleSubmitTrainee}>
						<Box className="create_new_form">
							<Box className="create_new_form_left">
								<Typography>Full Name </Typography>
								<TextField variant="outlined" required fullWidth name="fName" autoFocus type="text" value={formData.fName} onChange={handleFullNameChange} />

								<Typography>Registration No </Typography>
								<TextField variant="outlined" required fullWidth name="regNo" type="text" value={formData.regNo} onChange={handleChange} />

								{departmentList()}

								<Typography>Address </Typography>
								<TextField variant="outlined" required fullWidth name="address" type="text" value={formData.address} onChange={handleChange} />

								{emailPhoneFields()}

							</Box>

							<Box className="create_new_form_right">
								{establishmentFields()}

								<Box className="training_period" sx={{ display: "flex", flexDirection: "row" }}>
									<Box className="training_period_from">
										<Typography>Starting From </Typography>
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

								{passwordFields()}

								<Box>
								{bulkdataentry()}
								</Box>
							</Box>
						
						</Box>
					</form>
				</Container>
			);
		case "supervisor":
			return (
				<Container component="main" className="create_new_container" maxWidth={false}>
					<CssBaseline />

					<CreateMenu />

					<ToastContainer />

					<form onSubmit={handleSubmitSupervisor}>
						<Box className="create_new_form">
							<Box className="create_new_form_left">
								<Typography>Full Name </Typography>
								<TextField variant="outlined" required fullWidth name="fName" autoFocus type="text" value={formData.fName} onChange={handleFullNameChange} />

								{emailPhoneFields()}

								{establishmentFields()}
							</Box>

							<Box className="create_new_form_right">{passwordFields()}</Box>
						</Box>
					</form>
				</Container>
			);
		case "evaluator":
			return (
				<Container component="main" className="create_new_container" maxWidth={false}>
					<CssBaseline />

					<CreateMenu />

					<ToastContainer />

					<form onSubmit={handleSubmitEvaluator}>
						<Box className="create_new_form">
							<Box className="create_new_form_left">
								<Typography>Full Name </Typography>
								<TextField variant="outlined" required fullWidth name="fName" autoFocus type="text" value={formData.fName} onChange={handleFullNameChange} />

								{departmentList()}

								{emailPhoneFields()}
							</Box>

							<Box className="create_new_form_right">{passwordFields()}</Box>
						</Box>
					</form>
				</Container>
			);
		default:
			return null;
	}
};

export default CreateUser;
