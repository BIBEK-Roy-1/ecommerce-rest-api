import fs from "fs";

const fspromise=fs.promises;

async function log(logData){
    try{
        logData=`\n ${new Date().toString()} - ${logData}`;
       await fspromise.appendFile("log.txt",logData);  
    }catch(err){
        console.log(err);
    }
}

const loggerMiddleware =async(req,res,next)=>{

    if(!req.url.includes('signin')){
    
    // log request body.
    const logData=`${req.url} - ${JSON.stringify(req.body)}`;
   await log(logData);
    }
   next()

}

export default loggerMiddleware;