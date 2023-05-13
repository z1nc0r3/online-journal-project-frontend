import * as React from "react";
import { Box, Container, Button, Paper, Grid } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CssBaseline from "@mui/material/CssBaseline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import "../../../assets/css/main.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

function TraineeList() {
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<Container component="main" className="trainee_list_container" maxWidth={false}>
			<CssBaseline />

			<Box className="trainee_list" activeClassName="active">
				<Accordion expanded={expanded === "trainee_panel"} onChange={handleChange("trainee_panel")} sx={{ width: "100%", backgroundColor: "#dfefff", boxShadow: "none" }}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
						<ModeEditIcon sx={{ color: "#1c93ff", marginRight: "1rem" }} />
						<Typography sx={{ width: "66%", flexShrink: 0, fontWeight: "medium", fontSize: "18px" }}>Student Name</Typography>
						<Typography sx={{ color: "text.secondary", fontSize: "18px" }}>Department</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Box className="trainee_assign_form" component="form">
							<div className="assign_supervisor_row">
								<Typography sx={{width: "35%"}}>
									Assigned Supervisor :
								</Typography>
								<TextField label="Supervisor name" variant="outlined" fullWidth id="supervisor" name="supervisor" required/>
							</div>

							<div className="assign_evaluator_row">
								<Typography sx={{width: "35%"}}>
									Assigned Evaluator :
								</Typography>
								<TextField label="Evaluator name" variant="outlined" fullWidth id="evaluator" name="evaluator" required/>
							</div>

							<Button variant="contained" type="submit" className="assign_save">
								Save
							</Button>
						</Box>
					</AccordionDetails>
				</Accordion>
			</Box>
		</Container>
	);
}

export default TraineeList;
