import "express-async-errors";
import express, { urlencoded } from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// custom imports
// routers
import recipeRouter from "./routes/recipes.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/recipes", recipeRouter);

app.listen(PORT, () =>
  console.log(`Server running on Port http://localhost:${PORT}`)
);
