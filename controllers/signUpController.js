const { body, validationResult } = require("express-validator");
const { registerUser } = require("./../lib/passportUtils");
const nameLength = { min: 1, max: 10 };
const pwLength = { min: 3, max: 20 };
const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const emptyErr = "field must not be empty.";
const validateUser = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage(`First name ${emptyErr}`)
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength(nameLength)
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage(`Last name ${emptyErr}`)
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength(nameLength)
    .withMessage(`Last name ${lengthErr}`),
  body("username").trim().notEmpty().withMessage(`Username ${emptyErr}`),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyErr}`)
    .isLength(pwLength)
    .withMessage("Password must be between 3 to 20 charaters."),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Please enter the password again for confirmation.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password do not match.");
      }
      return true;
    }),
];
const signUpController = {
  get: async (req, res) => {
    res.render("index", { page: "sign-up", nameLength });
  },
  createUser: [
    validateUser,
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("index", {
          page: "sign-up",
          nameLength,
          errors: errors.array(),
        });
      }
      registerUser(req, res, next);
    },
  ],
};

module.exports = signUpController;
