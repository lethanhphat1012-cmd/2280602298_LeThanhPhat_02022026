var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config(); 
const mongoose = require('mongoose');

var app = express();

// 1. KẾT NỐI DATABASE (Nên đặt ở đầu để đảm bảo DB sẵn sàng)
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Kết nối MongoDB thành công!'))
  .catch((err) => console.error('Lỗi kết nối MongoDB:', err));

// 2. VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 3. MIDDLEWARES
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 4. ROUTES (Hãy kiểm tra kỹ link ở đây)
app.use('/api/v1/', require('./routes/index'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/products', require('./routes/products')); // Thêm lại api/v1 cho thống nhất
app.use('/api/v1/categories', require('./routes/categories'));

// 5. CATCH 404
app.use(function(req, res, next) {
  next(createError(404));
});

// 6. ERROR HANDLER
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;