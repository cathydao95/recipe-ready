import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import db from "../db/db-connection.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      // isEmpty checks if there are validation errors
      // .array() is a method that returns a list of all errors
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no recipe")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};
export const validateRecipeInput = withValidationErrors([
  body("title").notEmpty().withMessage("title is required"),
  body("ingredients").notEmpty().withMessage("ingredients is required"),
  body("instructions").notEmpty().withMessage("instructions is required"),
  body("prep_time").notEmpty().withMessage("prep_time is required"),
  body("image_url").notEmpty().withMessage("image_url is required"),
]);

export const validateRegisterInput = withValidationErrors([
  body("firstName").notEmpty().withMessage("first name is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const { rows: user } = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (user.length !== 0) {
        throw new BadRequestError("email is already registered");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("firstName").notEmpty().withMessage("first name is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const { rows: user } = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      // make sure email is not already registered for another user
      if (user.length !== 0 && user[0].id !== req.user.userId) {
        throw new BadRequestError("email already registered");
      }
    }),
]);

export const validateOwner = withValidationErrors([
  // req provides info about current user and param('id'), provides access to the param in the route that we will be using
  param("id").custom(async (id, { req }) => {
    const { rows: recipe } = await db.query(
      "SELECT * FROM recipes WHERE id = $1",
      [id]
    );

    if (recipe.length === 0) throw new NotFoundError(`no recipe with id ${id}`);
    const ownerId = recipe[0].user_id;
    const currentUserId = req.user.userId;
    if (ownerId !== currentUserId) {
      throw new UnauthorizedError("not authorized to perform this action");
    }
  }),
]);
