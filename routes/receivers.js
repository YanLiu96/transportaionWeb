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

router.findOneReceiver = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    receivers.find({ "_id" : req.params.id },function(err, receivers) {
        if(err)
            res.json({ message: 'Receiver NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(receivers,null,5));
    });
}

router.addReceiver = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var receiver = new receivers();
    receiver._id = req.body._id;
    receiver.receiverName = req.body.receiverName;
    receiver.receiverPhoneNumber = req.body.receiverPhoneNumber;
    receiver.receiverLocation =req.body.receiverLocation;

    receiver.save(function(err) {
        if (err)
            res.json({ message: 'receiver NOT Added!', errmsg : err } );
        else
            res.json({ message: 'receiver Successfully Added!', data: receiver });
    });
}
module.exports = router;
