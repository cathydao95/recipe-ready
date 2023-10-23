import db from "../db/db-connection.js";
import "dotenv/config";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashed_password = bcrypt.hashSync(password, salt);
  const registerUser = await db.query(
    "INSERT INTO users (name, email, hashed_password) VALUES ($1, $2, $3)",
    [name, email, hashed_password]
  );
  res.status(StatusCodes.CREATED).json({
    msg: "user created",
  });
};

export const login = (req, res) => {
  res.send("login");
};
