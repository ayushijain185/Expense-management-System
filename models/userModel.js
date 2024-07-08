const mongoose=require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'email is required and shouldbe unique'],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"],

    }
},{
    timestamps:true
})

const userModel = mongoose.model('users',userSchema)
module.exports=userModel;