import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Container, Button } from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { CssBaseline, TextField, Typography, Select, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../../../assets/css/list.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Link } from "react-router-dom";

function TraineeList() {
	const [expanded, setExpanded] = React.useState(false);
	const [trainees, setTrainees] = React.useState([]);
	const [supervisors, setSupervisor] = React.useState([]);
	const [evaluators, setEvaluator] = React.useState([]);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const handleUpdate = (event) => {
		event.preventDefault();
	};

	const getTraineeList = (event) => {
		axios.get("http://127.0.0.1:8000/api/get/trainee/list").then((response) => {
			const data = response.data;

			if (data.login_error) {
				console.log("error");
			} else {
				setTrainees(data.trainees);
			}
		});
	};

	const getSupervisorList = (event) => {
		axios.get("http://127.0.0.1:8000/api/get/supervisor/list").then((response) => {
			const data = response.data;

			if (data.login_error) {
				console.log("error");
			} else {
				console.log(data.supervisors);
				setSupervisor(data.supervisors);
			}
		});
	};

	const getEvaluatorList = (event) => {
		axios.get("http://127.0.0.1:8000/api/get/evaluator/list").then((response) => {
			const data = response.data;

			if (data.login_error) {
				console.log("error");
			} else {
				console.log(data.evaluators);
				setEvaluator(data.evaluators);
			}
		});
	};

	useEffect(() => {
		getTraineeList();
		getSupervisorList();
		getEvaluatorList();
	}, []);

	return (
		<Container component="main" className="list_container" maxWidth={false}>
			<CssBaseline />

			<Box className="list_box">
				{trainees.map((trainee, i) => (
					<Accordion
						expanded={expanded === i}
						onChange={handleChange(i)}
						sx={{ width: "100%", backgroundColor: "#dfefff", boxShadow: "none", marginBottom: "10px", borderRadius: "4px" }}
						key={i}
						className="accordion_item">
						<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
							<Link to={"/admin/trainee_list/edit/" + trainee.id}>
								<ModeEditIcon sx={{ color: "#1c93ff", marginRight: "1rem", fontSize: "18px" }} />
							</Link>
							<Typography sx={{ width: "66%", flexShrink: 0, fontWeight: "medium", fontSize: "16px" }}>{trainee.fName}</Typography>
							<Typography sx={{ color: "text.secondary", fontSize: "14px" }}>{trainee.department}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<form className="trainee_info_form" noValidate autoComplete="off">
								<Box className="trainee_assign_form" component="form">
									<div className="assign_supervisor_row">
										<Typography sx={{ width: "35%", fontSize: "14px" }}>Supervisor :</Typography>
										<Select
											variant="outlined"
											value={trainee.trainee_connection && trainee.trainee_connection !== "" ? trainee.trainee_connection.supervisor_name : ""}
											required
											fullWidth
											name="duration"
											type="text"
											onChange={handleUpdate}>
											<MenuItem value="">Not Assigned</MenuItem>
											{supervisors.map((supervisor, i) => (
												<MenuItem key={i} value={supervisor.fName}>
													{supervisor.fName}
												</MenuItem>
											))}
										</Select>
									</div>

									<div className="assign_evaluator_row">
										<Typography sx={{ width: "35%", fontSize: "14px" }}>Evaluator :</Typography>
										<Select
											variant="outlined"
											value={trainee.trainee_connection ? trainee.trainee_connection.evaluator_name : ""}
											required
											fullWidth
											name="duration"
											type="text"
											onChange={handleUpdate}>
											{evaluators.map((evaluator, i) => (
												<MenuItem key={i} value={evaluator.fName}>
													{evaluator.fName}
												</MenuItem>
											))}
										</Select>
									</div>

									<Button variant="contained" type="submit" className="assign_save">
										Save
									</Button>
								</Box>
							</form>
						</AccordionDetails>
					</Accordion>
				))}
			</Box>
		</Container>
	);
}

export default TraineeList;
