// order表关联order_item表

const OrderModel = require('./model/order.js')

// 查询order表的数据
OrderModel.find({}, function (err, data) {
    console.log(data);
})

// order表关联order_item
OrderModel.aggregate([
    {
        $lookup: {
            from: "order_item",//和order_item表关联起来
            localField: 'order_id',//两个表的order_id相同
            foreignField: 'order_id',
            as: "items"//两个表的order_id相同的部分
        }
    },
    {
        $match: {
            "all_price": { $gte: 90 }//查询大于90的
        }
    }
], function (err, data) {
    if (err) { return console.log(err); }
    console.log(JSON.stringify(data));
})


