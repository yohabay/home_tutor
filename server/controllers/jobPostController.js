import mongoose from "mongoose";
import JobPost from "../models/jobPostModel.js";

// Create a new job post
export const createJobPost = async (req, res) => {
  try {
    const { title, description, location, requirements, salary } = req.body;

    const newJobPost = new JobPost({
      title,
      description,
      location,
      requirements,
      salary,
    });

    const savedJobPost = await newJobPost.save();

    res.status(201).json({
      success: true,
      message: "Job post created successfully",
      jobPost: savedJobPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating job post",
      error: error.message,
    });
  }
};

// Get a job post by ID
export const getJobPostById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job post ID",
      });
    }

    const jobPost = await JobPost.findById(id);

    if (!jobPost) {
      return res.status(404).json({
        success: false,
        message: "Job post not found",
      });
    }

    res.status(200).json({
      success: true,
      jobPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching job post",
      error: error.message,
    });
  }
};

// Update a job post by ID
export const updateJobPost = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job post ID",
      });
    }

    const updatedJobPost = await JobPost.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedJobPost) {
      return res.status(404).json({
        success: false,
        message: "Job post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job post updated successfully",
      jobPost: updatedJobPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating job post",
      error: error.message,
    });
  }
};

// Delete a job post by ID
export const deleteJobPost = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job post ID",
      });
    }

    const deletedJobPost = await JobPost.findByIdAndRemove(id);

    if (!deletedJobPost) {
      return res.status(404).json({
        success: false,
        message: "Job post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job post deleted successfully",
      jobPost: deletedJobPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting job post",
      error: error.message,
    });
  }
};
