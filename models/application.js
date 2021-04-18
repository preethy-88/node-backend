const mongoose=require('mongoose')

const schema=mongoose.Schema;
const ApplicationSchema=new schema(
  {
    name:String,
    category:String,

  }
)

module.exports=mongoose.model('Application',ApplicationSchema)
