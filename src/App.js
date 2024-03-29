import "./App.css";
import "./assets/css/main.css";
import Login from "./layout/templates/main/Login";
import Page404 from "./layout/templates/main/Page404";
import { Box, Container } from "@mui/material";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layout/templates/main/Layout";

function App() {
	return (
		<div className="App">
			<Container maxWidth={false} disableGutters={true}>
				<Box className="main_container" sx={{ background: "linear-gradient(60deg, rgba(0,133,255,1) 0%, rgba(55,159,255,1) 100%)" }}>
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<Navigate to ="/login" />}></Route>
							<Route path='/login' element={<Login />}></Route>
							<Route path='/404' element={<Page404/>}></Route>
							
							<Route path='/admin' element={<Navigate to="/admin/trainee_list"/>}></Route>
							<Route path='/admin/dashboard' element={<Navigate to="/admin/trainee_list"/>}></Route>

							<Route path='/trainee' element={<Navigate to="/trainee/dashboard"/>}></Route>

							<Route path='/admin/trainee_list' element={<Layout layout="admin_trainee_list"/>}></Route>
							<Route path='/admin/trainee_list/edit/:id' element={<Layout layout="admin_trainee_edit"/>}></Route>
							<Route path='/admin/create_user/trainee' element={<Layout layout="admin_create_user" user="trainee"/>}></Route>
							<Route path='/admin/trainee_list/delete/:id' element={<Layout layout="admin_trainee_delete"/>}></Route>

							<Route path='/admin/supervisor_list' element={<Layout layout="admin_supervisor_list"/>}></Route>
							<Route path='/admin/supervisor_list/edit/:id' element={<Layout layout="admin_supervisor_edit"/>}></Route>
							<Route path='/admin/create_user/supervisor' element={<Layout layout="admin_create_user" user="supervisor"/>}></Route>
							<Route path='/admin/supervisor_list/delete/:id' element={<Layout layout="admin_supervisor_delete"/>}></Route>

							<Route path='/admin/evaluator_list' element={<Layout layout="admin_evaluator_list"/>}></Route>
							<Route path='/admin/evaluator_list/edit/:id' element={<Layout layout="admin_evaluator_edit"/>}></Route>
							<Route path='/admin/create_user/evaluator' element={<Layout layout="admin_create_user" user="evaluator"/>}></Route>
							<Route path='/admin/evaluator_list/delete/:id' element={<Layout layout="admin_evaluator_delete"/>}></Route>

							<Route path='/admin/print' element={<Layout layout="admin_print"/>}></Route>

							<Route path='/trainee/dashboard' element={<Layout layout="trainee_dashboard"/>}></Route>
							<Route path='/trainee/past_reports' element={<Layout layout="trainee_past_reports"/>}></Route>
							<Route path='/trainee/user_instruction' element={<Layout layout="trainee_user_instruction"/>}></Route>
							<Route path='/trainee/user_edit_data' element={<Layout layout="trainee_user_edit_data"/>}></Route>
							<Route path='/trainee/current_month_report' element={<Layout layout="trainee_current_month_report"/>}></Route>

							<Route path='/supervisor' element={<Navigate to="/supervisor/dashboard"/>}></Route>
							<Route path='/supervisor/dashboard' element={<Layout layout="supervisor_dashboard"/>}></Route>
							<Route path='/supervisor/trainee_list' element={<Layout layout="supervisor_trainee_list"/>}></Route>
							<Route path='/supervisor/user_edit_data' element={<Layout layout="supervisor_user_edit_data"/>}></Route>

							<Route path='/evaluator' element={<Navigate to="/evaluator/dashboard"/>}></Route>
							<Route path='/evaluator/dashboard' element={<Layout layout="evaluator_dashboard"/>}></Route>
							<Route path='/evaluator/trainee_list' element={<Layout layout="evaluator_trainee_list"/>}></Route>
							<Route path='/evaluator/user_edit_data' element={<Layout layout="evaluator_user_edit_data"/>}></Route>

							<Route path='*' element={<Navigate to="/404"/>}></Route>
						</Routes>
					</BrowserRouter>
				</Box>
			</Container>
		</div>
	);
}

export default App;
