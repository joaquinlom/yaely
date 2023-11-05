const request = require('request')
const bodyParser = require('body-parser')
const {User, House} = require('../database/index');
var moment = require('moment');
var cron = require('node-cron');

var cronJobs = [];

module.exports.setupCrons = async (app)=>{
   cronJobs.forEach((cron) => cron.stop());
   cronJobs = [];
   //Find all the houses
   const houses = await House.findAll({});
   //Iterate by each house
   houses.map(house=>{
      var job = cron.schedule(`${house.frequency_hour} * * * *`, ()=>{
          const houseDate = moment(house.frequency_date,'DD/MM/YYYY');
          const currentTime = moment().format('DD/MM/YYYY');
          if(currentTime.isAfter(houseDate)){
            const io = app.get('IO');

            const entry = await Analytic.create({
               duration: house.frequency_duration,
               userId: house.frequency_user,
               schedule:1
            })
            await entry.save();
         
            io.emit('device.watering',house.frequency_duration);
            //const analytc = await Analytic.findAll();
            //console.log(analytc)
          }
      } );

      cronJobs.push(job);
   })
   //schedule the cron by the hour

   //Inside the cron, verify the date 
}