import { Sequelize } from "sequelize";
import databaseConfig from "../config/config.json" assert { type: "json" };
import MeetingDetailModel from "./meetingdetail.js";
import MemberModel from "./member.js";

const sequelize = new Sequelize(databaseConfig.development);

const db = {};
db.sequelize = sequelize;
db.MeetingDetail = MeetingDetailModel(sequelize, Sequelize.DataTypes);
db.Member = MemberModel(sequelize, Sequelize.DataTypes);

// ✅ Define Association: One MeetingDetail has many Members
db.MeetingDetail.hasMany(db.Member, {
  foreignKey: "MeetingDetailId",  // Fix to match migration & model
  as: "members",
});

db.Member.belongsTo(db.MeetingDetail, {
  foreignKey: "MeetingDetailId",  // Fix to match migration & model
  as: "meeting",
});

export default db;
