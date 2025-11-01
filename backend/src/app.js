const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth.routes");
const foodRouter = require("./routes/food.routes");

const app = express();
app.use(cookieParser()); //cookie-parser
app.use(express.json()); //for req.body

//cors
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.get("/", (req, res, next) => {
    res.send("Hello world!");
})

app.use("/api/auth", authRouter);
app.use("/api/food", foodRouter);

module.exports = app;