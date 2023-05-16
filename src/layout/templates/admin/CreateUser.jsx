import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Container, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CssBaseline from "@mui/material/CssBaseline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import "../../../assets/css/list.css";
import CreateMenu from "../../components/admin/CreateMenu";

function SupervisorList() {
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<Container component="main" className="list_container" maxWidth={false}>
			<CssBaseline />

			<CreateMenu />

			<Box className="list_box">
				<Accordion expanded={expanded === "list_accordion"} onChange={handleChange("list_accordion")} sx={{ width: "100%", backgroundColor: "#dfefff", boxShadow: "none" }}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
						<Typography sx={{ width: "66%", flexShrink: 0, fontWeight: "medium", fontSize: "18px" }}>Supervisor Name</Typography>
						<Typography sx={{ color: "text.secondary", fontSize: "18px" }}>Position</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Box className="supervisor_assign_box">
							<Typography>Assigned For :</Typography>
							<Typography>Student Name</Typography>
						</Box>
					</AccordionDetails>
				</Accordion>
			</Box>
		</Container>
	);
}

export default SupervisorList;
