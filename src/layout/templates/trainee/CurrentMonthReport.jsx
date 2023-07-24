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
				<Accordion className="trainee_month_accordion_root">
					<AccordionSummary className="trainee_month_accordion"
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography>Month 01</Typography>
					</AccordionSummary>
					<AccordionDetails>
						
						{Array.from({length: 4}, (_, i) => (
							<Box className="trainee_week">
							<Accordion key={i+1}>
							<AccordionSummary>
								<Typography>{`Week ${i+1}`}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
								DESCRIPTION : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
								</Typography>
							</AccordionDetails>
							</Accordion>
							</Box>
						))}

					</AccordionDetails>
				</Accordion>
			</Box>
		</Container>
	);

}

export default CurrentMonthReport;