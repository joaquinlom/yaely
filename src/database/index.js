const { Sequelize,DataTypes } = require('sequelize');

const sequelize = new Sequelize('tesis', 'root', 'password', {
   host: '127.0.0.1',
   dialect: 'mysql',
   port: 3306,
 });

const User  = require('../models/user')(sequelize,DataTypes);


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
   User
}