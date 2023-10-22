var express = require('express');
var router = express.Router();
var auth = require('./auth-config')
const {User} = require('../database/index');

/* GET users listing. */
router.get('/me',auth.required, function(req, res, next) {
  const { payload: { id } } = req;
  return User.findById(id)
  .then((user) => {
    if(!user) {
      return res.sendStatus(400);
    }

    return res.json({ user: user.publicJSON() });
  });
});




module.exports = router;