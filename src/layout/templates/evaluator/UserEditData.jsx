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

function UserEditData() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: ""
  });

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
        fullname: value
      }));
    }
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // Verify email format
    if (value.match(emailRegex) || value === "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: value
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

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    const { password } = formData;

    // Verify if confirm password matches the password
    if (value === password || value === "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        confirm_password: value
      }));
    }
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const phoneRegex = /^[0-9]{0,10}$/; // Updated regex to allow a maximum of 10 numbers

    // Verify phone format (limit to 10 numbers)
    if (value.match(phoneRegex) || value === "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        phone: value
      }));
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleCompanyChange = (e) => {
    const { value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      company: value
    }));
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
            <h2>Change User Data</h2>
            <Typography>Full Name</Typography>
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

           

            <Typography>Email</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleEmailChange}
            />

            <Typography>Phone</Typography>
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

            
            <Button
              variant="contained"
              type="submit"
              className="register_button"
              sx={{ width: "100%", bgcolor: "#379fff", fontSize: "16px" }}
            >
              Update
            </Button>
          </Box>

          <Box className="create_new_form_right">
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

            <Typography>New Password</Typography>
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

            <Typography>Confirm New Password</Typography>
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

            <Button
              variant="contained"
              type="submit"
              className="register_button"
              sx={{ width: "100%", bgcolor: "#379fff", fontSize: "16px" }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
};

export default UserEditData;
