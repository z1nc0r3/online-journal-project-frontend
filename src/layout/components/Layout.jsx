import { React, useState, useEffect } from "react";
import { Box, Container, Button, Grid, Typography } from "@mui/material";
import { useParams, Redirect, useLocation } from "react-router-dom";
import AdminHeader from "./admin/AdminHeader";
import AdminLeftWidget from "./admin/LeftWidget";
import AdminTraineeList from "./admin/TraineeList";
import CssBaseline from "@mui/material/CssBaseline";

function Layout(props) {
	if (props.layout.includes("admin_trainee")) {
		if (props.layout === "admin_trainee_list") {
			return (
				<Container component="main" className="dashboard_container" maxWidth={false} disableGutters={true} sx={{ height: "100%" }}>
					<CssBaseline />
					<AdminHeader />

					<Typography component="h1" sx={{ fontWeight: "normal", color: "white", marginBottom: 4, fontSize: 28 }}>
						Trainee List
					</Typography>

					<Grid container spacing={2}>
						<Grid item xs={3}>
							<AdminLeftWidget />
						</Grid>
						<Grid item xs={9}>
							<AdminTraineeList />
						</Grid>
					</Grid>
				</Container>
			);
		}
	}
}

export default Layout;
