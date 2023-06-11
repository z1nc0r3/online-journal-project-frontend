import * as React from "react";
import "../../../assets/css/list.css";
import { Box, Container, Button, colors } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CssBaseline from "@mui/material/CssBaseline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Link } from "react-router-dom";

function TraineeList() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container component="main" className="list_container" maxWidth={false}>
      <CssBaseline />

      <Box className="list_box">
        <Accordion sx={{ width: "100%", backgroundColor: "#dfefff", boxShadow: "none" }}>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>01</Typography> 
            <Typography sx={{ width: "75%", flexShrink: 0, fontWeight: "medium", fontSize: "18px" }}>
                Student Name 
            </Typography>
            <Typography>Registration no</Typography> 
          </AccordionSummary>
        </Accordion>
      </Box>
    </Container>
  );
}

export default TraineeList;
