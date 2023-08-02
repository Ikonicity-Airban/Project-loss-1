const { Schema, model } = require('mongoose');
const { randomUUID } = require('node:crypto');
const Department = require('./department.model');
const User = require('./user.model');

const StudentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        student_passport: Buffer,
        firstName: String,
        lastName: String,
        reg_no: {
            type: String,
            unique: true,
            default: () => 'NAF-'.concat(randomUUID().split('-')[1]),
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
            require: true,
        },
        coursesOffered: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
        sex: {
            type: String,
            enum: ['male', 'female'],
        },
        mobile_phone: String,
        contact_address: String,
        year_of_graduation: Date,
    },
    {
        timestamps: true,
    }
);

StudentSchema.pre('save', async function () {
    const department = await Department.findOne({ name: 'Computer Science' });
    if (!department) return;
    this.department = department._id;
});

StudentSchema.pre('findOneAndRemove', async function (doc) {
    console.log(this._id, doc);
    const user = await User.findOneAndRemove(doc._id);
});
const Student = model('Student', StudentSchema);

module.exports = Student;
