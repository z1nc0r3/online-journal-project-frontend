import * as React from "react";
import { Box, Container, Button, Paper, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import "../../../assets/css/main.css";

function LeftWidget() {
	return (
		<Container component="main" className="left_widget_container">
			<CssBaseline />

			<Box className="left_widget">
				<Link to="/admin/trainee_list" className="left_widget_link">
					<Button variant="contained" className="left_widget_button" activeClassName="active">
						Trainee List
					</Button>
				</Link>
				<Link to="/admin/supervisor_list" className="left_widget_link">
					<Button variant="contained" className="left_widget_button">
						Supervisor List
					</Button>
				</Link>
				<Link to="/admin/evaluator_list" className="left_widget_link">
					<Button variant="contained" className="left_widget_button">
						Evaluator List
					</Button>
				</Link>
				<Link to="/admin/create_user" className="left_widget_link">
					<Button variant="contained" className="left_widget_button">
						Create User
					</Button>
				</Link>
			</Box>
		</Container>
	);
}

export default LeftWidget;
