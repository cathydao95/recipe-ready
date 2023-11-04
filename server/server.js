import "express-async-errors";
import express, { urlencoded } from "express";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

//CUSTOM IMPORTS
import recipeRouter from "./routers/recipes.js";
import authRouter from "./routers/auth.js";
import usersRouter from "./routers/users.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

// Constants
const PORT = process.env.PORT || 8080;

// TODO: CHANGE ORIGIN FOR CORS AND FIGURE OUT WHY MIGRATIONS ARE NOT WORKIN

// const ORIGIN = "https://server-z8fl.onrender.com";
const ORIGIN = "http://localhost:5173" || process.env.ORIGIN;

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
const REACT_BUILD_DIR = path.join(__dirname, "..", "client", "dist");

app.use(express.static(REACT_BUILD_DIR));

// Middleware
app.use(
  cors({
    origin: ORIGIN,
    credentials: true, // To allow cookies and credentials
  })
);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/v1/recipes", recipeRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);

// Not found middleware (404 - triggered when request is made to a nonexistant route)
// app.use("*", (req, res) => {
//   res.status(404).json({ msg: "not found" });
// });

// Error handling middleware
app.use(errorHandlerMiddleware);

// creates an endpoint for the route /api
app.get("*", (req, res) => {
  // res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
  res.sendFile(path.join(REACT_BUILD_DIR, "index.html"));
});

app.listen(PORT, () =>
  console.log(`Server running on Port http://localhost:${PORT}`)
);
