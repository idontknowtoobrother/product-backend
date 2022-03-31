var express = require('express');
const cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productsRouter = require('./routes/products')
const authRouter = require('./routes/auth')
const eventRouter = require('./routes/events')
const dotenv = require('dotenv');
dotenv.config();
const { authMiddleware, authorizeMiddleware } = require('./helper/auth') 
const { ROLES } = require('./constant')

// const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/example')
var app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', authMiddleware, authorizeMiddleware([ROLES.ADMIN, ROLES.LOCAL_ADMIN]), usersRouter);
app.use('/products', authMiddleware, authorizeMiddleware([ROLES.ADMIN, ROLES.LOCAL_ADMIN]), productsRouter)
app.use('/auth', authRouter)
app.use('/events', eventRouter)

module.exports = app;
