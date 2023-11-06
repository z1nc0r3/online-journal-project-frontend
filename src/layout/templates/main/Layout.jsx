import React from "react";
import { useEffect, useState } from "react";
import { Container, Grid, Typography, CssBaseline, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import "dayjs/locale/en-gb";

import UserVerification from "../main/UserVerification";

import AdminHeader from "../../components/admin/AdminHeader";
import AdminLeftWidget from "../../components/admin/LeftWidget";
import AdminTraineeList from "../admin/TraineeList";
import AdminTraineeListEdit from "../admin/TraineeListEdit";
import AdminSupervisorList from "../admin/SupervisorList";
import AdminEvaluatorList from "../admin/EvaluatorList";
import AdminEvaluatorListEdit from "../admin/EvaluatorListEdit";
import AdminSupervisorListEdit from "../admin/SupervisorListEdit";
import CreateUser from "../admin/CreateUser";

import AdminPrintDetails from "../admin/PrintDetails";

import TraineeHeader from "../../components/trainee/TraineeHeader";
import TraineeDashboard from "../trainee/Dashboard";
import TraineeLeftWidget from "../../components/trainee/LeftWidget";
import TraineePastReports from "../trainee/PastReports";
import TraineeUserInstruction from "../trainee/UserInstruction";
import TraineeUserEditInstruction from "../trainee/UserEditData";
import TraineeCurrentMonthReport from "../trainee/CurrentMonthReport";

import SupervisorHeader from "../../components/supervisor/SupervisorHeader";
import SupervisorDashboard from "../supervisor/Dashboard";
import SupervisorLeftWidget from "../../components/supervisor/LeftWidget";
import SupervisorTraineeList from "../supervisor/TraineeList";
import SupervisorUserEditData from "../supervisor/UserEditData";

import EvaluatorHeader from "../../components/evaluator/EvaluatorHeader";
import EvaluatorDashboard from "../evaluator/Dashboard";
import EvaluatorLeftWidget from "../../components/evaluator/LeftWidget";
import EvaluatorTraineeList from "../evaluator/TraineeList";
import EvaluatorUserEditData from "../evaluator/UserEditData";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "../../../assets/css/main.css";
import getWeekInfo from "../../components/main/GetWeekInfo";
import Cookies from "js-cookie";

const currentWeekData = getWeekInfo(new Date());
const titleMap = {
	admin_trainee_list: "Trainee List",
	admin_supervisor_list: "Supervisor List",
	admin_evaluator_list: "Evaluator List",
	admin_create_user: "Create New User",
	admin_trainee_edit: "Update Trainee Detail",
	admin_evaluator_edit: "Update Evaluator Detail",
	admin_supervisor_edit: "Update Supervisor Detail",
	admin_print: "Print Details",

	trainee_dashboard: `${currentWeekData.currentMonthName} -  Week : ${currentWeekData.currentWeek}`,
	trainee_past_reports: "Past Report",
	trainee_user_instruction: "Instruction",
	trainee_user_edit_data: "Edit User Data",
	trainee_current_month_report: currentWeekData.currentMonthName,

	supervisor_dashboard: "Report for Review",
	supervisor_trainee_list: "Trainee List",
	supervisor_user_edit_data: "Edit User Data",

	evaluator_dashboard: "Pending approval",
	evaluator_trainee_list: "Trainee List",
	evaluator_user_edit_data: "Edit User Data",
};

const adminLayouts = [
	"admin_trainee_list",
	"admin_supervisor_list",
	"admin_evaluator_list",
	"admin_create_user",
	"admin_trainee_edit",
	"admin_evaluator_edit",
	"admin_supervisor_edit",
	"admin_print",
];

const traineeLayouts = [
	"trainee_dashboard",
	"trainee_past_reports",
	"trainee_user_instruction",
	"trainee_user_edit_data",
	"trainee_current_month_report",
];

const supervisorLayouts = ["supervisor_dashboard", "supervisor_trainee_list", "supervisor_user_edit_data"];

const evaluatorLayouts = ["evaluator_dashboard", "evaluator_trainee_list", "evaluator_user_edit_data"];

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

	// Limit others users from accessing other pages
	useEffect(() => {
		if (layout) {
			if (Cookies.get("role") === "admin" && !adminLayouts.includes(layout)) {
				navigate("/admin_trainee_list");
			} else if (Cookies.get("role") === "trainee" && !traineeLayouts.includes(layout)) {
				navigate("/trainee_dashboard");
			} else if (Cookies.get("role") === "supervisor" && !supervisorLayouts.includes(layout)) {
				navigate("/supervisor_dashboard");
			} else if (Cookies.get("role") === "evaluator" && !evaluatorLayouts.includes(layout)) {
				navigate("/evaluator_dashboard");
			} else {
				setLoading(false);
			}
		}
	}, [props.user, layout, navigate]);

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
			case "admin_print":
				return { Header: AdminHeader, LeftWidget: AdminLeftWidget, Main: AdminPrintDetails };
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
			case "supervisor_dashboard":
				return { Header: SupervisorHeader, LeftWidget: SupervisorLeftWidget, Main: SupervisorDashboard };
			case "supervisor_trainee_list":
				return { Header: SupervisorHeader, LeftWidget: SupervisorLeftWidget, Main: SupervisorTraineeList };
			case "supervisor_user_edit_data":
				return { Header: SupervisorHeader, LeftWidget: SupervisorLeftWidget, Main: SupervisorUserEditData };
			case "evaluator_dashboard":
				return { Header: EvaluatorHeader, LeftWidget: EvaluatorLeftWidget, Main: EvaluatorDashboard };
			case "evaluator_trainee_list":
				return { Header: EvaluatorHeader, LeftWidget: EvaluatorLeftWidget, Main: EvaluatorTraineeList };
			case "evaluator_user_edit_data":
				return { Header: EvaluatorHeader, LeftWidget: EvaluatorLeftWidget, Main: EvaluatorUserEditData };
			default:
				return { Header: null, LeftWidget: null, Main: null };
		}
	};

	if (loading) {
		return <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}><ReactLoading type="spin" color="white"
			height={100} width={50} /></Box>;
	}

	const { Header, LeftWidget, Main } = getComponent();

	return (
		<Container component="main" className="dashboard_container" maxWidth={false} disableGutters={true} sx={{ height: "100%" }}>
			<CssBaseline />
			{Header && <Header />}

			<Typography
				className="dashboard_title"
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
				<Grid item xs={0} sm={0} md={4} lg={3}>
					{LeftWidget && <LeftWidget />}
				</Grid>

				<Grid item xs={12} sm={12} md={8} lg={6}>
					{Main && <Main />}
				</Grid>

				<Grid item xs={0} sm={0} md={0} lg={3} className="calendar">
					<Container className="calendar_container">
						<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
							<DateCalendar readOnly displayWeekNumber />
						</LocalizationProvider>
					</Container>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Layout;