const { use } = require("express/lib/application");
const { Schema, model, Types  } = require("mongoose");
// import { isEmail } from 'validator';
const { isEmail } = require("validator");
const Thought = require("./Thought");

const userSchema = new Schema(
  {
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   default: () => new Types.ObjectId(),
    // },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,

      maxlength: 50,
      minlength: 4,
      default: "Unnamed user",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: (v) => isEmail(v),
        message: "Invalid Email",
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  // console.log(this);
  // if (this.friends) {
  return this.friends.length;
  // } else {
  //   return 0;
  // }
});

const User = model("user", userSchema);

module.exports = User;

//testing for model
// const alice =  new User({
//     userName: 'alice',
//     email: 'alceee'
// })
// alice.save();
