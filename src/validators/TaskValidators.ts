import { ValidationChain, body } from "express-validator";

import { PRIORITY } from "../enums/priorityEnum";
import { STATUS } from "../enums/statusEnum";

export const createValidator: ValidationChain[] = [
  body("title")
    .not()
    .isEmpty()
    .withMessage("Please enter the task title")
    .trim()
    .isString()
    .withMessage("Title needs to be in text format"),
  body("date")
    .not()
    .isEmpty()
    .withMessage("Please enter the task date")
    .isString()
    .withMessage("The date needs to be a valid date format"),
  body("description").trim().isString().withMessage("Description needs to be in text format"),
  body("priority")
    .isIn([PRIORITY.medium, PRIORITY.high, PRIORITY.low])
    .withMessage("Priority can only be normal,high or low"),
  body("status")
    .isIn([STATUS.todo, STATUS.inProgress, STATUS.completed])
    .withMessage("Status can only be todo,inProgress or completed"),
];

export const updateValidator = [
  body("id").not().isEmpty().withMessage("The task id is mandatory").trim(),
  body("status")
    .trim()
    .isIn([STATUS.todo, STATUS.inProgress, STATUS.completed])
    .withMessage("Status can only be todo,inProgress or completed"),
];
