let Details = require('../models/details')
let express = require('express');
let router = express.Router();

router.findDetails = (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    Details.find(function(err, details) {
        if (err)
            res.send(err);
        res.send(JSON.stringify(details,null,5));
    });
}

router.findDetailsByID = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Details.find({ "_id" : req.params.id },function(err, details) {
        if(err)
            res.json({ message: 'NO Information!', errmsg : err } );
        else
            res.send(JSON.stringify(details,null,5));
    });
}
router.addDetails = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var details = new Details();
    details._id = req.body._id;
    details.kind =req.body.kind;

    details.goodName =req.body.goodName;
    details.goodLocation =req.body.goodLocation;
    details.deliveryman =req.body.deliveryman;
    details.deliverymanPhoneNumber =req.body.goodName;

    details.senderName = req.body.senderName;
    details.senderPhoneNumber = req.body.senderPhoneNumber;
    details.senderLocation = req.body.senderLocation;

    details.receiverName = req.body.receiverName;
    details.receiverPhoneNumber = req.body.receiverPhoneNumber;
    details.receiverLocation = req.body.receiverLocation;

    details.freight = req.body.freight;
    details.paymentType = req.body.paymentType;
    details.save(function(err) {
        if (err)
            res.json({ message: 'Details NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Details Successfully Added!', data: details });
    });
}

router.deleteDetails = (req, res) => {
    Details.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Details NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Details Successfully Deleted!'});
    });
}

module.exports = router;
