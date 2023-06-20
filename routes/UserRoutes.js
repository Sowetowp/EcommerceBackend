import express from "express";
import { userProtect } from "../middlewares/auth_handlers.js";
import { user_signin, user_signup } from "../controllers/Usercontroller.js";
import * as UserValidation from "../Validations/UserValidation.js"
const user_router = express.Router()

user_router.route("/")
    .post(UserValidation.signup, user_signup)

user_router.post("/in", UserValidation.signin, user_signin)

export default user_router