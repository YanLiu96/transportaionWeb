let mongoose = require('mongoose');
let DetailsSchema = new mongoose.Schema({
        _id:Number,
        kind:String,
        goodName: String,
        goodLocation: String,
        deliveryman: String,
        deliverymanPhoneNumber: String,
        senderName: String,
        senderPhoneNumber: String,
        senderLocation: String,
        receiverName: String,
        receiverPhoneNumber: String,
        receiverLocation: String,
        freight:Number,
        paymentType:String
},{versionKey:false},
    { collection: 'details' });

module.exports = mongoose.model('Details', DetailsSchema);
