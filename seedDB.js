const mongoose = require('mongoose');
const User = require('./models/user');
const Application = require('./models/application');
var ObjectId = require('mongodb').ObjectId
const config = require('./config');
const { db: { host, port, name } } = config;
const url = `mongodb://${host}:${port}/${name}`;

mongoose.connect(url,{useNewUrlParse:true,useUnifiedTopology:true});
const con=mongoose.connection;
con.on('open',function(){
  console.log('connected to db....');
}
);

//seed user collection
User.create([{
  _id:ObjectId("6071655aaaaae8dbbcc2b8e0"),
  name: 'Hary'
}])
.then(user => {
  console.log(`${user.length} users created`);
})
.catch((err) => {
  console.log(err);
});

//seed applicationslist
/*Application.create([{
  _id:ObjectId("60715a40832941e7388ce5f6"),
  "name": "fb",
  "category": "social media"
},
{
  _id:ObjectId("6071655aaaaae8dbbcc2b8e1"),
  "name": "twitter",
  "category": "social media"
},
{
  _id:ObjectId("6071dd493e19a24b1594f3de"),
  "name": "instagram",
  "category": "social media"
},
{
  _id:ObjectId("6071ddcb3e19a24b1594f3df"),
  "name": "youtube",
  "category": "social media"
}])
.then(application => {
  console.log(`${application.length} applications created`);
})
.catch((err) => {
  console.log(err);
})
.finally(() => {
  mongoose.connection.close();
});*/
