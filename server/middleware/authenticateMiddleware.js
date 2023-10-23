import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/customErrors.js";

const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");
  try {
    const { userId, email } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId, email };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export default authenticateUser;
