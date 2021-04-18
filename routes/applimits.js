const express=require('express')
const router=express.Router()
const User=require('../models/user')
const UserApp=require('../models/application')
var ObjectId = require('mongodb').ObjectId

//1.to get list of blocked apps and limits
router.get('/',async(req,res)=>
{
  try
  {
    if (req.cookies['userData']!=null)
    {
    const user=await User.findById(ObjectId(req.cookies['userData']));
    res.json(user.limitations);
   }
  else {
    res.send("Invalid login");
   }
  } catch (e) {
    res.send('Error in retrieving limits')
  }
})


//2.to add limit to blocked apps
router.post("/",async (req,res)=>
{
try
 {
  if (req.cookies['userData']!=null)
  {
    const app= await UserApp.findById(req.body.app_id);
    const user=await User.findByIdAndUpdate(
        ObjectId(req.cookies['userData']),{
        $push:{
          limitations:{_id:app._id,app_name:app.name,weekdays:req.body.weekdays,weekends:req.body.weekends}
         }},{new:true}
         );
    res.json(user);
  }
  else {
    res.send("Invalid login");
  }
 }  catch (e) {
    res.send('error in posting');
 }

})

// 3.to edit app limit
router.put("/:app_id",async (req,res)=>
{
try {
     if (req.cookies['userData']!=null)
     {
       const user= await User.update(
       {
         "_id" : ObjectId(req.cookies['userData']),
         "limitations._id" : req.params.app_id},
         {
           $set : { "limitations.$.weekdays" : req.body.weekdays, "limitations.$.weekends" : req.body.weekends,}
       },{new:true}
      );
      res.json(user);
     }
    else{
      res.send("Invalid login");
    }
   }  catch (e) {
       res.send('error in posting');
     }
})

module.exports = router;
