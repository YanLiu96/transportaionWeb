let mongoose = require('mongoose');
let SenderSchema = new mongoose.Schema({
        _id:Number,
        sendersName: String,
        senderPhoneNumber: String,
        senderLocation: String
    },{versionKey:false},
    { collection: 'senders' });

module.exports = mongoose.model('senders', SenderSchema);
