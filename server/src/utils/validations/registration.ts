import { check } from "express-validator";

export default [
  check("email").isEmail(),
  check("firstname").isLength({ min: 3 }),
  check("lastname").isLength({ min: 3 }),
  check("password").isLength({ min: 3 })
];
