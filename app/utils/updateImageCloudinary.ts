"use server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadsFolder = process.env.CLOUDINARY_UPLOADS_FOLDER;

export async function uploadAuthImageCloudinary(file: File | null) {
	try {
		// validaciones
		const maxSize = 10 * 1024 * 1024; // 10MG

		if (!file) {
			throw new Error("No se encontró el archivo de comprobante de pago");
		}

		if (file.size > maxSize) {
			throw new Error("El archivo es demasiado grande. Máximo 10MB");
		}

		if (file.type !== "image/jpeg" && file.type !== "image/png") {
			throw new Error("Solo se permiten imágenes en formato JPEG o PNG");
		}

		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		const uploadResult = await new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream(
					{
						resource_type: "image",
						folder: uploadsFolder,
						quality: "auto:good",
						type: "authenticated",
					},
					(error, result) => {
						if (error || !result) {
							reject(error);
						} else {
							resolve(result);
						}
					}
				)
				.end(buffer);
		});
		const { public_id } = uploadResult as { public_id: string };
		console.log("🚀 ~ updateImageCloudinary ~ public_id:", public_id);
		return public_id;
	} catch (error) {
		console.error("Error al subir la imagen a Cloudinary:", error);
		throw new Error("Error al subir la imagen a Cloudinary");
	}
}

export async function uploadImageCloudinary(file: File | null) {
	try {
		// validaciones
		const maxSize = 10 * 1024 * 1024; // 10MG

		if (!file) {
			throw new Error("No se encontró el archivo de comprobante de pago");
		}

		if (file.size > maxSize) {
			throw new Error("El archivo es demasiado grande. Máximo 10MB");
		}

		if (file.type !== "image/jpeg" && file.type !== "image/png") {
			throw new Error("Solo se permiten imágenes en formato JPEG o PNG");
		}

		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		const uploadResult = await new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream(
					{
						resource_type: "image",
						folder: uploadsFolder,
						quality: "auto:good",
					},
					(error, result) => {
						if (error || !result) {
							reject(error);
						} else {
							resolve(result);
						}
					}
				)
				.end(buffer);
		});
		const { secure_url } = uploadResult as { secure_url: string };
		console.log("🚀 ~ updateImageCloudinary ~ secure_url:", secure_url);
		return secure_url;
	} catch (error) {
		console.error("Error al subir la imagen a Cloudinary:", error);
		throw new Error("Error al subir la imagen a Cloudinary");
	}
}

export async function getSignedUrl(publicId: string) {
	return cloudinary.url(publicId, {
		type: "authenticated",
		sign_url: true,
		expires_at: Math.floor(Date.now() / 1000) + 600, // 10 minutos
		secure: true,
	});
}
