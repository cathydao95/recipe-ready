import "express-async-errors";
import express, { urlencoded } from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// custom imports
// routers
import recipeRouter from "./routers/recipes.js";
import authRouter from "./routers/auth.js";

// middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import authenticateUser from "./middleware/authenticateMiddleware.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Configuring cors middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/recipes", authenticateUser, recipeRouter);
app.use("/api/v1/auth", authRouter);

// not found middleware (404 - triggered when request is made to a nonexistant route)
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

app.listen(PORT, () =>
  console.log(`Server running on Port http://localhost:${PORT}`)
);
