import jwt from "jsonwebtoken";

const generatetoken = (id) => {
    return jwt.sign({id} , "jbeghgfbhjbgfhrgbfhrfbghf", {
        expiresIn: '1d'
    })
}

export {generatetoken}