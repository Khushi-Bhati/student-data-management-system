import express from "express"
import { logincontroller, registerController } from "../controllers/Usercontrollers.js"

const userrouter=express.Router()

userrouter.post("/register",registerController);
userrouter.post("/login",logincontroller)


export default userrouter;