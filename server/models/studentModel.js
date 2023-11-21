import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Student name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
    select: false, // Do not include password in query results
  },
  contact: { type: String },
  location: { type: String },
  about: { type: String },
  profileUrl: { type: String },
  jobPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobPost" }],
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
  preferredFormat: { type: String },
  availability: [{ day: String, time: String }],
  preferredLanguage: { type: String },
  educationLevel: { type: String },
  parentInfo: {
    name: { type: String },
    contact: { type: String },
  },
  subjectsOfInterest: [{ type: String }],
  notifications: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
  },
  paymentInfo: {
    preferredMethod: { type: String },
    linkedAccounts: [{ type: String }],
  },
  schedulingHistory: [
    {
      tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
      date: { type: Date },
      time: { type: String },
    },
  ],
});

// Middleware to hash the password before saving
studentSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// Method to compare password during login
studentSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Student = mongoose.model("Student", studentSchema);

export default Student;
