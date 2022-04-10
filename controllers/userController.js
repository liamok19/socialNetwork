const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

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

    
module.exports = {
    // Get all students
    getUser(req, res) {
        // console.log("🚀 ~ file: userController.js ~ line 31 ~ getUser ~ getUser", getUser)
        User.find()
        .then( (users) => {
            const userObj = {
            users,
            // friendCount: await friendCount(),
            };
            return res.json(userObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    
  // Get a single student
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then(async (user) =>
            !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json({
                user,
                reaction: await grade(req.params.userId),
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

      // Delete a student and remove them from the course
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No such user exists' })
            : Thought.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId } },
                { new: true }
                )
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({
                message: 'User deleted, but no thoughts found',
                })
            : res.json({ message: 'User successfully deleted' })
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Add an assignment to a student
addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { reaction: req.body } },
        { runValidators: true, new: true }
    )
        .then((user) =>
        !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    
  // Remove assignment from a student
    removeReaction(req, res) {
        User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { reaction: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
        )
        .then((user) =>
            !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};