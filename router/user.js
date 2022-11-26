const { json } = require("express");
const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

//resgister
router.post("/register", async (req, res) => {
  const { email, password, number_phone } = req.body;
  console.log({ email, password, number_phone });

  // kiểm tra đơn giản
  if (!email || !password || !number_phone)
    return res
      .status(400)
      .json({ success: false, message: "Bạn đang nhập thiếu thông tin" });

  try {
    //check for existing user
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: " Tài khoản này đã được đăng kí" });

    // check for number phone
    const validateNumberphone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (!validateNumberphone.test(number_phone)) {
      return res.status(400).json({
        message: "Số điện thoại không hợp lệ",
      });
    }

    const hashdPassword = await argon2.hash(password);

    const newUser = new User({ email, password: hashdPassword, number_phone });

    await newUser.save();

    //Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "Người dùng đăng kí thành công",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message:error.message});
  }
});

//Login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Misting  email or password" });

  try {
    //Check for existing user
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Email không chính xác" });

    // email found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorect  password" });

    //All god
    //Return token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "user Logged in sucessfulyy",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Interval server eror" });
  }
});

/// logout

module.exports = router;
