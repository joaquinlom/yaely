module.exports = function(sequelize, DataTypes){
   var device = sequelize.define('devices', {
      // Model attributes are defined here
      id : {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true
      },
      UUID: {
         type:DataTypes.STRING,
      },
      status: {
         type: DataTypes.BOOLEAN
      },
      ground_moist: {
         type: DataTypes.BOOLEAN
      },
      deposit_moist: {
         type: DataTypes.BOOLEAN
      },
      valve_status:{
         type: DataTypes.BOOLEAN
      },
      houseId:{
         type:DataTypes.STRING,
      }
    }, {
      // Other model options go here
    });

    device.sync();
    return device;
};
