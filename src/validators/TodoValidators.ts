import { ValidationChain, body } from "express-validator";

export const createValidator: ValidationChain[] = [
  body("title")
    .not()
    .isEmpty()
    .withMessage("Please enter the content")
    .trim()
    .isString()
    .withMessage("Content needs to be in text format"),
];

export const updateValidator = [
  body("title")
    .not()
    .isEmpty()
    .withMessage("Please enter the content")
    .trim()
    .isString()
    .withMessage("Content needs to be in text format"),
];
