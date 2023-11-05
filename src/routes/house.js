var express = require('express');
var router = express.Router();
var auth = require('./auth-config')
const {User} = require('../database/index');
const passport = require('passport');
const controller = require('../controllers/userController');

router.post('/updateFrequency',passport.authenticate('jwt', {session: false}),controller.updateFrequency);
router.post('/removeFrequency',passport.authenticate('jwt', {session: false}),controller.removeFrequency);

module.exports = router;