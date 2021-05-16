const User = require("../models/User");
const ServiceResponse = require("../classes/ServiceResponse");

const { verifyToken } = require("../utils/jwt.tools");

const service = {}

service.create = async ({username, email, password}) => {
    try {
        const user = new User({
            username: username,
            email: email,
            password: password
        })

        const userCreated = await user.save();

        if(!userCreated) return new ServiceResponse(false)

        return new ServiceResponse(true)
    } catch (error) {
        throw error;
    }
}

service.findOneByUsername = async (usernameGiven) => {
    try {
        const user = await User.findOne({ username: usernameGiven });

        if(!user) return new ServiceResponse(false);

        return new ServiceResponse(true, user);
    } catch (error) {
        throw error;
    }
}

service.findOneById = async (id) => {
    try {
        const user = await User.findById(id)

        if(!user) return new ServiceResponse(false);

        return new ServiceResponse(true, user);
    } catch (error) {
        throw error;
    }
}

service.insertValidToken = async (user, token) => {
    try {
        user.validTokens = user.validTokens.filter(token => verifyToken(token));
        const newTokens = [token, ...user.validTokens.slice(0,4)];

        user.validTokens = newTokens;

        const userSaved = await user.save();
        if(!userSaved) return new ServiceResponse(false); 

        return new ServiceResponse(true);
    }catch(error) {
        throw error;
    }
}

service.validateToken = async (user, token) => {
    try{
        const index = user.validTokens.findIndex(validToken => validToken === token);

        if(index < 0) return new ServiceResponse(false);

        return new ServiceResponse(true)
    }catch(error) {
        throw error;
    }
}

module.exports = service;