let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    name: String,
    userid: String,
    updated_at: { type: Date, default: Date.now },
},{ collection: "User" });

//UserSchema.statics.findOrCreate = require("find-or-create");

module.exports = mongoose.model('User', UserSchema);
