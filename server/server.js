import "express-async-errors";
import express, { urlencoded } from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";

const app = express();

const REACT_BUILD_DIR = path.join(__dirname, "..", "client", "build");
app.use(express.static(REACT_BUILD_DIR));

const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () =>
  console.log(`Server running on Port http://localhost:${PORT}`)
);
