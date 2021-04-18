const express=require('express')
const router=express.Router()
var ObjectId = require('mongodb').ObjectId
const User=require('../models/user')
const UserSchedule=require('../models/schedule')

//1.route for retrieving a user by id and populating its work_schedules
router.get('/',async(req,res)=>
{
  try {
    if (req.cookies['userData']!=null)
    {
      const userid=ObjectId(req.cookies['userData']);
      const user = await User
        .findById(userid)
        .populate({path: 'work_schedule', select: 'start_time end_time days'});
        res.json(user.work_schedule);
      }
      else {
        {res.send("Invalid login");}
      }

  } catch (e) {
    res.send('Error in retrieving user')
  }
})

//2.route for creating a new work-schedule and updating users "work_schedule with it"
router.post("/",async (req,res)=>
{

  const user_schedule= new UserSchedule({
  start_time:req.body.start_time,
  end_time:req.body.end_time,
  days:req.body.days});
  try
  {
   if (req.cookies['userData']!=null)
   {
      const sch=await user_schedule.save();
      const user=await User.findByIdAndUpdate(
      ObjectId(req.cookies['userData']),{
      $push:{work_schedule:{_id:sch._id}
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

//3.route for deleting a work schedule
router.delete("/:sch_id",async (req,res)=>
{

try
 {
   if (req.cookies['userData']!=null)
   {
     const sch=  await UserSchedule.findByIdAndRemove(req.params.sch_id);
     const user=await User.findById(ObjectId(req.cookies['userData']));
     await user.work_schedule.pull(req.params.sch_id);
     await user.save();
     res.json(user);
   }
   else {
    res.send("Invalid login");
   }

 } catch (e) {
    res.send('error in posting');
 }
})

//4.route for updating a work schedule
router.put("/:sch_id",async (req,res)=>
{
 try
 {
  const sch=await UserSchedule.findByIdAndUpdate(req.params.sch_id,req.body,{new:true});
  res.json(sch);
 } catch (e) {
    res.send('error in posting');
 }
})


module.exports=router
