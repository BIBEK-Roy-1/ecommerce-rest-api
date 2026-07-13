
import UserController from "./user.controller.js";


//1. import express
import express from "express";

//2.initilized express getrouter
const userrouter=express.Router();

const usercontroller=new UserController();



userrouter.post("/signup",usercontroller.signUp);
userrouter.post("/signin",usercontroller.signIn);


export default userrouter;

