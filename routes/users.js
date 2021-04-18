const express=require('express')
const router=express.Router()
const User=require('../models/user')
const UserSchedule=require('../models/schedule')
//to get all the users
router.get('/',async(req,res)=>
{
  try
  {
    const users=await User.find({});
    res.json(users);
  } catch (e) {
    res.send('Error in retrieving user')
  }
})
//to get a specific user
/*router.get('/:id',async(req,res)=>
{//console.log('get request')
  try {
    const users=await User.findById(req.params.id);
    res.json(users);
  } catch (e) {
    res.send('Error in retrieving user')
  }
})*/

//to post  a new user
router.post('/',async(req,res)=>
{
      const user= new User({
      name:req.body.name,});
      try
      {
         const result=await user.save();
         res.json(result);
      }
      catch (e) {
          res.send('error in posting');
      }
})



module.exports=router
