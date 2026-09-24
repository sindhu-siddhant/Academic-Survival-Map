const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      trim: true,
    },

    faculty: {
      type: String,
      default: "",
      trim: true,
    },

    attendance: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    marks: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    credits: {
      type: Number,
      required: true,
      min: 0,
    },

    classes: {
      type: Number,
      default: 0,
      min: 0,
    },

    attended: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: ["Stable", "Watch", "Critical"],
      default: "Stable",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subject", subjectSchema);

