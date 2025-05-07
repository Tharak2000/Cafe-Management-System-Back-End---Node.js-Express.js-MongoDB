import express from "express";
import Item from "../model/item";
import Items from "../model/item";

const router = express.Router();

router.get("/",async (req,res)=>{
   try{
       const items = await Items.find();
       res.json(items);
   }catch (error){
       res.status(500).json({message:'Error finding items',error});
   }
});

router.get("/:id",async (req,res)=>{
    const itemId = await Items.findById(req.params.id);
    res.json(itemId);

})

router.post("/",(req,res)=>{
    try{

        console.log(req.body);
        const items = new Items(req.body);

        items.save()
            .then(r => res.send(r))
            .catch(e => res.send(e));
    }catch (err){
        console.log(err);
        res.status(500).json({message:"Error creating item"});
    }
});

router.put("/:id",async (req,res)=>{
   try {

       const id = req.params.id;
       const updateBody = req.body;

       //console.log(req.body);
       //const item = new Items(req.body)

       const updateItem = await Items.findByIdAndUpdate(id, updateBody,{new:true})

       if(!updateItem){
           res.status(500).json({message:'Item Not Found'});
           return;
       }
       res.status(200).json(req.body);

   }catch (error){
       console.log(error);
       res.status(500).json({message:'Error updating item',error});
   }
   });

router.delete("/:id",async (req,res)=>{
  try{
      const id = req.params.id;

      const deleteItem =await Items.findByIdAndDelete(id)
      if(!deleteItem){
          res.status(500).json({message:'Item Not Found'});
          return;
      }
      res.status(204).json();


  }catch (error){
    res.status(500).json({message:'Error deleteing item',error});
    console.log(error);
  }
});

export default router;