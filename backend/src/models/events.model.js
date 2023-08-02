const { Schema, model } = require('mongoose');

const EventSchema = new Schema(
    {
        title: { type: [String, 'No title provided'], required: true },
        description: String,
        coordinator: { type: Schema.Types.ObjectId, ref: 'Instructor' },
    },
    {
        timestamps: true,
    }
);

const Events = model('Event', EventSchema);
module.exports = Events;
