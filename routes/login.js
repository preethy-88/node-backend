const express=require('express')
const router=express.Router()
const User=require('../models/user')
router.post('/',async(req,res)=>
{
    try {
        res.cookie("userData","6071655aaaaae8dbbcc2b8e0");
        res.send('user data added to cookie');
    }
    catch (e) {
      res.send('error');
    }

})
module.exports=router
