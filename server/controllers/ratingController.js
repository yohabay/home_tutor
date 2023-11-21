import mongoose from "mongoose";
import Rating from "../models/ratingModel.js";

// Create a new rating
export const createRating = async (req, res) => {
  try {
    const { studentId, teacherId, rating, comment } = req.body;

    const newRating = new Rating({
      studentId,
      teacherId,
      rating,
      comment,
    });

    const savedRating = await newRating.save();

    res.status(201).json({
      success: true,
      message: "Rating created successfully",
      rating: savedRating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating rating",
      error: error.message,
    });
  }
};

// Get a rating by ID
export const getRatingById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid rating ID",
      });
    }

    const rating = await Rating.findById(id);

    if (!rating) {
      return res.status(404).json({
        success: false,
        message: "Rating not found",
      });
    }

    res.status(200).json({
      success: true,
      rating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching rating",
      error: error.message,
    });
  }
};

// Update a rating by ID
export const updateRating = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid rating ID",
      });
    }

    const updatedRating = await Rating.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedRating) {
      return res.status(404).json({
        success: false,
        message: "Rating not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Rating updated successfully",
      rating: updatedRating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating rating",
      error: error.message,
    });
  }
};

// Delete a rating by ID
export const deleteRating = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid rating ID",
      });
    }

    const deletedRating = await Rating.findByIdAndRemove(id);

    if (!deletedRating) {
      return res.status(404).json({
        success: false,
        message: "Rating not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Rating deleted successfully",
      rating: deletedRating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting rating",
      error: error.message,
    });
  }
};
