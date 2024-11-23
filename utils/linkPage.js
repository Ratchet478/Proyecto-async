export const linkPage = (id, page) => {
	const link = document.querySelector(id);
	link.addEventListener("click", (event) => {
		event.preventDefault()
		document.querySelector("main").innerHTML = '';
		page()
	});
};