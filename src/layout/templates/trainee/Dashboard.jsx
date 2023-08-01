import * as React from "react";
import axios from "axios";
import { Box, Container, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "../../../assets/css/list.css";
import { endOfWeek, getWeekOfMonth, startOfMonth, addMonths, endOfMonth, getWeeksInMonth, getMonth, subMonths, isSameWeek } from 'date-fns';

const months = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];

function getWeekNumberOfMonth(date) {
	var currentYear = date.getFullYear(); // get the current year
	var currentMonth = getMonth(date); // get the current month
	var currentWeek = getWeekOfMonth(date, { weekStartsOn: 1 }); // get the current week of the month

	const actualMonth = currentMonth;
	var weeks = getWeeksInMonth(date, { weekStartsOn: 1 }); // get the total number of weeks in the current month

	// getting the last day of the last month and the first day of the next month
	const lastMonthEndDate = endOfMonth(subMonths(date, 1));
	const nextMonthStartDate = startOfMonth(addMonths(date, 1));

	const isStartInSameWeek = isSameWeek(lastMonthEndDate, startOfMonth(date), { weekStartsOn: 1 }); // check if the first day of the current month is in the same week as the last day of the last month
	const isEndInSameWeek = isSameWeek(nextMonthStartDate, endOfMonth(date), { weekStartsOn: 1 }); // check if the last day of the current month is in the same week as the first day of the next month

	// getting the last day of the first week and the first day of the last week
	const endOfFirstWeek = endOfWeek(startOfMonth(date), { weekStartsOn: 1 }).getDate();
	const endOfLastWeek = endOfWeek(endOfMonth(date), { weekStartsOn: 1 }).getDate();

	var startOffset = isStartInSameWeek && (endOfFirstWeek - 1) < 3; // check if the first week has less than 3 days
	var endOffset = isEndInSameWeek && (endOfLastWeek > 3); // check if the last week has less than 3 days

	// if the first week has less than 3 days, then current month should be the last month
	if (currentWeek === 1 && startOffset) {
		currentMonth--;
	}

	// if the last week has less than 3 days, then current month should be the next month
	if (currentWeek === weeks && endOffset) {
		currentMonth++;
	}

	weeks -= startOffset + endOffset; // calculate the number of weeks in the current month
	currentMonth = ((currentMonth % 12) + 12) % 12; // make sure the month is between 0 and 11

	if (startOffset) { // if the first week has less than 3 days, then the current week should be the last week of the last month
		currentWeek--;
	} else if (currentWeek > weeks) { // if the last week has less than 3 days, then the current week should be the first week of the next month
		currentWeek = 1;
	}

	// if the current week is 0, then it should be the last week of the last month
	currentWeek = (currentWeek === 0) ? getWeeksInMonth(subMonths(date, 1), { weekStartsOn: 1 }) : currentWeek;

	// shifting the year if the current month is January or December
	if (actualMonth === 0 && currentMonth === 11) {
		currentYear--;
	}

	if (actualMonth === 11 && currentMonth === 0) {
		currentYear++;
	}

	console.log("current week ", currentWeek, " in month " + months[currentMonth], " of year ", currentYear);
	console.log("total number of weeks ", weeks);

	return weeks;
}

getWeekNumberOfMonth(new Date());

function Dashboard() {
	const [recordData, setRecordData] = useState({
		user_id: "",
		description: localStorage.getItem("description") || "",
		solutions: localStorage.getItem("solutions") || "",
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
		localStorage.setItem("description", recordData.description);
		localStorage.setItem("solutions", recordData.solutions);
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

		recordData.user_id = localStorage.getItem("user_id");
		recordData.week = "04";
		recordData.month = new Date().getMonth() + 1;
		recordData.year = new Date().getFullYear();

		console.log(recordData);

		axios
			.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/addRecord/week`, recordData)
			.then((response) => {
				toast.success("Form submitted successfully. Reloading...");
				localStorage.removeItem("description");
				localStorage.removeItem("solutions");

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
