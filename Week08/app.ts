import express, { Express } from "express";
import path from "path";
import router from "./src/routes/index";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose, { Connection } from "mongoose";

// Load environment variables
dotenv.config();

// Create Express server
const app: Express = express();
const port = 3000;

// Connect to MongoDB
const mongoDB: string = "mongodb://localhost:27017/testdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db: Connection = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));

// Configure Express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
