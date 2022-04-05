const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
    minlength: 1,
  },
  reactions: [reactionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Thought = model("thought", thoughtSchema);

// module.exports = thoughtSchema;
module.exports = Thought;
