// order表关联order_item表

const OrderModel = require('./model/order.js')

// 查询order表的数据
// OrderModel.find({}, function (err, data) {
//     console.log(data);
// })

// // order表关联order_item
// OrderModel.aggregate([
//     {
//         $lookup: {
//             from: "order_item",//和order_item表关联起来
//             localField: 'order_id',//两个表的order_id相同
//             foreignField: 'order_id',
//             as: "items"//两个表的order_id相同的部分
//         }
//     },
//     {
//         $match: {
//             "all_price": { $gte: 90 }//查询大于90的
//         }
//     }
// ], function (err, data) {
//     if (err) { return console.log(err); }
//     console.log(JSON.stringify(data));
// })

// 查询order_item找出商品名称是酸奶的商品对应的订单订单号以及订单的总价格

//第一种方式 
// const OrderItemModel = require('./model/order_item.js')
// OrderItemModel.find({ '_id': '5b743da92c327f8d1b360546' }, function (err, docs) {
//     const order_item = JSON.parse(JSON.stringify(docs))
//     const order_id = order_item[0].order_id

//     OrderModel.find({ "order_id": order_id }, function (err, order) {
//         order_item[0].order_info = order[0];
//         console.log(order_item);
//     })
// })

// 第二种方式
// mongoose中获取ObjectId   mongoose.Types.ObjectId
const OrderItemModel = require('./model/order_item.js')
const mongoose = require('mongoose')
OrderItemModel.aggregate([
    {
        $lookup: {
            from: "order",//和order_item表关联起来
            localField: 'order_id',//两个表的order_id相同
            foreignField: 'order_id',
            as: "order_info"
        }
    },
    {
        $match: {
            _id: mongoose.Types.ObjectId('5b743da92c327f8d1b360546')//根据id找到酸奶
        }
    }
], function (err, data) {
    if (err) { return console.log(err); }
    console.log(JSON.stringify(data));
})
