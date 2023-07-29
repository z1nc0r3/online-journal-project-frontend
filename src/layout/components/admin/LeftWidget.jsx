import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Container, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import "../../../assets/css/main.css";

function LeftWidget() {
	const location = useLocation();
	const [activeButton, setActiveButton] = useState(null);

	const buttons = [
		{ label: "Trainee List", path: "/admin/trainee_list" },
		{ label: "Supervisor List", path: "/admin/supervisor_list" },
		{ label: "Evaluator List", path: "/admin/evaluator_list" },
		{ label: "Create User", path: "/admin/create_user/trainee" },
		{ label: "Print", path: "/admin/print" },
	];

	const links = [
		"/admin/create_user/trainee",
		"/admin/create_user/supervisor",
		"/admin/create_user/evaluator"
	]

	useEffect(() => {
		const index = buttons.findIndex((button) => location.pathname.includes(button.path) || (button.path.includes("/admin/create_user") && links.includes(location.pathname)));
		setActiveButton(index);
	}, [location.pathname]);

	const handleButtonClick = (index) => {
		setActiveButton(index);
	};

	return (
		<Container component="main" className="left_widget_container">
			<CssBaseline />

			<Box className="left_widget">
				{buttons.map((button, index) => (
					<Link key={index} to={button.path} className="left_widget_link">
						<Button variant="contained" onClick={() => handleButtonClick(index)} className={`left_widget_button ${activeButton == index ? "active" : ""}`}>
							{button.label}
						</Button>
					</Link>
				))}
			</Box>
		</Container>
	);
}

export default LeftWidget;
