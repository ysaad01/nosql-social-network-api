const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: "A valid email address is required.",
      validate: {
        validator(validEmail) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(
            validEmail
          );
        },
        message: "Please provide your email",
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
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

/* Virtual to provide friend count */
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

/* Create the User Model using above Schema */
const User = model("User", userSchema);

module.exports = User;
