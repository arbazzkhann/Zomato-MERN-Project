const mongoose = require("mongoose");

//connect to db
function connectDB() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Mongodb connected successfully");
    })
    .catch((err) => {
        console.log("Error while connecting to Mongodb: ", err);
    })
}

exports.connectDB = connectDB;