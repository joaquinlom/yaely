module.exports = function(sequelize, DataTypes){
   var user = sequelize.define('users', {
      // Model attributes are defined here
      id : {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
       type:DataTypes.STRING,
       validate: {
          isEmail:true
       }
      },
      password: {
       type: DataTypes.STRING,
      },
      houseId: {
         type: DataTypes.INTEGER
      },
      firebase_token:{
         type: DataTypes.STRING
      },
      jwt_token: {
         type: DataTypes.STRING
      },
      socketId: {
         type: DataTypes.STRING
      },
      status: {
         type: DataTypes.BOOLEAN,
         defaultValue: false
      },
      activation_token: {
         type: DataTypes.STRING
      }
    
    }, {
      // Other model options go here
    });

    user.sync();
    return user;
};
