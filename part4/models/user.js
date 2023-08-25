const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  hashPass: {
    type: String,
    required: true,
    minlength: 3,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    // ret.id = ret._id.toString();
    // delete ret._id;
    delete ret.__v;
    delete ret.hashPass;
  },
});

userSchema.plugin(uniqueValidator, {
  message: "{PATH} already taken",
});

module.exports = mongoose.model("User", userSchema);
