import express from "express";
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name : {type : String, required:true},
    category: {type : String, required:true},
    price : {type : Number, required:true},
    image: {type : String, required:true, unique:true},
    remark : {type : String, required:true, unique:true},
})

export default mongoose.model("Item", itemSchema);