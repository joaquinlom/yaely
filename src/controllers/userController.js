const request = require('request')
const bodyParser = require('body-parser')
const {User} = require('../database/index');

exports.saveFirebaseToken = async (req,res)=>{
   
   const {token} = req.body;

   if(!token){
      res.status(500).send('Token is required');
      return;
   }

   console.log(`user to find: ${req.user.email}`);
   const user = await User.findOne({
      where: {email: req.user.email}
   });
   console.log(user);
   if(!user) {
      res.status(500).send('User is not found');
      return;
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