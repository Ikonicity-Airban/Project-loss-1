const { Schema, model } = require("mongoose");
const Department = require("./department.model");

const InstructorSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String },
    coursesTeaching: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    department: { type: Schema.Types.ObjectId, ref: "Department" },
  },
  { timestamps: true }
);

InstructorSchema.pre("save", async function () {
  const department = Department.findOne({ name: "Computer Science" });
  if (department) {
    this.department = department._id;
  }
});

const Instructor = model("Instructor", InstructorSchema);

module.exports = Instructor;
