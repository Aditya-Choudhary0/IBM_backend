const mongoose = require("mongoose");

const bugSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    validate: {
      validator: (value) => {
        // Simple URL validation
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlRegex.test(value);
      },
      message: "Invalid URL format for source",
    },
  },
  severity: {
    type: String,
    enum: ['Critical', 'Major', 'Medium', 'Low'],
    required: true,
  },
  raised_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const BugModel = mongoose.model("Bug", bugSchema);

module.exports = BugModel;
