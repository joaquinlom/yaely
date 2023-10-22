const socketio = require("socket.io");
//const loginSocket = require('./login');
//const dashboardSocket = require('./dashboard')
//const canvasSocket = require('./canvas')
var sharedsession = require("express-socket.io-session");
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
    socket.emit("hello", "world");
  });
  /*
    io.use(sharedsession(session, {
        autoSave:true
    })); 
    */
  app.set("io", io);
};
