import React from "react";
import { Container, Grid, Typography, CssBaseline } from "@mui/material";
import AdminHeader from "./admin/AdminHeader";
import AdminLeftWidget from "./admin/LeftWidget";
import AdminTraineeList from "./admin/TraineeList";
import AdminSupervisorList from "./admin/SupervisorList";
import AdminEvaluatorList from "./admin/EvaluatorList";
import CreateUser from "./admin/CreateUser";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "../../assets/css/main.css";

const titleMap = {
	admin_trainee_list: "Trainee List",
	admin_supervisor_list: "Supervisor List",
	admin_evaluator_list: "Evaluator List",
	admin_create_user: "Create New User",
};

const Layout = (props) => {
	const { layout } = props;

	const getTitle = () => titleMap[layout];

	const getView = () => {
		switch (layout) {
			case "admin_trainee_list":
				return <AdminTraineeList />;
			case "admin_supervisor_list":
				return <AdminSupervisorList />;
			case "admin_evaluator_list":
				return <AdminEvaluatorList />;
			case "admin_create_user":
				return <CreateUser />;
			default:
				return null;
		}
	};

	return (
		<Container component="main" className="dashboard_container" maxWidth={false} disableGutters={true} sx={{ height: "100%" }}>
			<CssBaseline />
			<AdminHeader />

			<Typography
				component="h1"
				sx={{
					fontWeight: "medium",
					color: "white",
					marginBottom: 4,
					fontSize: 28,
				}}>
				{getTitle()}
			</Typography>

			<Grid container className="list_box_main_grid">
				<Grid item lg={3}>
					<AdminLeftWidget/>
				</Grid>
				<Grid item lg={6}>
					{getView()}
				</Grid>
				<Grid item lg={2.2}>
					<Container className="calendar_container">
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DateCalendar readOnly />
						</LocalizationProvider>
					</Container>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Layout;
