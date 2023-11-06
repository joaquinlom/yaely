// Use the request module to make HTTP requests from Node
const request = require('request')
const bodyParser = require('body-parser')
const {Analytic,Device, User} = require('../database/index');
const {sendDepositEmpty} = require('../config/firebase');

/**
 * User request a photo
 * sends the id of the current user,
 * this id is then returned on the WS Listener
 */
exports.takePhoto = async (req,res)=>{
   console.log("Taking Photo");
   const io = req.app.get('io');
   io.emit('device.takephoto',{
      userId: req.user.id
   });

   res.status(200).send(true);
}

exports.getInfo = async (req,res)=>{}

exports.watering = async (req,res)=>{
   const io = req.app.get('io');
   console.log("Request Watering");
   const { duration } = req.body;
   if(!duration){
      res.status(500).send("duration property is required");
   }
   //Add Analytic
   try {
      const entry = await Analytic.create({
         duration: duration,
         userId: req.user.id
      })
      await entry.save();
   
      io.emit('device.watering',duration);

      const analytc = await Analytic.findAll();
      console.log(analytc)
      res.status(200).send(analytc);   
   } catch (error) {
      console.log(error);
      res.status(500).send('Error creating watering')
   }
   
}

exports.updateHumidity = async (req,res)=>{
   const {UUID,status} = req.body;
   const io = req.app.get('io');
 
   if(!UUID){
      res.status(401).send("UUID is required");
   }

   if(!status){
      res.status(401).send("status is required");
   }



   const device = await Device.findOne({
      where:{
         UUID: UUID
      }
   });
   if(device){
      device.update({
         ground_moist: status
      });
      io.emit('device.update.plant.status',(status === 1) ? "true": "false");
      res.status(200).send(true);
   }else{
      res.status(500).send("Device doesn't exist")
   }
}

exports.updateValve = async (req,res)=>{
   const {UUID,status} = req.body;
   const io = req.app.get('io');
 
   if(!UUID){
      res.status(401).send("UUID is required");
   }

   if(!status){
      res.status(401).send("status is required");
   }



   const device = await Device.findOne({
      where:{
         UUID: UUID
      }
   });
   if(device){
      device.update({
         valve_status: status
      });
      io.emit('device.update.valve.status',(status === 1) ? "true": "false");
      res.status(200).send(true);
   }else{
      res.status(500).send("Device doesn't exist")
   }
}

exports.updateDeposit = async (req,res)=>{
   const {UUID,status} = req.body;
   const io = req.app.get('io');
 
   if(!UUID){
      res.status(401).send("UUID is required");
      return;
   }

   if(!status){
      res.status(401).send("status is required");
      return;
   }



   const device = await Device.findOne({
      where:{
         UUID: UUID
      }
   });
   if(device){
      console.log("Device found: "+status);
      device.update({
         deposit_moist: status
      });
      io.emit('device.update.deposit.status',(status === 1) ? "true": "false");

      if(status == 0){
         //Send notifications to the users
         console.log("Get all users from the house, send notificaciones")
         const users = await User.findAll({
            houseId: device.houseId
         });
         sendDepositEmpty(users);
      }
      res.status(200).send(true);
   }else{
      res.status(500).send("Device doesn't exist")
   }
}