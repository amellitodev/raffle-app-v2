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

	// 🔥 MODIFICACIÓN CLAVE: Manejar build time y falta de URI
	if (!MONGODB_URI) {
		// Si estamos en build time de Next.js
		if (process.env.NEXT_PHASE === 'phase-production-build') {
			console.log('Build time - MONGODB_URI not defined, returning null connection');
			// Retornar un mock de conexión para evitar errores durante build
			return {
				connection: { readyState: 0 },
				model: () => ({ find: () => [], findOne: () => null }),
				connect: () => Promise.resolve(this),
				disconnect: () => Promise.resolve()
			} as any;
		}
		
		// Solo lanzar error si no estamos en build time
		throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
	}

	// Si ya hay una conexión, devolverla
	if (cached.conn) {
		return cached.conn;
	}
	
	// Si no hay promesa pendiente, crear una nueva
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
		// 🔥 MODIFICACIÓN: Mejor manejo de errores
		console.error("MongoDB connection error:", e);
		
		// Si estamos en build time, no lanzar error
		if (process.env.NEXT_PHASE === 'phase-production-build') {
			console.log('Build time - returning mock connection due to MongoDB error');
			return {
				connection: { readyState: 0 },
				model: () => ({ find: () => [], findOne: () => null }),
				connect: () => Promise.resolve(this),
				disconnect: () => Promise.resolve()
			} as any;
		}
		
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