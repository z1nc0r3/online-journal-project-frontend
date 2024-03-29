import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Box, Container, Button } from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { CssBaseline, Typography, Select, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../../../assets/css/list.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

function TraineeList() {
	const [expanded, setExpanded] = React.useState(false);
	const [trainees, setTrainees] = React.useState([]);
	const [supervisors, setSupervisor] = React.useState([]);
	const [evaluators, setEvaluator] = React.useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [formData, setFormData] = useState({});

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const handleSupervisorUpdate = (trainee) => (event) => {
		const { value } = event.target;

		setFormData((prevFormData) => ({
			...prevFormData,
			[trainee.id]: {
				...prevFormData[trainee.id],
				supervisor_id: supervisors.find((supervisor) => supervisor.fName === value)?.id || "",
				supervisor: value,
			},
		}));
	};

	const handleEvaluatorUpdate = (trainee) => (event) => {
		const { value } = event.target;

		setFormData((prevFormData) => ({
			...prevFormData,
			[trainee.id]: {
				...prevFormData[trainee.id],
				evaluator_id: evaluators.find((evaluator) => evaluator.fName === value)?.id || "",
				evaluator: value,
			},
		}));
	};

	const getTraineeList = (event) => {
		if (new Date().getTime() - Cookies.get("traineeLastUpdate") < 86400000) {
			setTrainees(JSON.parse(localStorage.getItem("traineesData")));
			setFormData(JSON.parse(localStorage.getItem("traineesFormData")));
			setIsLoading(false);
			return;
		}

		axios.get(`${API_URL}/api/get/trainee/list`).then((response) => {
			const data = response.data;

			if (data.error) {
				console.log(data.error);
			} else {
				const traineesData = data.trainees.reduce((acc, trainee) => {
					acc[trainee.id] = {
						supervisor_id: trainee.trainee_connection[0] ? trainee.trainee_connection[0].supervisor_id : "",
						supervisor: trainee.trainee_connection[0] ? trainee.trainee_connection[0].supervisor_name : "",
						evaluator_id: trainee.trainee_connection[0] ? trainee.trainee_connection[0].evaluator_id : "",
						evaluator: trainee.trainee_connection[0] ? trainee.trainee_connection[0].evaluator_name : "",
					};
					return acc;
				}, {});

				setTrainees(data.trainees);
				setFormData(traineesData);
				Cookies.set("traineeLastUpdate", new Date().getTime());
				localStorage.setItem("traineesData", JSON.stringify(data.trainees));
				localStorage.setItem("traineesFormData", JSON.stringify(traineesData));
				setIsLoading(false);
			}
		});
	};

	const getSupervisorList = (event) => {
		if (new Date().getTime() - Cookies.get("traineeLastUpdate") < 86400000) {
			setSupervisor(JSON.parse(localStorage.getItem("supervisorsData")));
			setIsLoading(false);
			return;
		}

		axios.get(`${API_URL}/api/get/supervisor/list`).then((response) => {
			const data = response.data;

			if (data.error) {
				console.log(data.error);
			} else {
				setSupervisor(data.supervisors);
				Cookies.set("supervisorLastUpdate", new Date().getTime());
				localStorage.setItem("supervisorsData", JSON.stringify(data.supervisors));
			}
		});
	};

	const getEvaluatorList = (event) => {
		if (new Date().getTime() - Cookies.get("traineeLastUpdate") < 86400000) {
			setEvaluator(JSON.parse(localStorage.getItem("evaluatorsData")));
			setIsLoading(false);
			return;
		}

		axios.get(`${API_URL}/api/get/evaluator/list`).then((response) => {
			const data = response.data;

			if (data.error) {
				console.log(data.error);
			} else {
				setEvaluator(data.evaluators);
				Cookies.set("evaluatorLastUpdate", new Date().getTime());
				localStorage.setItem("evaluatorsData", JSON.stringify(data.evaluators));
			}
		});
	};

	const handleSubmit = (event, trainee) => {
		event.preventDefault();

		// Assuming trainee is the current trainee object being submitted
		const updatedTrainee = {
			...trainee,
			trainee_connection: {
				supervisor_id: formData[trainee.id]?.supervisor_id,
				supervisor_name: formData[trainee.id]?.supervisor,
				evaluator_id: formData[trainee.id]?.evaluator_id,
				evaluator_name: formData[trainee.id]?.evaluator,
			},
		};

		axios
			.post(`${API_URL}/api/update/assign`, updatedTrainee)
			.then((response) => {
				toast.success(response.data.message);
				Cookies.set("traineeLastUpdate", 0);
				Cookies.set("isLatest", false);

				setTimeout(() => {
					window.location.reload();
				}, 2000);
			})
			.catch((error) => {
				toast.error(error.response.data.message);
			});
	};

	useEffect(() => {
		if (!Cookies.get("isLatest")) Cookies.set("isLatest", false);

		getTraineeList();
		getSupervisorList();
		getEvaluatorList();
	}, []);

	if (isLoading) {
		return (
			<Container component="main" className="list_container" maxWidth={false}>
				<CssBaseline />

				<Box className="list_box" sx={{padding: 2}}>
					<Typography sx={{ width: "100%", flexShrink: 0, fontWeight: "medium", fontSize: "16px" }}>Loading...</Typography>
				</Box>
			</Container>
		);
	}

	if (Object.keys(trainees).length === 0) {
		return (
			<Container component="main" className="list_container" maxWidth={false}>
				<CssBaseline />

				<Box className="list_box" sx={{padding: 2}}>
					<Typography sx={{ width: "100%", flexShrink: 0, fontWeight: "medium", fontSize: "16px" }}>No records found.</Typography>
				</Box>
			</Container>
		);
	}
	
	const supervisorItems = supervisors.map((supervisor, i) => (
		<MenuItem key={i} value={supervisor.fName}>
			{supervisor.fName}
		</MenuItem>
	));

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
							<Link to={"/admin/trainee_list/edit/" + trainee.id}>
								<ModeEditIcon sx={{ color: "#1c93ff", marginRight: "1rem", fontSize: "18px" }} />
							</Link>
							<Typography sx={{ width: "66%", flexShrink: 0, fontWeight: "medium", fontSize: "16px" }}>{trainee.fName}</Typography>
							<Typography sx={{ color: "text.secondary", fontSize: "14px" }}>{trainee.department}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<form className="trainee_info_form" noValidate autoComplete="off" onSubmit={(event) => handleSubmit(event, trainee)}>
								<Box className="trainee_assign_form">
									<div className="assign_supervisor_row">
										<Typography sx={{ width: "35%", fontSize: "14px" }}>Supervisor</Typography>
										<Select
											variant="outlined"
											value={formData[trainee.id]?.supervisor || ""}
											required
											fullWidth
											name="supervisor"
											type="text"
											onChange={handleSupervisorUpdate(trainee)}>
											<MenuItem value="">Not Assigned</MenuItem>
											{supervisorItems}
										</Select>
									</div>

									<div className="assign_evaluator_row">
										<Typography sx={{ width: "35%", fontSize: "14px" }}>Evaluator</Typography>
										<Select
											variant="outlined"
											value={formData[trainee.id]?.evaluator || ""}
											required
											fullWidth
											name="evaluator"
											type="text"
											onChange={handleEvaluatorUpdate(trainee)}>
											<MenuItem value="">Not Assigned</MenuItem>
											{evaluators.map((evaluator, i) => {
												if (evaluator.department === trainee.department) {
													return (
														<MenuItem key={i} value={evaluator.fName}>
															{evaluator.fName}
														</MenuItem>
													);
												}
												return null;
											})}
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