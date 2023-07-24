import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutButton = () => {
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

	return (<Button onClick={handleLogout} className="logout_button"><LogoutIcon />&nbsp;&nbsp;Logout</Button>);
};

export default LogoutButton;