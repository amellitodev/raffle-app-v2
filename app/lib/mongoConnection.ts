import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Invalid/Missing environment variable: MONGODB_URI");
}

// Tipado global para evitar errores en desarrollo con Next.js/Vercel
declare global {
  // eslint-disable-next-line no-var
  var mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectMongoDB = async () => {
  if (cached.conn) {
    console.log("Using existing MongoDB connection 🟢");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: "next-raffle-app",
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("Connected to MongoDB 🟢");
        return mongoose;
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to MongoDB");
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

export default connectMongoDB;