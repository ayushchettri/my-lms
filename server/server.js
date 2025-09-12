const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/loginDemo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error(err));

app.get("/api", (req, res) => {
  res.json({ "users": ["user1", "user2", "user3"] });
});

app.use('/api/auth', authRoutes);

app.listen(4000, () => console.log("🚀 Server started on http://localhost:4000"));
