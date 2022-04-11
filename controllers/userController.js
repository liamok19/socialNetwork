const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // Get all students
  getUser(req, res) {
    // console.log("🚀 ~ file: userController.js ~ line 31 ~ getUser ~ getUser", getUser)
    User.find() //Find all users in this model
      .then((user) => {
        res.json({
          user, //returning field values associated to this model.
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single student
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId }) //finding a single user via the user_id
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({
              user,
              //   reaction: await grade(req.params.userId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new student
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Update a course
  updateUser(req, res) {
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with this id!" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete a student and remove them from the course
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No such user exists" })
          : User.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an friend to a User
  addFriend(req, res) {
    console.log("You are adding an friend");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendsId } },
      { runValidators: true, new: true },
      console.log(req.params.userId)
    )
      .then((user) =>
        !user
          ? res.json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove friend from a user
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendsId} },
      { new: true }
    )
      .then((user) => {
        if (!user)
          res.status(404).json({ message: "No user found with that ID :(" });
        console.log(user);
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },
};

//aggregation not required for this project - commenting it out for now.

// Aggregate function to get the number of users overall
// const friendCount = async () =>
//     User.aggregate()
//         .count('friendCount')
//         .then((numberOfUsers) => numberOfUsers);

// Aggregate function for getting the overall grade using $avg
// const reaction = async (userId) =>
//     User.aggregate([
//         // only include the given student by using $match
//         { $match: { _id: ObjectId(userId) } },
//     {
//             $unwind: '$reactions',
//     },
//         {
//         $group: {
//             _id: ObjectId(userId),
//             overallReaction: { $avg: '$reactions.score' },
//         },
//         },
//     ]);
