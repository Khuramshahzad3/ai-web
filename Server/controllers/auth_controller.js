const { validationResult } = require("express-validator");
const User = require("../models/user_model");
const bcrypt = require("bcryptjs");

const Login = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  try {
    const { email, password } = req.body;
    const existuser = await User.findOne({ email }).select("+password");

    if (!existuser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, existuser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = existuser.generatetoken();

    res.status(200).json({
      message: "Login successful",
      user: {
        name: existuser.name,
        email: existuser.email,
        role: existuser.role,
        id: existuser._id,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const Register = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  try {
    const { name, email, password, phone, dob, address } = req.body;

    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

    // ✅ Check if user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email." });
    }

    // ✅ Create new user
    const newUser = new User({
      name,
      email,
      password,
      phone,
      dob,
      address,
      profileImage,
    });

    await newUser.save();
    const token = newUser.generatetoken(); // make sure this function exists in your model

    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });

    // // ✅ Send Welcome Email
    // await transporter.sendMail({
    //   from: `"Luxury Cars" <${process.env.EMAIL_USER}>`,
    //   to: email,
    //   subject: " Welcome to Luxury Cars!",
    //   html: `
    //     <div style="font-family:Arial, sans-serif; padding:20px; background:#f8f9fa;">
    //       <h2 style="color:#333;">Welcome ${username}!</h2>
    //       <p>
    //         Thank you for joining <b>Luxury Cars</b>.
    //         We’re excited to provide you with the <b>best luxury cars</b> and premium service.
    //       </p>
    //       <p>
    //         Explore our collection and enjoy your journey in style ✨
    //       </p>

    //       <hr/>
    //       <p style="font-size:12px; color:#666;">
    //         © ${new Date().getFullYear()} Luxury Cars. All Rights Reserved.
    //       </p>
    //     </div>
    //   `,
    // });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        dob: newUser.dob,
        address: newUser.address,
        profileImage: newUser.profileImage,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
      token,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { Login, Register };
