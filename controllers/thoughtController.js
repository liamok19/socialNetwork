const { Reaction, User, Thought } = require("../models");

module.exports = {
  //Get all thoughts listed out in the api call
  getThought(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  //Get a single thought listed out in the api call
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(400).json({ message: "No Thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Creating a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //deleting a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : Thought.deleteMany({ _id: { $in: thought.User } })
      )
      .then(() => res.json({ message: "thought and user deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

 //updating an existing thought. Pulling from the thoughtId. validators required.
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add an reaction to a student
//   addReaction(req, res) {
//     console.log("You are adding a reaction");
//     console.log(req.body);
//     Reaction.findOneAndUpdate(
//       { _id: req.params.userId },
//       { $addToSet: { reaction: req.body } },
//       { runValidators: true, new: true }
//     )
//       .then((user) =>
//         !user
//           ? res.status(404).json({ message: "No user found with that ID :(" })
//           : res.json(user)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
createReaction(req, res) {
    Reaction.create(req.body)
      .then((course) => res.json(course))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    },
  // Remove assignment from a student
  removeReaction(req, res) {
    Reaction.findOneAndDelete({ _id: req.params.reactionId  })
      // ,
      // { $pull: { reaction: req.params.reactionId } },
      // { runValidators: true, new: true }
    
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          :  Reaction.findOneAndUpdate(
            { Reaction: req.params.reactionId },
            { $pull: { Reaction: req.params.reactionId } },
            { new: true }
          )
      )
      .catch((err) => res.status(500).json(err));
  },
};
