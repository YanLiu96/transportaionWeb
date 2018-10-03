let senders = require('../models/senders')
let express = require('express');
let router = express.Router();



router.findAllSenders = (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    senders.find(function(err, goods) {
        if (err)
            res.send(err);
        res.send(JSON.stringify(goods,null,5));
    });
}

module.exports = router;