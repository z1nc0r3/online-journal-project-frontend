const UserVerification = () => {
	return new Promise((resolve) => {
		const authorized = localStorage.getItem("authorized");

		if (authorized === "false") {
			window.location.href = "/login";
			resolve(false);
		} else {
			resolve(true);
		}
	});
};

export default UserVerification;
