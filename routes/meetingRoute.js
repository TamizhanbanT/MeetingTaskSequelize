import express from "express";
import db from "../models/index.js";

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
router.post("/", async (req, res) => {
  try {
    const newMeeting = await MeetingDetail.create(req.body);
    res.status(201).json(newMeeting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Update a specific meeting (only provided fields)
router.put("/:id", async (req, res) => {
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

export default router;
