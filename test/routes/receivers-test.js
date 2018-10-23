let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../bin/www");
let expect = chai.expect;
chai.use(require("chai-things"));
chai.use(chaiHttp);
let _ = require("lodash" );

describe("Receiver", function () {
    describe("GET /receivers", () => {
        it("should return all the receivers", function (done) {
            chai.request(server)
                .get("/receivers")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(5);
                    let result = _.map(res.body, (receiver) => {
                        return {_id: receiver._id};
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
    describe("POST /receivers", function () {
        it("should return confirmation message", function (done) {
            let receiver = {
                _id: "131313",
                receiverName: "tsetReceiverName",
                receiverPhoneNumber: "test43535",
                receiverCountry:"testCountry",
                receiverAddress:"testAddress",
                postcode:"testcode"
            };
            chai.request(server)
                .post("/receivers")
                .send(receiver)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message").equal("receiver Successfully Added!");
                    done();
                });
        });
        it("should return error message when the receivers not add to the database", function (done) {
            let receiver = {};
            chai.request(server)
                .post("/receivers")
                .send(receiver)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message").equal("receiver NOT Added!");
                    done();
                });
        });
    });

    describe("GET /receivers/:id", () => {
        it("should return sender which id is test_id:131313", function (done) {
            chai.request(server)
                .get("/receivers/131313")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (receiver) => {
                        return {_id: receiver._id};
                    });
                    expect(result).to.include({_id: 131313});
                    done();
                });
        });
        it("should return receiver not found when ID not existence", function (done) {
            chai.request(server)
                .get("/receivers/555")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(undefined);
                    expect(res.body).to.have.property("message").equal("Receiver NOT Found!" );
                    done();
                });
        });
    });
    describe("PUT /receivers/:id/changePhoneNumber/:phoneNumber", () => {
        it("should change th receiver phone number to 11223344", function (done) {
            chai.request(server)
                .put("/receivers/131313/changePhoneNumber/11223344")
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    let receiver = res.body.data;
                    expect(receiver).to.include({receiverPhoneNumber: "11223344"});
                    done();
                });
        });
    });
    describe("PUT /receivers/:id/changeAddress/:address", () => {
        it("should change th receiver address  to testaddress", function (done) {
            chai.request(server)
                .put("/receivers/131313/changeAddress/testaddress")
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    let receiver = res.body.data;
                    expect(receiver).to.include({receiverAddress: "testaddress"});
                    done();
                });
        });
    });
    describe("DELETE /receivers/:id",()=>{
        it("should return delete confirmation message ", function(done) {
            chai.request(server)
                .delete("/receivers/131313")
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message").equal("Receiver Successfully Deleted!" );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get("/receivers")
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
    });
});
