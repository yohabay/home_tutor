import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const teacherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is Required!"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is Required!"],
    },
    email: {
      type: String,
      required: [true, "Email is Required!"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is Required!"],
      minlength: [6, "Password length should be greater than 6 characters"],
      select: true,
    },
    accountType: { type: String, default: "teacher" },
    contact: { type: String },
    location: { type: String },
    profileUrl: { type: String },
    cvUrl: { type: String },
    jobTitle: { type: String },
    about: { type: String },
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ratings" }],
    subjects: [{ type: String }],
    availability: [{ day: String, time: String }],
    hourlyRate: { type: Number },
  },
  { timestamps: true }
);

// Middleware
teacherSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
teacherSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

// JSON Web Token
teacherSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

// Calculate Distance
teacherSchema.methods.calculateDistance = function (studentLocation) {
  const earthRadius = 6371; // Radius of the Earth in kilometers
  const { latitude: lat1, longitude: lon1 } = this.location;
  const { latitude: lat2, longitude: lon2 } = studentLocation;

  // Convert latitude and longitude from degrees to radians
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance; // Distance in kilometers
};


const Teacher = mongoose.model("teachers", teacherSchema);

export default Teacher;
