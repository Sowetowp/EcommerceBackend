import express from "express";
import { adminProtect } from "../middlewares/auth_handlers.js";
import * as AdminValidation from "../Validations/AdminValidation.js"
import { admin_signin, admin_signup, create_category, create_product, get_category } from "../controllers/AdminController.js";
const admin_router = express.Router()

admin_router.route("/")
    .post(AdminValidation.signup, admin_signup)

admin_router.post("/in", AdminValidation.signin, admin_signin)
admin_router.route("/cat")
    .post(AdminValidation.cat, create_category)
    .get(get_category)
admin_router.post("/item", create_product)

export default admin_router