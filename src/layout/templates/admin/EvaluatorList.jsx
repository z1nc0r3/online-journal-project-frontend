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

function EvaluatorList() {
	const [expanded, setExpanded] = React.useState(false);
	const [evaluators, setEvaluators] = React.useState([]);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const getEvaluatorList = (event) => {
		axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/get/evaluator/list`).then((response) => {
			const data = response.data;

			if (data.error) {
				console.log(data.error);
			} else {
				setEvaluators(data.evaluators);
			}
		});
	};

	useEffect(() => {
		getEvaluatorList();
	}, []);

	return (
		<Container component="main" className="list_container" maxWidth={false}>
			<CssBaseline />

			<Box className="list_box">
				{evaluators.map((evaluator, i) => (
					<Accordion
						expanded={expanded === i}
						onChange={handleChange(i)}
						sx={{ width: "100%", backgroundColor: "#dfefff", boxShadow: "none", marginBottom: "10px", borderRadius: "4px" }}
						key={i}
						className="accordion_item">
						<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
							<Link to={"/admin/evaluator_list/edit/" + evaluator.id}>
								<ModeEditIcon sx={{ color: "#1c93ff", marginRight: "1rem", fontSize: "18px" }} />
							</Link>
							<Typography sx={{ width: "66%", flexShrink: 0, fontWeight: "medium", fontSize: "16px" }}>{evaluator.fName}</Typography>
							<Typography sx={{ color: "text.secondary", fontSize: "14px" }}>{evaluator.department}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Box className="evaluator_assign_form">
								<div className="assigned_student">
									<Typography sx={{ fontSize: "16px", textAlign: "left" }}>
										Assigned for : {evaluator.evaluator_connection ? evaluator.evaluator_connection.trainee_name : "Not Assigned"}
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

export default EvaluatorList;