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
import { AddBoxOutlined } from "@mui/icons-material";

function UserInstruction() {

    return (
		<Container component="main" className="list_container" maxWidth={false}>
			<Container className="trainee_box_description_text">
				<Container className="trainee_instruction_box">
					<Box>
						<Typography sx={{textAlign: 'left', paddingBottom:'25px'}}>1. As credit will be given for the maintenance of the weekly diary at your Intern and Final Assessment you are advised to maintain your weekly diary neat and tidy and to keep it safe till the end of your training period.</Typography>
					</Box>
					<Box>
						<Typography sx={{textAlign: 'left', paddingBottom:'25px'}}>2. It is important that weekly entries should be made at the end of each working week. The weekly entries should contain a brief description of the work done. All entries should be in ink.</Typography>
					</Box>
					<Box>
						<Typography sx={{textAlign: 'left', paddingBottom:'25px'}}>3. Your submission of each week will be received by your Training Officer and he/she will give his approval.</Typography>
					</Box>
					<Box>
						<Typography sx={{textAlign: 'left', paddingBottom:'25px'}}>4. In the blank spaces provided, write any new information you may have gathered, any reference that may be necessary and technical drawings that will be useful to you.</Typography>
					</Box>
					<Box>
						<Typography sx={{textAlign: 'left', paddingBottom:'25px'}}>5. Overall Progress Report found at the rear of the weekly diary should be completed and certified by the employer of each establishment.</Typography>
					</Box>
				</Container>
			</Container>
		</Container>
	);

}

export default UserInstruction;