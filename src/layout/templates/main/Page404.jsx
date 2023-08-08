import React, { useEffect } from "react";
import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import "../../../assets/css/login.css";

function Page404() {
    const checkLoggedIn = () => {
        const role = Cookies.get("role");
        const authorized = Cookies.get("authorized");

        setTimeout(() => {
            if (role && authorized) {
                window.location.href = `/${role}`;
            } else {
                window.location.href = "/login";
            }
        }, 150020);
    };

    useEffect(() => {
        checkLoggedIn();
    }, []);

    return (
        <Container component="main" className="login_container" maxWidth="sm">
            <CssBaseline />

            <Typography component="h1" variant="h3" sx={{ fontWeight: "bold", color: "white" }}>
                404 Page Not Found
                <Typography component="h3" variant="h4" sx={{ fontWeight: "300", color: "white", marginTop: 2 }}>
                    Redirecting...
                </Typography>
            </Typography>
        </Container>
    );
}

export default Page404;
