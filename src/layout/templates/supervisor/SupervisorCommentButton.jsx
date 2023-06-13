import React from "react";
import { Box, AccordionDetails, Typography, Button } from "@mui/material";

const SupervisorCommentButton = () => {
  const handleButtonClick = () => {
    // Code to handle button click (e.g., save functionality)
    console.log("Save button clicked");
  };

  return (
    <>
      {/* <AccordionDetails>
        <Box className="comment_box">
          <Typography>Supervisor Comment</Typography>
        </Box>
      </AccordionDetails>
      <Button
        variant="contained"
        type="submit"
        className="register_button"
        sx={{ width: "95%", bgcolor: "#379fff", fontSize: "18px" }}
        onClick={handleButtonClick}
      >
        Save
      </Button> */}
    </>
  );
};

export default SupervisorCommentButton;
