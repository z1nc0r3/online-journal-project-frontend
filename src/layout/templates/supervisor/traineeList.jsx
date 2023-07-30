import * as React from "react";
import "../../../assets/css/list.css";
import { useState, useEffect } from "react";
import { Box, Container, Button, colors } from "@mui/material";
import { CssBaseline, Typography, Select, MenuItem } from "@mui/material";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
//import CssBaseline from "@mui/material/CssBaseline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function TraineeList() {
  const [expanded, setExpanded] = React.useState(false);
  const [trainees, setTrainees] = React.useState([]);

  const [formData, setFormData] = useState({});

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
			.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/update/assign/`, updatedTrainee)
			.then((response) => {
				toast.success(response.data.message);
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			})
			.catch((error) => {
				toast.error(error.response.data.message);
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
							<Link to={"/supervisor/traineeListReportPrevious" + trainee.id}>
								<ModeEditIcon sx={{ color: "#1c93ff", marginRight: "1rem", fontSize: "18px" }} />
							</Link>
							<Typography sx={{ width: "5%", flexShrink: 0, fontWeight: "medium", fontSize: "16px" }}>{i + 1}</Typography>
							<Typography sx={{ width: "66%", flexShrink: 0, fontWeight: "medium", fontSize: "16px" }}>{trainee.fName}</Typography>
							<Typography sx={{ color: "text.secondary", fontSize: "14px" }}>{trainee.department}</Typography>
						</AccordionSummary>

						{/* <AccordionDetails>
							<form className="trainee_info_form" noValidate autoComplete="off" onSubmit={(event) => handleSubmit(event, trainee)}>
								<Box className="trainee_assign_form">
									<Button variant="contained" type="submit" className="assign_save">
										Save
									</Button>
								</Box>
							</form>
						</AccordionDetails> */}
            
					</Accordion>
				))}
			</Box>
    </Container>
  );
}

export default TraineeList;
