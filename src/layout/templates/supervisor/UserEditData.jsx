import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Container, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../../../assets/css/list.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserEditData() {
  const [formData, setFormData] = useState({
    fName: "",
    address: "",
    email: "",
    phone: "",
    est_name: "",
    est_address: "",
    password: ""
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
      [name]: value
    }));
  };

  const handleFullNameChange = (e) => {
    const { value } = e.target;
    const fullNameRegex = /^[A-Za-z]+$/;

    // Verify full name format (letters only)
    if (value.match(fullNameRegex) || value === "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        fName: value
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

  // const handleEmailChange = (e) => {
  //   const { value } = e.target;
  //   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  //   // Verify email format
  //   if (value.match(emailRegex) || value === "") {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       email: value
  //     }));
  //   }
  // };

  const handlePasswordChange = (e) => {
    const { value } = e.target;

    // Password policy verifications
    const hasMinimumLength = value.length >= 8;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*()]/.test(value);

    // Verify password meets all requirements
    if (
      (hasMinimumLength && hasUppercase && hasLowercase && hasNumber && hasSpecialCharacter) ||
      value === ""
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        password: value
      }));
    }
  };

  // const handleConfirmPasswordChange = (e) => {
  //   const { value } = e.target;
  //   const { password } = formData;

  //   // Verify if confirm password matches the password
  //   if (value === password || value === "") {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       confirm_password: value
  //     }));
  //   }
  // };

 

  // const handleCompanyChange = (e) => {
  //   const { value } = e.target;

  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     company: value
  //   }));
  // };

  return (
    <Container component="main" className="create_new_container" maxWidth={false}>
      <CssBaseline />

      <ToastContainer />

      <form onSubmit={handleSubmitSupervisor}>
        <Box className="create_new_form" component="form">
          <Box className="create_new_form_left">

            {/* <h2>Change User Data</h2> */}

            <Typography>Full Name</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth label="Full Name"
              name="fullname"
              autoFocus
              type="text"
              value={formData.fName}
              onChange={handleFullNameChange}
            />
            {emailPhoneFields()}

            </Box>

            {/* <Typography>Address</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
            /> */}

          <Box className="create_new_form_right">
						{establishmentFields()}

						{updateButton()}
					</Box>

          {/* <Box className="create_new_form_right">
          <h2>Update Password</h2>

          <Typography>Current Password</Typography>
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

            <Button
              variant="contained"
              type="submit"
              className="register_button"
              sx={{ width: "100%", bgcolor: "#379fff", fontSize: "16px" }}
            >
              Update
            </Button>
          </Box> */}

        </Box>
      </form>
    </Container>
  );
};

export default UserEditData;
