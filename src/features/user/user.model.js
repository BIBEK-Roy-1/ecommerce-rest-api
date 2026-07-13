import UserController from "./user.controller.js";

export default class UserModel{
    constructor(name,email,password,type,id){
        this.name=name;
        this.email=email;
        this.password=password;
        this.type=type;
        this.id=id;
    }

    static getAll(){
        return users;
    }

    static signup(name,email,password,type){
        const newuser= new UserModel(
            name ,
            email,
            password,
            type
        );
        newuser.id=users.length+1;
        users.push(newuser);
        return newuser;
    }

   static signin(email,password){
        const user=users.find(u=>u.email==email && u.password==password);
        return user;
   }
}

let users = [
    new UserModel(
        "Bibek Roy",
        "bibek@gmail.com",
        "1234",
        "seller",
        "1"
    ),

       new UserModel(
        "mallika hajra",
        "mallika@gmail.com",
        "1234",
        "customer",
        "2"
    ),


];
