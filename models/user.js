const mongoose=require('mongoose')
const schema=mongoose.Schema;
const UserSchema=new schema(
  {
  name:String ,
  work_schedule:[
    {
        type:schema.Types.ObjectID,
        ref:'Schedule'
      }
    ]
  ,
  blocked_apps:[
    {
      _id:{
            type:schema.Types.ObjectID,
            ref:"Application"},
      app_name:String
    }],
  limitations:[
    {
      _id:{
            type:schema.Types.ObjectID,
            ref:"Application"
       },
      app_name:String,
      weekdays:String,
      weekends:String
    }]
  }

)

module.exports=mongoose.model('User',UserSchema)
