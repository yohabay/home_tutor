import Teacher from "../models/teacherModel.js";

export const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  //validate fileds

  if (!firstName) {
    next("First Name is required");
  }
  if (!email) {
    next("Email is required");
  }
  if (!lastName) {
    next("Last Name is required");
  }
  if (!password) {
    next("Password is required");
  }

  try {
    const userExist = await Teacher.findOne({ email });

    if (userExist) {
      next("Email Address already exists");
      return;
    }

    const teacher = await Teacher.create({
      firstName,
      lastName,
      email,
      password,
    });

    // teacher token
    const token = await teacher.createJWT();

    res.status(201).send({
      success: true,
      message: "Account created successfully",
      teacher: {
        _id: teacher._id,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email,
        accountType: teacher.accountType,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //validation
    if (!email || !password) {
      next("Please Provide AUser Credentials");
      return;
    }

    // find user by email
    const teacher = await teacher.findOne({ email }).select("+password");

    if (!teacher) {
      next("Invalid -email or password");
      return;
    }

    // compare password
    const isMatch = await teacher.comparePassword(password);

    if (!isMatch) {
      next("Invalid email or password");
      return;
    }

    teacher.password = undefined;

    const token = teacher.createJWT();

    res.status(201).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
