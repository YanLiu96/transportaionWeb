let fuzzyDetails = require('../models/details')
let express = require('express');
let router = express.Router();
router.kindFuzzySearch = (req,res)=>{
    var keyword = req.params.keyword;
    var _filter={
        $or: [  // 多字段同时匹配
              {goodName:{$regex:keyword,$options: '$i'}},
              {senderName:{$regex:keyword,$options: '$i'}},
              {receiverName:{$regex:keyword,$options: '$i'}},
              {paymentType:{$regex:keyword,$options: '$i'}},
              {kind: {$regex: keyword, $options: '$i'}}
        ]
    }

    fuzzyDetails.find(_filter).limit(10).exec(function (err, doc) { // 回调
        if (err) {
            res.send({ message: 'NOT Found!', errmsg : err } );
        } else {
            res.send(JSON.stringify(doc,null,5));
        }
    })

}
module.exports = router;
