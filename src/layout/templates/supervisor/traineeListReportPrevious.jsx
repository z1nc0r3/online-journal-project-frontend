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

function TraineeListReportPrevious() {
  const [expanded, setExpanded] = React.useState(false);
  const [activeWeek, setActiveWeek] = React.useState("");
  const [showWeeks, setShowWeeks] = React.useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

  return (
    <Container component="main" className="list_container" maxWidth={false}>
			<CssBaseline />

			<Box className="list_box">

				<Accordion expanded={expanded === "list_accordion"} onChange={handleChange("list_accordion")} sx={{ width: "100%", backgroundColor: "transparent", boxShadow: "none" }}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
						<h2>Month - 1</h2>
					</AccordionSummary>

					<AccordionDetails>
						<Box className="evaluator_assign_box">
							<Typography>Week - 1</Typography>
						</Box>
					</AccordionDetails>
          <AccordionDetails>
						<Box className="evaluator_assign_box">
							<Typography>Week - 2</Typography>
						</Box>
					</AccordionDetails>
          <AccordionDetails>
						<Box className="evaluator_assign_box">
							<Typography>Week - 3</Typography>
						</Box>
					</AccordionDetails>
          <AccordionDetails>
						<Box className="evaluator_assign_box">
							<Typography>Week - 4</Typography>
						</Box>
					</AccordionDetails>
          <Button
						variant="contained"
						type="submit"
						className="register_button"
						sx={{ width: "95%", bgcolor: "#379FFF", fontSize: "18px" }}
						> Supervisor Report </Button>
					
				</Accordion>

			</Box><br/>

      <Box className="list_box">

				<Accordion expanded={expanded === "list_accordion"} onChange={handleChange("list_accordion")} sx={{ width: "100%", backgroundColor: "transparent", boxShadow: "none" }}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
						<h2>Month - 2</h2>
					</AccordionSummary>

					<AccordionDetails>
						<Box className="evaluator_assign_box">
							<Typography>Week - 1</Typography>
						</Box>
					</AccordionDetails>
          <AccordionDetails>
						<Box className="evaluator_assign_box">
							<Typography>Week - 2</Typography>
						</Box>
					</AccordionDetails>
          <AccordionDetails>
						<Box className="evaluator_assign_box">
							<Typography>Week - 3</Typography>
						</Box>
					</AccordionDetails>
          <AccordionDetails>
						<Box className="evaluator_assign_box">
							<Typography>Week - 4</Typography>
						</Box>
					</AccordionDetails>
          <Button
						variant="contained"
						type="submit"
						className="register_button"
						sx={{ width: "95%", bgcolor: "#379FFF", fontSize: "18px" }}
						> Supervisor Report </Button>
					
				</Accordion>

			</Box>

		</Container>
  );
}

export default TraineeListReportPrevious;
