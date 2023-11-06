const socketio = require("socket.io");
//const loginSocket = require('./login');
//const dashboardSocket = require('./dashboard')
//const canvasSocket = require('./canvas')
var sharedsession = require("express-socket.io-session");
const {Device} = require('../database/index');

var connectedDevices = [];

module.exports.listen = function (app, server, session) {
  const io = socketio(server, {
    handlePreflightRequest: (req, res) => {
      const headers = {
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Origin": "*", //or the specific origin you want to give access to,
        "Access-Control-Allow-Credentials": true,
      };
      res.writeHead(200, headers);
      res.end();
    },
    transports: ["websocket", "polling"],
  });

  io.use(function (socket, next) {
    //console.log(socket.request);
    console.log("NAMESPACE: " + socket.nsp.name);
    session(socket.request, socket.request.res || {}, next);
  });

  io.on("connection", (socket) => {
    //Listen when taking the phot is over
    // is going to return the img as base64 and the user id,
    //here is going to send to the user requested.
    socket.on('device.uploadphoto',(arg)=>{
        console.log("Receiving Photo from device");
        //Here is returned to the App
        console.log(arg);
        io.emit('device.sendphoto',{id: arg.id, img: arg.img})
    });

    //Get the UUID from args, Update record in database
    socket.on('device.update.plant.status',(arg)=>{
      
      io.emit('device.plant.status',arg)
    });

    //once the device is connnected it will emit this event
    //The event will have the UUID, this will create or update the device record
    socket.on('device.connect',async (arg)=>{
      const socketId = socket.id;
      console.log(arg)
      const device = await Device.findOne({
        where:{socketId: socketId}
      });
      if(device){
        device.update({
          socketId: socketId
        });
        device.save();
      }else{
        Device.create({
          UUID: arg.id,
          socketId: socketId,
        })
      }
      connectedDevices.push(socket);
    });

    
    socket.on('disconnect', async () =>{
      console.log('Got disconnect!');

      var i = connectedDevices.indexOf(socket);
      if(i  == -1){
        //No Socket is found
        return;
      }
      connectedDevices.splice(i, 1);

      var device = await Device.findOne({
        where:{
          socketId: socket.id
        }
      });
      if(device){
        var users = await User.findAll({
          where:{ houseId: device.houseId}
        });
        if(users){
          //Send Notifications
          console.log("Sending Push Notification Device is disconected")
        }
      }
   });

  });

  

  /*
    io.use(sharedsession(session, {
        autoSave:true
    })); 
    */
  app.set("io", io);
};
