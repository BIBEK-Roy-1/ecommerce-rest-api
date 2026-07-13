import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController{
        signUp(req,res){
            const {name,email,password,type}=req.body;
             const user= UserModel.signup(name,email,password,type);
            res.status(201).send(user)
        }

        signIn(req,res){
          const{email,password}=req.body;
          const result=UserModel.signin(email,password);
          if(!result){
            return res.status(400).send("Incorrenct Credentials")
          }else{
            //jwt-create token
            const token=jwt.sign({userID: result.id,email:result.email},process.env.JWT_SECRET,{expiresIn:'1h'}) //(payload,secret key,options) options like -algo,expiresIn,notbefore etc
            console.log(token);
             // send token
        return res.status(200).send(token);
          }
            
        }
     
}