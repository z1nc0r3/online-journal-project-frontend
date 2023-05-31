import * as React from "react";
import { useState } from "react";
import { Box, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import "../../../assets/css/main.css";

function LeftWidget() {
	const [activeButton, setActiveButton] = useState(0);

	const buttons = [
		{ label: "DashBoard", path: "/student/dashboard" },
		{ label: "Past Reports", path: "/student/past_reports" },
		{ label: "User Instructions", path: "/student/user_instruction" },
		{ label: "Edit User Data", path: "/student/user_edit_data" },
		{ label: "Current Month Report", path: "/student/current_month_report" },
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
