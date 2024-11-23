export class Collection {
	constructor(data) {
		this.id = data.id;
		this.title = data.title;
		this.description = data.description || "Sin descripción";
		this.coverPhoto = data.cover_photo;
		this.user = data.user;
	}

	getCoverPhotoUrl() {
		return this.coverPhoto ? this.coverPhoto.urls.regular : null;
	}

	getUserName() {
		return this.user ? this.user.name : "Usuario desconocido";
	}
}