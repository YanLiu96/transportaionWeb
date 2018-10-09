let goods = require('../models/goods')
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

var mongodbUri = 'mongodb://YanLiu96:LY19961222..@ds125273.mlab.com:25273/heroku_v7q4gpdm';
mongoose.connect(mongodbUri);

//mongoose.connect('mongodb://localhost:27017/donationsdb');
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

router.addGood = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var good = new goods();
    good._id = req.body._id;
    good.goodsName = req.body.goodsName;
    good.deliveryman = req.body.deliveryman;
    good.goodsLocation =req.body.goodsLocation;
    good.save(function(err) {
        if (err)
            res.json({ message: 'Good NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Good Successfully Added!', data: good });
    });
}
router.deleteGood = (req, res) => {
    goods.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'GOOD NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Good Successfully Deleted!'});
    });
}
module.exports = router;
