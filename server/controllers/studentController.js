import mongoose from "mongoose";
import Student from "../models/studentModel.js";

// Create a new student
export const createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      contact,
      location,
      about,
      profileUrl,
      preferredFormat,
      availability,
      preferredLanguage,
      educationLevel,
      parentInfo,
      subjectsOfInterest,
      notifications,
      paymentInfo,
      schedulingHistory,
    } = req.body;

    const newStudent = new Student({
      name,
      email,
      password,
      contact,
      location,
      about,
      profileUrl,
      preferredFormat,
      availability,
      preferredLanguage,
      educationLevel,
      parentInfo,
      subjectsOfInterest,
      notifications,
      paymentInfo,
      schedulingHistory,
    });

    const savedStudent = await newStudent.save();

    // You might want to generate and send a JWT token for authentication here

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student: savedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating student",
      error: error.message,
    });
  }
};

// Get a student by ID
export const getStudentById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    student.password = undefined; // Remove password from the response

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching student",
      error: error.message,
    });
  }
};

// Update a student by ID
export const updateStudent = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    updatedStudent.password = undefined; // Remove password from the response

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating student",
      error: error.message,
    });
  }
};

// Delete a student by ID
export const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    const deletedStudent = await Student.findByIdAndRemove(id);

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    deletedStudent.password = undefined; // Remove password from the response

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      student: deletedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting student",
      error: error.message,
    });
  }
};
