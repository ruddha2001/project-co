"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var server_1 = require("../../server");
var ProfileController = /** @class */ (function () {
    function ProfileController() {
        var _this = this;
        this.router = express_1.Router();
        this.register = function () {
            _this.router.post("/first", _this.processFirst);
            _this.router.post("/second", _this.processSecond);
            return _this.router;
        };
        this.processFirst = function (req, res) {
            var firstName = req.body.fname;
            var lastName = req.body.lname;
            var email = req.body.email;
            var mobile = req.body.mobile;
            var city = req.body.city;
            var country = req.body.country;
            var college = req.body.college;
            var degree = req.body.degree;
            var major = req.body.major;
            var sDate = req.body.sdate;
            var eDate = req.body.edate;
            server_1.connection.query("INSERT INTO `userprofile` (fname, lname, email, mobile, city, country, college, degree, major, sdate, edate) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [
                firstName,
                lastName,
                email,
                mobile,
                city,
                country,
                college,
                degree,
                major,
                sDate,
                eDate,
            ], function (error, results, fields) {
                if (error) {
                    console.log(error);
                    alert("There was some error while processing your data. Please retry.");
                    res.redirect("/register1");
                }
                res.redirect("/register2?email=" + email);
            });
        };
        this.processSecond = function (req, res) {
            console.log(req.body);
            res.sendStatus(200);
        };
    }
    return ProfileController;
}());
exports.ProfileController = ProfileController;
