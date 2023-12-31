import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import db from "../db/db-connection.js";

// Format error messages:
const formatErrorMessages = (errorMessages) => {
  if (errorMessages.length === 1) {
    return errorMessages[0];
  }
  const formattedMessages = errorMessages.join(", ");
  return `${formattedMessages}.`;
};

// Create a middleware to handle form validation errors
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      // isEmpty checks if there are validation errors
      // .array() is a method that returns a list of all errors
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("No recipe")) {
          throw new NotFoundError(errorMessages.join(", "));
        }
        if (errorMessages[0].startsWith("Not authorized")) {
          throw new UnauthorizedError(errorMessages.join(", "));
        }

        // For general validation errors, format the messages
        const formattedErrors = formatErrorMessages(errorMessages);
        throw new BadRequestError(formattedErrors);
      }
      next();
    },
  ];
};

// Validation middleware to validate recipe input
export const validateRecipeInput = withValidationErrors([
  body("title").notEmpty().withMessage("Title is required"),
  body("ingredients").notEmpty().withMessage("Ingredients is required"),
  body("instructions").notEmpty().withMessage("Instructions is required"),
  body("prep_time").notEmpty().withMessage("Prep time is required"),
  body("image_url").notEmpty().withMessage("Image Url is required"),
]);

// Validation middleware to validate registration input
export const validateRegisterInput = withValidationErrors([
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const { rows: user } = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (user.length !== 0) {
        throw new BadRequestError("Email is already registered");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
]);

// Validation middleware to validate login input
export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
]);

// Validation middleware to validate user update input
export const validateUpdateUserInput = withValidationErrors([
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email, { req }) => {
      const { rows: user } = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      // make sure email is not already registered for another user
      if (user.length !== 0 && user[0].id !== req.user.userId) {
        throw new BadRequestError("Email already registered");
      }
    }),
]);

// Validation middleware to check recipe owner
export const validateOwner = withValidationErrors([
  // req provides info about current user and param('id'), provides access to the param in the route that we will be using
  param("id").custom(async (id, { req }) => {
    const { rows: recipe } = await db.query(
      "SELECT * FROM recipes WHERE id = $1",
      [id]
    );

    if (recipe.length === 0) throw new NotFoundError(`No recipe with id ${id}`);

    const ownerId = recipe[0].user_id;
    const currentUserId = req.user.userId;

    if (ownerId !== currentUserId) {
      throw new UnauthorizedError("Not authorized to perform this action");
    }
  }),
]);
