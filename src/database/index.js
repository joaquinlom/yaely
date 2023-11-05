const { Sequelize,DataTypes } = require('sequelize');

const sequelize = new Sequelize('tesis', 'root', 'password', {
   host: '127.0.0.1',
   dialect: 'mysql',
   port: 3306,
 });

const User  = require('../models/user')(sequelize,DataTypes);
const Device = require('../models/device')(sequelize,DataTypes);
const Analytic = require('../models/analytic')(sequelize,DataTypes);
const House = require('../models/household')(sequelize,DataTypes);

User.hasOne(House);

async function auth(){
   try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

//auth()
sequelize.authenticate()

module.exports = {
   User,
   Device,
   House,
   Analytic
}