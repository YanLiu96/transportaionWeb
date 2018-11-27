let mongoose = require("mongoose");
let GoodSchema = new mongoose.Schema({
    //senderId:Number,
   // receiverID:Number,
    goodsName: String,
    goodsKind:String,
    freight:Number,
    deliveryman:String,
    deliverymanUpvotes:{type: Number, default: 0},
    goodsLocation: String
},{versionKey:false},
{ collection: "goods" });

module.exports = mongoose.model("goods", GoodSchema);
