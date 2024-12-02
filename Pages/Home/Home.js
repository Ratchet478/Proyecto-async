import "./Home.css";
import {cleanPage} from "../../utils/cleanPage.js";
import {getRandomPhoto} from "../../utils/unspash.js";

export const Home = () => {
	document.getElementById('SearchBar').style.display = 'none'
	const main = document.querySelector('main');
	main.classList.add('main');
	cleanPage(main);
	getRandomPhoto([], [], "", "", "", "", 12).then(photos => {
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