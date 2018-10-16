let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(require('chai-things'));
chai.use(chaiHttp);
let _ = require('lodash' );

describe('Receiver', function () {
    describe('GET /receivers', () => {
        it('should return all the receivers', function (done) {
            chai.request(server)
                .get('/receivers')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(5);
                    let result = _.map(res.body, (receiver) => {
                        return {_id: receiver._id}
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
    describe('POST /receivers', function () {
        it('should return confirmation message', function (done) {
            let receiver = {
                _id: '131313',
                receiverName: "tsetReceiverName",
                receiverPhoneNumber: "test43535",
                receiverLocation: "idontknow"
            };
            chai.request(server)
                .post('/receivers')
                .send(receiver)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('receiver Successfully Added!');
                    done();
                });
        });
    });
//添加sender的put方法，能够修改sender的电话号码，还有receiver的
    /*
    describe('PUT /senders/:id/changeStatus', () => {
        it('should return a message and the good location  become arrive', function (done) {
            chai.request(server)
                .put('/goods/131313/changeStatus')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    let good = res.body.data;
                    expect(good).to.include({goodsLocation: "arriving at aim city"});
                    done();
                });
        });
    });
*/
    describe('DELETE /receivers/:id',()=>{
        it('should return delete confirmation message ', function(done) {
            chai.request(server)
                .delete('/receivers/131313')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Receiver Successfully Deleted!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/receivers')
                .end(function(err, res) {
                    let result = _.map(res.body, (receiver) => {
                        return { _id: receiver._id};
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
