import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs"
import { generatetoken } from "../utilities/generate_token.js";
import User from "../models/User.js";

export const user_signup = asyncHandler(async(req, res, next) => {
    try{
        const {firstName,lastName,email,password} = req.body
        const userExist = await User.find({email: email})   
        if(userExist.length > 0){
            throw new Error("User already exists")
        }else{
            const hashedpass = await bcrypt.hash(password, 10)
            const user = await User.create({
                firstName, lastName, email, password: hashedpass
            })
            if(user){
                res.status(201).json({
                    status: "ok",
                    message: "user created successfully",
                    data: {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        password: user.password,
                        token: generatetoken(user._id)
                    }
                })
            }else{
                res.json({
                    error:"user data not valid"
                })
            }
        }
    } catch (error) {
        res.send({error: error})
    }
})

export const user_signin = asyncHandler(async(req, res, next) =>{
    try{
        const{email, password} = req.body

        const user = await User.findOne({email})
        if(!user || !bcrypt.compareSync(password, user.password)){
            res.json({error: "email or password is incorrect"})
        }else{
            res.json({
                status: "ok",
                message: "login successful",
                data: {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                    token: generatetoken(user._id)
                }
            })
        }
    } catch (error) {
        res.send({error: error})
    }
})