import dotenv from "dotenv"
dotenv.config({path: "./config/config.env"});
import express from "express"
import cors from "cors"
import morgan from "morgan"
import path from "path"

import {errorHandler} from "./middlewares/error-handler.js"

import connectDB from "./config/db.js"
import user_router from "./routes/UserRoutes.js"

connectDB().then()

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.use(errorHandler)
app.use("/api/user", user_router)

const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log(`server runnin in ${process.env.NODE_ENV} mode on port ${PORT}`)
)