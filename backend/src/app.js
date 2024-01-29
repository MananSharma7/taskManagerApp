const express = require('express');
const cors = require('cors')
require("./db/mongoose.js");
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;