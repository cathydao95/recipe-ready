import db from "../db/db-connection.js";
import "dotenv/config";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

export const getUsers = async (req, res) => {
  const { rows: users } = await db.query("SELECT * FROM users");
  res.status(StatusCodes.OK).json({
    status: "success",
    results: users.length,
    data: { users },
  });
};

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

export const editUser = async (req, res) => {
  const currentUserId = req.user.userId;
  // incorporate password update
  const { name, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashed_password = bcrypt.hashSync(password, salt);
  const updatedUser = await db.query(
    "UPDATE users SET (name, email, hashed_password) = ($1, $2, $3) WHERE id = $4",
    [name, email, hashed_password, currentUserId]
  );

  res.status(StatusCodes.OK).json({
    status: "success",
    data: { msg: "user updated" },
  });
};

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
