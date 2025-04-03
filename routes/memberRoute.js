import express from "express";
import db from "../models/index.js";

const router = express.Router();
const { Member, MeetingDetail } = db;

// ✅ Get all members (without createdAt, updatedAt)
router.get("/", async (req, res) => {
  try {
    const members = await Member.findAll({
      include: { model: MeetingDetail, as: "meeting", attributes: { exclude: ["createdAt", "updatedAt"] } },
      attributes: { exclude: ["createdAt", "updatedAt"] }
    });
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get a single member by ID
router.get("/:id", async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id, {
      include: { model: MeetingDetail, as: "meeting", attributes: { exclude: ["createdAt", "updatedAt"] } },
      attributes: { exclude: ["createdAt", "updatedAt"] }
    });
    if (!member) return res.status(404).json({ error: "Member not found" });
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Create a new member
router.post("/", async (req, res) => {
  try {
    const newMember = await Member.create(req.body);
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Update a specific member (only provided fields)
router.put("/:id", async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: "Member not found" });

    await member.update(req.body);
    
    // Fetch the updated member details after update
    const updatedMember = await Member.findByPk(req.params.id, {
      include: { model: MeetingDetail, as: "meeting", attributes: { exclude: ["createdAt", "updatedAt"] } },
      attributes: { exclude: ["createdAt", "updatedAt"] }
    });

    res.json({ message: "Member updated successfully", updatedMember });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// ✅ Delete a member
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Member.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Member not found" });
    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
