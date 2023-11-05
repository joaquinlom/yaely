const request = require('request')
const bodyParser = require('body-parser')
const {User, House} = require('../database/index');
var cron = require('node-cron');



exports.removeFrequency = async (req,res)=>{
   try{
      const house = req.user.house;
      house.frequency_duration = "";
      house.frequency_hour = "";
      house.frequency_date = "";
      house.frequency_user = 0;
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
   house.frequency_user = req.user.id

   await house.save();
   res.status(200).send(true);

   require('../cronjobs').setupCrons(req.app);
   }catch(e){
      res.status(500).send(e);
   }
}