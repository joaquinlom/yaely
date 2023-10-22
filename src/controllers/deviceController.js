// Use the request module to make HTTP requests from Node
const request = require('request')
const bodyParser = require('body-parser')

exports.takePhoto = (req,res)=>{
   console.log("Taking Photo");
   const io = req.app.get('io');
   console.log(req.user.houseId);
   io.in(1).emit('device.takephoto');
   res.status(200).send(true);
}