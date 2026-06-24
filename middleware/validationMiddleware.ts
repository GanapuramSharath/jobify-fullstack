import { Request, Response, NextFunction, RequestHandler } from "express";
import {
body,
param,
validationResult,
ValidationChain,
} from "express-validator";

import { prisma } from "../utils/prisma";

import {
BadRequestError,
NotFoundError,
UnauthorizedError,
} from "../errors/customError";

import { JOB_STATUS, JOB_TYPE } from "../utils/constants";

const withValidationErrors = (
validateValues: ValidationChain[],
): RequestHandler[] => {
return [
...validateValues,
(req: Request, _res: Response, next: NextFunction) => {
const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => String(err.msg));

    if (errorMessages[0]?.startsWith("no job")) {
      throw new NotFoundError(errorMessages[0]);
    }

    if (errorMessages[0]?.startsWith("not authorized")) {
      throw new UnauthorizedError("not authorized to access this route");
    }

    throw new BadRequestError(errorMessages.join(", "));
  }

  next();
},

];
};

export const validateRegister = withValidationErrors([
body("name").notEmpty().withMessage("name is required"),

body("email")
.notEmpty()
.withMessage("email is required")
.isEmail()
.withMessage("invalid email format")
.custom(async (email: string) => {
const user = await prisma.user.findUnique({
where: { email },
});


  if (user) {
    throw new BadRequestError("email already exists");
  }

  return true;
}),


body("password")
.notEmpty()
.withMessage("password is required")
.isLength({ min: 8 })
.withMessage("password must be at least 8 characters long"),

body("location").notEmpty().withMessage("location is required"),

body("lastName").notEmpty().withMessage("lastname is required"),
]);

export const validateLoginInput = withValidationErrors([
body("email")
.notEmpty()
.withMessage("email is required")
.isEmail()
.withMessage("invalid email format"),

body("password").notEmpty().withMessage("password is required"),
]);

export const validateJobInput = withValidationErrors([
body("company").notEmpty().withMessage("company is required"),

body("position").notEmpty().withMessage("position is required"),

body("jobLocation").notEmpty().withMessage("job location is required"),

body("jobStatus")
.isIn(Object.values(JOB_STATUS))
.withMessage("invalid status value"),

body("jobType")
.isIn(Object.values(JOB_TYPE))
.withMessage("invalid type value"),
]);

export const validateIdParam = withValidationErrors([
param("id").custom(async (value: string, { req }) => {
const job = await prisma.job.findUnique({
where: {
id: value,
},
});

if (!job) {
  throw new NotFoundError(`no job with id ${value}`);
}

const isAdmin = req.user.role === "ADMIN";
const isOwner = req.user.userId === job.createdById;

if (!isAdmin && !isOwner) {
  throw new UnauthorizedError(
    "not authorized to access this route",
  );
}

return true;

}),
]);

export const validateUpdateUserInput = withValidationErrors([
body("name").notEmpty().withMessage("name is required"),

body("email")
.notEmpty()
.withMessage("email is required")
.isEmail()
.withMessage("invalid email format")
.custom(async (email: string, { req }) => {
const user = await prisma.user.findUnique({
where: { email },
});


  if (user && user.id !== req.user.userId) {
    throw new BadRequestError("email already exists");
  }

  return true;
}),

body("location").notEmpty().withMessage("location is required"),

body("lastName").notEmpty().withMessage("last name is required"),
]);
