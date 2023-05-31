// const bcrypt =require('bcrypt');
"use strict"
const mongoose=require('mongoose');
// const Schema=mongoose.Schema;
const userSchema=new mongoose.Schema({
    
    username:{
        type:String,
        require:true,
        unique:true
    },
   
    firstname:{
        type:String,
        require:true,
        unique:true
    },
    lastname:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true

    },
   
    password:{
        type:String,
        unique:true
    }
},{
    timestamps:true,
});
const user=mongoose.model('user',userSchema);
module.exports=user;

