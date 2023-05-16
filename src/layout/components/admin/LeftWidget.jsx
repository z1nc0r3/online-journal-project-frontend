import * as React from "react";
import { useState } from "react";
import { Box, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import "../../../assets/css/main.css";

function LeftWidget() {
	const [activeButton, setActiveButton] = useState(0);

	const buttons = [
		{ label: "Trainee List", path: "/admin/trainee_list" },
		{ label: "Supervisor List", path: "/admin/supervisor_list" },
		{ label: "Evaluator List", path: "/admin/evaluator_list" },
		{ label: "Create User", path: "/admin/create_user/trainee" },
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
