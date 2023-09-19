module.exports = function(sequelize, DataTypes){
   var photo = sequelize.define('Photo', {
      // Model attributes are defined here
      id : {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true
      },
      image: {
         type: DataType.STRING
         allowNull: false,
      },
      userId: {
         type: DataType.INTEGER
         allowNull: false
      }
    }, {
      // Other model options go here
    });

    photo.sync();
    return photo;
};
