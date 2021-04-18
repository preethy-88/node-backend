import express from 'express'
import mongoose from 'mongoose'
//const url='mongodb://localhost:27017/node-db';
const config = require('../config');
const { db: { host, port, name } } = config;
const url = `mongodb://${host}:${port}/${name}`;
const app=express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
//DB CONNECT------------------------------------------------------
mongoose.connect(url,{useNewUrlParse:true,useUnifiedTopology:true});

const con=mongoose.connection;
con.on('open',function(){
  console.log('connected....');
}
);
app.use(express.json());

//ROUTERS-------------------------------------------------------------
const userRouter=require('../routes/users');
const appsRouter=require('../routes/blockedapps');
const scheduleRouter=require('../routes/schedules');
const limitsRouter=require('../routes/applimits');
const loginRouter=require('../routes/login');
const logoutRouter=require('../routes/logout');


app.use('/users',userRouter);
app.use('/blockedapps',appsRouter);
app.use('/schedules',scheduleRouter);
app.use('/applimits',limitsRouter);
app.use('/login',loginRouter);
app.use('/logout',logoutRouter);
//START THE SERVER--------------------------------------------------------
app.listen(config.app.port,()=>console.log('listening on port'));
