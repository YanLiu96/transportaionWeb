let mongoose = require('mongoose');
let GoodSchema = new mongoose.Schema({
        _id:Number,
        goodsName: String,
        goodsKind:String,
        freight:Number,
        deliveryman: {
            deliverymanName:String,
            phoneNumber:String,
        },
        goodsLocation: String
    },{versionKey:false},
    { collection: 'goods' });

module.exports = mongoose.model('goods', GoodSchema);
