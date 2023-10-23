import "express-async-errors";
import express, { urlencoded } from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// custom imports
// routers
import recipeRouter from "./routers/recipes.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/recipes", recipeRouter);

// not found middleware (404 - triggered when request is made to a nonexistant route)
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

// error middleware (500 - occurs when there is an error durng the processing of a request)
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong" });
});

app.listen(PORT, () =>
  console.log(`Server running on Port http://localhost:${PORT}`)
);
