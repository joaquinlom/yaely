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
         type: DataType.BOOLEAN
      },
      ground_moist: {
         type: DataType.BOOLEAN
      },
      deposit_moist: {
         type: DataType.BOOLEAN
      },
      valve_status:{
         type: DataType.BOOLEAN
      }
    }, {
      // Other model options go here
    });

    device.sync();
    return device;
};
