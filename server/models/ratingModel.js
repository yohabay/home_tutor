import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", // Reference to the student who gave the rating
    required: [true, "Student is required"],
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher", // Reference to the teacher who received the rating
    required: [true, "Teacher is required"],
  },
  rating: {
    type: Number,
    required: [true, "Rating value is required"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"],
  },
  comment: { type: String },
});

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;
