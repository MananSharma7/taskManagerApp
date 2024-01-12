const express = require('express');
const app = express();
const port = process.env.PORT;
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");
require("./db/mongoose.js");
require('dotenv').config()

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is live on port ' + port);
})