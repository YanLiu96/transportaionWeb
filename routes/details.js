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
    details.good =req.body.good;
    details.sender = req.body.sender;
    details.receiver = req.body.receiver;
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
