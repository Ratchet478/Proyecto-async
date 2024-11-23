import {changeText} from "./changeText.js";

export const changeTheme = () => {
	const themebtn = document.querySelector('#themeBtn');

	themebtn.addEventListener('click', () => {
		if (!document.body.classList.contains('dark') && !document.body.classList.contains('light')) {
			const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			document.body.classList.add(theme);
		}
		document.body.classList.toggle('dark');
		document.body.classList.toggle('light');
		changeText()
	})
}