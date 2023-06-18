import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config({path: "./config/config.env"});

const generatetoken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

export {generatetoken}