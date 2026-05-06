const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/testdb")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Error:", err));

// Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model("User", UserSchema);

// ================= ROUTES =================

// CREATE USER
app.post("/addUser", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        res.json({
            success: true,
            message: "User Added"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error adding user"
        });
    }
});

// GET USERS
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();

        res.json({
            success: true,
            data: users
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching users"
        });
    }
});

// DELETE USER
app.delete("/deleteUser/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "User Deleted"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error deleting user"
        });
    }
});

// ================= SERVER =================

app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});