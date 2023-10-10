const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//rest obejct
const app = express();

//middlewares
app.use(express.json());
app.use(moragan("dev"));

//dotenv conig
dotenv.config();

//mongodb connection
connectDB();

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/driver", require("./routes/driverRoutes"));

//port
const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running perfectly`
      .bgCyan.white
  );
});