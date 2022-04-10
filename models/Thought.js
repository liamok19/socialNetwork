const { Schema, model } = require("mongoose");
const reactionSchema = require('./Reaction');
var dayjs = require('dayjs')

const thoughtSchema = new Schema({
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // dayjs().format()
    },
    userName: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema
.virtual('reactionCount')
.get(function () {
  return this.length.reactions;
  
});
const Thought = model("thought", thoughtSchema);

// module.exports = thoughtSchema;
module.exports = Thought;
