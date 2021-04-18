const mongoose=require('mongoose')

const schema=mongoose.Schema;
const ScheduleSchema=new schema(
  {
    start_time:String,
    end_time:String,
    days:[
          { type:String}
         ],
   }
)

module.exports=mongoose.model('Schedule',ScheduleSchema)
