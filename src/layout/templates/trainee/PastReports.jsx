import * as React from "react";
import { Box, Container, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CssBaseline from "@mui/material/CssBaseline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
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
	}

	const getRecords = (e) =>{
		const trainee_id = getAllRecords.user_id;
		axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/record/week/${trainee_id}`).then((response) => {
			const data = response.data.records;
			const groupedByMonth = groupByMonth(data);
			setCurrentMonthRecords(groupedByMonth);
			console.log(groupedByMonth);
		});

	}

	useEffect(() => {
		getRecords();
	}, []);

    return (
		<Container component="main" className="list_container" maxWidth={false}>
			<CssBaseline />
			<Box >
				<div>
					{Object.keys(currentMonthRecords).map((month, i) => (
						<Accordion className="trainee_month_accordion_root" key={i}>
							<AccordionSummary className="trainee_month_accordion"
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography>{`Month ${month}`}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								{
									currentMonthRecords[month].map((record, i) => (
										<Box className="trainee_week" key={i}>
											<Accordion>
												<AccordionSummary>
													<Typography>{`Week ${record.week}`}</Typography>
												</AccordionSummary>
												<AccordionDetails>
												<div>
													<Typography>DESCRIPTION :</Typography>
													<Typography>{`${record.description}`}</Typography>
												</div>
												<div>
													<Typography>SOLUTION :</Typography>
													<Typography>{`${record.solutions}`}</Typography>
												</div>	
												</AccordionDetails>
											</Accordion>
										</Box>
									))
								}
							</AccordionDetails>
						</Accordion>
					))}
				</div>
			</Box>
		</Container>
	);

}

export default PastReports;