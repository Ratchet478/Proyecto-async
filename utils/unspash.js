import {createApi} from "unsplash-js";
import {UnsplashPhoto} from "../models/UnsplashPhoto.js";

// Configuración de la API con las claves de entorno
const api = createApi({
	accessKey: import.meta.env.VITE_Unsplash_Access_key,
	secret: import.meta.env.VITE_Unsplash_Secret,
});

/**
 * Realiza una búsqueda de imágenes en la API de Unsplash.
 * @param {string} query - Tipo de imagen a buscar.
 * @param {number} [page=1] - Número de página (por defecto: 1).
 * @param {number} [pageSize=10] - Cantidad de imágenes por página (por defecto: 10). Máximo permitido: 30.
 * @param {string} [orientation=""] - Orientación de la imagen. Opciones: 'landscape', 'portrait', 'squarish'.
 * @param {string} [contentFilter="low"] - Filtro de contenido. Opciones: 'low', 'high' (por defecto: 'low').
 * @param {string} [color=""] - Color predominante de la imagen. Opciones: 'black_and_white', 'black', 'white', 'yellow', 'orange', 'red', 'purple', 'magenta', 'green', 'teal', 'blue'.
 * @param {string} [orderBy="relevant"] - Orden de las imágenes. Opciones: 'relevant', 'latest' (por defecto: 'relevant').
 * @param {string[]} [collectionIds=[]] - IDs de colecciones específicas, separadas por comas.
 * @param {string} [lang="en"] - Idioma de los resultados (BETA). Por defecto: 'en'.
 * @returns {Promise<UnsplashPhoto[]>} - Devuelve una promesa que resuelve en un array de objetos de imágenes.
 * @throws {Error} - Lanza un error si los parámetros no son válidos o la API falla.
 */
export async function searchPhotos(
	query,
	page = 1,
	pageSize = 10,
	orientation = "" || undefined,
	contentFilter = "low",
	color = "" || undefined,
	orderBy = "relevant",
	collectionIds = [],
	lang = "en"
) {
	if (!query) {
		throw new Error("El parámetro 'query' es obligatorio y debe ser un string.");
	}
	if (page <= 0) {
		throw new Error("El parámetro 'page' debe ser un número mayor que 0.");
	}
	if (pageSize <= 0 || pageSize > 30) {
		throw new Error("El parámetro 'pageSize' debe ser un número entre 1 y 30.");
	}

	try {
		const response = await api.search.getPhotos({
			query,
			page,
			perPage: pageSize,
			orientation,
			contentFilter,
			color,
			orderBy,
			collections: collectionIds.length ? collectionIds.join(",") : undefined,
			lang,
		});
		if (response.type === "success") {
			// Accede a la propiedad 'response' que contiene los resultados
			return response.response.results.map((photoData) => new UnsplashPhoto(photoData));
		} else {
			// Maneja el error si la solicitud falló
			console.error("Error en la solicitud:", response.errors);
			throw new Error("No se pudieron obtener las fotos.");
		}
	} catch (error) {
		console.error("Error al buscar imágenes:", error);
		throw error;
	}
}

/**
 * Obtiene la información de una imagen específica por su ID.
 * @param {string} id - Identificador único de la imagen.
 * @returns {Promise<Object>} - Devuelve una promesa que resuelve en un objeto de imagen.
 * @throws {Error} - Lanza un error si el ID no es válido o la API falla.
 */
export async function getPhotoById(id) {
	if (!id || typeof id !== "string") {
		throw new Error("El parámetro 'id' es obligatorio y debe ser un string.");
	}

	try {
		const response = await api.photos.get({photoId: id});
		return new UnsplashPhoto(response.response);
	} catch (error) {
		console.error("Error al obtener la imagen:", error);
		throw error;
	}
}

/**
 * Obtiene las colecciones populares de Unsplash.
 * @param {number} [page=1] - Número de página (por defecto: 1).
 * @param {number} [pageSize=10] - Cantidad de colecciones por página (por defecto: 10). Máximo permitido: 30.
 * @returns {Promise<Object[]>} - Devuelve una promesa que resuelve en un array de colecciones.
 * @throws {Error} - Lanza un error si la API falla.
 */
