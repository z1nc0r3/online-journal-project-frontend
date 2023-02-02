import "./App.css";
import "./assets/css/main.css";
import Login from "./layout/templates/main/Login";
import { Box, Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Container maxWidth={false} disableGutters={true}>
				<Box className="main_container" sx={{ background: "linear-gradient(60deg, rgba(0,133,255,1) 0%, rgba(55,159,255,1) 100%)", height: "100vh" }}>
					<BrowserRouter>
						<Routes>
							<Route path='/login' element={<Login />}></Route>
						</Routes>
					</BrowserRouter>
				</Box>
			</Container>
		</div>
	);
}

export default App;
