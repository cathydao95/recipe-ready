import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/customErrors.js";

// Middleware to authenticate a user based on their JWT token
const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;

  // If no token, do not authetnicate user and throw an error
  if (!token) throw new UnauthenticatedError("authentication invalid");
  try {
    // Verify JWT token
    const { userId, email } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId, email };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export default authenticateUser;
