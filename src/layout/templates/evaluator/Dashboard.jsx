import * as React from "react";
import "../../../assets/css/list.css";
import { Box, Container, Button, colors } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import axios from "axios";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CssBaseline from "@mui/material/CssBaseline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import "../../../assets/css/list.css";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Link } from "react-router-dom";

function Dashboard() {
	const [expandedStudent, setExpandedStudent] = React.useState(false);
	const [expandedMonth, setExpandedMonth] = React.useState("");
  
	const handleStudentChange = (panel) => (event, isExpanded) => {
	  setExpandedStudent(isExpanded ? panel : false);
	};
  
	const handleMonthChange = (panel) => (event, isExpanded) => {
	  setExpandedMonth(isExpanded ? panel : "");
	};
  
	return (
	 <Container component="main" className="list_container" maxWidth={false}>
		<CssBaseline />
  
		<Box className="list_box">
		<Accordion expanded={expandedStudent} onChange={handleStudentChange("panel")} sx={{width: "100%",backgroundColor: "#dfefff",boxShadow: "none",}}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
			  <Typography sx={{ width: "75%", flexShrink: 0, fontWeight: "medium", fontSize: "18px" }}>Student Name</Typography>
			</AccordionSummary>
              <AccordionDetails>
				{Array.from({length: 5}, (_, i) => (
					<Box  sx={{ width: "100%", backgroundColor: "#79bcfc", boxShadow: "none", marginBottom: "10px", borderRadius: "4px" }}> 
					    <Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="month1-content" id="month1-header">
								<Typography sx={{ fontWeight: "bold", textAlign: "center", color: "#414141",paddingLeft: 0.5 }}>{`Month ${i+1}`}</Typography>
							</AccordionSummary>

						    <AccordionDetails>
								{Array.from({length: 4}, (_, i) => (
									<Box sx={{ width: "100%", backgroundColor: "#319fd6", boxShadow: "none", marginBottom: "10px", borderRadius: "4px" }}>
										<Accordion sx={{ width: "100%", backgroundColor: "#b2d9fe", boxShadow: "none", marginBottom: "10px", borderRadius: "4px" }} >
											<AccordionSummary>
											<Typography sx={{ width: "100%", flexShrink: 0, fontWeight: "medium", fontSize: "16px" }}>{`Week ${i+1}`}</Typography>
											</AccordionSummary>
											<AccordionDetails  >
												<Box className="weekly_report_container">
													<Typography className="report_title report_title_des">Description :</Typography>
													<Box className="weekly_report_des">
													<Typography sx={{ fontSize: "16px", textAlign: "left" }}></Typography>
													</Box>
												</Box>
											</AccordionDetails>
										</Accordion>
									</Box>
									
								))}

								<Box>
								<Accordion sx={{width: "100%",backgroundColor: "#078be8",boxShadow: "none",}}>
									<AccordionSummary>
									<Typography>Supervisor Report</Typography>
									</AccordionSummary>
								</Accordion>
								</Box>

							</AccordionDetails>
						</Accordion>
					</Box>
					
                ))}
              </AccordionDetails>
					<Box sx={{ width: "100%", backgroundColor: "#9dd0ff", boxShadow: "none", marginBottom: "10px", borderRadius: "4px" }}>
					  <Accordion sx={{width: "100%",backgroundColor: "#078be8",boxShadow: "none",}}>
					     <AccordionSummary>
					       <Typography>Evaluator Report</Typography>
					     </AccordionSummary>
					    <AccordionDetails>
					      <textarea id="w3review" name="w3review" rows="15" cols="75"></textarea>
					      <Button variant="contained" type="submit" className="register_button" sx={{ width: "89%", bgcolor: "#379fff", fontSize: "16px" }}>Save</Button>
					    </AccordionDetails>
					   </Accordion>
					</Box>
		</Accordion>
	    </Box>
	 </Container>
	);
}

export default Dashboard;