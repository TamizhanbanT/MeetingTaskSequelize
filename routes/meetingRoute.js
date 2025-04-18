import express from "express";
import db from "../models/index.js";
import { validateMeetingDetail } from "../middlewares/meetingValidator.js";
import { validateResult } from "../middlewares/validateResult.js";
import { Op } from "sequelize";

const router = express.Router();
const { MeetingDetail, Member } = db;

// ✅ Get all meetings (without createdAt, updatedAt)
router.get("/", async (req, res) => {
  try {
    const meetings = await MeetingDetail.findAll({
      include: { model: Member, as: "members", attributes: { exclude: ["createdAt", "updatedAt"] } },
      attributes: { exclude: ["createdAt", "updatedAt"] }
    });
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get a single meeting by ID
router.get("/:id", async (req, res) => {
  try {
    const meeting = await MeetingDetail.findByPk(req.params.id, {
      include: { model: Member, as: "members", attributes: { exclude: ["createdAt", "updatedAt"] } },
      attributes: { exclude: ["createdAt", "updatedAt"] }
    });
    if (!meeting) return res.status(404).json({ error: "Meeting not found" });
    res.json(meeting);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Create a new meeting

// router.post("/", async (req, res) => {
//   try {
//     const newMeeting = await MeetingDetail.create(req.body);
//     res.status(201).json(newMeeting);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });
router.post("/", validateMeetingDetail, validateResult, async (req, res) => {
  try {
    const newMeeting = await MeetingDetail.create(req.body);
    res.status(201).json(newMeeting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Update a specific meeting (only provided fields)
// router.put("/:id", async (req, res) => {
//   try {
//     const meeting = await MeetingDetail.findByPk(req.params.id);
//     if (!meeting) return res.status(404).json({ error: "Meeting not found" });

//     await meeting.update(req.body);
//     res.json(meeting);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

router.put("/:id", validateMeetingDetail, validateResult, async (req, res) => {
  try {
    const meeting = await MeetingDetail.findByPk(req.params.id);
    if (!meeting) return res.status(404).json({ error: "Meeting not found" });

    await meeting.update(req.body);
    res.json(meeting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Delete a meeting
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await MeetingDetail.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Meeting not found" });
    res.json({ message: "Meeting deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get upcoming meetings (today & future)
router.get("/upcoming", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)
    const meetings = await MeetingDetail.findAll({
      where: { meetingDate: { [Op.gte]: today } },
      attributes: { exclude: ["createdAt", "updatedAt"] }
    });
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get past meetings
router.get("/past", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0]; // Get today's date
    const meetings = await MeetingDetail.findAll({
      where: { meetingDate: { [Op.lt]: today } },
      attributes: { exclude: ["createdAt", "updatedAt"] }
    });
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Pagination: Get meetings by role and page
router.get("/paginate/:role/:page", async (req, res) => {
  const limit = 10;
  const { role, page } = req.params;
  const offset = (parseInt(page) - 1) * limit;

  try {
    // Count total meetings matching the role
    const totalItems = await MeetingDetail.count({
      where: { meetingRole: role }
    });

    // Fetch paginated meeting details
    const meetings = await MeetingDetail.findAll({
      where: { meetingRole: role },
      include: {
        model: Member,
        as: "members",
        attributes: { exclude: ["createdAt", "updatedAt"] }
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      limit,
      offset
    });

    const totalPages = Math.ceil(totalItems / limit);

    // If no meetings found
    if (!meetings.length) {
      return res.status(404).json({ message: "No meetings found for this role" });
    }

    // Respond with paginated data
    res.status(200).json({
      role,
      currentPage: parseInt(page),
      totalPages,
      totalItems,
      limitPerPage: limit,
      data: meetings
    });

  } catch (error) {
    console.error("Pagination error:", error);
    res.status(500).json({
      message: "An error occurred while fetching meetings",
      error: error.message
    });
  }
});



// ✅ Get meetings within a date range
router.get("/range", async (req, res) => {
  try {
    const { startDate, endDate } = req.query; // Pass dates as query parameters

    if (!startDate || !endDate) {
      return res.status(400).json({ error: "Start date and end date are required" });
    }

    const meetings = await MeetingDetail.findAll({
      where: {
        meetingDate: { [Op.between]: [startDate, endDate] }
      },
      attributes: { exclude: ["createdAt", "updatedAt"] }
    });

    res.json(meetings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get meetings by a specific date
router.get("/date/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const meetings = await MeetingDetail.findAll({
      where: { meetingDate: date },
      attributes: { exclude: ["createdAt", "updatedAt"] }
    });
    
    if (meetings.length === 0) return res.status(404).json({ message: "No meetings found on this date" });

    res.json(meetings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get meetings by a specific time
router.get("/time/:time", async (req, res) => {
  try {
    const { time } = req.params;
    const meetings = await MeetingDetail.findAll({
      where: { meetingTime: time },
      attributes: { exclude: ["createdAt", "updatedAt"] }
    });

    if (meetings.length === 0) return res.status(404).json({ message: "No meetings found at this time" });

    res.json(meetings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;
