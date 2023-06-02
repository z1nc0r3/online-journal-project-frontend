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

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Link } from "react-router-dom";


function dashboard() {

    return (
		<Container component="main" className="list_container" maxWidth={false}>
			<CssBaseline />
			<Box className="trainee_box">
				<Box>
					<h1 className="trainee_box_heading">Brief Description of work carried out</h1>
					<Card className="trainee_box_description" variant="outlined">
						<Typography variant="body1" className="trainee_box_description_text">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi culpa quisquam voluptate asperiores magni dolorum porro corporis quos perspiciatis, optio, rerum explicabo saepe aliquid ab reprehenderit impedit eum doloribus qui officia! Eligendi tempore earum aliquid! Reprehenderit dolore quas enim porro nobis! Earum at aliquam facere qui ad, nihil distinctio debitis rerum mollitia sapiente modi illum, corporis ullam dolores maiores laudantium sunt nulla voluptates itaque labore saepe nisi non obcaecati eius! Dignissimos ipsam illo in fugiat molestiae molestias omnis minima facilis, eaque tenetur optio modi repudiandae numquam, corrupti libero, nam iusto assumenda ex impedit magnam fugit asperiores sed velit architecto! Rerum?
						</Typography>
					</Card>
				</Box>
				<Box>
					<h1 className="trainee_box_heading">Brief Description of work carried out</h1>
					<Card variant="outlined" className="trainee_box_description" >
						<Typography variant="body1" className="trainee_box_description_text">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi culpa quisquam voluptate asperiores magni dolorum porro corporis quos perspiciatis, optio, rerum explicabo saepe aliquid ab reprehenderit impedit eum doloribus qui officia! Eligendi tempore earum aliquid! Reprehenderit dolore quas enim porro nobis! Earum at aliquam facere qui ad, nihil distinctio debitis rerum mollitia sapiente modi illum, corporis ullam dolores maiores laudantium sunt nulla voluptates itaque labore saepe nisi non obcaecati eius! Dignissimos ipsam illo in fugiat molestiae molestias omnis minima facilis, eaque tenetur optio modi repudiandae numquam, corrupti libero, nam iusto assumenda ex impedit magnam fugit asperiores sed velit architecto! Rerum?
						</Typography>
					</Card>
				</Box>
			</Box>
		</Container>
	);

}

export default dashboard;