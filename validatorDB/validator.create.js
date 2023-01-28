const { check } = require('express-validator');
const validateResults = require('../validatorDB/validationResults')


const validatorCreateWorker = [
    check('name')
        .exists()
        .notEmpty(),
    check('last_name')
        .exists()
        .notEmpty(),
    check('age')
        .exists()
        .notEmpty()
        .isNumeric(),
    check('photo')
        .default('https://avatars.githubusercontent.com/u/89231420?v=4')
        .notEmpty(),
    check('work')
        .exists()
        .notEmpty(),
    check('description')
        .exists()
        .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }

]

module.exports = validatorCreateWorker