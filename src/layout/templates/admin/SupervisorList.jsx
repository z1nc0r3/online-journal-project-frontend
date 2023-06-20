import * as React from "react";
import { Box, Container } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CssBaseline from "@mui/material/CssBaseline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import "../../../assets/css/list.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Link } from "react-router-dom";

function SupervisorList() {
	const [expanded, setExpanded] = React.useState(false);
	const [supervisors, setSupervisors] = React.useState([]);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const getSupervisorList = (event) => {
		axios.get("http://127.0.0.1:8000/api/get/supervisor/list").then((response) => {
			const data = response.data;

			if (data.login_error) {
				console.log("error");
			} else {
				setSupervisors(data.supervisors);
			}
		});
	};

	useEffect(() => {
		getSupervisorList();
	}, []);

	return (
		<Container component="main" className="list_container" maxWidth={false}>
			<CssBaseline />

			<Box className="list_box">
				{supervisors.map((supervisor, i) => (
					<Accordion
						expanded={expanded === i}
						onChange={handleChange(i)}
						sx={{ width: "100%", backgroundColor: "#dfefff", boxShadow: "none", marginBottom: "10px", borderRadius: "4px" }}
						key={i}
						className="accordion_item">
						<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
							<Link to={"/admin/supervisor_list/edit/" + supervisor.id}>
								<ModeEditIcon sx={{ color: "#1c93ff", marginRight: "1rem", fontSize: "18px" }} />
							</Link>
							<Typography sx={{ width: "66%", flexShrink: 0, fontWeight: "medium", fontSize: "16px" }}>{supervisor.fName}</Typography>
							<Typography sx={{ color: "text.secondary", fontSize: "14px" }}>{supervisor.estName}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Box className="supervisor_assign_form">
								<div className="assign_evaluator_row">
									<Typography sx={{ fontSize: "16px", textAlign: "left" }}>
										Assigned for : {supervisor.supervisor_connection ? supervisor.supervisor_connection.trainee_name : "Not Assigned"}
									</Typography>
								</div>
							</Box>
						</AccordionDetails>
					</Accordion>
				))}
			</Box>
		</Container>
	);
}

export default SupervisorList;