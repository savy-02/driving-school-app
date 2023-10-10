const appliedModel = require("../models/appliedModel");
const driverModel = require("../models/driverModel");
const userModel = require("../models/userModels");
const getDriverInfoController = async (req, res) => {
  try {
    const driver = await driverModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "driver data fetch success",
      data: driver,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Driver Details",
    });
  }
};

// update doc profile
const updateProfileController = async (req, res) => {
  try {
    const driver = await driverModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Driver Profile Updated",
      data: driver,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Driver Profile Update issue",
      error,
    });
  }
};

//get single docotor
const getDriverByIdController = async (req, res) => {
  try {
    const driver = await driverModel.findOne({ _id: req.body.driverId });
    res.status(200).send({
      success: true,
      message: "driver Info Fetched",
      data: driver,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Single driver info",
    });
  }
};

const driverAppliedController = async (req, res) => {
  try {
    const driver = await driverModel.findOne({ userId: req.body.userId });
    const applied = await appliedModel.find({
      driverId: driver._id,
    });
    res.status(200).send({
      success: true,
      message: "Driver Applied fetched Successfully",
      data: applied,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in driver applied",
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appliedId, status } = req.body;
    const applied = await appliedModel.findByIdAndUpdate(
      appliedId,
      { status }
    );
    const user = await userModel.findOne({ _id: applied.userId });
    const notifcation = user.notifcation;
    notifcation.push({
      type: "status-updated",
      message: `your applied has been updated ${status}`,
      onCLickPath: "/driver-applied",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Applied Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};

module.exports = {
  getDriverInfoController,
  updateProfileController,
  getDriverByIdController,
  driverAppliedController,
  updateStatusController,
};