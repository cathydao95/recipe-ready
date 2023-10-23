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
          throw new UnauthorizedError("not authorized to perform this action");
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
  // body("user_id").notEmpty().withMessage("user id is required"),
]);
export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
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

export const validateOwner = withValidationErrors([
  param("id").custom(async (id, { req }) => {
    const { rows: recipe } = await db.query(
      "SELECT * FROM recipes WHERE id = $1",
      [id]
    );
    if (recipe.length === 0)
      throw new NotFoundError(`no recipe with id ${value}`);
    const ownerId = recipe[0].user_id;
    const currentUserId = req.user.userId;
    if (ownerId !== currentUserId) {
      throw new UnauthorizedError("not authorized to perform this action");
    }
  }),
]);
