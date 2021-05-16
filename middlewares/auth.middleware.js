const {verifyToken} = require("../utils/jwt.tools");
const  mongoose = require("mongoose");
const userService = require("../services/user.service");

const middleware = {};

const tokenPrefix = process.env.TOKENPREFIX || "Bearer"

middleware.authRequired = async (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(400).json({error: "Autorizacion requerida"});
    }

    const [prefix, token] = authorization.split(" ");

    if(prefix !== tokenPrefix){
        return res.status(400).json({error: "Prefijo incorrecto"});
    }

    const tokenPayload = verifyToken(token);
    if(!tokenPayload) {
        return res.status(403).json({error: "No puedes entrar aqui"});
    }

    const {_id: userID} = tokenPayload;
    if(!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(403).json({error: "No puedes entrar aqui"});
    }

    const {status: userExists, content: user} = await userService.findOneById(userID);
    if(!userExists) {
        return res.status(404).json({error: "No existe el usuario"});
    }

    const {status: isValidToken} = await userService.validateToken(user, token);
    if(!isValidToken) {
        return res.status(403).json({error: "No puedes entrar aqui"});
    }

    req.user = user;
    next();
}

module.exports = middleware;