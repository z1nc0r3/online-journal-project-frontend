import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function SupervisorNavbar() {
	return (
		<Box sx={{ flexGrow: 1, marginBottom: 4 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: "left", fontWeight: "light" }}>
						Name of the User - Department
					</Typography>
					<Button className="logout_button">Logout</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
