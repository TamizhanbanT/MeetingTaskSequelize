export default (sequelize, DataTypes) => {
  const Member = sequelize.define("Member", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    memberName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleName: {
      type: DataTypes.ENUM("Development", "Testing", "Production", "Marketing"),
      allowNull: false
    },
    MeetingDetailId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "meetingdetails",
        key: "id"
      },
      onDelete: "CASCADE"
    }
  }, {
    tableName: "members",
    timestamps: true
  });

  Member.associate = (models) => {
    Member.belongsTo(models.MeetingDetail, { foreignKey: "MeetingDetailId", as: "meeting" });
  };

  return Member;
};
