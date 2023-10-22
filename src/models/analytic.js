module.exports = function(sequelize, DataTypes){
   var analytic = sequelize.define('analytics', {
      // Model attributes are defined here
      id : {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true
      },
      duration: {
         type: DataTypes.INTEGER, //in seconds
      },
      userId:{
         type: DataTypes.INTEGER
      },
      requested_at: {
         type: "TIMESTAMP",
         defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
         allowNull: false,
      },
      finished_at:{
         type: "TIMESTAMP",
         allowNull: true,
      }
    }, {
      // Other model options go here
    });

    analytic.sync();
    return analytic;
};
