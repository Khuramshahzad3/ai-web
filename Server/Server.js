const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const router = require("./routers/authrouter");

// Define allowed origins explicitly
const allowedOrigins = [
  'https://web-courses-ruby.vercel.app',
  'https://ai-web-ivory-nine.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173'
];

app.use(cors({
  origin:'*', // Replace with the frontend URL
  methods: 'GET, POST, PUT, DELETE', // Methods you want to allow
  allowedHeaders: 'Content-Type, Authorization', // Headers you want to allow
 // credentials: true, // Include cookies in the requests sent to the server
}));

// Set CORS headers before any routes
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Let Vercel handle which origins to allow
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");

  // Handle OPTIONS immediately
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request from:", origin);
    return res.status(200).end();
  }

  next();
});

// Clear middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log(`Origin: ${req.headers.origin}`);
  next();
});

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
app.use(express.json());
app.use("/auth", router);

// ===============================
// ✅ MongoDB connection with improved error handling
// ===============================
// Local fallback connection string
const LOCAL_MONGO_URI = "mongodb://127.0.0.1:27017/aitegdb";

console.log("server started");

console.log("Attempting to connect to MongoDB...");
// Add proper connection options and better error handling
mongoose
  .connect(process.env.MONGO)
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
