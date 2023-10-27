import "express-async-errors";
import express, { urlencoded } from "express";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import morgan from "morgan";
import cookieParser from "cookie-parser";

//CUSTOM IMPORTS
import recipeRouter from "./routers/recipes.js";
import authRouter from "./routers/auth.js";
import usersRouter from "./routers/users.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import authenticateUser from "./middleware/authenticateMiddleware.js";

// Constants
const PORT = process.env.PORT || 8080;
const ORIGIN = "http://localhost:5173";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REACT_BUILD_DIR = path.join(__dirname, "..", "client", "build");
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
