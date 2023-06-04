import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutButton from "../../templates/main/Logout";

export default function AdminNavbar() {
	return (
		<Box sx={{ flexGrow: 1, marginBottom: 4 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: "left", fontWeight: "light" }}>
						Administrator
					</Typography>
					<LogoutButton />
				</Toolbar>
			</AppBar>
		</Box>
	);
}
