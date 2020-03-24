const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const districtRoutes = require('./routes/district');
const calendarRoutes = require('./routes/calendar');
const galleryRoutes = require('./routes/professionalGallery');
const professionRoutes = require('./routes/profession');
const tagRoutes = require('./routes/tag');
const professionalProfileRoute = require('./routes/professionalProfile');

// app
const app = express();

mongoose.connect(
  process.env.DATABASE,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  err => {
    if (!err) console.log('mongodb connected');
    else console.log('error');
  }
);

// middlewares
app.use(morgan('dev'));
// app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(expressValidator());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
  })
);

// routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', districtRoutes);
app.use('/api', calendarRoutes);
app.use('/api', professionRoutes);
app.use('/api', tagRoutes);
app.use('/api', galleryRoutes);
app.use('/api', professionalProfileRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
