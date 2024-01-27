const { Router } = require("express");
const BugModel = require("../models/bug.model");
// const { BugModel } = require("../models/bug.model");


const bugRouter = Router();

// GET /api/bugs
bugRouter.get("/", async (req, res) => {
  try {
    const bugs = await BugModel.find();
    res.status(200).json({ bugs });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/bugs/:id
bugRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bug = await BugModel.findById(id);
    
    if (!bug) {
      res.status(404).json({ msg: "Bug not found" });
    } else {
      res.status(200).json({ bug });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /api/bugs
bugRouter.post("/", async (req, res) => {
  try {
    const { raised_by, title, description, source, severity } = req.body;
    const newBug = new BugModel({ raised_by, title, description, source, severity });
    await newBug.save();
    res.status(200).json({ msg: "Bug reported successfully", bug: newBug });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT / PATCH /api/bugs/:id
bugRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBug = await BugModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedBug) {
      res.status(404).json({ msg: "Bug not found" });
    } else {
      res.status(200).json({ msg: "Bug updated successfully", bug: updatedBug });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/bugs/:id
bugRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBug = await BugModel.findByIdAndDelete(id);

    if (!deletedBug) {
      res.status(404).json({ msg: "Bug not found" });
    } else {
      res.status(200).json({ msg: "Bug deleted successfully", bug: deletedBug });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { bugRouter };
