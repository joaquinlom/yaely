module.exports = function(sequelize, DataTypes){
   var user = sequelize.define('users', {
      // Model attributes are defined here
      id : {
         type: sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
      },
      email: {
       type:DataTypes.STRING,
       validate: {
          isEmail:true
       }
      },
      password: {
       type: DataTypes.STRING(64),
        validate: {
          is: /^[0-9a-f]{64}$/i
        }
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
