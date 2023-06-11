import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Container, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CssBaseline from "@mui/material/CssBaseline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import "../../../assets/css/list.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Link } from "react-router-dom";

function TraineeList() {
	const [expanded, setExpanded] = React.useState(false);
	const [trainees, setTrainees] = React.useState([]);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
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

	useEffect(() => {
		getTraineeList();
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
							<Box className="trainee_assign_form" component="form">
								<div className="assign_supervisor_row">
									<Typography sx={{ width: "35%", fontSize: "14px" }}>Supervisor :</Typography>
									<TextField
										className="assigned_supervisor"
										variant="outlined"
										fullWidth
										id="supervisor"
										name="supervisor"
										value={trainee.connection ? trainee.connection.supervisor_name : ""}
										required
										sx={{ borderRadius: "1.5rem" }}
									/>
								</div>

								<div className="assign_evaluator_row">
									<Typography sx={{ width: "35%", fontSize: "14px" }}>Evaluator :</Typography>
									<TextField variant="outlined" fullWidth id="evaluator" name="evaluator" required value={trainee.connection ? trainee.connection.evaluator_name : ""}/>
								</div>

								<Button variant="contained" type="submit" className="assign_save">
									Save
								</Button>
							</Box>
						</AccordionDetails>
					</Accordion>
				))}
			</Box>
		</Container>
	);
}

export default TraineeList;
