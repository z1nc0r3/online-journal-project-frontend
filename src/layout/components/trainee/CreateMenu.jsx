import * as React from "react";
import { useState } from "react";
import { Box, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import "../../../assets/css/main.css";

function CreateMenu() {
	const [activeMenuButton, setActiveMenuButton] = useState(0);

	const buttons = [
		{ label: "Trainee", path: "/admin/create_user/trainee" },
		{ label: "Supervisor", path: "/admin/create_user/supervisor" },
		{ label: "Evaluator", path: "/admin/create_user/evaluator" }
	];

	return (
		<Container component="main" className="create_menu_container">
			<CssBaseline />

			<Box className="create_menu">
				{buttons.map((button, index) => (
					<Link key={index} to={button.path} className="create_menu_link">
						<Button variant="contained" onClick={() => setActiveMenuButton(index)} className={`create_menu_button ${activeMenuButton === index ? "active" : ""}`}>
							{button.label}
						</Button>
					</Link>
				))}
			</Box>
		</Container>
	);
}

export default CreateMenu;
