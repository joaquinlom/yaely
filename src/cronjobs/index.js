const request = require("request");
const bodyParser = require("body-parser");
const { User, House } = require("../database/index");
var moment = require("moment");
var cron = require("node-cron");
const {sendWaterReminder} = require('../config/firebase');

var cronJobs = [];

module.exports.setupCrons = async (app) => {
  cronJobs.forEach((cron) => cron.stop());
  cronJobs = [];
  //Find all the houses
  const houses = await House.findAll({});
  //Iterate by each house
  houses.map((house) => {
    console.log("Setup House Cron job: " + house.id);
    var job = cron.schedule(`${house.frequency_hour} * * * *`, async () => {
      console.log("Running Cron Schedule");
      const houseDate = moment(house.frequency_date, "DD/MM/YYYY");
      const currentTime = moment().format("DD/MM/YYYY");

      if (currentTime.isSameOrAfter(houseDate)) {
        const io = app.get("IO");
        console.log("Server asking device to Watering");
        io.emit("device.watering", house.frequency_duration);
        const entry = await Analytic.create({
          duration: house.frequency_duration,
          userId: house.frequency_user,
          schedule: 1,
        });
        await entry.save();
        //const analytc = await Analytic.findAll();
        //console.log(analytc)
      } else {
        console.log("House time is before Current Time");
        console.log(currentTime);
        console.log(houseDate);
      }
    });

    cronJobs.push(job);
  });
  //schedule the cron by the hour

  var job = cron.schedule(`* * * * *`, async () => {
    console.log("Every day at 8:00 AM");
    //const houseDate = moment(house.frequency_date,'DD/MM/YYYY');
    //latest analytic craeted date
    const latest_entry = await Analytic.findAll({
      limit: 1,
      order: [["createdAt", "DESC"]],
    });
    const currentTime = moment().format("DD/MM/YYYY");
    //2023-11-05 20:40:18
    const latestDate = moment(latest_entry.createdAt,'YYYY-MM-DD hh:mm:ss')
    const daysToRemind = 2;
    if (latest_entry) {
      if (currentTime.diff(latestDate,'days') > daysToRemind) {
         const users = await User.findAll({});
          //Send Notifications
          console.log("Sending Push Notification remind watering")
          sendWaterReminder(users);
      }else{
        console.log("Nunca entra la condicionde tiempo.");
      }
    }
  });
  cronJobs.push(job);
};
