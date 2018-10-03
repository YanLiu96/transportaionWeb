let receivers = require('../models/receivers')
let express = require('express');
let router = express.Router();


router.findAllReceivers = (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    receivers.find(function(err, receivers) {
        if (err)
            res.send(err);
        res.send(JSON.stringify(receivers,null,5));
    });
}

module.exports = router;