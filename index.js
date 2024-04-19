const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const bodyparser = require("body-parser");
//Importing routes
const registerRoute = require("./Routes/registerRoute");

const app = express();

//Creating server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

//Middlewares
app.use(bodyparser.json());
app.use("/vendor", registerRoute);
//Connecting to MongoDB
dotEnv.config();
mongoose.connect(process.env.MONGO_URL)
.then(() => {
        console.log("Connected to MongoDB");
})
.catch((err) => {
        console.log(err);
})
