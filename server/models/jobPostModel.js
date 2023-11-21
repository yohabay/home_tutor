import mongoose from "mongoose";

const jobPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Job title is required"],
  },
  description: {
    type: String,
    required: [true, "Job description is required"],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", // Assuming a job post is associated with a student
  },
  location: { type: String },
  subjects: [{ type: String }],
  hourlyRate: { type: Number },
  schedule: {
    day: { type: String },
    time: { type: String },
  },
  applicants: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      status: { type: String, default: "pending" }, // or use an enum for status
    },
  ],
});

const JobPost = mongoose.model("JobPost", jobPostSchema);

export default JobPost;
