
// REQUIRE
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

// MIDDLEWARE
app.use(cookieParser());

app.use(cors());

// ROUTES
// app.use("/",(req, res) => {
//     res.json("Hello")
// })
const authRouter = require('./router/user');
const roleUser = require('./router/role');

app.use(express.json())

app.use('/api/auth',authRouter )
app.use('/api/roles',roleUser)

// CONNECT TO MONGODB
const URI = `mongodb+srv://${process.env.MONGOOSE_DB_USERNAME}:${process.env.MONGOOSE_DB_PASSWORD}@myshop.vey7n3v.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(URI, (err) => {
  if (err) throw err;
  console.log('CONNECT TO DATABASE SUCCESSFULLY');
});

// PORT
const PORT = process.env.PORT || 5000;

// LISTENER SEVER
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});