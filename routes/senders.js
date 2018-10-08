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

router.addSender = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var sender = new senders();
    sender._id = req.body._id;
    sender.sendersName = req.body.sendersName;
    sender.senderPhoneNumber = req.body.senderPhoneNumber;
    sender.senderLocation =req.body.senderLocation;

    sender.save(function(err) {
        if (err)
            res.json({ message: 'Sender NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Sender Successfully Added!', data: sender });
    });
}
module.exports = router;
