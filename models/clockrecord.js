'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClockRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ClockRecord.init({
    employeeId: DataTypes.INTEGER,
    clockInTime: DataTypes.DATE,
    clockOutTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ClockRecord',
  });
  return ClockRecord;
};