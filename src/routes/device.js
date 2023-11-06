var express = require('express');
var router = express.Router();
var auth = require('./auth-config')
const {User} = require('../database/index');
const passport = require('passport');
const controller = require('../controllers/deviceController');

router.post('/takePhoto',passport.authenticate('jwt', {session: false}),controller.takePhoto);
router.post('/watering',passport.authenticate('jwt', {session: false}),controller.watering);

//Raspberry endpoints
route.post('/updateDeposit',controller.updateDeposit);
route.post('/updateValve',controller.updateValve);
route.post('/updateHumidity',controller.updateHumidity);

module.exports = router;