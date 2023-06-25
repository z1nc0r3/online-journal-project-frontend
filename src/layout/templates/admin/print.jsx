import * as React from "react";
import jsPDF from 'jspdf';
import { Button } from '@mui/material';
import axios from "axios";
import { useState, useEffect } from "react";



const PrintPDF = () => {	
    const generateTraineePDF = () => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        //get trainee list
        axios.get("http://127.0.0.1:8000/api/get/trainee/list").then((response) => {
			const data = response.data;

			if (data.login_error) {
				console.log("error");
			} else {
                console.log(data.trainees);
				// Add content to the PDF
                let y = 10;

                // Add data to the PDF
                data.trainees.forEach((item) => {
                  doc.text(`Name: ${item.fName}     Department: ${item.department}`,5, y);
                  y += 5; // Adjust the vertical position for the next item
                });
              
                // Save the PDF
                doc.save('trainees.pdf');
			}
		});
      
        
      };
      
      const generateEvaluatorPDF = () => {
         // Create a new jsPDF instance
         const doc = new jsPDF();

         //get trainee list
         axios.get("http://127.0.0.1:8000/api/get/evaluator/list").then((response) => {
             const data = response.data;
 
             if (data.login_error) {
                 console.log("error");
             } else {
                 console.log(data.evaluators);
                 // Add content to the PDF
                 let y = 10;
 
                 // Add data to the PDF
                 data.evaluators.forEach((item) => {
                   doc.text(`ID: ${item.id}     Name: ${item.fName}`,5, y);
                   y += 5; // Adjust the vertical position for the next item
                 });
               
                 // Save the PDF
                 doc.save('evaluators.pdf');
             }
         });
      };

      const generateSupervisorPDF = () => {
         // Create a new jsPDF instance
         const doc = new jsPDF();

         //get trainee list
         axios.get("http://127.0.0.1:8000/api/get/supervisor/list").then((response) => {
             const data = response.data;
 
             if (data.login_error) {
                 console.log("error");
             } else {
                 console.log(data.supervisors);
                 // Add content to the PDF
                 let y = 10;
 
                 // Add data to the PDF
                 data.supervisors.forEach((item) => {
                   doc.text(`ID: ${item.id}     Name: ${item.fName}     Estate: ${item.estName}`,5, y);
                   y += 5; // Adjust the vertical position for the next item
                 });
               
                 // Save the PDF
                 doc.save('supervisors.pdf');
             }
         });
      };


      return(
        <div>
            <Button onClick={generateTraineePDF} variant="contained" type="submit" className="register_button" sx={{ width: "100%", bgcolor: "#379fff", fontSize: "16px", }}>
                Print Trainee list
            </Button>
            <Button onClick={generateEvaluatorPDF} variant="contained" type="submit" className="register_button" sx={{ width: "100%", bgcolor: "#379fff", fontSize: "16px", }}>
                Print Evaluator list
            </Button>
            <Button onClick={generateSupervisorPDF} variant="contained" type="submit" className="register_button" sx={{ width: "100%", bgcolor: "#379fff", fontSize: "16px", }}>
                Print Supervisor list
            </Button>
        </div>
      );

}
export default PrintPDF;
