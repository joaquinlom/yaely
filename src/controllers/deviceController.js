// Use the request module to make HTTP requests from Node
const request = require('request')
const bodyParser = require('body-parser')

exports.takePhoto = (req,res)=>{
   console.log("Taking Photo");

   res.status(200).send(true);
}