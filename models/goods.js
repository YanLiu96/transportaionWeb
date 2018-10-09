let mongoose = require('mongoose');
let GoodSchema = new mongoose.Schema({
        _id:Number,
        goodsName: String,
        deliveryman: String,
        goodsLocation: String
    },{versionKey:false},
    { collection: 'goods' });

module.exports = mongoose.model('goods', GoodSchema);
