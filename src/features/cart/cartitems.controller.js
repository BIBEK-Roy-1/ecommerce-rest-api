import CartItemModel from "./cartitems.model.js";


export default class CartItemController{

//it is not good if we need userid for add to cart request bacause it can be compromise 
//so we will get it from token
//jwt payload has  user id
    addtocart(req,res){
        const {productId,quantity}=req.query;
        const userId=req.userId;
        CartItemModel.add(productId,userId,quantity);
        res.status(201).send('cart is added');
    }

    get(req,res){
        const userId=req.userId;
        const items=CartItemModel.get(userId);
       return res.status(200).send(items);
    }

    delete(req,res){
        const userId=req.userId;
        const itemId=req.params.id;
        const err=CartItemModel.delete(userId,itemId);
        if(err){
            return res.status(404).send(err);
        }
        return res.status(200).send('item removed successfully')

    }
}