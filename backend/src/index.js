import dotenv from "dotenv";
import mysql from "mysql";
import ApiError from "./utils/ApiErrors.js";
import { app } from "./app.js";
import { connection } from "./db/index.js";


const port = process.env.PORT || 4000;

dotenv.config({
  path: "./.env",
});

connection.connect((err) => {
  if (err) throw new ApiError(500, "DB ERROR::Connection to Database failed.");
  console.log("Connected to the database as ID " + connection.threadId);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});