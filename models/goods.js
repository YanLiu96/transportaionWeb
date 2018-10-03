let mongoose = require('mongoose');
let GoodSchema = new mongoose.Schema({
        _id:Number,
        goodsName: String,
        Deliveryman: String,
        goodsLocation: String
    },
    { collection: 'goods' });

module.exports = mongoose.model('goods', GoodSchema);