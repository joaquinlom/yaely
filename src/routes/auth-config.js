const jwt = require('jsonwebtoken');
const { expressjwt: expressjwt } = require("express-jwt");
const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        console.log(decoded);
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};
const getTokenFromHeadersExpreess = (req) => {
  const { headers: { authorization } } = req;
  console.log(authorization)
  if(authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

const auth = {
  required: expressjwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeadersExpreess,
    algorithms: ["HS256"],
  }),
  optional: expressjwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeadersExpreess,
    credentialsRequired: false,
    algorithms: ["HS256"],
  }),
};

module.exports = auth;