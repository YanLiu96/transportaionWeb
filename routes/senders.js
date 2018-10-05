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

router.findOneSender = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    senders.find({ "_id" : req.params.id },function(err, senders) {
        if(err)
            res.json({ message: 'Sender NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(senders,null,5));
    });
}
module.exports = router;