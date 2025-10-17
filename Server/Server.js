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

// Updated CORS configuration for Vercel deployment
app.use(
  cors({
    origin: function (origin, callback) {
      // For Vercel serverless functions, we need to be more permissive
      // with preflight checks
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked origin:", origin);
        // Still allow the request to proceed but with restricted CORS
        callback(null, false);
      }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

// Set explicit CORS headers for all routes
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Always set these headers for better Vercel compatibility
  res.header("Access-Control-Allow-Origin", origin && allowedOrigins.includes(origin) ? origin : "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  next();
});

// Debug middleware
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
