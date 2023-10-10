const mongoose = require("mongoose");

const appliedSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    driverId: {
      type: String,
      required: true,
    },
    driverInfo: {
      type: String,
      required: true,
    },
    userInfo: {
      type: String,
      required: true,
    },
    // date: {
    //   type: String,
    //   required: true,
    // },
    status: {
      type: String,
      required: true,
      default: "pending",
    }
    // time: {
    //   type: String,
    //   required: true,
    // },
  }
  // { timestamps: true }
);

const appliedModel = mongoose.model("applied", appliedSchema);

module.exports = appliedModel;