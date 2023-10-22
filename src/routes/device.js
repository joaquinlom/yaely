var express = require('express');
var router = express.Router();
var auth = require('./auth-config')
const {User} = require('../database/index');
require('../config/passportConfig');


router.post('/takePhoto',passport.authenticate('jwt', {session: false}),(req,res)=>{
   console.log("Taking Photo");
});


module.exports = router;