// 1、引入mongoose
const mongoose = require('mongoose');
// 2、建立连接
mongoose.connect('mongodb://127.0.0.1:27017/wqs', { useNewUrlParser: true }, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('数据库连接成功');
});

module.exports = mongoose