import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,

  email: String,

  password: String,

  avatar: {
    type: String,
    default: "",
  },

  lastName: {
    type: String,
    default: "lastname",
  },

  location: {
    type: String,
    default: "my city",
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();

  delete obj.password;

  return obj;
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
