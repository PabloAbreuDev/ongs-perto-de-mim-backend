import mongoose from "mongoose";
import config from "../config";

const mongooseLoader = async () => {
  try {
    await mongoose.connect(config.database_url || "");
    console.log("Mongoose conectado");
  } catch (err: any) {
    throw Error(err);
  }
};

export default mongooseLoader;
