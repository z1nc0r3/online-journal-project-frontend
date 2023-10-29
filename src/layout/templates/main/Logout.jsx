import React, { useState } from "react";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import AlertDialog from "../../components/main/AlertDialog";
import Cookies from "js-cookie";

const LogoutButton = () => {
	const [isLogoutAlertOpen, setLogoutAlertOpen] = useState(false);

	const handleOpenLogoutAlert = () => {
		setLogoutAlertOpen(true);
	};

	const handleCloseLogoutAlert = () => {
		setLogoutAlertOpen(false);
	};

	const handleLogout = () => {
		// User agreed with logout, clear the cookies
		Object.keys(Cookies.get()).forEach(cookieName => {
			Cookies.remove(cookieName);
		});
		Cookies.set("authorized", false);

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