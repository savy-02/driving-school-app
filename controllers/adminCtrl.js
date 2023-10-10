const driverModel = require("../models/driverModel");
const userModel = require("../models/userModels");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching users",
      error,
    });
  }
};

const getAllDriverController = async (req, res) => {
  try {
    const driver = await driverModel.find({});
    res.status(200).send({
      success: true,
      message: "Driver Data list",
      data: driver,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting drivers data",
      error,
    });
  }
};

// doctor account status
const changeAccountStatusController = async (req, res) => {
  try {
    const { driverId, status } = req.body;
    const driver = await driverModel.findByIdAndUpdate(driverId, { status });
    const user = await userModel.findOne({ _id: driver.userId });
    const notifcation = user.notifcation;
    notifcation.push({
      type: "driver-account-request-updated",
      message: `Your Driver Account Request Has ${status} `,
      onClickPath: "/notification",
    });
    user.isDriver = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: driver,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in Account Status",
      error,
    });
  }
};

module.exports = {
  getAllDriverController,
  getAllUsersController,
  changeAccountStatusController,
};