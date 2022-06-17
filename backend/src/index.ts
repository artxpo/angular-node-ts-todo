import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import todoRoutes from "./routes";

dotenv.config();

if (!process.env.PORT) {
  console.log(`Error to get ports`);
  process.exit(1);
}

if (!process.env.MONGO) {
  console.log(`Error to get MONGO uri`);
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(todoRoutes);

mongoose.connect(process.env.MONGO, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Connecting to MONGO`);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
