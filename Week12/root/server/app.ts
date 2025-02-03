import express, { Express, Request, Response } from 'express';
import router from "./src/index";
import mongoose, { Connection } from 'mongoose';
import morgan from 'morgan';
import cors, { CorsOptions } from 'cors';
import path from 'path';

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
app.use("/api", router);

// Cors configuration for development
if (process.env.NODE_ENV === 'development') {
  const corsOptions: CorsOptions = {
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions));
} else if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('../..', 'client', 'build')));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve('../..', 'client', 'build', 'index.html'));
  });
}


// Start Express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
