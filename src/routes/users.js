var express = require('express');
var router = express.Router();
var auth = require('./auth-config')
const {User, House} = require('../database/index');
const passport = require('passport');
const controller = require('../controllers/userController');
/* GET users listing. */

router.get('/me',passport.authenticate('jwt', {session: false}), function(req, res, next) {
  const id  = req.user.id
  return User.findOne({where: id: id ,include: [{model: House}]})
  .then((user) => {
    if(!user) {
      return res.sendStatus(400);
    }

    return res.json(user);
  });
});

router.post('/saveToken',passport.authenticate('jwt', {session: false}),controller.saveFirebaseToken);


module.exports = router;