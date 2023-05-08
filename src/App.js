import "./App.css";
import "./assets/css/main.css";
import Login from "./layout/templates/main/Login";
import AdminDashboard from "./layout/templates/admin/Dashboard";
import { Box, Container } from "@mui/material";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Container maxWidth={false} disableGutters={true}>
				<Box className="main_container" sx={{ background: "linear-gradient(60deg, rgba(0,133,255,1) 0%, rgba(55,159,255,1) 100%)", height: "100vh" }}>
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<Navigate to ="/login" />}></Route>
							<Route path='/login' element={<Login />}></Route>
							<Route path='/admin' element={<Navigate to ="/admin/dashboard" />}></Route>
							<Route path='/admin/dashboard' element={<AdminDashboard />}></Route>
						</Routes>
					</BrowserRouter>
				</Box>
			</Container>
		</div>
	);
}

export default App;
