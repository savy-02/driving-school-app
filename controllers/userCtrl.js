const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const driverModel = require("../models/driverModel");
const appliedModel = require("../models/appliedModel");
const moment = require("moment");

//register callback
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invlid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

// // Apply Doctor CTRL
const applyDriverController = async (req, res) => {
  try {
    const newDriver = await driverModel({ ...req.body, status: "pending" });
    await newDriver.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notifcation = adminUser.notifcation;
    notifcation.push({
      type: "apply-driver-request",
      message: `${newDriver.firstName} ${newDriver.lastName} Has Applied For A Driver Account`,
      data: {
        driverId: newDriver._id,
        name: newDriver.firstName + " " + newDriver.lastName,
        onClickPath: "/admin/driver",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notifcation });
    res.status(201).send({
      success: true,
      message: "Driver Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while Applying For Driver",
    });
  }
};

// //notification ctrl
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notifcation = user.notifcation;
    seennotification.push(...notifcation);
    user.notifcation = [];
    user.seennotification = notifcation;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};

// delete notifications
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notifcation = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications Deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notifications",
      error,
    });
  }
};

 //GET ALL DOC
const getAllDriverController = async (req, res) => {
  try {
    const driver = await driverModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Drivers Lists Fetched Successfully",
      data: driver,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while Fetching Driver",
    });
  }
};

//BOOK APPOINTMENT
const applyController = async (req, res) => {
  try {
    // req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    // req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newApplied = new appliedModel(req.body);
    await newApplied.save();
    const user = await userModel.findOne({ _id: req.body.driverInfo.userId });
    user.notifcation.push({
      type: "New-applied-request",
      message: `A new Apply Request from ${req.body.userInfo.name}`,
      onCLickPath: "/user/applied",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Applied succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
};

// // bookingAvailabilityController
// const bookingAvailabilityController = async (req, res) => {
//   try {
//     const date = moment(req.body.date, "DD-MM-YY").toISOString();
//     const fromTime = moment(req.body.time, "HH:mm")
//       .subtract(1, "hours")
//       .toISOString();
//     const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
//     const doctorId = req.body.doctorId;
//     const appointments = await appointmentModel.find({
//       doctorId,
//       date,
//       time: {
//         $gte: fromTime,
//         $lte: toTime,
//       },
//     });
//     if (appointments.length > 0) {
//       return res.status(200).send({
//         message: "Appointments not Availibale at this time",
//         success: true,
//       });
//     } else {
//       return res.status(200).send({
//         success: true,
//         message: "Appointments available",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error In Booking",
//     });
//   }
// };

const userAppliedController = async (req, res) => {
  try {
    const applied = await appliedModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Users Applied Fetch Successfully",
      data: applied,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Applied",
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  applyDriverController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDriverController,
  applyController,
  // bookingAvailabilityController,
  userAppliedController
};