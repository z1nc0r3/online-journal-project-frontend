import React, { useState } from "react";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import AlertDialog from "../../components/main/AlertDialog";

const LogoutButton = () => {
	const [isLogoutAlertOpen, setLogoutAlertOpen] = useState(false);

	const handleOpenLogoutAlert = () => {
		setLogoutAlertOpen(true);
	};

	const handleCloseLogoutAlert = () => {
		setLogoutAlertOpen(false);
	};

	const handleLogout = () => {
		// Remove authentication details from localStorage
		localStorage.setItem("authorized", false);
		localStorage.removeItem("role");
		localStorage.removeItem("user_id");
		localStorage.removeItem("fName");

		localStorage.removeItem("description");
		localStorage.removeItem("solutions");

		// Redirect the user to the login page or homepage
		window.location.href = "/login";
	};

	const handleDisagree = () => {
		// User disagreed with logout, simply close the AlertDialog
		handleCloseLogoutAlert();
	};

	return (
		<div>
			<Button onClick={handleOpenLogoutAlert} className="logout_button">
				<LogoutIcon />
				&nbsp;&nbsp;Logout
			</Button>
			{/* AlertDialog to confirm the logout */}
			<AlertDialog
				open={isLogoutAlertOpen}
				onClose={handleCloseLogoutAlert}
				onAgree={handleLogout}
				onDisagree={handleDisagree}
				title="Logout Confirmation"
				description="Are you sure you want to logout?"
				agreeText="Yes"
				disagreeText="No"
			/>
		</div>
	);
};

export default LogoutButton;
