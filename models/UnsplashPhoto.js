export class UnsplashPhoto {
	id;
	description;
	user;
	location;
	urls;

	constructor(data) {
		this.id = data.id;
		this.description = data.description;
		this.urls = data.urls;
		this.user = data.user;
		this.location = data.location ? `${data.location.city}, ${data.location.country}` : "Ubicación desconocida";
		this.colors = data.colors ? data.colors : "";
	}

	getRegularImageUrl() {
		return this.urls.regular;
	}

	getUserInfo() {
		return {
			name: this.user.name,
			profileUrl: this.user.links.html
		}
	}

	getPhotoDescription() {
		return this.description;
	}

	getPhotoColor() {
		return this.colors
	}
}