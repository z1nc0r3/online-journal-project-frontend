import * as React from "react";
import { Box, Container, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CssBaseline from "@mui/material/CssBaseline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import "../../../assets/css/list.css";
import { useState, useEffect } from "react";
import axios from "axios";


function CurrentMonthReport() {
	const [getMonthRecords, setGetMonthRecords] = useState({
		user_id: localStorage.getItem("user_id"),
		month: new Date().getMonth() + 1,
		year: new Date().getFullYear(),
	});
	const [currentMonthRecords, setCurrentMonthRecords] = useState([]);

	

	const getRecords = (e) => {
		const { user_id, month, year } = getMonthRecords;
		axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/record/currentMonth/week/${user_id}?month=${month}&year=${year}`).then((response) => {
			const data = response.data.records;
			setCurrentMonthRecords(data);
			console.log(currentMonthRecords);
		});
	}

	useEffect(() => {
		getRecords();
		
	}, []);

    return (
		<Container component="main" className="list_container" maxWidth={false}>
			<CssBaseline />
			<Box>
				<Accordion className="trainee_month_accordion_root">
					<AccordionSummary className="trainee_month_accordion"
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography>Month {getMonthRecords.month}</Typography>
					</AccordionSummary>
					<AccordionDetails>	
					{
						currentMonthRecords.map((record, i) => (
							<Box className="trainee_week" key={i}>
								<Accordion>
									<AccordionSummary>
										<Typography>{`Week ${record.week}`}</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Typography>DESCRIPTION :</Typography>
										<Typography>{`${record.description}`}</Typography>
										<Typography>SOLUTION :</Typography>
										<Typography>{`${record.solutions}`}</Typography>
									</AccordionDetails>
								</Accordion>
							</Box>
						))
					}

					</AccordionDetails>
				</Accordion>
			</Box>
		</Container>
	);

}

export default CurrentMonthReport;