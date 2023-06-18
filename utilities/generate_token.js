import jwt from "jsonwebtoken";
const generatetoken = (id) => {
    return jwt.sign({id} , "secret", {
        expiresIn: '1d'
    })
}

export {generatetoken}