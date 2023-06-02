import * as React from "react";
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

function UserEditData() {

    return (
		<Container component="main" className="list_container" maxWidth={false}>
			<CssBaseline />

			<Box className="list_box">
				<Accordion sx={{ width: "100%", backgroundColor: "#dfefff", boxShadow: "none" }}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
						<Link to="/admin/trainee_list/edit/:id"><ModeEditIcon sx={{ color: "#1c93ff", marginRight: "1rem" }} /></Link>
						<Typography sx={{ width: "66%", flexShrink: 0, fontWeight: "medium", fontSize: "18px" }}>Trainee Name</Typography>
						<Typography sx={{ color: "text.secondary", fontSize: "18px" }}>Department</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Box className="trainee_assign_form" component="form">
							<div className="assign_supervisor_row">
								<Typography sx={{width: "35%"}}>
									Assigned Supervisor :
								</Typography>
								<TextField label="Supervisor name" className="assigned_supervisor" variant="outlined" fullWidth id="supervisor" name="supervisor" required sx={{borderRadius: "1.5rem"}}/>
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

export default UserEditData;