const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const Message = require("../models/message_model");
const nodemailer=require("nodemailer");

router.post("/contactus", async(req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
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

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
