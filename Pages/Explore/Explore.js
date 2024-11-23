import './Explore.css'
import {cleanPage} from "../../utils/cleanPage.js";
import {debounce} from "../../utils/debounce.js";
import {searchPhotos} from "../../utils/unspash.js";


export function Explore() {
	const main = document.querySelector('main');
	cleanPage(main);
	let search = document.getElementById('SearchBar');
	search.style.display = 'block';
	let input = document.getElementById('SearchInput')
	let valor = "";
	const pageSize = document.getElementById("pageSize");
	const orientacion = document.getElementById("orientation");
	const contentFilter = document.getElementById("contentFilter");
	const color = document.getElementById("color");
	const orderBy = document.getElementById("orderBy");
	input.addEventListener('input', debounce(() => {
		valor = input.value.toString();
		console.log(color.value);
		main.innerHTML = '';
		if (valor.length > 0) {
			searchPhotos(valor, 1, pageSize.value, orientacion.value, contentFilter.value, color.value, orderBy.value).then(photos => {
				photos.forEach(photo => {
					let carta = document.createElement("div");
					let img = document.createElement("img");
					img.alt = `${photo.getPhotoDescription()} icon`;
					img.src = photo.getRegularImageUrl()
					carta.appendChild(img);
					main.append(carta);

				})
			})
		}
	}, 200));

	pageSize.addEventListener('change', debounce(() => {
		input.dispatchEvent(new Event('input'));
	}, 200));

	// Puedes hacer lo mismo para los otros filtros
	orientacion.addEventListener('change', debounce(() => {
		input.dispatchEvent(new Event('input'));
	}, 200));

	contentFilter.addEventListener('change', debounce(() => {
		input.dispatchEvent(new Event('input'));
	}, 200));

	color.addEventListener('change', debounce(() => {
		input.dispatchEvent(new Event('input'));
	}, 200));

	orderBy.addEventListener('change', debounce(() => {
		input.dispatchEvent(new Event('input'));
	}, 200));

}