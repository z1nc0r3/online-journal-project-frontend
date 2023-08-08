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

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

function Dashboard() {
	const [recordData, setRecordData] = useState({
		user_id: Cookies.get("user_id"),
		supervisor_id: "",
		evaluator_id: "",
		description: Cookies.get("description") || "",
		solutions: Cookies.get("solutions") || "",
		week: "",
		month: "",
		year: "",
	});

	const [isLoading, setIsLoading] = useState(true);
	const [recordExists, setRecordExists] = useState(false);
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


	useEffect(() => {
		const getConnection = async () => {
		  const response = await axios.get(
			`${API_URL}/api/get/connection/trainee/${recordData.user_id}`
		  );
		  const data = response.data.records;
	
		  if (!data.error) {
			setRecordData((prevData) => ({
			  ...prevData,
			  supervisor_id: data.supervisor_id,
			  evaluator_id: data.evaluator_id,
			}));
		  }
		};
	
		const getCurrentWeekRecord = async () => {
		  const weekDetails = getWeekInfo(new Date());
		  const response = await axios.get(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/get/record/current/week/${recordData.user_id}?week=${weekDetails.currentWeek}&month=${weekDetails.currentMonth}&year=${weekDetails.currentYear}`
		  );
		  const data = response.data.record;
	
		  if (data && !data.error) {
			setRecordData((prevData) => ({
			  ...prevData,
			  week: weekDetails.currentWeek,
			  month: weekDetails.currentMonth,
			  year: weekDetails.currentYear,
			  description: data.description ? data.description : '',
			  solutions: data.solutions ? data.solutions : '',
			}));
			setRecordExists(true);
		  }
	
		  setIsLoading(false); // set loading to false once we're done fetching data
		};
	
		getConnection();
		getCurrentWeekRecord();
	  }, []);

	const handleSubmitRecord = (event) => {
		event.preventDefault();

		const data = getWeekInfo(new Date());

		recordData.user_id = Cookies.get("user_id");
		recordData.week = data.currentWeek;
		recordData.month = data.currentMonth;
		recordData.year = data.currentYear;

		if(recordExists){
			axios
				.post(`${API_URL}/api/update/record/week/${recordData.user_id}`, recordData)
				.then((response) => {
					toast.success("User data updated Successfully. Redirecting...");
					setTimeout(() => {
						window.location.reload();
					}, 2000);
				})
				.catch((error) => {
					toast.error("Error updating user data. Please try again." + error);
					console.log(error);
				});
		} else {
			axios
				.post(`${API_URL}/api/set/record/week`, recordData)
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
		}
	};

	const handleChangeDescription = (e) => {
		const { value } = e.target;
		setRecordData((prevFormData) => ({
			...prevFormData,
			description: value,
		}));
	};

	const handleChangeSolution = (e) => {
		const { value } = e.target;
		setRecordData((prevFormData) => ({
			...prevFormData,
			solutions: value,
		}));
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
									onChange={handleChangeDescription}
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
									onChange={handleChangeSolution}
									sx={{
										"& fieldset": { border: "none" },
									}}
								/>
							</Typography>
						</Box>
					</Box>
					<Box className="trainee_submission_box">
							<Button variant="contained" className="save_button_trainee" type="submit" disabled={!isChecked}>
								{recordExists ? 'Update' : 'Submit'}
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
