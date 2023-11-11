import db from "../db/db-connection.js";
import "dotenv/config";
import { StatusCodes } from "http-status-codes";

// GET USER THAT IS CURRENTLY LOGGED IN
export const getUser = async (req, res) => {
  // Get ID of logged in user from request
  const currentUserId = req.user.userId;

  // Query database to find user's information, but don't include password.
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
  const { firstName, lastName, email } = req.body;
  // convert email to lowercase for consistency
  const emailLowerCase = email.toLowerCase();

  // Update User information in the DB
  const updatedUser = await db.query(
    "UPDATE users SET (first_name, last_name, email) = ($1, $2, $3) WHERE id = $4",
    [firstName, lastName, emailLowerCase, currentUserId]
  );

  res.status(StatusCodes.OK).json({
    status: "success",
    data: { msg: "Successfully Updated User" },
  });
};
