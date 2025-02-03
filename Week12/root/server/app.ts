import express, { Express } from 'express';
import router from "./src/index";
import mongoose, { Connection } from 'mongoose';
import morgan from 'morgan';

// Create Express server
const app: Express = express();
const port = 1234;

// Connect to MongoDB
const mongoUrl = 'mongodb://localhost:27017/testdb';
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;
const db: Connection = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Primary app routes
app.use("/", router);

// Start Express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
