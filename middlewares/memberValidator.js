import { body } from "express-validator";

export const validateMember = [
  // ✅ Validate memberName
  body("memberName")
    .notEmpty().withMessage("Member name is required")
    .isLength({ min: 4 }).withMessage("Member name must be at least 3 characters"),

  // ✅ Validate roleName
  body("roleName")
    .notEmpty().withMessage("Role name is required")
    .isIn(["Development", "Testing", "Production", "Marketing"])
    .withMessage("Role must be one of: Development, Testing, Production, Marketing"),

  // ✅ Validate MeetingDetailId (foreign key)
  body("MeetingDetailId")
    .notEmpty().withMessage("MeetingDetailId is required")
    .isInt().withMessage("MeetingDetailId must be a number")
];
