import express from "express";
import Customer from "../model/customer";

const router = express.Router();

router.get("/",async (req,res)=>{
   try{
       const customers = await Customer.find();
       res.json(customers);
   }catch (error){
       res.status(500).json({message:'Error retrueving customers', error});
   }
});

router.get("/:id",async (req,res)=>{
    try{
        const customer = await Customer.findById(req.params.id);

        if(!customer){
            res.status(404).json({message:'Customer Not Found'});
            return;
        }

        res.json(customer);
    }catch (error){
        console.log(error);
        res.status(500).json({message:'Error retrueving customers' });
    }
})

router.post("/register",(req,res)=>{
    try{
        console.log(req.body);
        const customer = new Customer(req.body);

        customer.save()
            .then(r => res.send(r))
            .catch(e => res.send(e));
    }catch (err){
        console.log(err);
    }
});

router.put("/:id",async (req,res)=>{
    try{
        const id =req.params.id;
        const updateBody =req.body;

        const updateCustomer = await Customer.findByIdAndUpdate(id, updateBody,{new:true});

        if(!updateCustomer){
            res.status(400).json({message:'Customer Not Found'});
            return;
        }
        res.status(204).json();
    }catch (error){
        console.log(error);
        res.status(500).json({message:'Error updating customers'});
    }
});

router.delete("/:id",async (req,res)=>{
    try{
        const id =req.params.id;
        const deletedcustomer = await Customer.findByIdAndDelete(id);

        console.log(deletedcustomer);

        if(!deletedcustomer){
            res.status(400).json({message:'Customer Not Found'});
            return;
        }

        res.status(204).json();
    }catch (error){
        console.log(error);
        res.status(500).json({message:'Error deleting customers'});
    }
});

export default router;
