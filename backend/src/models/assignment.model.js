const { Schema, model } = require("mongoose");

const assignmentSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    instructor: { type: Schema.Types.ObjectId, ref: "Instructor" },
    level: { type: Number, required: true, enum: [100, 200, 300, 400] },
    assignment: { type: String, required: true },
  },
  { timestamps: true }
);

const Assignment = model("Assignment", assignmentSchema);

module.exports = Assignment;
