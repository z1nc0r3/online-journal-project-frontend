import * as React from "react";
import { Box, Container } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CssBaseline from "@mui/material/CssBaseline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import "../../../assets/css/list.css";
import "../../../assets/css/list.css";
import { useState, useEffect } from "react";
import axios from "axios";

function PastReports() {
	const [getAllRecords, setGetAllRecords] = useState({
		user_id: localStorage.getItem("user_id"),
		month: new Date().getMonth() + 1,
		year: new Date().getFullYear(),
	});

	const [currentMonthRecords, setCurrentMonthRecords] = useState([]);

	const groupByMonth = (records) => {
		return records.reduce((grouped, record) => {
			(grouped[record.month] = grouped[record.month] || []).push(record);
			return grouped;
		}, {});
	};

	const getRecords = (e) => {
		const trainee_id = getAllRecords.user_id;
		axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/record/week/${trainee_id}`).then((response) => {
			const data = response.data.records;
			const groupedByMonth = groupByMonth(data);
			setCurrentMonthRecords(groupedByMonth);
			console.log(groupedByMonth);
		});
	};

	useEffect(() => {
		getRecords();
	}, []);

	const getMonthName = (monthNumber) => {
		const date = new Date();
		date.setMonth(monthNumber - 1);

		return date.toLocaleString("en-US", {
			month: "long",
		});
	};

	return (
		<Container component="main" className="month_report_container" maxWidth={false}>
			<CssBaseline />
			<div>
				{Object.keys(currentMonthRecords).map((month, i) => (
					<Accordion className="month_item" key={i}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
							<Typography sx={{ fontWeight: "bold", textAlign: "center", color: "#414141", paddingLeft: 0.5 }}>{`${getMonthName(month)}`}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							{currentMonthRecords[month].map((record, i) => (
								<Accordion sx={{ width: "100%", backgroundColor: "#9dd0ff", boxShadow: "none", marginBottom: "10px", borderRadius: "4px" }} className="accordion_item">
									<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
										<Typography sx={{ width: "100%", flexShrink: 0, fontWeight: "medium", fontSize: "16px" }}>Week : {record.week}</Typography>
									</AccordionSummary>
									<AccordionDetails className="report_detail_container">
										<Box className="weekly_report_container">
											<Typography className="report_title report_title_des">Description :</Typography>
											<Box className="weekly_report_des">
												<Typography sx={{ fontSize: "16px", textAlign: "left" }}>{record.description}</Typography>
											</Box>
											<Typography className="report_title report_title_sol">Solution :</Typography>
											<Box className="weekly_report_sol">
												<Typography sx={{ fontSize: "16px", textAlign: "left" }}>{record.solutions}</Typography>
											</Box>
										</Box>
									</AccordionDetails>
								</Accordion>
							))}
						</AccordionDetails>
					</Accordion>
				))}
			</div>
		</Container>
	);
}

export default PastReports;