const Content = require("../models/Content");


exports.uploadContent = async (req, res) => {
  try {
    const { title, subject, startTime, endTime, duration } = req.body;

    if (!title || !subject) {
      return res.status(400).json({ message: "Title and subject required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const content = await Content.create({
      title,
      subject,
      filePath: req.file.path,
      uploadedBy: req.user.id,
      startTime,
      endTime,
      duration,
      status: "pending",
    });

    res.json({
      message: "Content uploaded successfully",
      content,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTeacherContent = async (req, res) => {
  try {
    const content = await Content.findAll({
      where: { uploadedBy: req.user.id },
    });

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllContent = async (req, res) => {
  try {
    const content = await Content.findAll();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getPendingContent = async (req, res) => {
  try {
    const content = await Content.findAll({
      where: { status: "pending" },
    });

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.approveContent = async (req, res) => {
  try {
    const { id } = req.params;

    const content = await Content.findByPk(id);

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    content.status = "approved";
    content.rejectionReason = null;

    await content.save();

    res.json({
      message: "Content approved",
      content,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.rejectContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({
        message: "Rejection reason required",
      });
    }

    const content = await Content.findByPk(id);

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    content.status = "rejected";
    content.rejectionReason = reason;

    await content.save();

    res.json({
      message: "Content rejected",
      content,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getLiveContent = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const now = new Date();

    // get approved content for teacher
    let contents = await Content.findAll({
      where: {
        uploadedBy: teacherId,
        status: "approved",
      },
      order: [["orderIndex", "ASC"]],
    });

    // filter by time window
    contents = contents.filter(c => {
      if (!c.startTime || !c.endTime) return false;
      return now >= new Date(c.startTime) && now <= new Date(c.endTime);
    });

    if (contents.length === 0) {
      return res.json({ message: "No content available" });
    }

    // 🔥 rotation logic
    const totalDuration = contents.reduce((sum, c) => sum + (c.duration || 1), 0);

    const currentMinutes = Math.floor(Date.now() / 60000);
    const position = currentMinutes % totalDuration;

    let cumulative = 0;

    for (let c of contents) {
      cumulative += (c.duration || 1);
      if (position < cumulative) {
        return res.json(c);
      }
    }

    return res.json({ message: "No content available" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};