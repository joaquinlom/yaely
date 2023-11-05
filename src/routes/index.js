var express = require("express");
var router = express.Router();
// Use the request module to make HTTP requests from Node
const request = require("request");
const passport = require("passport");
var crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { User, House } = require("../database/index");
const TOKEN = "UACJ";
/**
 * The hook that returns the oauth code , saved to the database, and the
 * obtain the information of the user, with that code
 */

const addSocketIdtoSession = (req, res, next) => {
  console.log(req.query);
  console.log("AddSocketID: " + req.query.socketId);
  req.session.socketId = req.query.socketId;
  next();
};

//router.get('/zoom',addSocketIdtoSession,passport.authenticate('oauth2'));
function generateAccessToken(username) {
  return jwt.sign(username, TOKEN);
}

router.get("/test", (req, res) => {
  return User.findAll({
    include: [
      {
        model: House,
      },
    ],
  })
    .then((usuario) => res.status(200).send(usuario))
    .catch((error) => res.status(400).send(error));
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  var hash = crypto.createHash("md5").update(password).digest("hex");

  const user = await User.findOne({ where: { email: email },include:[{model: House}] });
  if (user === null) {
    res.status(403).send("User Not found");
  } else {
    console.log(hash);
    if (user.password == hash) {
      console.log("User Found and the password is the same");
      const jwt = generateAccessToken(user.email);

      user.update({
        jwt_token: jwt,
      });

      await user.save();
      res.status(200).send(user);
    } else {
      console.log(user);
      res.status(403).send("Password not correct");
    }
  }

  //If found return the user with JWT and save the JWT in the DB
});
module.exports = router;
