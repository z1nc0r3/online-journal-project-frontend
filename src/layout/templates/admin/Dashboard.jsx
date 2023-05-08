import React from "react";
import { Box, Container, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AdminHeader from "../../components/AdminHeader";

function Dashboard() {
    return (
        <Container component="main" className="dashboard_container" maxWidth="sm">
            <CssBaseline />

            <AdminHeader />
        </Container>
    );
}

export default Dashboard;