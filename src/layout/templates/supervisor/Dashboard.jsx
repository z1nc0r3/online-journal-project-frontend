import * as React from "react";
import "../../../assets/css/list.css";
import { Box, Container, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import axios from "axios";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CssBaseline from "@mui/material/CssBaseline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import "../../../assets/css/list.css";

function Dashboard() {
	const [expanded, setExpanded] = React.useState(false);
	const [trainees, setTrainees] = React.useState([]);
	const [formData, setFormData] = useState({});

	const [recordData, setRecordData] = useState({
		user_id: "",
		description: localStorage.getItem("description") || "",
		solutions: localStorage.getItem("solutions") || "",
		week: "",
		month: "",
		year: "",
	});

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
		const { name, value } = event.target;
		setRecordData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const getTraineeList = (event) => {
		axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/get/trainee/list`).then((response) => {
			const data = response.data;

			if (data.error) {
				console.log(data.error);
			} else {
				const traineesData = data.trainees.reduce((acc, trainee) => {
					acc[trainee.id] = {
						supervisor_id: trainee.trainee_connection ? trainee.trainee_connection.supervisor_id : "",
						supervisor: trainee.trainee_connection ? trainee.trainee_connection.supervisor_name : "",
						evaluator_id: trainee.trainee_connection ? trainee.trainee_connection.evaluator_id : "",
						evaluator: trainee.trainee_connection ? trainee.trainee_connection.evaluator_name : "",
					};
					return acc;
				}, {});

				setTrainees(data.trainees);
				setFormData(traineesData);
			}
		});
	};

	useEffect(() => {
		getTraineeList();
	}, []);

	return (
		<Container component="main" className="list_container" maxWidth={false}>
			<CssBaseline />

			<ToastContainer />

			<Box className="list_box">
				{trainees.map((trainee, i) => (
					<Accordion
						expanded={expanded === i}
						onChange={handleChange(i)}
						sx={{ width: "100%", backgroundColor: "#dfefff", boxShadow: "none", marginBottom: "10px", borderRadius: "4px" }}
						key={i}
						className="accordion_item">
						<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
							<Typography sx={{ width: "5%", flexShrink: 0, fontWeight: "medium", fontSize: "16px" }}>{i + 1}</Typography>
							<Typography sx={{ width: "66%", flexShrink: 0, fontWeight: "medium", fontSize: "16px" }}>{trainee.fName}</Typography>
							<Typography sx={{ color: "text.secondary", fontSize: "14px" }}>{trainee.department}</Typography>
						</AccordionSummary>

						<AccordionDetails>
							{Array.from({ length: 4 }, (_, i) => (
								<Box className="list_container">
									<Accordion sx={{ width: "100%", backgroundColor: "#9dd0ff", boxShadow: "none", marginBottom: "10px", borderRadius: "4px" }} className="accordion_item">
										<AccordionSummary>
											<Typography sx={{ width: "100%", flexShrink: 0, fontWeight: "medium", fontSize: "16px" }}>{`Week ${i + 1}`}</Typography>
										</AccordionSummary>
										<AccordionDetails className="report_detail_container">
											<Box className="weekly_report_container">
												<Typography className="report_title report_title_des">Description :</Typography>
												<Box className="weekly_report_des">
													<Typography sx={{ fontSize: "16px", textAlign: "left" }}></Typography>
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

								<Box className="supervisor_report_field">
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
												value={recordData.description}
												placeholder="Write comments here."
												onChange={handleChange}
												sx={{ "& fieldset": { border: "none" } }}
											/>
										</Typography>
									</div>
								</Box>
								<Button variant="contained" type="submit" className="report_submit" sx={{ width: "95%", bgcolor: "#379fff", fontSize: "18px" }}>
									Save
								</Button>
							</Accordion>
						</AccordionDetails>
					</Accordion>
				))}
			</Box>
		</Container>
	);
}

export default Dashboard;
