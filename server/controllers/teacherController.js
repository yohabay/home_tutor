import mongoose from "mongoose";
import Teacher from "../models/teacherModel.js";

// Create a new teacher
export const createTeacher = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      contact,
      location,
      profileUrl,
      cvUrl,
      jobTitle,
      about,
      subjects,
      availability,
      hourlyRate,
    } = req.body;

    const newTeacher = new Teacher({
      firstName,
      lastName,
      email,
      password,
      contact,
      location,
      profileUrl,
      cvUrl,
      jobTitle,
      about,
      subjects,
      availability,
      hourlyRate,
    });

    const savedTeacher = await newTeacher.save();

    // You might want to generate and send a JWT token for authentication here

    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      teacher: savedTeacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating teacher",
      error: error.message,
    });
  }
};

// Get a teacher by ID
export const getTeacherById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid teacher ID",
      });
    }

    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    teacher.password = undefined; // Remove password from the response

    res.status(200).json({
      success: true,
      teacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching teacher",
      error: error.message,
    });
  }
};

// Update a teacher by ID
export const updateTeacher = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid teacher ID",
      });
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    updatedTeacher.password = undefined; // Remove password from the response

    res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating teacher",
      error: error.message,
    });
  }
};

// Delete a teacher by ID
export const deleteTeacher = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid teacher ID",
      });
    }

    const deletedTeacher = await Teacher.findByIdAndRemove(id);

    if (!deletedTeacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    deletedTeacher.password = undefined; // Remove password from the response

    res.status(200).json({
      success: true,
      message: "Teacher deleted successfully",
      teacher: deletedTeacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting teacher",
      error: error.message,
    });
  }
};
