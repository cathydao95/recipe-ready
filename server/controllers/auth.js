import db from "../db/db-connection.js";
import "dotenv/config";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { generateToken, setTokenCookie } from "../utils/authUtils.js";

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashed_password = bcrypt.hashSync(password, salt);
  const { rows: registeredUser } = await db.query(
    "INSERT INTO users (first_name, last_name, email, hashed_password) VALUES ($1, $2, $3, $4) RETURNING id,email",
    [firstName, lastName, email, hashed_password]
  );

  const token = generateToken(registeredUser[0]);
  setTokenCookie(res, token);

  res.status(StatusCodes.CREATED).json({
    msg: "user registered in...logging in",
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const { rows: users } = await db.query(
    `SELECT * FROM users WHERE email =$1`,
    [email]
  );

  if (users.length === 0) throw new UnauthenticatedError("invalid credentials");

  const passwordMatch = await bcrypt.compare(
    password,
    users[0].hashed_password
  );

  if (!passwordMatch) {
    throw new UnauthenticatedError("invalid credentials");
  }
  const token = generateToken(users[0].rows[0]);

  setTokenCookie(res, token);

  res.status(StatusCodes.OK).json({
    msg: "user logged in",
  });
};

export const logout = (req, res) => {
  // invalidate token and remove cookies
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};
