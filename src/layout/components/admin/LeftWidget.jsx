import * as React from "react";
import { Box, Container, Button, Paper, Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import "../../../assets/css/main.css";

function LeftWidget() {
	return (
		<Container component="main" className="login_container">
			<CssBaseline />

			<Box className="left_widget" activeClassName="active">
				<Button variant="contained" className="left_widget_button">
					Trainee List
				</Button>
				<Button variant="contained" className="left_widget_button">
					Supervisor List
				</Button>
				<Button variant="contained" className="left_widget_button">
					Evaluator List
				</Button>
				<Button variant="contained" className="left_widget_button">
					Create User
				</Button>
			</Box>
		</Container>
	);
}

export default LeftWidget;
