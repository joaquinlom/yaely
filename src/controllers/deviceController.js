// Use the request module to make HTTP requests from Node
const request = require('request')
const bodyParser = require('body-parser')
const {Device} = require('../database/index');
exports.takePhoto = async (req,res)=>{
   console.log("Taking Photo");
   const io = req.app.get('io');
   io.emit('device.takephoto');

   res.status(200).send(true);
}

exports.watering = async (req,res)=>{
   console.log("Request Watering");
   const { duration } = req.body;
   if(!duration){
      res.status(500).send("duration property is required");
   }
   //Add Analytic
   const entry = await Device.create({
      duration: duration,
      userId: req.user.id
   })
   await entry.save();

   io.emit('device.watering',duration);
   res.status(200).send(true);
}