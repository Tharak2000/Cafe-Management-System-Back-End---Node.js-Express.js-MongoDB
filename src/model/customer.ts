import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name : {type:String, required:true},
    email : {type:String, required:true, unique:true},
    telephone : {type:String, required:true, unique:true},
})

export default mongoose.model("Customer", customerSchema);
