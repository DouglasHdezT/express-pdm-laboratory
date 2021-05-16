const { validationResult } = require("express-validator");
const debug = require("debug")("app:validator")


module.exports = (req, res, next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        debug(errors);
        return res.status(400).json({error: errors.array().map(item => item.msg)});
    }

    next();
}