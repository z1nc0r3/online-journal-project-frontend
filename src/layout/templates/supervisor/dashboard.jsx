import * as React from "react";
import "../../../assets/css/list.css";
import { Box, Container, Button, colors } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CssBaseline from "@mui/material/CssBaseline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import "../../../assets/css/list.css";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Link } from "react-router-dom";
//import SupervisorCommentButton from "./SupervisorCommentButton";

function Dashboard() {
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<Container component="main" className="list_container" maxWidth={false}>
			<CssBaseline />

			<Box className="list_box">
				<Accordion onChange={handleChange("list_accordion")} sx={{ width: "100%", backgroundColor: "#dfefff", boxShadow: "none" }}>
					
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
						<Typography sx={{ width: "75%", flexShrink: 0, fontWeight: "medium", fontSize: "18px" }}>Student Name - month</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Box className="supervisor_assign_box">
							<Typography>Week - 1</Typography>
						</Box>
					</AccordionDetails>
					<AccordionDetails>
						<Box className="supervisor_assign_box">
							<Typography>Week - 2</Typography>
						</Box>
					</AccordionDetails>
					<AccordionDetails>
						<Box className="supervisor_assign_box">
							<Typography>Week - 3</Typography>
						</Box>
					</AccordionDetails>
					<AccordionDetails>
						<Box className="supervisor_assign_box">
							<Typography>Week - 4</Typography>
						</Box>
					</AccordionDetails>
					
					<AccordionDetails>
							<Box className="comment_box">
								<Typography>Supervisor Comment</Typography>
							</Box>
						</AccordionDetails>

						<Button
						variant="contained"
						type="submit"
						className="register_button"
						sx={{ width: "95%", bgcolor: "#379fff", fontSize: "18px" }}
						> Save </Button>
					
 
					{/*	
						//<SupervisorCommentButton/>

						<AccordionDetails>
							<Box className="comment_box">
								<Typography>Supervisor Comment</Typography>
							</Box>
						</AccordionDetails>

						<Button
						variant="contained"
						type="submit"
						className="register_button"
						sx={{ width: "95%", bgcolor: "#379fff", fontSize: "18px" }}
						> Save </Button> */}

				</Accordion>

				<Accordion sx={{ width: "100%", backgroundColor: "#dfefff", boxShadow: "none" }}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">	
						<Typography sx={{ width: "75%", flexShrink: 0, fontWeight: "medium", fontSize: "18px" }}>Student Name - month</Typography>
					</AccordionSummary>

					<AccordionDetails>
						<Box className="supervisor_assign_box">
							<Typography>Week - 1</Typography>
						</Box>
					</AccordionDetails>
					<AccordionDetails>
						<Box className="supervisor_assign_box">
							<Typography>Week - 2</Typography>
						</Box>
					</AccordionDetails>
					<AccordionDetails>
						<Box className="supervisor_assign_box">
							<Typography>Week - 3</Typography>
						</Box>
					</AccordionDetails>
					<AccordionDetails>
						<Box className="supervisor_assign_box">
							<Typography>Week - 4</Typography>
						</Box>
					</AccordionDetails>
					<AccordionDetails>
						<Box className="comment_box">
							<Typography>Supervisor Comment</Typography>
						</Box>
					</AccordionDetails>

					<Button
              	variant="contained"
              	type="submit"
             	className="register_button"
              	sx={{ width: "95%", bgcolor: "#379fff", fontSize: "18px" }}
           		 > Save </Button>

				</Accordion>
			</Box>

		</Container>
	);
}

export default Dashboard;
