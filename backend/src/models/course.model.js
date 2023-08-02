const { Schema, model } = require("mongoose");
const Department = require("./department.model");

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      unique: true,
    },

    code: {
      type: String,
      required: [true, "Please provide a code"],
      unique: true,
    },

    description: { type: String },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "Instructor",
      // required: true,
    },
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

CourseSchema.virtual("students", {
  ref: "Student",
  localField: "_id",
  foreignField: "coursesOffered",
});

CourseSchema.pre("save", async function () {
  const department = await Department.findOne({ name: "Computer Science" });
  if (department) this.department = department._id;
  const instructor = await Department.findById(this.instructor);
  if (instructor) {
    instructor.coursesOffered.push(this);
  } else throw new Error("No Department for this course");
});

const Course = model("Course", CourseSchema);

module.exports = Course;
