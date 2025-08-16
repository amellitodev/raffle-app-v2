import mongoose from "mongoose";
declare global {
	var mongoose: {
		conn: typeof import("mongoose") | null;
		promise: Promise<typeof import("mongoose")> | null;
	};
}

// Propósito: Permite extender el objeto global de Node.js para guardar el estado de la conexión.
// Tipado:
// conn: almacena la conexión activa (tipo igual a lo que exporta mongoose, generalmente el objeto mongoose).
// promise: almacena la promesa pendiente de la conexión, para evitar múltiples conexiones simultáneas.
// Ventaja: Así, si el código se recarga (como hace Next.js en desarrollo o serverless), no se crean nuevas conexiones cada vez.


let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

// Busca en el objeto global si ya existe una caché para la conexión.
// Si no existe, la crea.

async function dbConnect() {
	const MONGODB_URI = process.env.MONGODB_URI!;

	if (!MONGODB_URI) {
		throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
	}

	if (cached.conn) {
		return cached.conn;
	}
	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};
		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
			return mongoose;
		});
	}
	try {
		cached.conn = await cached.promise;
		console.log("MongoDB connected successfully 🟢");
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	return cached.conn;
}

// ¿Qué hace cada parte?

// Lee el URI de conexión del entorno.
// Si ya hay una conexión (cached.conn), la devuelve inmediatamente.
// Si no hay promesa pendiente (cached.promise), crea una nueva promesa con mongoose.connect().
// Espera que la promesa se resuelva y guarda la conexión en cached.conn.
// Si ocurre un error, limpia la promesa y relanza el error.
// Devuelve la conexión activa.


export default dbConnect;




//  TIPADO EXPLICADO
// global.mongoose:
// Es un objeto con dos propiedades:

// conn: typeof import("mongoose") | null
// → Es la instancia de mongoose (la conexión) o null.
// promise: Promise<typeof import("mongoose")> | null
// → Es la promesa de conexión (mientras se está conectando), o null.
// typeof import("mongoose"):
// Se refiere al tipo de lo que exporta mongoose (el objeto principal de la librería).
// Así, la conexión tiene el tipado correcto y puedes acceder a sus métodos (model, connection, etc.).

// ¿Por qué se usa así en Next.js?
// Porque Next.js (y Vercel) puede recargar el proceso muchas veces en desarrollo o serverless, y sin este patrón crearías muchas conexiones a MongoDB, causando errores y bloqueos.

// Resumen
// Evita conexiones duplicadas.
// Funciona en serverless.
// Tipado seguro y explícito para TypeScript.
