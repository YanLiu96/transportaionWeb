let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(require('chai-things'));
chai.use(chaiHttp);
let _ = require('lodash' );
//git reset --hard HEAD~6回到最初版本
describe('Details', function () {
    describe('GET /details', () => {
        it('should return all the details in an array', function (done) {
            chai.request(server)
                .get('/details')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(5);
                    let result = _.map(res.body, (details) => {
                        return {_id: details._id}
                    });
                    expect(result).to.include({_id: 10001});
                    expect(result).to.include({_id: 10002});
                    expect(result).to.include({_id: 10003});
                    expect(result).to.include({_id: 10004});
                    expect(result).to.include({_id: 10005});
                    done();
                });
        });

    });
    describe('POST /details', function () {
        it('should return confirmation message', function (done) {
            let details = {
                _id:131313,
                kind:"testkind",
                goodName: "testName",
                goodLocation: "testLocation",
                deliveryman: "testName",
                deliverymanPhoneNumber: "testNumber",
                senderName: "testName",
                senderPhoneNumber: "TestPN",
                senderLocation: "testSLocation",
                receiverName: "testRName",
                receiverPhoneNumber: "testRN",
                receiverLocation: "testRLocation",
                freight:12121,
                paymentType:"testP"
            };
            chai.request(server)
                .post('/details')
                .send(details)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Details Successfully Added!');
                    done();
                });
        });
    });


    describe('DELETE /details/:id',()=>{
        it('should return delete confirmation message ', function(done) {
            chai.request(server)
                .delete('/details/131313')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Details Successfully Deleted!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/details')
                .end(function(err, res) {
                    let result = _.map(res.body, (details) => {
                        return { _id: details._id};
                    }  );
                    expect(res.body.length).to.equal(5);
                    expect(result).to.include({_id: 10001});
                    expect(result).to.include({_id: 10002});
                    expect(result).to.include({_id: 10003});
                    expect(result).to.include({_id: 10004});
                    expect(result).to.include({_id: 10005});
                    done();
                });
        });
    })
});
