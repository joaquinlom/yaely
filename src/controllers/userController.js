const request = require('request')
const bodyParser = require('body-parser')
const {User} = require('../database/index');

exports.saveFirebaseToken = async (req,res)=>{
   const {token} = res.body;

   if(!token){
      res.status(500).send('Token is required');
   }

   const user = User.findOne({
      where: {email: req.user.email}
   });

   if(!user) {
      res.status(500).send('User is not found');
   }
   await user.update({
      firebase_token: token
   });
   try{
      await user.save();

      res.status(200).send(true);
   }catch(error){
      console.log(error);
      res.status(200).send(false);
   }
   

}