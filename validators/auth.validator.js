const { body } = require("express-validator");

const validator = {};

validator.registerValidator = [
    body("username")
        .notEmpty().withMessage("Username no puede venir vacía")
        .isLength({ min: 4, max: 16 }).withMessage("Username Minimo 4 maximo 8"),
    body("email")
        .optional()
        .notEmpty().withMessage("Email no puede venir vacio")
        .isEmail().withMessage("Email debe de ser un correo"),
    body("password")
        .notEmpty().withMessage("El password no debe de ser vacio")
        .isLength({min: 8, max: 16}).withMessage("El password debe tener entre 8 y 16 caracteres")
]

validator.loginValidator = [
    body("username")
        .notEmpty().withMessage("username nopuede venir vacio"),
    body("password")
        .notEmpty().withMessage("password nopuede venir vacio")
]

module.exports = validator;