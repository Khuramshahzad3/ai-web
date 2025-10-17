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

// Updated CORS configuration to prevent redirect issues
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log("Blocked origin:", origin);
        callback(null, false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400, // Cache preflight request for 24 hours
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    preflightContinue: false // Important for preventing redirects on preflight
  })
);

// FIX: Remove the problematic app.options line
// Instead, handle OPTIONS requests properly
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} from origin: ${req.headers.origin}`);
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
