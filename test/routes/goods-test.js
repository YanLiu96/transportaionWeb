let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../bin/www");
let expect = chai.expect;
chai.use(require("chai-things"));
chai.use(chaiHttp);
let _ = require("lodash" );

describe("Goods", function () {
    describe("GET /goods", () => {
        it("should return all the goods in an array", function (done) {
            chai.request(server)
                .get("/goods")
                .end((err, res) => {
                    //expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(5);
                    let result = _.map(res.body, (goods) => {
                        return {_id: goods._id};
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

    describe("POST /goods", function () {
        it("should return confirmation message", function (done) {
            let good = {
                _id: "131313",
                goodsName: "testname",
                goodsKind: "testKind",
                freight:111,
                deliveryman: {
                    deliverymanName:"liuyan",
                    phoneNumber:"110",
                },
                goodsLocation: "testlocation",

            };
            chai.request(server)
                .post("/goods")
                .send(good)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message").equal("Good Successfully Added!");
                    done();
                });
        });
    });

    describe("GET /goods/:id", () => {
        it("should return good which id is test_id:131313", function (done) {
            chai.request(server)
                .get("/goods/131313")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (goods) => {
                        return {_id: goods._id};
                    });
                    expect(result).to.include({_id: 131313});
                    done();
                });
        });
    });

    describe("PUT /goods/:id/changeLocation/:location", () => {
        it("should change th good location to testLocation", function (done) {
            chai.request(server)
                .put("/goods/131313/changeLocation/testLocation")
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    let good = res.body.data;
                    expect(good).to.include({goodsLocation: "testLocation"});
                    done();
                });
        });
    });

    describe("PUT /goods/:id/changeDeliveryman/:name/:phoneNumber", () => {
        it("should change the name and phone number of delivery man ", function (done) {
            chai.request(server)
                .put("/goods/131313/changeDeliveryman/testName/666666666666")
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message").equal("Delivery man name and phone number change!" );
                    done();
                });
        });
    });

    describe("DELETE /goods/:id",()=>{
        it("should return delete confirmation message ", function(done) {
            chai.request(server)
                .delete("/goods/131313")
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message").equal("Good Successfully Deleted!" );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get("/goods")
                .end(function(err, res) {
                    let result = _.map(res.body, (good) => {
                        return { _id: good._id};
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
