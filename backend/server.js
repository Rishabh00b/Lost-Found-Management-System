require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ================== MIDDLEWARE ==================
app.use(express.json());

// Allow all origins (important for Render)
app.use(cors({
  origin: "*"
}));

// ================== ROUTES ==================

// Auth routes (login/register)
app.use('/api/auth', require('./routes/auth'));

// Item routes
app.use('/api/items', require('./routes/items'));

// ================== ROOT TEST ==================
app.get('/', (req, res) => {
  res.send("Lost & Found Backend Running 🚀");
});

// ================== DB CONNECTION ==================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log("DB Error:", err));

// ================== SERVER ==================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});