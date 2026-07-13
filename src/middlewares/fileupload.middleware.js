import multer from "multer";

const storage=multer.diskStorage({
    destination:(req,res,cb)=>{
            cb(null,'./uploads/');
    },
    filename:(req,res,cb)=>{
        cb(null,new Date().toISOString() + file.originalname)
    }

});


export default upload=multer({storage:storage});