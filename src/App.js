import "./App.css";
import "./assets/css/main.css";
import Login from "./layout/templates/main/Login";
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
							
							<Route path='/admin' element={<Navigate to="/admin/trainee_list"/>}></Route>
							<Route path='/admin/dashboard' element={<Navigate to="/admin/trainee_list"/>}></Route>

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
						</Routes>
					</BrowserRouter>
				</Box>
			</Container>
		</div>
	);
}

export default App;
