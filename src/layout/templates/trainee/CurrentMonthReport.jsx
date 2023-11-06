import * as React from "react";
import { Box, Container } from "@mui/material";
import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CssBaseline from "@mui/material/CssBaseline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import axios from "axios";
import getWeekInfo from "../../components/main/GetWeekInfo";
import "../../../assets/css/list.css";

function CurrentMonthReport() {
	const [getMonthRecords, setGetMonthRecords] = useState({
		user_id: Cookies.get("user_id"),
		month: new Date().getMonth() + 1,
		year: new Date().getFullYear(),
	});
	const [currentMonthRecords, setCurrentMonthRecords] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getRecords = (e) => {
		const { user_id, month, year } = getMonthRecords;
		axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/get/record/current/month/${user_id}?month=${month}&year=${year}`).then((response) => {
			const data = response.data.records;
			setCurrentMonthRecords(data);
			setIsLoading(false);
		});
	};

	useEffect(() => {
		getRecords();
	}, []);

	if (isLoading) {
		return (
			<Container component="main" className="list_container" maxWidth={false}>
				<CssBaseline />

				<Box className="list_box" sx={{ padding: 2 }}>
					<Typography sx={{ width: "100%", flexShrink: 0, fontWeight: "medium", fontSize: "16px" }}>Loading...</Typography>
				</Box>
			</Container>
		);
	}

	if (Object.keys(currentMonthRecords).length === 0) {
		return (
			<Container component="main" className="list_container" maxWidth={false}>
				<CssBaseline />

				<Box className="list_box" sx={{ padding: 2 }}>
					<Typography sx={{ width: "100%", flexShrink: 0, fontWeight: "medium", fontSize: "16px" }}>No records found.</Typography>
				</Box>
			</Container>
		);
	}

	return (
		<Container component="main" className="month_report_container" maxWidth={false}>
			<CssBaseline />
			<Box className="month_report_box">
				{currentMonthRecords.map((record, i) => (
					<Accordion sx={{ width: "100%", backgroundColor: "#dfefff", boxShadow: "none", marginBottom: "10px", borderRadius: "4px" }} className="accordion_item" key={i}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
							<Typography sx={{ width: "100%", flexShrink: 0, fontWeight: "medium", fontSize: "16px" }}>Week : {record.week}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Box className="weekly_report_container">
								<Typography className="report_title report_title_des">Description :</Typography>
								<Box className="weekly_report_des">
									<Typography sx={{ fontSize: "16px", textAlign: "left" }}>
										{record.description}
									</Typography>
								</Box>
								<Typography className="report_title report_title_sol">Solution :</Typography>
								<Box className="weekly_report_sol">
									<Typography sx={{ fontSize: "16px", textAlign: "left" }}>
										{record.solutions}
									</Typography>
								</Box>
							</Box>
						</AccordionDetails>
					</Accordion>
				))}
			</Box>
		</Container>
	);
}

export default CurrentMonthReport;
