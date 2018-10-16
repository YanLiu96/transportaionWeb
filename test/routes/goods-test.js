let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(require('chai-things'));
chai.use(chaiHttp);
let _ = require('lodash' );

describe('Goods', function (){
    describe('GET /goods',  () => {
        it('should return all the donations in an array', function(done) {
            chai.request(server)
                .get('/goods')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(5);
                    let result = _.map(res.body, (goods) => {
                        return { _id: goods._id}
                    });
                    expect(result).to.include( { _id: 10001} );
                    expect(result).to.include( { _id: 10002} );
                    expect(result).to.include( { _id: 10003} );
                    expect(result).to.include( { _id: 10004} );
                    expect(result).to.include( { _id: 10005} );
                    done();
                });
        });

    });
    describe('POST /goods', function () {
        it('should return confirmation message', function(done) {
            let good = {
                _id: '131313' ,
                goodsName: "testname",
                deliveryman: "testdliveryname",
                goodsLocation: "testlocation"
            };
            chai.request(server)
                .post('/goods')
                .send(good)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Good Successfully Added!' );
                    done();
                });
        });
    });
});
