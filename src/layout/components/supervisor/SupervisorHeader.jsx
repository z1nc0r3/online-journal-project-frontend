import * as React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
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
import DashboardIcon from '@mui/icons-material/Dashboard';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MenuItem from "@mui/material/MenuItem";
import LogoutButton from "../../templates/main/Logout";
import "../../../assets/css/main.css";

const pages = ["Dashboard", "Trainee list", "Edit User Data"];

export default function SupervisorNavbar() {

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

	const buttons = [
		{ label: "DashBoard", path: "/supervisor/dashboard" },
		{ label: "Trainee List", path: "/supervisor/trainee_list" },
		{ label: "Edit User Data", path: "/supervisor/user_edit_data" },

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
				return <DashboardIcon />;
			case 1:
				return <DateRangeIcon />;
			case 2:
				return <CalendarMonthIcon />;
			case 3:
				return <ModeEditIcon />;
			default:
				return <FormatListBulletedIcon />;
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
							{Cookies.get("fName")}
							<Typography component="div" sx={{ display: "flex", alignItems: "center", flexGrow: 1, textAlign: "left", fontWeight: "light", marginLeft: 1 }}>
							Supervisor Dashboard 
							</Typography>
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
						<Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: "left", fontWeight: "light" }}>
							{Cookies.get("fName")}
							<Typography component="div" sx={{ display: "flex", alignItems: "center", flexGrow: 1, textAlign: "left", fontWeight: "light", marginLeft: 1}} >Supervisor Dashboard </Typography>
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

