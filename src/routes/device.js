var express = require('express');
var router = express.Router();
var auth = require('./auth-config')
const {User} = require('../database/index');
const passport = require('passport');
const controller = require('../controllers/deviceController');

router.post('/takePhoto',passport.authenticate('jwt', {session: false}),controller.takePhoto);


module.exports = router;