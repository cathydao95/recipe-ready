import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
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
