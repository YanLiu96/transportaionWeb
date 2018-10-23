let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../bin/www");
let expect = chai.expect;
chai.use(require("chai-things"));
chai.use(chaiHttp);
let _ = require("lodash" );

describe("ShipmentDetails", function () {
    describe("GET /shipmentDetails", () => {
        it("should return the all shipmentDetails ", function (done) {
            chai.request(server)
                .get("/shipmentDetails")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(5);
                    let result = _.map(res.body, (shipmentDetails) => {
                        return {_id: shipmentDetails._id};
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

    describe("GET /shipmentDetails/:id", () => {
        it("should return shipmentDetails which id is 10001", function (done) {
            chai.request(server)
                .get("/shipmentDetails/10001")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (shipmentDetails) => {
                        return {_id: shipmentDetails._id};
                    });
                    expect(result).to.include({_id: 10001});
                    done();
                });
        });
        it("should return shipmentDetails not found when ID not existence", function (done) {
            chai.request(server)
                .get("/shipmentDetails/555")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(undefined);
                    expect(res.body).to.have.property("message").equal("shipmentDetails NOT Found!" );
                    done();
                });
        });
    });
    describe("GET /goodAndShipment/:id", () => {
        it("should return the all shipmentDetails which combine with shipment and good collection ", function (done) {
            chai.request(server)
                .get("/goodAndShipment/10001")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (shipmentDetails) => {
                        return {_id: shipmentDetails._id};
                    });
                    expect(result).to.include({_id: 10001});
                    done();
                });
        });
        it("should return sender not found when ID not existence", function (done) {
            chai.request(server)
                .get("/goodAndShipment/555")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(undefined);
                    expect(res.body).to.have.property("message").equal("NO Information!" );
                    done();
                });
        });
    });

    describe("POST /shipmentDetails", function () {
        it("should return confirmation message", function (done) {
            let shipmentDetail = {
                _id:131313,
                numberOfPackage: 2,
                totalWeightInKg:2,
                dimensionsInCM:{
                    length:2,
                    width:2,
                    height:2
                }
            };
            chai.request(server)
                .post("/shipmentDetails")
                .send(shipmentDetail)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message").equal("shipmentDetails Successfully Added!");
                    done();
                });
        });
        it("should return error message when the shipmentDetails not add to the database", function (done) {
            let shipmentDetails = {};
            chai.request(server)
                .post("/shipmentDetails")
                .send(shipmentDetails)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message").equal("shipmentDetails NOT Added!");
                    done();
                });
        });
    });

    describe("DELETE /shipmentDetails/:id",()=>{
        it("should return delete confirmation message ", function(done) {
            chai.request(server)
                .delete("/shipmentDetails/131313")
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message").equal("shipmentDetails Successfully Deleted!" );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get("/shipmentDetails")
                .end(function(err, res) {
                    let result = _.map(res.body, (shipmentDetail) => {
                        return { _id: shipmentDetail._id};
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
