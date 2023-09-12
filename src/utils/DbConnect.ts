import { ConnectOptions } from "mongodb";
import * as mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const dbUrl = process.env.NEXT_PUBLIC_DB_URL;

if (!dbUrl) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

type global = {
  mongoose: any;
};

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  if (cached.conn) {
    console.log("Excisting database connection!");
    next();
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Creating new database connection!");

    if (dbUrl !== undefined) {
      cached.promise = mongoose
        .connect(dbUrl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as ConnectOptions)
        .then((mongoose) => {
          next();
          return mongoose;
        })
        .catch((e) => {
          console.log("Something went wrong!", e);
          res.status(502).json({ message: "Internal server error!" });
        });
    }
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
