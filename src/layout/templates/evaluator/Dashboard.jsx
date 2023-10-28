import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Container, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { CssBaseline, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import "../../../assets/css/list.css";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

function TraineeList() {
	const [expanded, setExpanded] = useState(false);
	const [traineeConnection, setConnection] = useState({});
	const [recordData, setRecordData] = useState({});
	const [formData, setFormData] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	// get the records for the current trainees with approved = 1
	const getRecords = async (event) => {
		try {
			const response = await axios.get(`${API_URL}/api/get/record/all/pending/evaluator/${Cookies.get("user_id")}`);
			const data = response.data;

			if (data.error) {
				console.log(data.error);
			} else {
				setRecordData(data.records);
				initializeFormData(data.records);
			}
		} catch (error) {
			console.error(error);
		}
	};

	// get filtered trainee list for the supervisor
	const getTraineeList = async (event) => {
		try {
			const response = await axios.get(`${API_URL}/api/get/trainee/list/evaluator/${Cookies.get("user_id")}`);
			const data = response.data;

			if (data.error) {
				console.log(data.error);
			} else {
				const traineesData = data.trainees.reduce((acc, trainee) => {
					acc[trainee.id] = {
						fName: trainee.fName,
						department: trainee.department,
						supervisor_id: trainee.trainee_connection[0] ? trainee.trainee_connection[0].supervisor_id : "",
						evaluator_id: trainee.trainee_connection[0] ? trainee.trainee_connection[0].evaluator_id : "",
					};
					return acc;
				}, {});

				setConnection(traineesData);
			}
		} catch (error) {
			console.error(error);
		}
	};

	// TODO: remove this and make this more general
	// initialize the form data
	const initializeFormData = (recordData) => {
		Object.keys(recordData).map((trainee) => {
			Object.keys(recordData[trainee]).map((month) => {
				let id = recordData[trainee][month]["id"];
				setFormData((prevFormData) => ({
					...prevFormData,
					[id]: {
						id: recordData[trainee][month]["id"],
						record: recordData[trainee][month]["reports"],
						leaves: recordData[trainee][month]["number_of_leave"]
					}
				}));
			});
		});

		setIsLoading(false);
	};

	useEffect(() => {
		getTraineeList();
		getRecords();
	}, []);

	const handleSubmit = (id) => (event) => {
		event.preventDefault();

		axios
			.post(`${API_URL}/api/set/review/update/supervisor`, formData[id])
			.then((response) => {
				toast.success("Review added successfully. Reloading...");

				setTimeout(() => {
					window.location.reload();
				}, 2000);
			})
			.catch((error) => {
				toast.error("Error adding the review. Please try again.");
				console.log(error["response"]["data"]["message"]);
			});
	};

	const getMonthName = (monthNumber) => {
		const date = new Date();
		date.setMonth(monthNumber - 1);

		return date.toLocaleString("en-US", {
			month: "long",
		});
	};

	// if the data is loading
	if (isLoading) {
		return (
			<Container component="main" className="list_container" maxWidth={false}>
				<CssBaseline />

				<Box className="list_box">
					<Typography sx={{ width: "100%", flexShrink: 0, fontWeight: "medium", fontSize: "16px" }}>Loading...</Typography>
				</Box>
			</Container>
		);
	}

	return (
		<Container component="main" className="list_container" maxWidth={false}>
			<CssBaseline />

			<ToastContainer />

			<Box className="list_box">
				{Object.keys(recordData).map((trainee, i) => (
					<Accordion
						expanded={expanded === i}
						onChange={handleChange(i)}
						sx={{ width: "100%", backgroundColor: "#dfefff", boxShadow: "none", marginBottom: "10px", borderRadius: "4px" }}
						key={i}
						className="accordion_item">
						<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
							<Typography sx={{ marginRight: "1rem", fontSize: "18px" }}>{i + 1}</Typography>
							<Typography sx={{ width: "66%", flexShrink: 0, fontWeight: "medium", fontSize: "16px" }}>{traineeConnection[trainee].fName}</Typography>
							<Typography sx={{ color: "text.secondary", fontSize: "14px" }}>{traineeConnection[trainee].department}</Typography>
						</AccordionSummary>

						<AccordionDetails>
							{Object.keys(recordData[trainee]).map((month, j) => (
								<Box className="list_container" key={j}>
									<Accordion className="month_item">
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="month1-content" id="month1-header">
											<Typography sx={{ fontWeight: "bold", textAlign: "center", color: "#414141", paddingLeft: 0.5 }}>{getMonthName(month)}</Typography>
										</AccordionSummary>

										<AccordionDetails>
											{Object.keys(recordData[trainee][month]["records"]).map((week, k) => (
												<Box className="list_container" key={k}>
													<Accordion sx={{ width: "100%", backgroundColor: "#9dd0ff", boxShadow: "none", marginBottom: "10px", borderRadius: "4px" }} className="accordion_item">
														<AccordionSummary>
															<Typography sx={{ width: "100%", flexShrink: 0, fontWeight: "medium", fontSize: "16px" }}>{`Week ${recordData[trainee][month]["records"][week].week}`}</Typography>
														</AccordionSummary>
														<AccordionDetails className="report_detail_container">
															<Box className="weekly_report_container">
																<Typography className="report_title report_title_des">Description :</Typography>
																<Box className="weekly_report_des">
																	<Typography sx={{ fontSize: "16px", textAlign: "left" }}>{recordData[trainee][month]["records"][week].description}</Typography>
																</Box>
															</Box>
															<Box className="weekly_report_container" sx={{ marginTop: 2 }}>
																<Typography className="report_title report_title_des">Solutions :</Typography>
																<Box className="weekly_report_des">
																	<Typography sx={{ fontSize: "16px", textAlign: "left" }}>{recordData[trainee][month]["records"][week].solutions}</Typography>
																</Box>
															</Box>
														</AccordionDetails>
													</Accordion>
												</Box>
											))}

											<Accordion sx={{ width: "100%", backgroundColor: "#69b7ff", boxShadow: "none", borderRadius: 1.5 }}>
												<AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
													<Typography sx={{ width: "100%", flexShrink: 0, fontWeight: "medium", fontSize: "18px" }}>Supervisor Report</Typography>
												</AccordionSummary>

												<Box className="supervisor_report_field" variant="outlined">
													<div className="assigned_student">
														<Typography component={"span"} variant="body1">
															{formData[recordData[trainee][month]["id"]]["record"]}
														</Typography>
													</div>
												</Box>

												<Box className="supervisor_leaves_field" variant="outlined" sx={{padding: 3}}>
													<Typography sx={{ width: "80%", flexShrink: 0, fontWeight: "medium", fontSize: "18px", textAlign: "left" }}>Number of leaves</Typography>
													<div className="text_align_right">
														<Typography component={"span"} className="leaves_count">
															{formData[recordData[trainee][month]["id"]]["leaves"]}
														</Typography>
													</div>
												</Box>
											</Accordion>
										</AccordionDetails>
									</Accordion>
								</Box>
							))}
						</AccordionDetails>
					</Accordion>
				))}
			</Box>
		</Container>
	);
}

export default TraineeList;
