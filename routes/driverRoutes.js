const express = require("express");
const {
  getDriverInfoController,
  updateProfileController,
  getDriverByIdController,
  driverAppliedController,
  updateStatusController,
} = require("../controllers/driverCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//POST SINGLE DOC INFO
router.post("/getDriverInfo", authMiddleware, getDriverInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);

//POST  GET SINGLE DOC INFO
router.post("/getDriverById", authMiddleware, getDriverByIdController);

//GET Appointments
router.get(
  "/driver-applied",
  authMiddleware,
  driverAppliedController
);

//POST Update Status
router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;