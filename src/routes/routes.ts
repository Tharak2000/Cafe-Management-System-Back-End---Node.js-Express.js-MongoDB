import express, {Router} from "express";

const router : Router = express.Router();

router.get("/",(req , res )=>{
    res.send("get request");
});

router.post("/",(req , res )=>{
    res.send("post request");
});

router.put("/",(req , res )=>{
    res.send("put request");
});

router.delete("/",(req , res )=>{
    res.send("delete request");
});

export default router;