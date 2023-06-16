import React from "react";
import { useEffect, useState } from "react";
import { Container, Grid, Typography, CssBaseline } from "@mui/material";
import { useNavigate } from "react-router-dom";

import UserVerification from "../main/UserVerification";

import AdminHeader from "../../components/admin/AdminHeader";
import AdminLeftWidget from "../../components/admin/LeftWidget";
import AdminTraineeList from "../admin/TraineeList";
import AdminTraineeListEdit from "../admin/TraineeListEdit";
import AdminSupervisorList from "../admin/SupervisorList";
import AdminSupervisorListEdit from "../admin/SupervisorListEdit";
import AdminEvaluatorList from "../admin/EvaluatorList";
import AdminEvaluatorListEdit from "../admin/EvaluatorListEdit";
import CreateUser from "../admin/CreateUser";

import TraineeHeader from "../../components/trainee/TraineeHeader";
import TraineeDashboard from "../trainee/dashboard";
import TraineeDashboard from "../trainee/dashboard";
import TraineeLeftWidget from "../../components/trainee/LeftWidget";
import TraineePastReports from "../trainee/PastReports";
import TraineeUserInstruction from "../trainee/UserInstruction";
import TraineeUserEditInstruction from "../trainee/UserEditData";
import TraineeCurrentMonthReport from "../trainee/CurrentMonthReport";

import SupervisorHeader from "../../components/supervisor/SupervisorHeader";
import SupervisorDashboard from "../supervisor/dashboard";
import SupervisorLeftWidget from "../../components/supervisor/LeftWidget";
import SupervisorTraineeList from "../supervisor/traineeList";
import SupervisorUserEditData from "../supervisor/UserEditData";
import SupervisorReportPrevious from "../supervisor/traineeListReportPrevious";


import CreateUser from "../admin/CreateUser";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "../../../assets/css/main.css";

const titleMap = {
	admin_trainee_list: "Trainee List",
	admin_supervisor_list: "Supervisor List",
	admin_evaluator_list: "Evaluator List",
	admin_create_user: "Create New User",
	admin_trainee_edit: "Update Trainee Detail",
	admin_supervisor_edit: "Update Supervisor Detail",
	admin_evaluator_edit: "Update Evaluator Detail",

	trainee_dashboard: "Week no :",
	trainee_past_reports: "Past Report",
	trainee_user_instruction: "Instruction",
	trainee_user_edit_data: "Edit User Data",
	trainee_current_month_report: "Current Month Report",
	
	supervisor_dashboard: "Report for Reveiw",
	supervisor_trainee_list: "Trainee List",
	supervisor_user_edit_data: "Edit User Data",
	supervisor_report_prev_data: "Previous reports of : Student Name",
};

const Layout = (props) => {
	const { layout } = props;
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const getTitle = () => titleMap[layout];

	useEffect(() => {
		UserVerification().then((authorized) => {
			if (!authorized) {
				navigate("/login");
			} else {
				setLoading(false);
			}
		});
	}, [navigate]);

	const getComponent = () => {
		switch (layout) {
			case "admin_trainee_list":
				return { Header: AdminHeader, LeftWidget: AdminLeftWidget, Main: AdminTraineeList };
			case "admin_supervisor_list":
				return { Header: AdminHeader, LeftWidget: AdminLeftWidget, Main: AdminSupervisorList };
			case "admin_evaluator_list":
				return { Header: AdminHeader, LeftWidget: AdminLeftWidget, Main: AdminEvaluatorList };
			case "admin_create_user":
				return { Header: AdminHeader, LeftWidget: AdminLeftWidget, Main: () => <CreateUser user={props.user} /> };
			case "admin_trainee_edit":
				return { Header: AdminHeader, LeftWidget: AdminLeftWidget, Main: AdminTraineeListEdit };
			case "admin_supervisor_edit":
				return { Header: AdminHeader, LeftWidget: AdminLeftWidget, Main: AdminSupervisorListEdit };
			case "admin_evaluator_edit":
				return { Header: AdminHeader, LeftWidget: AdminLeftWidget, Main: AdminEvaluatorListEdit };
			case "trainee_dashboard":
				return { Header: TraineeHeader, LeftWidget: TraineeLeftWidget, Main: TraineeDashboard };
			case "trainee_past_reports":
				return { Header: TraineeHeader, LeftWidget: TraineeLeftWidget, Main: TraineePastReports };
			case "trainee_user_instruction":
				return { Header: TraineeHeader, LeftWidget: TraineeLeftWidget, Main: TraineeUserInstruction };
			case "trainee_user_edit_data":
				return { Header: TraineeHeader, LeftWidget: TraineeLeftWidget, Main: TraineeUserEditInstruction };
			case "trainee_current_month_report":
				return { Header: TraineeHeader, LeftWidget: TraineeLeftWidget, Main: TraineeCurrentMonthReport };
			default:
				return { Header: null, LeftWidget: null, Main: null };
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	const { Header, LeftWidget, Main } = getComponent();

	return (
		<Container component="main" className="dashboard_container" maxWidth={false} disableGutters={true} sx={{ height: "100%" }}>
			<CssBaseline />
			{Header && <Header />}

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
					{LeftWidget && <LeftWidget />}
				</Grid>

				<Grid item lg={6}>
					{Main && <Main />}
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
