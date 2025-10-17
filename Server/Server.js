const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const router = require("./routers/authrouter");


app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400, // Cache preflight request for 24 hours
    exposedHeaders: ["Content-Range", "X-Content-Range"],
  })
);


app.get("/cors-test", (req, res) => {
  res.json({ message: "CORS is working correctly!" });
});

// ===============================
// ✅ Middleware
// ===============================
app.use(express.json());

// ===============================
// ✅ Routes
// ===============================
app.use("/auth", router);

// ===============================
// ✅ MongoDB connection with improved error handling
// ===============================
// Local fallback connection string
const LOCAL_MONGO_URI = "mongodb://127.0.0.1:27017/aitegdb";

console.log("Attempting to connect to MongoDB...");
// Add proper connection options and better error handling
mongoose
  .connect(process.env.MONGO || LOCAL_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: "majority",
    connectTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 45000, // 45 seconds
  })
  .then(() => {
    console.log("✅ MongoDB connection successful");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);

    // Provide specific guidance based on error type
    if (err.name === "MongooseServerSelectionError") {
      console.error("\n--- TROUBLESHOOTING GUIDE ---");
      console.error("1. Check if your MongoDB Atlas IP whitelist includes your current IP");
      console.error("   Visit: https://www.mongodb.com/docs/atlas/security-whitelist/");
      console.error("2. Verify your connection string in .env file is correct");
      console.error("3. Make sure your MongoDB Atlas cluster is running");
      console.error("4. If using local network, check if any firewall is blocking MongoDB connections");

      // Try to connect to local MongoDB as fallback
      console.error("\nAttempting to connect to local MongoDB as fallback...");
      mongoose
        .connect(LOCAL_MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
        .then(() => {
          console.log("✅ Connected to local MongoDB fallback");
        })
        .catch(localErr => {
          console.error("❌ Local MongoDB connection also failed:", localErr);
          console.error("\nPlease fix the MongoDB connection before proceeding.");
        });
    }
  });

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
