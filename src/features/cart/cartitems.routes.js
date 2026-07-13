import express from "express";
import CartItemController from "./cartitems.controller.js";

const cartrouter=express.Router();


const cartitemcontroller =new CartItemController();
cartrouter.post('/',cartitemcontroller.addtocart);
cartrouter.get('/',cartitemcontroller.get);
cartrouter.delete('/:id',cartitemcontroller.delete);



export default cartrouter;