const express=require('express')
const router=express.Router()
router.delete('/',async(req,res)=>
{
    try
     {
        res.clearCookie('userData');
        res.send('logged out');
     }
     catch (e) {
      res.send('error');
     }
})
module.exports=router
