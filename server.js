require("dotenv").config(); // ✅ Load .env first

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Check if MONGODB_URL exists
if (!process.env.MONGODB_URL) {
  console.error("❌ Missing MONGODB_URL in environment variables");
  process.exit(1); // Stop the app if not set
}

console.log("📦 MONGODB_URL loaded successfully");

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ DB Error:", err.message);
    process.exit(1); // Stop if DB connection fails
  });

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
