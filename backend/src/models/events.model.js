const { Schema, model } = require("mongoose");

const EventsSchema = new Schema(
  {
    title: { type: [String, "No title provided"], required: true },
    content: String,
    coordinator: { type: Schema.Types.ObjectId, ref: "Instructor" },
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", EventsSchema);
module.exports = Event;
