import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Container, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import getWeekInfo from "../../components/main/GetWeekInfo";
import "../../../assets/css/list.css";

function Dashboard() {
	const [recordData, setRecordData] = useState({
		user_id: "",
		description: Cookies.get("description") || "",
		solutions: Cookies.get("solutions") || "",
		week: "",
		month: "",
		year: "",
	});

	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		if (isChecked) {
			document.querySelector(".save_button_trainee").disabled = false;
		} else {
			document.querySelector(".save_button_trainee").disabled = true;
		}
	}, [isChecked]);

	useEffect(() => {
		Cookies.set("description", recordData.description);
		Cookies.set("solutions", recordData.solutions);
	}, [recordData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setRecordData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSubmitRecord = (event) => {
		event.preventDefault();

		const data = getWeekInfo(new Date());

		recordData.user_id = Cookies.get("user_id");
		recordData.week = data.currentWeek;
		recordData.month = data.currentMonth;
		recordData.year = data.currentYear;

		console.log(recordData);

		axios
			.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/set/record/week`, recordData)
			.then((response) => {
				toast.success("Form submitted successfully. Reloading...");
				Cookies.remove("description");
				Cookies.remove("solutions");

				setTimeout(() => {
					window.location.reload();
				}, 2000);
			})
			.catch((error) => {
				toast.error("Error submitting the form. Please try again.");
			});
	};

	return (
		<Container component="main" className="list_container" maxWidth={false}>
			<CssBaseline />

			<ToastContainer />

			<Box className="trainee_box">
				<form onSubmit={handleSubmitRecord}>
					<Box>
						<h1 className="trainee_box_heading">Brief Description of work carried out :</h1>
						<Box className="trainee_box_description" variant="outlined">
							<Typography component={"span"} variant="body1" className="trainee_box_description_text">
								<TextField
									multiline
									rows={6}
									variant="outlined"
									required
									fullWidth
									name="description"
									type="text"
									value={recordData.description}
									placeholder="Write your description here."
									onChange={handleChange}
									sx={{
										"& fieldset": { border: "none" },
									}}
								/>
							</Typography>
						</Box>
					</Box>
					<Box sx={{ marginTop: "30px" }}>
						<h1 className="trainee_box_heading">Problems Encountered and Solutions Found :</h1>
						<Box variant="outlined" className="trainee_box_solutions">
							<Typography component={'span'} variant="body1" className="trainee_box_description_text">
								<TextField
									multiline
									rows={3}
									variant="outlined"
									required
									fullWidth
									name="solutions"
									type="text"
									value={recordData.solutions}
									placeholder="Write your problems and solutions here."
									onChange={handleChange}
									sx={{
										"& fieldset": { border: "none" },
									}}
								/>
							</Typography>
						</Box>
					</Box>
					<Box className="trainee_submission_box">
						<Button variant="contained" className="save_button_trainee" type="submit" disabled={!isChecked}>
							Submit
						</Button>
						<Box className="trainee_submission_box_text">
							<Checkbox
								sx={{
									color: "white",
									"&.Mui-checked": {
										color: "white",
									},
								}}
								onChange={(e) => setIsChecked(e.target.checked)}
							/>
							<Typography className="agreement_trainee_submission" component={"span"} variant="body1">
								I hereby declare that all the information contained in this report is truth and correct. I take full responsibility for the correctness of the said information.
							</Typography>
						</Box>
					</Box>
				</form>
			</Box>
		</Container>
	);
}

export default Dashboard;
