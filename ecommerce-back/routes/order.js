const Order = require("../models/Order");
const { verifyTokenAndAuthorization, verifyToken, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();


//CREATE

router.post('/',verifyToken, async(req,res)=>{
    try {
      const order = await Order.create(req.body)
  
      res.status(201).json(order)
    } catch (error) {
      res.status(500).json(error) 
    }
  
  })

  //UPDATE ORDER
  
  router.put('/:id',verifyTokenAndAdmin, async(req,res)=>{{
    try {
      const updatedOrder = await Product.findByIdAndUpdate(req.params.id,{
        $set: req.body
      },{new:true});
  
      res.status(200).json(updatedOrder)    
    } catch (error) {
      res.status(500).json(error)
    }
  }})
  
  //DELETE ORDER
  
  router.delete('/:id',verifyTokenAndAdmin, async(req,res)=>{{
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json('Product has been Deleted');
  
    } catch (error) {
      res.status(500).json(error)
    }
  }})
  //GET USER ORDER
  
  router.get('/find/:userId',verifyTokenAndAuthorization,async(req,res)=>{
    try {
      const orders = await Order.find({userId : req.params.userId})
      res.status(200).json(orders)
  
    } catch (error) {
      res.status(500).json(error)
    }
  })
  
  //GET ALL ORDERS

  router.get('/',verifyTokenAndAdmin, async(req,res)=>{
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
  })

//GET MONTHLY INCOME
router.get('/income',verifyTokenAndAdmin, async(req,res)=>{
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth()-1));
  const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));

  try {
    const data = await Order.aggregate([
      {$match: {createdAt:{$gte: prevMonth}}},
      {
        $project:{
          month: {$month: '$createdAt'},
          sales: "$amount"
        },
      },
      {
        $group:{
          _id:"$month",
          income:{$sum:'$sales'}
        },
      },
    ])

    res.status(200).json(data)
  } catch (error) {

    res.status(500).json(error)
    
  }
})
module.exports = router;