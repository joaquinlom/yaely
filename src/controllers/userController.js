const request = require('request')
const bodyParser = require('body-parser')
const {User} = require('../database/index');
const nodemailer = require('nodemailer')




function makeid(length) {
   let result = '';
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   const charactersLength = characters.length;
   let counter = 0;
   while (counter < length) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
     counter += 1;
   }
   return result;
}


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

/**
 * The user will request an invitation to your household
 * this will not create an active user
 */
exports.sendInvite =  async (req,res)=>{
   const {name,email} = req.body;
   const code = makeId(5);
   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
      user: 'jvaldez.lom@gmail.com,'
      pass: 'kxhplgwyejqxdoje'
      }
      });
   const mailOptions = {
      from: 'UACJ Yaely Tesis',
      to: email,
      subject: `${req.user.name} te invita!`,
      text: `Acepta la invitation haciendo click en el siguiente link http://146.190.132.120/api/accept?code=${code}`
      };
   
   
   try{
      transporter.sendMail(mailOptions, ()=>{
         var user = await User.create({
            name: name,
            email:  email,
            activation_token: code,
            active: 0,
            houseId: req.user.house.id 
          });
      })
     res.status(200).send(true);
   }catch(e){
      res.status(500).send(e);
   }
}

/**
 * Find the user invitation from the url.
 * This will activate the user, 
 */
exports.acceptInvite = async (req,res)=>{

}