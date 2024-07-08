const mongoose = require('mongoose');
const { type } = require('os');

const transectionSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:[true,'amount is required']
    },
    type:{
        type:String,
        required:[true,'type is required']
    },
    category:{
        type:String,
        required:[true,'category is required']
    },
    refrence:{
        type:String,
    },
    date:{
        type:Date,
        required:[true,'date is required']
    },
},{timestamp:true})
const transectionModel = mongoose.model("transections",transectionSchema)
module.exports=transectionModel;