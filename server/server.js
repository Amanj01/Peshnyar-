const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'));

// Connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name || file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  // Construct the full URL of the uploaded file
  const filePath = `/images/${req.file.filename}`;
  const fullUrl = `${req.protocol}://${req.get('host')}${filePath}`;
  
  // Return the file's URL to the client
  res.status(200).json({ imageUrl: fullUrl, profilePicture: fullUrl });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/feedBack', require('./routes/feedBack'));

module.exports = (req, res) => {
  return new Promise((resolve, reject) => {
    app(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
