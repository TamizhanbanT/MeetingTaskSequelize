export default (sequelize, DataTypes) => {
  const MeetingDetail = sequelize.define("MeetingDetail", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    meetingRole: {
      type: DataTypes.ENUM("Development", "Testing", "Production", "Marketing"),
      allowNull: false
    },
    meetingDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    meetingTime: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    tableName: "meetingdetails",
    timestamps: true
  });

  return MeetingDetail;
};
