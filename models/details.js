let mongoose = require('mongoose');
let DetailsSchema = new mongoose.Schema({
        _id:Number,
        kind:String,
       good: {
            goodName: String,
            goodLocation: String,
            deliverman: String,
            delivermanPhoneNumber: String
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
    },
    { collection: 'details' });

module.exports = mongoose.model('details', DetailsSchema);
