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
import Checkbox from "@mui/material/Checkbox";


import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Link } from "react-router-dom";


function dashboard() {

    return (
		<Container component="main" className="list_container" maxWidth={false}>
			<CssBaseline />
			<Box className="trainee_box">
				<Box>
					<h1 className="trainee_box_heading">Brief Description of work carried out :</h1>
					<Box className="trainee_box_description" variant="outlined">
						<Typography variant="body1" className="trainee_box_description_text">
							<TextField multiline rows={6} required fullWidth name="address" type="text" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus exercitationem omnis fuga ipsa reprehenderit repellendus, nam sunt voluptatibus illo perferendis at aspernatur enim praesentium ea ut recusandae minima delectus cumque perspiciatis, molestias nemo accusamus! Culpa accusamus aspernatur, alias aliquam consectetur consequatur soluta enim obcaecati molestiae repellat, natus quod optio distinctio!" />
						</Typography>
					</Box>
				</Box>
				<Box>
					<h1 className="trainee_box_heading">Problems Encountered and Solutions Found :</h1>
					<Box variant="outlined" className="trainee_box_description" >
						<Typography variant="body1" className="trainee_box_description_text">
							<TextField multiline rows={3} required fullWidth name="address" type="text" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus exercitationem omnis fuga ipsa reprehenderit repellendus, nam sunt voluptatibus illo perferendis at aspernatur enim praesentium ea ut recusandae minima delectus cumque perspiciatis, molestias nemo accusamus! Culpa accusamus aspernatur, alias aliquam consectetur consequatur soluta enim obcaecati molestiae repellat, natus quod optio distinctio!" />
						</Typography>
					</Box>
				</Box>
				<Box className="traine_submission_box">
					<Button variant="contained" className="save_button_trianee">Contained</Button>
					<Checkbox/>
					<Typography className="agreement_trainee_submission" variant="body1" sx={{  color: 'white', marginTop: '23px' }}>
					I hereby declare that all the information contained in this report is truth and correct. I take full responsibility for the correctness of the said information.
					</Typography>

				</Box>
			</Box>
		</Container>
	);

}

export default dashboard;