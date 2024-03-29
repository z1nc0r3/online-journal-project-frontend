import * as React from "react";
import { Box, Container } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
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
	const [supervisors, setSupervisor] = React.useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const getSupervisorList = (event) => {
		if (new Date().getTime() - Cookies.get("supervisorLastUpdate") < 86400000 && Cookies.get("isLatestSupervisor") === "true") {
			setSupervisor(JSON.parse(localStorage.getItem("supervisorsData")));
			setIsLoading(false);
			return;
		}

		axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/get/supervisor/list`).then((response) => {
			const data = response.data;

			if (data.error) {
				console.log(data.error);
			} else {
				setSupervisor(data.supervisors);
				Cookies.set("supervisorLastUpdate", new Date().getTime());
				Cookies.set("isLatestSupervisor", true);
				localStorage.setItem("supervisorsData", JSON.stringify(data.supervisors));
				setIsLoading(false);
			}
		});
	};

	useEffect(() => {
		if (!Cookies.get("isLatestSupervisor")) Cookies.set("isLatestSupervisor", false);

		getSupervisorList();
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

	if (Object.keys(supervisors).length === 0) {
		return (
			<Container component="main" className="list_container" maxWidth={false}>
				<CssBaseline />

				<Box className="list_box" sx={{padding: 2}}>
					<Typography sx={{ width: "100%", flexShrink: 0, fontWeight: "medium", fontSize: "16px" }}>No records found.</Typography>
				</Box>
			</Container>
		);
	}

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
							<Box className="supervisor_assign_form" sx={{ display: "flex", flexDirection: "row" }}>
								<Typography sx={{ fontSize: "16px", textAlign: "left", marginRight: 1 }}>
									Assigned for :
								</Typography>
								<div>
									{supervisor.supervisor_connection.map((supervisorConnection, index) => (
										<div className="assigned_student pb-10" key={index}>
											<Typography sx={{ fontSize: "16px", textAlign: "left", fontWeight: "500" }}>
												{supervisorConnection.trainee_name}
											</Typography>
										</div>
									))}
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