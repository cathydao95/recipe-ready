import "express-async-errors";
import express, { urlencoded } from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

//CUSTOM IMPORTS
import recipeRouter from "./routers/recipes.js";
import authRouter from "./routers/auth.js";
import usersRouter from "./routers/users.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import authenticateUser from "./middleware/authenticateMiddleware.js";

// Constantss
const PORT = process.env.PORT || 8080;
const ORIGIN = "http://localhost:5173";

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(
  cors({
    origin: ORIGIN,
    credentials: true, // To allow cookies and credentials
  })
);
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/v1/recipes", authenticateUser, recipeRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);

// Not found middleware (404 - triggered when request is made to a nonexistant route)
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

// Error handling middleware
app.use(errorHandlerMiddleware);

app.listen(PORT, () =>
  console.log(`Server running on Port http://localhost:${PORT}`)
);
