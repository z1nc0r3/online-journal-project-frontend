import * as React from "react";
import "../../../assets/css/list.css";
import { Box, Container, Button, colors } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";



function Dashboard() {
	const [recordData, setRecordData] = useState({
		discription: "",
		prob_and_sol: "",
		week: "",
		month: "",
		year: "",
	});
	

	const getRecords = (event) => {
		axios.get("http://127.0.0.1:8000/api/record/week").then((response) => {
			const data = response.data;

			if (data.login_error) {
				console.log("error");
				console.log(response.data);

			} else {
				console.log(data);

				// setRecords(data.evaluators);
			}
		});
	};

	const handleSubmitRecord = (event) =>{
		// recordData.discription = 'no description';
		// recordData.prob_and_sol = 'no problem';
		recordData.week = '02';
		recordData.month = 'july';
		recordData.year = '2023';

		console.log(recordData);

		axios.post("http://127.0.0.1:8000/api/addRecord/week", recordData).then((response) => {
				toast.success("New User Created Successfully. Redirecting...");
				setTimeout(() => {
					window.location.href = 'trianee'; // Replace "new-page-url" with your desired URL
				}, 3000); // 3 seconds delay before redirecting
			})
			.catch((error) => {
				toast.error("Error submitting the form." + error.response.data.message);
			});


	}

	useEffect(() => {
		getRecords();
	}, []);


    return (
		<Container component="main" className="list_container" maxWidth={false}>
			<CssBaseline />
			<Box className="trainee_box">
				<form onSubmit={handleSubmitRecord}>
					<Box>
						<h1 className="trainee_box_heading">Brief Description of work carried out :</h1>
						<Box className="trainee_box_description" variant="outlined">
							<Typography variant="body1" className="trainee_box_description_text">
								<TextField multiline rows={6}  variant="outlined" required fullWidth name="discri" type="text" value={recordData.discription} placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus exercitationem omnis fuga ipsa reprehenderit repellendus, nam sunt voluptatibus illo perferendis at aspernatur enim praesentium ea ut recusandae minima delectus cumque perspiciatis, molestias nemo accusamus! Culpa accusamus aspernatur, alias aliquam consectetur consequatur soluta enim obcaecati molestiae repellat, natus quod optio distinctio!" />
							</Typography>
						</Box>
					</Box>
					<Box>
						<h1 className="trainee_box_heading">Problems Encountered and Solutions Found :</h1>
						<Box variant="outlined" className="trainee_box_description" >
							<Typography variant="body1" className="trainee_box_description_text">
								<TextField multiline rows={3}  variant="outlined" required fullWidth name="prob_and_sol" type="text" value={recordData.prob_and_sol} placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus exercitationem omnis fuga ipsa reprehenderit repellendus, nam sunt voluptatibus illo perferendis at aspernatur enim praesentium ea ut recusandae minima delectus cumque perspiciatis, molestias nemo accusamus! Culpa accusamus aspernatur, alias aliquam consectetur consequatur soluta enim obcaecati molestiae repellat, natus quod optio distinctio!" />
							</Typography>
						</Box>
					</Box>
					<Box className="traine_submission_box">
						<Button variant="contained" className="save_button_trianee" type="submit">Contained</Button>
						<Checkbox/>
						<Typography className="agreement_trainee_submission" variant="body1" sx={{  color: 'white', marginTop: '23px' }}>
						I hereby declare that all the information contained in this report is truth and correct. I take full responsibility for the correctness of the said information.
						</Typography>

					</Box>
				</form>
			</Box>
		</Container>
	);

}

export default Dashboard;