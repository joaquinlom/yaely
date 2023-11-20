module.exports = function(sequelize, DataTypes){
   var photo = sequelize.define('photos', {
      // Model attributes are defined here
      id : {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true
      },
      img: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      userId: {
         type: DataTypes.INTEGER,
         allowNull: false
      }
    }, {
      // Other model options go here
    });

    photo.sync();
    return photo;
};
