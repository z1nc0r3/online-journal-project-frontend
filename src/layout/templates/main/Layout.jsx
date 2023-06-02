import React from "react";
import { Container, Grid, Typography, CssBaseline } from "@mui/material";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminLeftWidget from "../../components/admin/LeftWidget";
import AdminTraineeList from "../admin/TraineeList";
import AdminTraineeListEdit from "../admin/TraineeListEdit";
import AdminSupervisorList from "../admin/SupervisorList";
import AdminEvaluatorList from "../admin/EvaluatorList";
import AdminEvaluatorListEdit from "../admin/EvaluatorListEdit";

import StudentHeader from "../../components/student/StudentHeader";
import StudentDashboard from "../student/dashboard";
import StudentLeftWidget from "../../components/student/LeftWidget";
import StudentPastReports from "../student/PastReports";
import StudentUserInstruction from "../student/UserInstruction";
import StudentUserEditInstruction from "../student/UserEditData";
import StudentCurrentMonthReport from "../student/CurrentMonthReport";





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
	admin_evaluator_edit: "Update Evaluator Detail",
	student_dashboard: "Week no :",
	student_past_reports: "Past Report",
	student_user_instruction: "Instruction to maintain the Diary",
	student_user_edit_data: "Edit User Data",
	student_current_month_report: "Current Month Report",
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
				return <CreateUser user={props.user} />;
			case "admin_trainee_edit":
				return <AdminTraineeListEdit />;
			case "admin_evaluator_edit":
				return <AdminEvaluatorListEdit />;
			case "student_dashboard":
				return <StudentDashboard />;
			case "student_past_reports":
				return <StudentPastReports />;
			case "student_user_instruction":
				return <StudentUserInstruction />;
			case "student_user_edit_data":
				return <StudentUserEditInstruction />;
			case "student_current_month_report":
				return <StudentCurrentMonthReport />;
			default:
				return null; //to-do: add 404 page
		}
	};

	const getLeftWidget = () => {
		switch (layout) {
			case "admin_trainee_list":
				return <AdminLeftWidget />;
			case "admin_supervisor_list":
				return <AdminLeftWidget />;
			case "admin_evaluator_list":
				return <AdminLeftWidget />;
			case "admin_create_user":
				return <AdminLeftWidget />;
			case "admin_trainee_edit":
				return <AdminLeftWidget />;
			case "admin_evaluator_edit":
				return <AdminLeftWidget />;
			case "student_dashboard":
				return <StudentLeftWidget />;
			case "student_past_reports":
				return <StudentLeftWidget />;
			case "student_user_instruction":
				return <StudentLeftWidget />;
			case "student_user_edit_data":
				return <StudentLeftWidget />;
			case "student_current_month_report":
				return <StudentLeftWidget />;
			default:
				return null; //to-do: add 404 page
		}
	};

	const getHeader = () => {
		switch (layout) {
			case "admin_trainee_list":
				return <AdminHeader />;
			case "admin_supervisor_list":
				return <AdminHeader />;
			case "admin_evaluator_list":
				return <AdminHeader />;
			case "admin_create_user":
				return <AdminHeader />;
			case "admin_trainee_edit":
				return <AdminHeader />;
			case "admin_evaluator_edit":
				return <AdminHeader />;
			case "student_dashboard":
				return <StudentHeader />;
			case "student_past_reports":
				return <StudentHeader />;
			case "student_user_instruction":
				return <StudentHeader />;
			case "student_user_edit_data":
				return <StudentHeader />;
			case "student_current_month_report":
				return <StudentHeader />;
			default:
				return null; //to-do: add 404 page
		}
	};

	return (
		<Container component="main" className="dashboard_container" maxWidth={false} disableGutters={true} sx={{ height: "100%" }}>
			<CssBaseline />
			{getHeader()}

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
					{getLeftWidget()}
					{/* <AdminLeftWidget /> */}
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
