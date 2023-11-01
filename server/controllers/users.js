import db from "../db/db-connection.js";
import "dotenv/config";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";
import bcrypt from "bcrypt";

// GET ALL USERS (FOR TESTING PURPOSES ON POSTMAN TO KEEP TRACK OF USER DB <-- WILL BE REMOVED)
export const getUsers = async (req, res) => {
  const { rows: users } = await db.query("SELECT * FROM users");
  res.status(StatusCodes.OK).json({
    status: "success",
    results: users.length,
    data: { users },
  });
};

// GET USER THAT IS CURRENTLY LOGGED IN
export const getUser = async (req, res) => {
  const currentUserId = req.user.userId;

  // DON'T SEND PASSWORD TO CLIENT
  const { rows: user } = await db.query(
    "SELECT id, first_name, last_name, email FROM users WHERE id=$1",
    [currentUserId]
  );

  res.status(StatusCodes.OK).json({
    status: "success",
    data: { user },
  });
};

// EDIT USER
export const editUser = async (req, res) => {
  const currentUserId = req.user.userId;
  // incorporate password update
  const { firstName, lastName, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashed_password = bcrypt.hashSync(password, salt);
  const updatedUser = await db.query(
    "UPDATE users SET (first_name, last_name, email, hashed_password) = ($1, $2, $3, $4) WHERE id = $5",
    [firstName, lastName, email, hashed_password, currentUserId]
  );

  res.status(StatusCodes.OK).json({
    status: "success",
    data: { msg: "user updated" },
  });
};

// DELETE USER
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const { rows: deletedUser } = await db.query(
    "DELETE FROM users WHERE id = $1",
    [id]
  );

  res.status(StatusCodes.OK).json({
    status: "success",
    data: { msg: "user deleted" },
  });
};
