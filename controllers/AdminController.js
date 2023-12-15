import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs"
import { generatetoken } from "../utilities/generate_token.js";
import Admin from "../models/Admin.js";
import Category from "../models/Categories.js";
import Product from "../models/Product.js";
import cloudinary from '../config/cloudinary.js'

export const admin_signup = asyncHandler(async(req, res, next) => {
    try{
        const {firstName,lastName,email,password} = req.body
        const userExist = await Admin.find({email: email})   
        if(userExist.length > 0){
            throw new Error("User already exists")
        }else{
            const hashedpass = await bcrypt.hash(password, 10)
            const user = await Admin.create({
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

export const admin_signin = asyncHandler(async(req, res, next) =>{
    try{
        const{email, password} = req.body

        const user = await Admin.findOne({email})
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

export const create_category = asyncHandler(async (req, res, next) => {
	try{
		const {
			name
		} = req.body
		const postExists = await Category.find({name})

		if (postExists.length > 0) {
			res.status(409).json({
                message: 'Category already exists',
                status: 'conflict',
                data: null,
            });
		}

		const post = await Category.create({
			name,
		})

		if (post) {
			res.status(201).json({
				message: 'success',
				status: 'ok',
				data: post, 
			})
		} else {
			res.status(400)
			throw new Error('Something went wrong.')
		}
	} catch (error) {
		res.send({error: error})
	}
})

export const create_product = asyncHandler(async (req, res, next) => {
	try{
		const {
			image,
			name,
			availability,
            details,
            category
		} = req.body

		const uploadImageToCloudinary = (image) => {
			return new Promise((resolve, reject) => {
			cloudinary.uploader.upload(
				image,
				{
				upload_preset: "unsigned_upload2",
				allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
				},
				(error, result) => {
				if (error) {
					console.log(error);
					reject(error);
				} else {
					resolve(result);
				}
				}
			);
			});
		};
		
		const uploadedImage = await uploadImageToCloudinary(image);
		
		const public_id = uploadedImage.public_id

		const gallery = await Product.create({
			image: public_id,
			name,
            details,
			availability,
            category
		})

		if (gallery) {
			res.status(201).json({
				message: 'item uploaded successfully',
				status: 'ok',
				data: gallery,
			})
		} else {
			res.status(400)
			throw new Error('Invalid data provided.')
		}
	} catch (error) {
		next(error);
	}
})

export const get_category = asyncHandler(async (req, res, next) => {
	try{
		const subject = await Category.find({})
		if (subject) {
			res.status(201).json({
				message: 'success',
				status: 'ok',
				data: subject,
			})
		} else {
			res.status(409).json({
                message: 'something went wrong',
                status: 'conflict',
                data: null,
            });
		}
	} catch (error) {
		res.send({error: error})
	}
})