import Button from "@mui/material/Button";

const LogoutButton = () => {
	const handleLogout = () => {
		// Remove authentication details from localStorage
		localStorage.setItem("authorized", false);
		localStorage.removeItem("role");
        
		// Redirect the user to the login page or homepage
        window.location.href = "/login";
	};

	return (<Button onClick={handleLogout} className="logout_button">Logout</Button>);
};

export default LogoutButton;