let details = require('../models/details')
let express = require('express');
let router = express.Router();

router.findDetails = (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    details.find(function(err, details) {
        if (err)
            res.send(err);
        res.send(JSON.stringify(details,null,5));
    });
}

router.findDetailsByID = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    details.find({ "_id" : req.params.id },function(err, details) {
        if(err)
            res.json({ message: 'NO Information!', errmsg : err } );
        else
            res.send(JSON.stringify(details,null,5));
    });
}

router.addDetails = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    /*
    var details = new details();
    details._id =req.body._id;
    details.kind =req.body.kind;
    details.good = {goodName:req.body.good.goodName,
                    goodLocation:req.body.good.goodLocation,
                    deliverman: req.body.good.deliverman,
                    delivermanPhoneNumber:req.body.good.delivermanPhoneNumber
    };
    details.sender = {};
    details.receiver ={};
    details.freight = req.body.freight;
    details.paymentType = req.body.paymentType;

    details.save(function(err) {
        if (err)
            res.json({ message: 'details NOT Added!', errmsg : err } );
        else{
            res.json({ message: 'details Successfully Added!'});
    });
  */
    db.details.save({ _id : 10010,
        kind : "Large goods",
        good : { goodName : "Car", goodLocation : "in the highway road", deliverman : "d5", delivermanPhoneNumber : "111111111" },
        sender : { senderName : "Yan Liu", senderPhoneNumber : "15261820009", senderLocation: "BeiJing" },
        receiver : { receiverName : "David", receiverPhoneNumber : "434234235", receiverLocation : "XXXXXXX" },
        freight : 1000,
        paymentType : "bank card" }
    );

}

module.exports = router;
