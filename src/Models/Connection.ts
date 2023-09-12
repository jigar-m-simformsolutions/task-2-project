import mongoose from "mongoose";

export default async function connectToDB() {
  try {
    const conn = await mongoose.connect(
      process.env.NEXT_PUBLIC_DB_URL as string
    );
    if (conn.connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
