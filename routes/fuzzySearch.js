let fuzzyGoods = require('../models/goods')
let fuzzySenders = require('../models/senders')
let express = require('express')
let router = express.Router();
router.FuzzySearchGoodOrSenderOrReceiverName = (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    var keyword = req.params.keyword;
    fuzzyGoods.aggregate([
        {
            $lookup:{
                from:"senders",
                localField: "_id",
                foreignField:"_id",
                as:"senders",
            }},

        {
            $lookup:{
                from:"receivers",
                localField: "_id",
                foreignField:"_id",
                as:"receivers",
            }},

        {
            $project:{
                "senders._id":0,
                "receivers._id":0
            }},
        {
            $match:{
                $or: [  // 多字段同时匹配
                    {goodsName:{$regex:keyword,$options: '$i'}},
                    {senders:{ $elemMatch:{sendersName:{$regex:keyword,$options: '$i'}}}},
                    {receivers:{ $elemMatch:{receiverName:{$regex:keyword,$options: '$i'}}}}
            ]}}

    ],function (err,details) {
        if(err)
            res.json({ message: 'NO Information!', errmsg : err } );
        else
            res.send(JSON.stringify(details,null,5));

    });


}
module.exports = router;
