import express, { Express } from "express";
import path from "path";
import router from "./src/index";
import morgan from "morgan";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create Express server
const app: Express = express();
const port = 3000;

// Configure Express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
