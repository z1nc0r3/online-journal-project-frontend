import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutButton = () => {
	const handleLogout = () => {
		// Remove authentication details from localStorage
		localStorage.setItem("authorized", false);
		localStorage.removeItem("role");
        
		// Redirect the user to the login page or homepage
        window.location.href = "/login";
	};

	return (<Button onClick={handleLogout} className="logout_button"><LogoutIcon />&nbsp;&nbsp;Logout</Button>);
};

export default LogoutButton;