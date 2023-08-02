import Cookies from "js-cookie";

const UserVerification = () => {
	return new Promise((resolve) => {
		const authorized = Cookies.get("authorized");

		if (authorized === "false") {
			window.location.href = "/login";
			resolve(false);
		} else {
			resolve(true);
		}
	});
};

export default UserVerification;
