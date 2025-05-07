import express, {request} from "express"; //import express
import dotenv from "dotenv";
//import router from "./routes/routes"
import userRouter from "./routes/userRoutes";
import customerRouter from "./routes/customerRoutes";
import itemRouter from "./routes/itemRoutes";
import orderRouter from "./routes/orderRoutes";
import mongoose from 'mongoose';
import cors from "cors";

const app = express(); //create express app

app.use(express.json());
dotenv.config();
app.use(cors())
app.get("/",(req , res )=>{
   res.send("Server is running");
});


////app.use("/router", router);

app.use("/users",userRouter)

app.use("/customers",customerRouter)

app.use("/items",itemRouter)

app.use("/orders",orderRouter)


// @ts-ignore
mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("MongoDB Connected"))
    .catch(err=>{console.log("MongoDB not connected",err)});

const PORT = process.env.PORT || 3000;

app.listen(PORT ,() => {
    console.log("Server is running on port ",PORT);
})