import * as React from "react";
import jsPDF from "jspdf";
import { Button } from "@mui/material";
import axios from "axios";
import "jspdf-autotable";
import "../../../assets/css/main.css";

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

const PrintPDF = () => {
	const generateTraineePDF = () => {
		const doc = new jsPDF();

		//get trainee list
		axios.get(`${API_URL}/api/get/trainee/list`).then((response) => {
			const data = response.data;

			if (data.error) {
				console.log(data.error);
			} else {
				let y = 10;
				const tableHeaders = ["ID", "Name", "Department"];
				const tableRows = data.trainees.map((item) => [item.id, item.fName, item.department]);

				const tableOptions = {
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

				doc.autoTable(tableHeaders, tableRows, tableOptions);
				doc.save("trainees.pdf");
			}
		});
	};

	const generateEvaluatorPDF = () => {
		const doc = new jsPDF();

		//get trainee list
		axios.get(`${API_URL}/api/get/evaluator/list`).then((response) => {
			const data = response.data;

			if (data.error) {
				console.log(data.error);
			} else {
				let y = 10;
				const tableHeaders = ["ID", "Name"];
				const tableRows = data.evaluators.map((item) => [item.id, item.fName]);

				const tableOptions = {
					startY: y + 10,
					margin: { top: 10 },
					styles: { overflow: "linebreak" },
					headStyles: { fillColor: "#dddddd" },
					columnStyles: {
						0: { cellWidth: 15 }, // Adjust the width of the ID column
						1: { cellWidth: 50 }, // Adjust the width of the Name column
					},
				};

				doc.autoTable(tableHeaders, tableRows, tableOptions);
				doc.save("evaluators.pdf");
			}
		});
	};

	const generateSupervisorPDF = () => {
		const doc = new jsPDF();

		//get trainee list
		axios.get(`${API_URL}/api/get/supervisor/list`).then((response) => {
			const data = response.data;

			if (data.error) {
				console.log(data.error);
			} else {
				let y = 10;
				const tableHeaders = ["ID", "Name", "EstName"];
				const tableRows = data.supervisors.map((item) => [item.id, item.fName, item.estName]);

				const tableOptions = {
					startY: y + 10,
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

				doc.autoTable(tableHeaders, tableRows, tableOptions);
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