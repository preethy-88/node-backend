const express=require('express')
const router=express.Router()
const User=require('../models/user')
const UserApp=require('../models/application')
var ObjectId = require('mongodb').ObjectId
//1.to get all the blocked apps(app name)
router.get('/',async(req,res)=>
{
  try
  {
    if (req.cookies['userData']!=null)
    {
      const user=await User.findById(ObjectId(req.cookies['userData']));
      res.json(user.blocked_apps);
    }
    else {
      res.send("Invalid login");
    }
  } catch (e) {
    res.send('Error in retrieving user')
  }
})


//2. to add an app to list of blocked apps
router.post("/",async (req,res)=>
{
try
 {
  if (req.cookies['userData']!=null)
  {
  //pass the app id to be blocked as req body
      const app= await UserApp.findById(req.body.app_id);
      const user=await User.findByIdAndUpdate(
       ObjectId(req.cookies['userData']),
      {
       $push:{
        blocked_apps:{_id:app._id,app_name:app.name}
      }},{new:true}
      );
      res.json(user);
  }
  else {
    res.send("Invalid login");
   }
  } catch (e) {
    res.send('error in posting');
  }
})

//3.route for removing an app from list of  blocked apps

router.delete("/",async (req,res)=>
{

try
 {
  if (req.cookies['userData']!=null)
  {
  //pass the app id to be unblocked as req body
    const app= await UserApp.findById(req.body.app_id);
    const user=await User.findByIdAndUpdate(
      ObjectId(req.cookies['userData']),{
      $pull:{
        blocked_apps:{_id:app._id,app_name:app.name}
      }},{new:true}
     );
  res.json(user);
  }
  else {
  res.send("Invalid login");
  }
  } catch (e) {
    res.send('error in posting');
  }
})

module.exports = router;
