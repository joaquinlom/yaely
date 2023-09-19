
var express = require('express');
var router = express.Router();
// Use the request module to make HTTP requests from Node
const request = require('request')
const passport = require('passport');
const {User} = require('../database/index');
/**
 * The hook that returns the oauth code , saved to the database, and the 
 * obtain the information of the user, with that code
 */

const addSocketIdtoSession = (req, res, next) => {
    console.log(req.query)
    console.log("AddSocketID: "+req.query.socketId);
    req.session.socketId = req.query.socketId
    next()
}

//router.get('/zoom',addSocketIdtoSession,passport.authenticate('oauth2'));


router.get('/test',(req,res)=>{
   return User.findAll({})
   .then(usuario => res.status(200).send(usuario))
   .catch(error => res.status(400).send(error))
})

module.exports = router;