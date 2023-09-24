const Cart = require("../models/Cart");
const { verifyTokenAndAuthorization, verifyToken, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();

//ADD to CART

router.post('/',verifyToken, async(req,res)=>{
    try {
      const cart = await Cart.create(req.body)
  
      res.status(201).json(cart)
    } catch (error) {
      res.status(500).json(error) 
    }
  
  })

  //UPDATE CART
  
  router.put('/:id',verifyTokenAndAuthorization, async(req,res)=>{{
    try {
      const updatedCart = await Product.findByIdAndUpdate(req.params.id,{
        $set: req.body
      },{new:true});
  
      res.status(200).json(updatedCart)    
    } catch (error) {
      res.status(500).json(error)
    }
  }})
  
  //DELETE CART
  
  router.delete('/:id',verifyTokenAndAuthorization, async(req,res)=>{{
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json('Product has been Deleted');
  
    } catch (error) {
      res.status(500).json(error)
    }
  }})
  //GET USER CART
  
  router.get('/find/:userId',verifyTokenAndAuthorization,async(req,res)=>{
    try {
      const cart = await Cart.findOne({userId : req.params.userId})
      res.status(200).json(cart)
  
    } catch (error) {
      res.status(500).json(error)
    }
  })
  
  //GET ALL

  router.get('/',verifyTokenAndAdmin, async(req,res)=>{
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error)
    }
  })

module.exports = router;
