const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { User,House } = require("../database/index");

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "user[email]",
      passwordField: "user[password]",
    },
    (email, password, done) => {
      /*
   Users.findOne({ email })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
    */
    }
  )
);

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(function (id, done) {
  /*User.findOne(id, function (err, user) {
    done(err, user);
  })
  ;*/
  User.findOne({where: {email : id}}).then(user=>{
    done(null,err)
  })
});
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "UACJ",
    },
    function (jwtPayload, cb) {
      console.log(jwtPayload);
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return User.findOne({ where: { email: jwtPayload } ,include:[{model: House}]})
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);
/*
passport.use('jwt',new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : 'secret'
},
function (jwtPayload, cb) {
  console.log("JWT in use:" , JSON.stringify(jwtPayload))
  //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
  return Users.findById(jwtPayload.id)
      .then(user => {
          return cb(null, user);
      })
      .catch(err => {
          return cb(err);
      });
}
));

*/
