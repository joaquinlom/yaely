// Use the request module to make HTTP requests from Node
const request = require('request')
const bodyParser = require('body-parser')

exports.takePhoto = (req,res)=>{
   console.log("Taking Photo");
   const io = req.app.get('io');

   const {houseId} = req.user.houseId;
   console.log(houseId);
   io.emit('device.takephoto');
   res.status(200).send(true);
}

exports.watering = (req,res)=>{
   console.log("Request Watering");
   io.emit('device.watering');
   res.status(200).send(true);
}