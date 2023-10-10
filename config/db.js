const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://sarvagyajain1202:Dhoom2_2006@cluster0.y5gtj7t.mongodb.net/?retryWrites=true&w=majority');
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
  }
};

module.exports = connectDB;