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
    var details = new details();
    details._id = req.body._id;
    details.save(function (err) {
        if (err)
            res.json({message: 'Good NOT Added!', errmsg: err});
        else
            res.json({message: 'Good Successfully Added!',data:details});
    });

}
module.exports = router;
