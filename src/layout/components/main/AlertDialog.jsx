import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "../../../assets/css/main.css";

class AlertDialog extends React.Component {
	render() {
		const { open, onClose, onAgree, onDisagree, title, description, sub_description="", agreeText, disagreeText } = this.props;

		// blur out the background root element when the dialog is open
		if (open) {
			document.querySelector("#root").classList.add("blur");
		} else {
			document.querySelector("#root").classList.remove("blur");
		}

		return (
			<Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
				<DialogContent>
					<DialogContentText className="alert-dialog-des" id="alert-dialog-description">{description}</DialogContentText>
					<DialogContentText className="alert-dialog-subdes" id="alert-dialog-description">{sub_description}</DialogContentText>
				</DialogContent>
				<DialogActions className="alert_actions">
					<Button onClick={onDisagree} color="primary" className="alert_disagree" autoFocus>
						{disagreeText}
					</Button>
					<Button onClick={onAgree} color="primary" className="alert_agree">
						{agreeText}
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default AlertDialog;
