const { User } = require("../models");

const userController = {
  /* GET ALL users */
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "friends",
        select: "-__v -thoughts",
      })
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  /* GET a user by ID */
  getUserbyId({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "friends",
        select: "-__v -thoughts",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          console.log(dbUserData);
          res.status(404).json({ message: "No user found with that ID!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  /* CREATE a NEW user */
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  /* UPDATE a user by ID */
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          console.log(dbUserData);
          res.status(404).json({ message: "No user found with that ID!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  /* DELETE a user by ID */
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          console.log(dbUserData);
          res.status(404).json({ message: "No user found with that ID!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Create a friend by id
  createFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with that ID." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // Delete a friend by id
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with that ID." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = userController;
