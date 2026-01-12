import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobileno: {
      type: String,
      required: true,
      unique: true,
    },
    usertype: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

Userschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

Userschema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

Userschema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "2d",
    }
  );
};

export const Usermodel = mongoose.model("users", Userschema);



