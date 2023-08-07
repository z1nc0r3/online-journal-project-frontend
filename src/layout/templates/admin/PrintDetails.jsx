import * as React from "react";
import jsPDF from "jspdf";
import { Button } from "@mui/material";
import axios from "axios";
import "jspdf-autotable";
import "../../../assets/css/main.css";

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

const PrintPDF = () => {
	const generateTraineePDF = () => {
		// Create a new jsPDF instance
		const doc = new jsPDF();

		//get trainee list
		axios.get(`${API_URL}/api/get/trainee/list`).then((response) => {
			const data = response.data;

			if (data.error) {
				console.log(data.error);
			} else {
				let y = 10;
				// Add content to the PDF
				const tableHeaders = ["ID", "Name", "Department"];

				// Define the table rows
				const tableRows = data.trainees.map((item) => [item.id, item.fName, item.department]);

				// Set the table options
				const tableOptions = {
					// eslint-disable-next-line no-undef
					startY: y + 10, // Adjust the vertical position for the table
					margin: { top: 10 },
					styles: { overflow: "linebreak" },
					headStyles: { fillColor: "#dddddd" },
					columnStyles: {
						0: { cellWidth: 15 }, // Adjust the width of the ID column
						1: { cellWidth: 50 }, // Adjust the width of the Name column
						2: { cellWidth: 50 }, // Adjust the width of the department column
					},
				};

				// Add the table to the PDF
				doc.autoTable(tableHeaders, tableRows, tableOptions);

				// Save the PDF
				doc.save("trainees.pdf");
			}
		});
	};

	const generateEvaluatorPDF = () => {
		// Create a new jsPDF instance
		const doc = new jsPDF();

		//get trainee list
		axios.get(`${API_URL}/api/get/evaluator/list`).then((response) => {
			const data = response.data;

			if (data.error) {
				console.log(data.error);
			} else {
				// Add content to the PDF
				let y = 10;

				// Add content to the PDF
				const tableHeaders = ["ID", "Name"];

				// Define the table rows
				const tableRows = data.evaluators.map((item) => [item.id, item.fName]);

				// Set the table options
				const tableOptions = {
					// eslint-disable-next-line no-undef
					startY: y + 10, // Adjust the vertical position for the table
					margin: { top: 10 },
					styles: { overflow: "linebreak" },
					headStyles: { fillColor: "#dddddd" },
					columnStyles: {
						0: { cellWidth: 15 }, // Adjust the width of the ID column
						1: { cellWidth: 50 }, // Adjust the width of the Name column
					},
				};

				// Add the table to the PDF
				doc.autoTable(tableHeaders, tableRows, tableOptions);

				// Save the PDF
				doc.save("evaluators.pdf");
			}
		});
	};

	const generateSupervisorPDF = () => {
		// Create a new jsPDF instance
		const doc = new jsPDF();

		//get trainee list
		axios.get(`${API_URL}/api/get/supervisor/list`).then((response) => {
			const data = response.data;

			if (data.error) {
				console.log(data.error);
			} else {
				// Add content to the PDF
				let y = 10;

				// Add content to the PDF
				const tableHeaders = ["ID", "Name", "EstName"];

				// Define the table rows
				const tableRows = data.supervisors.map((item) => [item.id, item.fName, item.estName]);

				// Set the table options
				const tableOptions = {
					// eslint-disable-next-line no-undef
					startY: y + 10, // Adjust the vertical position for the table
					margin: { top: 10 },
					styles: { overflow: "linebreak" },
					headStyles: { fillColor: "#dddddd" },
					columnStyles: {
						0: { cellWidth: 15 }, // Adjust the width of the ID column
						1: { cellWidth: 50 }, // Adjust the width of the Name column
						2: { cellWidth: 50 }, // Adjust the width of the department column
						3: { cellWidth: 50 }, // Adjust the width of the evaluator column
						4: { cellWidth: 50 }, // Adjust the width of the supervisor column
					},
				};

				// Add the table to the PDF
				doc.autoTable(tableHeaders, tableRows, tableOptions);

				// Save the PDF
				doc.save("supervisors.pdf");
			}
		});
	};

	return (
		<div className="print_button_container">
			<Button onClick={generateTraineePDF} variant="contained" type="submit" className="print_details_button" sx={{ width: "100%", bgcolor: "#379fff", fontSize: "16px" }}>
				Trainee Details
			</Button>
			<Button onClick={generateEvaluatorPDF} variant="contained" type="submit" className="print_details_button" sx={{ width: "100%", bgcolor: "#379fff", fontSize: "16px" }}>
				Evaluator Details
			</Button>
			<Button onClick={generateSupervisorPDF} variant="contained" type="submit" className="print_details_button" sx={{ width: "100%", bgcolor: "#379fff", fontSize: "16px" }}>
				Supervisor Details
			</Button>
		</div>
	);
};

export default PrintPDF;
