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

function CurrentMonthReport() {

    return (
		<Container component="main" className="list_container" maxWidth={false}>
			<CssBaseline />
			<Box>
				<div>
				<Accordion>
					<AccordionSummary className="student_month_accordion"
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography>Month 01</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Box className="student_week"><Typography>Week 01</Typography></Box>
						<Box className="student_week"><Typography>Week 02</Typography></Box>
						<Box className="student_week"><Typography>Week 03</Typography></Box>
						<Box className="student_week"><Typography>Week 04</Typography></Box>
					</AccordionDetails>
				</Accordion>
				</div>
			</Box>
		</Container>
	);

}

export default CurrentMonthReport;