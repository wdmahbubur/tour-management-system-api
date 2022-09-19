const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongo = require("./mongo");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.use("/api/v1/tours", require("./routes/v1/tours.routes"));

app.use("/", (req, res) => {
    res.send("Server running...")
});

app.listen(PORT, () => {
    console.log(`Server running in ${PORT}`.green.bold);
    mongo();
});