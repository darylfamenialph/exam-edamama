import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const mongooseConnection = (onCloud: boolean): mongoose.Connection => {
  mongoose.connect(
    `mongodb${onCloud && "+srv"}://${process.env.MONGO_DB_USER}:${
      process.env.MONGO_DB_PASSWORD
    }@${process.env.MONGO_DB_HOST}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  return mongoose.connection;
};
