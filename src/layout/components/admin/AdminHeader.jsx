import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SupervisorAccount from "@mui/icons-material/SupervisorAccount";
import AssignmentInd from "@mui/icons-material/AssignmentInd";
import AddCircle from "@mui/icons-material/AddCircle";
import LocalPrintShop from "@mui/icons-material/LocalPrintshop";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import LogoutButton from "../../templates/main/Logout";
import "../../../assets/css/main.css";

// update this according to the user menu
const pages = ["Trainee List", "Supervisor List", "Evaluation List", "Create User"];

function ResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const [state, setState] = React.useState({
		left: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	// update this
	const buttons = [
		{ label: "Trainee List", path: "/admin/trainee_list", icon: "SupervisorAccount" },
		{ label: "Supervisor List", path: "/admin/supervisor_list" },
		{ label: "Evaluator List", path: "/admin/evaluator_list" },
		{ label: "Create User", path: "/admin/create_user/trainee" },
		{ label: "Print", path: "/admin/print" },
	];

	const list = (anchor) => (
		<Box sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }} role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
			<List>
				{buttons.map((button, index) => (
					<ListItem key={button.label} disablePadding>
						<ListItemButton component={Link} to={button.path}>
							<ListItemIcon>{handleIcon(index)}</ListItemIcon>
							<ListItemText primary={button.label} className="sideBarLinkText" />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	// update icons
	function handleIcon(index) {
		switch (index) {
			case 0:
				return <AccountCircle />;
			case 1:
				return <SupervisorAccount />;
			case 2:
				return <AssignmentInd />;
			case 3:
				return <AddCircle />;
			default:
				return <LocalPrintShop />;
		}
	}

	return (
		<AppBar position="static" sx={{ marginBottom: 3 }}>
			<Container maxWidth="">
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
							{list("left")}
						</Drawer>
						<IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={toggleDrawer("left", true)} color="inherit">
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" component="div" sx={{ display: "flex", alignItems: "center", flexGrow: 1, textAlign: "left", fontWeight: "light", marginLeft: 1 }}>
							Administrator
						</Typography>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}>
							{pages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography textAlign="center">{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>

					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						<Typography variant="h6" component="div" sx={{ display: "flex", alignItems: "center", flexGrow: 1, textAlign: "left", fontWeight: "light", marginLeft: 1 }}>
							Administrator
						</Typography>
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<LogoutButton />
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default ResponsiveAppBar;
