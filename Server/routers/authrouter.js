const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const Message = require("../models/message_model");
const nodemailer = require("nodemailer");

// Add error handling middleware for async route handlers
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post("/contactus", asyncHandler(async (req, res) => {
  try {
    console.log("Received contact form submission:", req.body);

    // Validate required fields
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address"
      });
    }

    const newMessage = new Message({ name, email, subject, message });
    newMessage.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Compose email
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `${subject}`,
      html: `
        <p>${message}</p>
      `,
    };

    // ✅ Send email
    await transporter.sendMail(mailOptions);
    console.log(newMessage)

    return res.status(200).json({
      success: true,
      message: "Message received successfully"
    });
  } catch (error) {
    console.error("Error in contactus route:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
}));

// Global error handler
router.use((err, req, res, next) => {
  console.error("API Error:", err);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

module.exports = router;
