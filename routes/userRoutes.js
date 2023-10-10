const express = require("express");

const {
    loginController,
    registerController,
    authController,
    applyDriverController,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllDriverController,
    applyController,
    userAppliedController
  } = require("../controllers/userCtrl");

  const authMiddleware = require("../middlewares/authMiddleware");

  //router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

//Apply Doctor || POST
router.post("/apply-driver", authMiddleware, applyDriverController);

//Notifiaction  Doctor || POST
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

//Notifiaction  Doctor || POST
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

//GET ALL DOC
router.get("/getAllDriver", authMiddleware, getAllDriverController);

//BOOK APPOINTMENT
router.post("/apply", authMiddleware, applyController);

//Appointments List
router.get("/user-applied", authMiddleware, userAppliedController);

module.exports = router;