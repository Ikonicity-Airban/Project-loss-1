import { Schema, model } from "mongoose";

const assignmentSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
  },
  { timestamps: true }
);

const Assignment = model("Assignment", assignmentSchema);
export default Assignment;
