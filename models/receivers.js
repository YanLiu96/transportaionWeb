let mongoose = require('mongoose');
let ReceiverSchema = new mongoose.Schema({
        _id:Number,
        receiverName: String,
        receiverPhoneNumber: String,
        receiverLocation: String
    },
    { collection: 'receivers' });

module.exports = mongoose.model('receivers', ReceiverSchema);