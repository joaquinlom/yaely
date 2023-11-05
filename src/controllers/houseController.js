const request = require('request')
const bodyParser = require('body-parser')
const {User, House} = require('../database/index');
var cron = require('node-cron');


exports.removeFrequency = (req,res)=>{
   try{
      const house = req.user.house;
      house.frequency_duration = "";
      house.frequency_hour = "";
      house.frequency_date = "";
   
      await house.save();
   
      res.status(200).send(true);
   }catch(e){
      res.status(500).send(e);
   }
   
}

exports.updateFrequency = async (req,res)=>{
   try{
   const {duration,hour,date} = req.body;

   const house = req.user.house;
   house.frequency_duration = duration;
   house.frequency_hour = hour;
   house.frequency_date = date;

   await house.save();
   res.status(200).send(true);
   }catch(e){
      res.status(500).send(e);
   }
}