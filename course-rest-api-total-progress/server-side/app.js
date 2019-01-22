const path = require('path');
const uuidv4 = require('uuid/v4');
const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://ariel:12131415@cluster0-4a0ak.mongodb.net/messages?retryWrites=true';
const multer = require('multer');
const feedRoutes = require('./routes/feed');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

const app = express();


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'images');
  },
  filename: function(req, file, cb) {
      cb(null, uuidv4() + '-' + file.originalname)
  }
});

const fileFilter = (req, file, cb) => { 
  console.log(file);
  
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

// app.use(bodyParser.urlencoded()); for form x-www-form-urlencoded 
app.use(bodyParser.json()); // application/json

app.use(multer({storage: storage, fileFilter: fileFilter}).single('image'))

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes); 
app.use('/user', userRoutes);
 
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
})
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).then(result => {
  const server = app.listen(8080)
  const io = require('./socket').init(server);
  io.on('connection', socket => {
    console.log('Client connected!');
  })
}).catch(err => console.log(err) 
); 