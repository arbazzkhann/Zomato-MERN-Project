const mongoos = require("mongoose");
const mongoose = require("mongoose");

//connect to db
function connectDB() {
    mongoos.connect("mongodb+srv://zomato:zomatoarbaz@cluster0.m3yuhoc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Mongodb connected successfully");
    })
    .catch((err) => {
        console.log("Error while connecting to Mongodb: ", err);
    })
}

exports.connectDB = connectDB;