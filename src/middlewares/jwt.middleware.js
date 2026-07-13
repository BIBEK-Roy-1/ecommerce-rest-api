import jwt from 'jsonwebtoken'

const jwtAuth=(req,res,next)=>{
    //1.read the token (token must be sent by the client uder auth header)
    const token =req.headers['authorization'];

    //2.if no token ,return the error

     if(!token){
        return res.status(401).send("unauthorize");
    }

    //3.check is tokn is valid(use the sa,e libary used to create token )
    try{
      const payload =  jwt.verify(token,"yyrpa4zOOhZZbxUwVw8iLfvh")   //(token,key which is used to sign the token )
    //verify method returns the payload if have any issue it will throw error
        
    req.userId=payload.userID;
    console.log(payload);
    }catch(err){
         //4.return error
        return res.status(401).send("unauthorize")
    }
    
    //5.call net middleware
    next();

   
}

export default jwtAuth;
