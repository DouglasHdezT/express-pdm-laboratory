const userService = require("../services/user.service");
const { createToken } = require("../utils/jwt.tools");

const controller = {};

controller.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    const {status: userExists} = await userService.findOneByUsername(username);
    if(userExists) return res.status(409).json({ error: "Ey! el suuario ya existe" });

    const {status: userCreated} = await userService.create(req.body);
    if(!userCreated) return res.status(409).json({ error: "No se creo :c" });

    return res.status(201).json({
        message: "Userio registrado"
    })
}

controller.login = async (req, res, next) => {
    const {username, password} = req.body;

    const {status: userExists, content: user} = await userService.findOneByUsername(username);
    if(!userExists) return res.status(404).json({ error: "Ey! el suuario no existe :c" });

    const passwordCorrect = user.comparePasswords(password);
    if(!passwordCorrect) return res.status(401).json({error: "Contraseña incorrecta"});

    const token = createToken(user._id);

    const { status: tokenSaved } = await userService.insertValidToken(user, token);
    if(!tokenSaved) return res.status(409).json({error: "No se pudo logear :v"});

    return res.status(200).json({token: token})
}

module.exports = controller;