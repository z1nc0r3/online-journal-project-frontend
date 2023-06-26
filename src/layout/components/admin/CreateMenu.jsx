import React, { useEffect, useState } from "react";
import { Box, Container, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import "../../../assets/css/main.css";

function CreateMenu() {
	const location = useLocation();
	const [activeIndex, setActiveIndex] = useState(null);

	const buttons = [
		{ label: "Trainee", path: "/admin/create_user/trainee" },
		{ label: "Supervisor", path: "/admin/create_user/supervisor" },
		{ label: "Evaluator", path: "/admin/create_user/evaluator" },
	];

	useEffect(() => {
		const index = buttons.findIndex((button) => location.pathname.includes(button.path));
		setActiveIndex(index);
	}, [location.pathname]);

	const handleButtonClick = (index) => {
		setActiveIndex(index);
		console.log(index);
	};

	return (
		<Container component="main" className="create_menu_container">
			<CssBaseline />

			<Box className="create_menu">
				{buttons.map((button, index) => (
					<Link key={index} to={button.path} className="create_menu_link">
						<Button variant="contained" onClick={() => handleButtonClick(index)} className={`create_menu_button ${activeIndex === index ? "active" : ""}`}>
							{button.label}
						</Button>
					</Link>
				))}
			</Box>
		</Container>
	);
}

export default CreateMenu;
