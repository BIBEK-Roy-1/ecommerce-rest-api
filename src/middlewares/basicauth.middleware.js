import UserModel from "../features/user/user.model.js";

const basicAuthorizer=(req,res,next)=>{
    //1 check authorization headr is empty
    const authHeader=req.headers["Authorization"];

    if(!authHeader){
        return res.status(401).send("No Authorization Details Found");
    }

    //2.Extract credentails.
    const base64Crendentials=authHeader.replace('Basic ','');

    //3.decode credentails.
    const decodedCreds=Buffer.from(base64Crendentials,'base64').toString('utf-8');
    //result[username:password]

    const creds=decodedCreds.split(':');

    //verify user exist or not
    const user=UserModel.getAll().find(u=>u.email==creds[0] && u.password==creds[1]);

    if(user){
        next();
    }else{
        return res.status(401).send("incorrect credentails")
    }
}

export default basicAuthorizer;