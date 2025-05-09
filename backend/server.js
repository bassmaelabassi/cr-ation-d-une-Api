const express = require('express');
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const cors = require("cors");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();
connectDb();
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 3600000 
  }
}));

app.use(express.json()); 
app.use('/api/auth', authRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));