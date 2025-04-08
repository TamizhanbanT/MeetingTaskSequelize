import { body } from "express-validator";

export const validateMeetingDetail = [
  // ✅ meetingRole must be one of allowed enums
  body("meetingRole")
    .notEmpty().withMessage("Meeting role is required")
    .isIn(["Development", "Testing", "Production", "Marketing"]).withMessage("Invalid meeting role"),

  // ✅ meetingDate must be in YYYY-MM-DD format
  body("meetingDate")
    .notEmpty().withMessage("Meeting date is required")
    .isISO8601().withMessage("Meeting date must be in YYYY-MM-DD format"),

  // ✅ meetingTime must be in HH:MM format (24-hour)
  body("meetingTime")
  .notEmpty().withMessage("Meeting time is required")
  .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  .withMessage("Meeting time must be in HH:MM 24-hour format")
];
