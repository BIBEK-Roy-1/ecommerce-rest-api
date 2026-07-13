

//productid,userid,quantity

export default class CartItemModel{


   
    constructor(productId,userId,quantity,id){
        this.productId=productId;
        this.userId=userId;
        this.quantity=quantity;
        this.id=id;
    }
   
 //add  validation if like rating 
    static add(productId,userId,quantity){
        const cartItem= new CartItemModel(productId,userId,quantity);
         cartItem.id=cartItems.length+1;
        cartItems.push(cartItem);
        return cartItem;
    }

    static get(userId){

        return cartItems.filter(i=>i.userId==userId);
    }
        

    static delete(userId,cartId){
        const itemIndex=cartItems.findIndex((item)=>item.id==cartId && item.userId==userId)
         console.log("itemIndex:", itemIndex);
    if(itemIndex == -1){
        return "item not found";
    }else{
        cartItems.splice(itemIndex,1);
    }
    
    };
}

var cartItems=[
    new CartItemModel(1,2,1,1),
    new CartItemModel(2,2,1,2)
]