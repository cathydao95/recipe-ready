import db from "../db/db-connection.js";
import "dotenv/config";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/customErrors.js";

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashed_password = bcrypt.hashSync(password, salt);
  const { rows: registeredUser } = await db.query(
    "INSERT INTO users (first_name, last_name, email, hashed_password) VALUES ($1, $2, $3, $4) RETURNING id,email",
    [firstName, lastName, email, hashed_password]
  );

  const token = jwt.sign(
    { userId: registeredUser[0].id, email: registeredUser[0].email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRATION,
    }
  );
  // THIS FUNCTION IS REPEATED IN REGISTER AND LOGIN -- clean up
  // convert 1 day into milliseconds for res.cookie
  const oneDay = 1000 * 60 * 60 * 24;
  // send cookie to client more secure than local storage
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE.ENV === "production",
  });

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

  const passwordSuccess = await bcrypt.compare(
    password,
    users[0].hashed_password
  );

  console.log(users);
  if (!passwordSuccess) {
    throw new UnauthenticatedError("invalid credentials");
  } else {
    // ADD TO ENV SECRET AND EXPIRES IN
    // TOKEN CAN BE DEBUGGED USING JWT.IO
    const token = jwt.sign(
      { userId: users[0].id, email: users[0].email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    // convert 1 day into milliseconds for res.cookie
    const oneDay = 1000 * 60 * 60 * 24;
    // send cookie to client more secure than local storage
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE.ENV === "production",
    });
    res.status(StatusCodes.OK).json({
      msg: "user logged in",
    });
  }
};

export const logout = (req, res) => {
  // invalidating token and no longer sending token
  res.cookie("token", "", {
    httpOnly: true,
    // make the cookie expire immediately
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};
