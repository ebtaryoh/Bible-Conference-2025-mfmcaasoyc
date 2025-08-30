import mongoose from "mongoose";

// Your Mongo URI
const MONGO_URI = "mongodb+srv://ibitayoakinnibosun_db_user:StrongPass123@cluster0.nzgmwt7.mongodb.net/mfmcyc_bible_conference25?retryWrites=true&w=majority&appName=Cluster0";

async function testConnection() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully!");

    // Close after test
    await mongoose.connection.close();
    console.log("🔌 Connection closed.");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
}

testConnection();