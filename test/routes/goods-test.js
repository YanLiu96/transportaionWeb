let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../bin/www");
let good = require("../../models/goods");
let expect = chai.expect;
chai.use(require("chai-things"));
chai.use(chaiHttp);
let _ = require("lodash" );

describe("Goods", function () {
    beforeEach((done) => { //Before each test we empty the database
        good.deleteMany({}, (err) => {
        });
        //add the test case to test
        good.insertMany([
            {
                _id: 10001,
                goodsName: "Iphone X",
                goodsKind: "expensive",
                freight: 12.5,
                deliverymanName: "d1",
                deliverymanUpvotes:0,
                goodsLocation: "at waterford"
            },
            {
                _id: 10002,
                goodsName: "Mac Pro",
                goodsKind: "expensive",
                freight: 28.4,
                deliverymanName: "d2",
                deliverymanUpvotes:0,
                goodsLocation: "In the transfer station"
            },
            {
                _id: 10003,
                goodsName: "AJ 1",
                goodsKind: "soft",
                freight: 12.6,
                deliveryman: "d3",
                deliverymanUpvotes:0,
                goodsLocation: "In the pass station"
            },
            {
                _id: 10004,
                goodsName: "Superme",
                goodsKind: "clothes",
                freight: 12.8,
                deliveryman: "d4",
                deliverymanUpvotes:0,
                goodsLocation: "still not send"
            },
            {
                _id: 10005,
                goodsName: "Car",
                goodsKind: "expensive",
                freight: 21,
                deliveryman: "d5",
                deliverymanUpvotes:0,
                goodsLocation: "arriving at aim city"
            }
        ], (err) => {
            done();
        });
    });

    describe("GET /goods", () => {
        it("should return all the goods in an array", function (done) {
            chai.request(server)
                .get("/goods")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(5);
                    let result = _.map(res.body, (goods) => {
                        return {_id: goods._id,goodsName:goods.goodsName,goodsKind:goods.goodsKind};
                    });
                    expect(result).to.include({_id: 10001,goodsName:"Iphone X",goodsKind:"expensive"});
                    expect(result).to.include({_id: 10002,goodsName:"Mac Pro",goodsKind:"expensive"});
                    expect(result).to.include({_id: 10003,goodsName:"AJ 1",goodsKind:"soft"});
                    expect(result).to.include({_id: 10004,goodsName:"Superme",goodsKind:"clothes"});
                    expect(result).to.include({_id: 10005,goodsName:"Car",goodsKind:"expensive"});
                    done();
                });
        });

    });


    describe("GET /goods/:id", () => {
        it("should return good which id is test_id:10001", function (done) {
            chai.request(server)
                .get("/goods/10001")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (goods) => {
                        return {_id: goods._id,goodsName:goods.goodsName,goodsKind:goods.goodsKind};
                    });
                    expect(result).to.include({_id: 10001,goodsName:"Iphone X",goodsKind:"expensive"});
                    done();
                });
        });
        it("should return good not found when ID not existence", function (done) {
            chai.request(server)
                .get("/goods/555")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(undefined);
                    expect(res.body).to.have.property("message").equal("Good NOT Found!" );
                    done();
                });
        });
    });

    describe("POST /goods", ()=> {
        it("should return confirmation message and database changes", function (done) {
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
        after(function(done) {
            chai.request(server)
                .get("/goods")
                .end(function(err, res) {
                    let result = _.map(res.body, (good) => {
                        return { _id: good._id};
                    }  );
                    expect(res.body.length).to.equal(6);
                    expect(result).to.include({_id: 131313});
                    done();
                });
        });
    });

    describe("POST /goods", ()=> {
        it("should return error message when the goods not add to the database", function (done) {
            let good = {};
            chai.request(server)
                .post("/goods")
                .send(good)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message").equal("Good NOT Added!");
                    done();
                });


        });
    });

    describe("PUT /goods/:id/changeLocation/:location", () => {
        it("should change th good location to testLocation", function (done) {
            chai.request(server)
                .put("/goods/10001/changeLocation/testLocation")
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    let good = res.body.data;
                    expect(good).to.include({goodsLocation: "testLocation"});
                    done();
                });
        });
        it("should return a 404 error for invalid good id", function(done) {
            chai.request(server)
                .put("/goods/1100001/changeLocation")
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    done();
                });
        });

    });

    describe("PUT /goods/:id/changeDeliveryman/:name/:phoneNumber", () => {
        it("should change the name and phone number of delivery man ", function (done) {
            chai.request(server)
                .put("/goods/10001/changeDeliveryman/testName/666666666666")
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    let good = res.body.data;
                    expect(good.deliveryman).to.include({deliverymanName:"testName",phoneNumber:"666666666666"});
                    expect(res.body).to.have.property("message").equal("Delivery man name and phone number change!" );
                    done();
                });
        });
        it("should return a 404 error for invalid good id to change deliveryman information", function(done) {
            chai.request(server)
                .put("/goods/1100001/changeDeliveryman/")
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });


    describe("DELETE /goods/:id",()=>{
        it("should return delete confirmation message and database changes ", function(done) {
            chai.request(server)
                .delete("/goods/10005")
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message").equal("Good Successfully Deleted!" );
                    done();
                });
        });
        after(function(done) {
            chai.request(server)
                .get("/goods")
                .end(function(err, res) {
                    let result = _.map(res.body, (good) => {
                        return { _id: good._id};
                    }  );
                    expect(res.body.length).to.equal(4);
                    expect(result).to.not.include({_id: 10005});
                    done();
                });
        });

    });
    describe("DELETE /goods/:id",()=>{
        it("should return an error message when an invalid ID is given", function(done) {
            chai.request(server)
                .delete("/goods/dsdsd")
                .end( (err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.include("GOOD NOT DELETED!" ) ;
                    done();
                });
        });
    });
});
