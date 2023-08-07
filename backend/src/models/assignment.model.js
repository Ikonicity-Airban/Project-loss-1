import { Schema, model } from "mongoose";

const assignmentSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    lecturer: { type: Schema.Types.ObjectId, ref: "Course" },
    level: { type: Number, required: true, enum: [100, 200, 300, 400] },
    assignment: { type: String, required: true },
  },
  { timestamps: true }
);

const Assignment = model("Assignment", assignmentSchema);
export default Assignment;
