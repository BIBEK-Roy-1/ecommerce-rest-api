import ProductModel from "./product.model.js";

export default class ProductController{
    getAllProducts(req,res){
      const product=  ProductModel.getAll();
      res.status(200).send(product);
    }

    addProduct(req,res){
        const{name,desc,price,size}=req.body;
        const newProduct={
            name,

        }

    }


    // rateProduct(req,res){
    //     const userID=req.query.userID;
    //     const productId=req.query.productId;
    //     const rating=req.query.rating;
    //     const err=ProductModel.rateProduct(userID,productId,rating);
    //     if(err){
    //         return res.status(400).send(err);
    //     }else{
    //         return res.status(200).send('Rating has been added');
    //     }
    // }
    rateProduct(req,res){
        const UserId=req.query.UserId;
        const productId=req.query.productId;
        const rating=req.query.rating;

        const err=ProductModel.rateProduct(UserId,productId,rating);
        if(err){
            return res.status(400).send(err);
        }else{
            return res.status(200).send("rating added successfully");
        }
    }

    getOneProduct(req,res){}


    filterProducts(req,res){
        // extracts value from query patrameter
        const minPrice=req.query.minPrice;
        const MaxPrice=req.query.MaxPrice;
        const category=req.query.category;
       const result= ProductModel.filter(minPrice,MaxPrice,category);
       return res.status(200).send(result);
    }
}