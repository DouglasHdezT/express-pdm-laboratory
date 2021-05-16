const express = require("express");
const router = express.Router();

const { authRequired } = require("../../middlewares/auth.middleware");

const authRouter = require("./auth.router");


router.use("/auth", authRouter);

//Todas las rutas que esten debajo d  aqui requeran logeo

router.use(authRequired);

router.get("/test", (req, res, next)=> {
    res.status(200).json({
        message: "Todo bien"
    })
})

router.get("/userLogged", (req, res, next) => {
    res.status(200).json(req.user)
})

module.exports = router;