export async function getCollections(page = 1, pageSize = 10) {
	if (page <= 0) {
		throw new Error("El parámetro 'page' debe ser un número mayor que 0.");
	}
	if (pageSize <= 0 || pageSize > 30) {
		throw new Error("El parámetro 'pageSize' debe ser un número entre 1 y 30.");
	}

	try {
		const response = await api.collections.list({page, perPage: pageSize});
		return response.response.results.map((CollectionData) => new Collection(CollectionData));
	} catch (error) {
		console.error("Error al obtener colecciones:", error);
		throw error;
	}
}

/**
 * Obtiene las fotos de una colección específica.
 * @param {string} collectionId - ID de la colección.
 * @param {number} [page=1] - Número de página (por defecto: 1).
 * @param {number} [pageSize=10] - Cantidad de fotos por página (por defecto: 10). Máximo permitido: 30.
 * @returns {Promise<UnsplashPhoto[]>} - Devuelve una promesa que resuelve en un array de objetos de imágenes.
 * @throws {Error} - Lanza un error si los parámetros no son válidos o la API falla.
 */
export async function getPhotosByCollection(collectionId, page = 1, pageSize = 10) {
	if (!collectionId || typeof collectionId !== "string") {
		throw new Error("El parámetro 'collectionId' es obligatorio y debe ser un string.");
	}
	if (typeof page !== "number" || page <= 0) {
		throw new Error("El parámetro 'page' debe ser un número mayor que 0.");
	}
	if (typeof pageSize !== "number" || pageSize <= 0 || pageSize > 30) {
		throw new Error("El parámetro 'pageSize' debe ser un número entre 1 y 30.");
	}

	try {
		let respuesta = api.collections.getPhotos({
			collectionId,
			page,
			perPage: pageSize,
		});
		return (await respuesta).response.results.map((photoData) => new UnsplashPhoto(photoData));
	} catch (error) {
		console.error("Error al obtener fotos de la colección:", error);
		throw error;
	}
}

/**
 * Obtiene una o varias fotos aleatorias de la API de Unsplash.
 * @param {string[]} [collections=[]] - IDs de colecciones públicas para filtrar la selección. Separadas por comas.
 * @param {string[]} [topics=[]] - IDs de temas públicos para filtrar la selección. Separadas por comas.
 * @param {string} [username=""] - Limita la selección a un usuario específico.
 * @param {string} [query=""] - Filtra la selección a fotos que coincidan con un término de búsqueda.
 * @param {string} [orientation=""] - Filtra por orientación de la foto. Opciones: 'landscape', 'portrait', 'squarish'.
 * @param {string} [contentFilter="low"] - Filtra resultados según el nivel de seguridad de contenido. Opciones: 'low', 'high'.
 * @param {number} [count=1] - Número de fotos a devolver. Por defecto: 1. Máximo: 30.
 * @returns {Promise<Object[]>} - Devuelve una promesa que resuelve en un array de objetos con información de las fotos.
 * @throws {Error} - Lanza un error si los parámetros no son válidos o la API falla.
 */
export async function getRandomPhoto(
	collections = [],
	topics = [],
	username = "",
	query = "",
	orientation = "",
	contentFilter = "low",
	count = 1
) {
	if (typeof count !== "number" || count <= 0 || count > 30) {
		throw new Error("El parámetro 'count' debe ser un número entre 1 y 30.");
	}

	try {
		const response = await api.photos.getRandom({
			collections: collections.length ? collections.join(",") : undefined,
			topics: topics.length ? topics.join(",") : undefined,
			username: username || undefined,
			query: query || undefined,
			orientation: orientation || undefined,
			content_filter: contentFilter,
			count,
		});
		// Si count > 1, Unsplash devuelve un array; si count === 1, devuelve un solo objeto.
		let fotos = Array.isArray(response.response) ? response.response : [response.response];
		return fotos.map((foto) => new UnsplashPhoto(foto));
	} catch (error) {
		console.error("Error al obtener fotos aleatorias:", error);
		throw error;
	}
}

