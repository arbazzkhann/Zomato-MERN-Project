//server start
const app = require('./src/app.js');
const {connectDB} = require("./src/db/db.js");

//.env
require("dotenv").config();

connectDB();


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});