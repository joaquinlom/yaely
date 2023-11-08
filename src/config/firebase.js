const firebase = require('firebase-admin');

const serviceAccount = require('./watering.json');

firebase.initializeApp({
   credential: firebase.credential.cert(serviceAccount)
});


const sendDeviceDisconnected = (users)=>{
   users.forEach(async user => {
      if(user.firebase_token){
         let message = {
            token: user.firebase_token,
            notification:{
               title: "Dispositivo desconectado",
            }
         };
         try{
            const response = await firebase.messaging().send(message);
         }catch(e){
            console.error(e);
         }
      }
   });
}

const sendDeviceConnected = (users)=>{
   users.forEach(async user => {
      if(user.firebase_token){
         let message = {
            token: user.firebase_token,
            notification:{
               title: "Dispositivo Conectado",
            }
         };
         try{
            const response = await firebase.messaging().send(message);
         }catch(e){
            console.error(e);
         }
      }
   });
}

const sendWaterReminder = (users)=>{
   users.forEach(async user => {
      if(user.firebase_token){
         let message = {
            token: user.firebase_token,
            notification:{
               title: "Tu planta no ha sido regada recientemente.",
            }
         };
         try{
            const response = await firebase.messaging().send(message);
         }catch(e){
            console.error(e);
         }
      }
   });
}

const sendDepositEmpty = (users)=>{
   users.forEach(async user => {
      //console.log(user);
      if(user.firebase_token){
         let message = {
            token: user.firebase_token,
            notification:{
               title: "Dispositivo sin Agua",
            }
         };
         try{
            const response = await firebase.messaging().send(message);
         }catch(e){
            console.error(e);
         }
      }
   });
}

module.exports = { firebase, sendDepositEmpty, sendDeviceDisconnected ,sendWaterReminder ,sendDeviceConnected}