export const changeText = () => {
	const themeBtn = document.querySelector("#themeBtn");
	if (themeBtn.innerText === "☀") {
		themeBtn.innerText = "☾";
	} else {
		themeBtn.innerText = "☀";
	}
};