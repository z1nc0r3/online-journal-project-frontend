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

function Dashboard() {
	const [expanded, setExpanded] = useState(false);
	const [traineeConnection, setConnection] = useState({});
	const [recordData, setRecordData] = useState({});
	const [formData, setFormData] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	// get the records for the current trainees with approved = 0
	const getRecords = (event) => {
		axios.get(`${API_URL}/api/get/record/all/pending/evaluator/${Cookies.get("user_id")}`).then((response) => {
			const data = response.data;

			if (data.error) {
				console.log(data.error);
			} else {
				setRecordData(data.records);
				console.log(data.records);
				setIsLoading(false);
			}
		});
	};

	// get filtered trainee list for the supervisor
	const getTraineeList = (event) => {
		axios.get(`${API_URL}/api/get/trainee/list/evaluator/${Cookies.get("user_id")}`).then((response) => {
			const data = response.data;

			if (data.error) {
				console.log(data.error);
			} else {
				const traineesData = data.trainees.reduce((acc, trainee) => {
					acc[trainee.id] = {
						id: trainee.id,
						fName: trainee.fName,
						department: trainee.department,
						duration: trainee.duration,
						supervisor_id: trainee.trainee_connection[0] ? trainee.trainee_connection[0].supervisor_id : "",
						evaluator_id: trainee.trainee_connection[0] ? trainee.trainee_connection[0].evaluator_id : "",
					};
					return acc;
				}, {});

				setConnection(traineesData);
			}
		});
	};

	const setCookie = (id, type, value) => {
		if (Cookies.get(`${id}_leaves`) === undefined) {
			Cookies.set(`${id}_leaves`, 0);
		}
		Cookies.set(`${id}_${type}`, value);
	};

	const handleInputChange = (traineeId, monthNo, month) => (event) => {
		const { name, value } = event.target;
		let id = `${traineeId}_${monthNo}`;

		const type = (name === "description") ? "desc" : "leaves";
		setCookie(id, type, value);

		setFormData((prevFormData) => ({
			...prevFormData,
			[id]: {
				trainee_id: traineeId,
				supervisor_id: traineeConnection[traineeId].supervisor_id,
				evaluator_id: traineeConnection[traineeId].evaluator_id,
				record: (name === "description") ? value : Cookies.get(`${id}_desc`),
				leaves: Cookies.get(`${id}_leaves`),
				month: month[0].month,
				year: month[0].year
			}
		}));
	};

	const handleSubmit = (traineeId, monthNo) => (event) => {
		event.preventDefault();
		let id = `${traineeId}_${monthNo}`;
		console.log(formData[id]);

		axios
			.post(`${API_URL}/api/set/review/add/supervisor`, formData[id])
			.then((response) => {
				toast.success("Review added successfully. Reloading...");

				Object.keys(formData).map((key) => {
					Cookies.remove(`${key}_desc`);
					Cookies.remove(`${key}_leaves`);
				});

				setTimeout(() => {
					window.location.reload();
				}, 2000);
			})
			.catch((error) => {
				toast.error("Error adding the review. Please try again.");
				console.log(error["response"]["data"]["message"]);
			});
	};

	useEffect(() => {
		getTraineeList();
		getRecords();
	}, []);

	const getMonthName = (monthNumber) => {
		const date = new Date();
		date.setMonth(monthNumber - 1);

		return date.toLocaleString("en-US", {
			month: "long",
		});
	};

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
											{Object.keys(recordData[trainee][month]).map((week, k) => (
												<Box className="list_container" key={k}>
													<Accordion sx={{ width: "100%", backgroundColor: "#9dd0ff", boxShadow: "none", marginBottom: "10px", borderRadius: "4px" }} className="accordion_item">
														<AccordionSummary>
															<Typography sx={{ width: "100%", flexShrink: 0, fontWeight: "medium", fontSize: "16px" }}>{`Week ${recordData[trainee][month][week].week}`}</Typography>
														</AccordionSummary>
														<AccordionDetails className="report_detail_container">
															<Box className="weekly_report_container">
																<Typography className="report_title report_title_des">Description :</Typography>
																<Box className="weekly_report_des">
																	<Typography sx={{ fontSize: "16px", textAlign: "left" }}>{recordData[trainee][month][week].description}</Typography>
																</Box>
															</Box>
															<Box className="weekly_report_container" sx={{ marginTop: 2 }}>
																<Typography className="report_title report_title_des">Solutions :</Typography>
																<Box className="weekly_report_des">
																	<Typography sx={{ fontSize: "16px", textAlign: "left" }}>{recordData[trainee][month][week].solutions}</Typography>
																</Box>
															</Box>
														</AccordionDetails>
													</Accordion>
												</Box>
											))}

											<form onSubmit={handleSubmit(trainee, month)}>
												<Accordion sx={{ width: "100%", backgroundColor: "#69b7ff", boxShadow: "none", borderRadius: 1.5 }}>
													<AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
														<Typography sx={{ width: "100%", flexShrink: 0, fontWeight: "medium", fontSize: "18px" }}>Supervisor Report</Typography>
													</AccordionSummary>

													<Box className="supervisor_report_field" variant="outlined">
														<div className="assigned_student">
															<Typography component={"span"} variant="body1">
																<TextField
																	multiline
																	rows={6}
																	variant="outlined"
																	required
																	fullWidth
																	name="description"
																	type="text"
																	value={Cookies.get(`${trainee}_${month}_desc`) ? Cookies.get(`${trainee}_${month}_desc`) : ""}
																	onChange={handleInputChange(trainee, month, recordData[trainee][month])}
																	placeholder="Write comments here."
																	sx={{ "& fieldset": { border: "none" } }}
																/>
															</Typography>
														</div>
													</Box>

													<Box className="supervisor_leaves_field" variant="outlined">
														<Typography sx={{ width: "80%", flexShrink: 0, fontWeight: "medium", fontSize: "18px", textAlign: "left" }}>Number of leaves</Typography>
														<div className="text_align_right">
															<Typography component={"span"} variant="body1">
																<TextField
																	className="leave_input_field"
																	variant="outlined"
																	required
																	fullWidth
																	name="leaves"
																	type="number"
																	value={Cookies.get(`${trainee}_${month}_leaves`) ? Cookies.get(`${trainee}_${month}_leaves`) : 0}
																	onChange={handleInputChange(trainee, month, recordData[trainee][month])}
																	sx={{ "& fieldset": { border: "none" } }}
																/>
															</Typography>
														</div>
													</Box>

													<Button variant="contained" type="submit" className="report_submit" sx={{ width: "95%", bgcolor: "#379fff", fontSize: "18px" }} disabled={formData[`${trainee}_${month}`] ? false : true}>
														Save
													</Button>

												</Accordion>
											</form>

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

export default Dashboard;