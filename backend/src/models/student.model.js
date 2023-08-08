const { Schema, model } = require("mongoose");
const { randomUUID } = require("node:crypto");
const Department = require("./department.model");
const User = require("./user.model").default;

const StudentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    student_passport: Buffer,
    firstName: String,
    lastName: String,
    reg_no: {
      type: String,
      unique: true,
      default: () => "NAF-".concat(randomUUID().split("-")[1]),
    },
    level: { type: Number, default: 100 },

    coursesOffered: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    sex: {
      type: String,
      enum: ["male", "female"],
    },
    mobile_phone: String,
    contact_address: String,
    year_of_graduation: Date,
  },
  {
    timestamps: true,
  }
);

StudentSchema.pre("findOneAndRemove", async function (doc) {
  console.log(this._id, doc);
  const user = await User.findOneAndRemove(doc._id);
  console.log("🚀 ~ file: student.model.js:46 ~ user:", user);
});
const Student = model("Student", StudentSchema);

module.exports = Student;
