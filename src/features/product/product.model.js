import UserModel from "../user/user.model.js";

export default class ProductModel{

    constructor(id,name,desc,imageUrl,category,price,size){
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.imageUrl=imageUrl;
        this.category=category;
        this.price=price;
        this.size=size;
    }

    static getAll(){
        return products;
    }

    static addProduct(){

    }

    static filter(minPrice,MaxPrice,category){
     const result= products.filter((product)=>{
          return (
           (!minPrice || product.price>=minPrice) &&
           (!MaxPrice || product.price<=MaxPrice) &&
            (!category ||product.category==category)
          )
      })
      return result;;
    }

    // static rateProduct(userID,productId,rating){
    //     //1.validate user and product
    //   const user=  UserModel.getAll().find((u)=>u.id==userID);
    //   if(!user){
    //     return 'user not found';
    //   }
    //   //2.validate products
    //    const product=products.find((u)=>u.id==productId);
    //   if(!product){
    //     return 'product not found';
    //   }

    //   //3.check if there any rating if not add ratings array

    //   if(!product.rating){
    //     product.rating=[];
    //     product.rating.push({userID : userID,rating : rating})
    //   }else{
    //     //check user rating is already available
    //     const exisistingRating=product.rating.findIndex((u)=>u.userID==userID);
    //     if(exisistingRating>=0){
    //       product.rating[exisistingRating]={
    //         userID:userID,
    //         rating:rating
    //       }
    //     }else{
    //       //if no existing rating
    //         product.rating.push({userID : userID,rating : rating})
    //       }
    //   }


    // }


    static rateProduct(userId,productId,rating){
        const user=UserModel.getAll().find((u)=>u.id==userId);
        if(!user){
          return 'user is not found'
        }
        const product=products.find((p)=>p.id==productId);
        if(!product){
          return 'product not found'
        }
        if(!product.rating){
          product.rating=[];
          product.rating.push({
            userId:userId,
            rating:rating
          })
        }else{
          const exisistingRating=product.rating.findIndex((u)=>u.userId==userId);
          if(exisistingRating>=0){
            product.rating[exisistingRating].push({
            userId:userId,
            rating:rating
          })
          }else{
            product.rating.push({
            userId:userId,
            rating:rating
          })
          }
          
        }
    }
}



let products = [
  new ProductModel(
    1,
    "Nike Air Max",
    "Comfortable running shoes with breathable mesh.",
    "/uploads/nike-airmax.jpg",
    "Category1",
    5999,
    ["7", "8", "9", "10"]
  ),

  new ProductModel(
    2,
    "Levi's Denim Jacket",
    "Classic blue denim jacket for casual wear.",
    "/uploads/denim-jacket.jpg",
    "Category2",
    3499,
    ["S", "M", "L", "XL"]
  ),

  new ProductModel(
    3,
    "Apple AirPods Pro",
    "Wireless earbuds with active noise cancellation.",
    "/uploads/airpods.jpg",
    "Category3",
    24999,
    ["Standard"]
  ),

  new ProductModel(
    4,
    "Samsung Galaxy Watch",
    "Smartwatch with AMOLED display and fitness tracking.",
    "/uploads/galaxy-watch.jpg",
    "Category4",
    18999,
    ["40mm", "44mm"]
  ),

  new ProductModel(
    5,
    "Wildcraft Backpack",
    "Water-resistant backpack for travel and college.",
    "/uploads/backpack.jpg",
    "Category5",
    2199,
    ["20L", "30L", "40L"]
  ),

  new ProductModel(
    6,
    "Puma Sports T-Shirt",
    "Dry-fit sports t-shirt for everyday workouts.",
    "/uploads/puma-tshirt.jpg",
    "Category2",
    1299,
    ["S", "M", "L", "XL", "XXL"]
  )
];