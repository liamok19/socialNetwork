const { Schema, model } = require("mongoose");
const { formatDate } = require("../utils/data");
const reactionSchema = require('./Reaction');

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
      get: (createdAtVal) => formatDate(createdAtVal),
      
    },
    userName: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
    // console.log("🚀 ~ file: Thought.js ~ line 24 ~ createdAt", createdAt),
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
