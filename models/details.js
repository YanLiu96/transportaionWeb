let mongoose = require('mongoose');
let DetailsSchema = new mongoose.Schema({
        _id:Number,
        kind:String,
        good: {
            goodName: String,
            goodLocation: String,
            deliveryman: String,
            deliverymanPhoneNumber: String
        },
        sender:{
            senderName: String,
            senderPhoneNumber: String,
            senderLocation: String
        },

        receiver:{
            receiverName: String,
            receiverPhoneNumber: String,
            receiverLocation: String
        },
        freight:Number,
        paymentType:String
},{versionKey:false},
    { collection: 'details' });

module.exports = mongoose.model('Details', DetailsSchema);
