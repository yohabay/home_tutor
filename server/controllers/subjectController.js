import mongoose from "mongoose";
import Subject from "../models/subjectModel.js";

// Create a new subject
export const createSubject = async (req, res) => {
  try {
    const { name } = req.body;

    const newSubject = new Subject({
      name,
    });

    const savedSubject = await newSubject.save();

    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      subject: savedSubject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating subject",
      error: error.message,
    });
  }
};

// Get all subjects
export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();

    res.status(200).json({
      success: true,
      subjects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching subjects",
      error: error.message,
    });
  }
};

// Get a subject by ID
export const getSubjectById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid subject ID",
      });
    }

    const subject = await Subject.findById(id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    res.status(200).json({
      success: true,
      subject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching subject",
      error: error.message,
    });
  }
};

// Update a subject by ID
export const updateSubject = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid subject ID",
      });
    }

    const updatedSubject = await Subject.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedSubject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subject updated successfully",
      subject: updatedSubject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating subject",
      error: error.message,
    });
  }
};

// Delete a subject by ID
export const deleteSubject = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid subject ID",
      });
    }

    const deletedSubject = await Subject.findByIdAndRemove(id);

    if (!deletedSubject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
      subject: deletedSubject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting subject",
      error: error.message,
    });
  }
};
