import db from "../db/db-connection.js";
import "dotenv/config";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { generateToken, setTokenCookie } from "../utils/authUtils.js";

// REGISTER NEW USER
export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const emailLowerCase = email.toLowerCase();
  // Add a salt to add randomn elements and security to the password
  const salt = bcrypt.genSaltSync(10);
  // hash password to create more secure password
  const hashed_password = bcrypt.hashSync(password, salt);
  const { rows: registeredUser } = await db.query(
    "INSERT INTO users (first_name, last_name, email, hashed_password) VALUES ($1, $2, $3, $4) RETURNING id,email",
    [firstName, lastName, emailLowerCase, hashed_password]
  );

  // pulling functions from util files
  // generate a signed token to authorize and authetnicate the user
  const token = generateToken(registeredUser[0]);
  // create an HTTP token to send to the browser
  setTokenCookie(res, token);

  res.status(StatusCodes.CREATED).json({
    msg: "User registered! Logging in...",
  });
};

// LOGIN USER
export const login = async (req, res) => {
  const { email, password } = req.body;
  const emailLowerCase = email.toLowerCase();

  const { rows: users } = await db.query(
    `SELECT * FROM users WHERE email =$1`,
    [emailLowerCase]
  );

  if (users.length === 0) throw new UnauthenticatedError("invalid credentials");

  // use bcrypt.compare to compare hashed pw in the DB with the login password
  const passwordMatch = await bcrypt.compare(
    password,
    users[0].hashed_password
  );

  if (!passwordMatch) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const token = generateToken(users[0]);

  setTokenCookie(res, token);

  res.status(StatusCodes.OK).json({
    msg: "Logging In...",
  });
};

// LOGOUT USER
export const logout = (req, res) => {
  // invalidate token and remove cookies
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "Successfully Logged Out!" });
};
