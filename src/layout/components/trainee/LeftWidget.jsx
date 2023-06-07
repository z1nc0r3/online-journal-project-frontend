import * as React from "react";
import { useState } from "react";
import { Box, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import "../../../assets/css/main.css";

function LeftWidget() {
	const [activeButton, setActiveButton] = useState(0);

	const buttons = [
		{ label: "DashBoard", path: "/trainee/dashboard" },
		{ label: "Current Month Report", path: "/trainee/current_month_report" },
		{ label: "Past Reports", path: "/trainee/past_reports" },
		{ label: "Edit User Data", path: "/trainee/user_edit_data" },
		{ label: "User Instructions", path: "/trainee/user_instruction" },

	];

	return (
		<Container component="main" className="left_widget_container">
			<CssBaseline />

			<Box className="left_widget">
				{buttons.map((button, index) => (
					<Link key={index} to={button.path} className="left_widget_link">
						<Button variant="contained" onClick={() => setActiveButton(index)} className={`left_widget_button ${activeButton === index ? "active" : ""}`}>
							{button.label}
						</Button>
					</Link>
				))}
			</Box>
		</Container>
	);
}

export default LeftWidget;
