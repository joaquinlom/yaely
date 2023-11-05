// Use the request module to make HTTP requests from Node
const request = require('request')
const bodyParser = require('body-parser')
const {Analytic} = require('../database/index');


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