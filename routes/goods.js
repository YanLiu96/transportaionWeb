let goods = require('../models/goods')
let express = require('express');
let router = express.Router();

let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/transportation')
let db = mongoose.connection;
db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});


router.findAllGoods = (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    goods.find(function(err, goods) {
        if (err)
            res.send(err);
        res.send(JSON.stringify(goods,null,5));
    });
}

router.findOneGood = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    goods.find({ "_id" : req.params.id },function(err, goods) {
        if(err)
            res.json({ message: 'Good NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(goods,null,5));
        // return the donation
    });
}

module.exports = router;