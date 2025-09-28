const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
{/*LOGIN */}
  const users = [
    { username: "ayush", password: "12345", role: "admin" },
    { username: "aakansh", password: "12345", role: "teacher"},
    { username: "ashish", password: "12345", role: "student" }
  ];
  app.post("/api/login", (req, res) => {
    const { username, password, role} = req.body;
    const user = users.find(
      (u) => u.username === username && u.password === password && u.role === role
    );
    if (user) {
      res.json({ success: true, message: "Login successful", role: user.role});
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

app.listen(4000, () => console.log("🚀 Server started on http://localhost:4000"));
