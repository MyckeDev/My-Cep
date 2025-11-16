const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ---- IN-MEMORY DATABASE ----
let users = [];
let idCounter = 1;

// ---- ROUTE: REGISTER USER ----
app.post("/register", (req, res) => {
    const { name, email, address } = req.body;

    if (!name || !email || !address) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const newUser = {
        id: idCounter++,
        name,
        email,
        address,
        created_at: new Date()
    };

    users.push(newUser);

    res.json({ message: "User registered successfully!" });
});

// ---- ROUTE: GET ALL USERS ----
app.get("/users", (req, res) => {
    const sorted = [...users].sort((a, b) => b.id - a.id);
    res.json(sorted);
});

// ---- START SERVER ----
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000 (IN-MEMORY MODE)");
});
