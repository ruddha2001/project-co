"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var express_1 = require("express");
var server_1 = require("../../server");
var AuthenticationController = /** @class */ (function () {
    function AuthenticationController() {
        var _this = this;
        this.router = express_1.Router();
        this.collection = server_1.client.db("projectCO").collection("userDetails");
        this.register = function () {
            _this.router.post("/login", _this.userLogin);
            _this.router.post("/register", _this.userRegister);
            _this.router.get("/logout", _this.userLogout);
            return _this.router;
        };
        this.userLogin = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var email, password, userQuery, compareResponse, token, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body.email;
                        password = req.body.password;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.collection.findOne({ email: email })];
                    case 2:
                        userQuery = _a.sent();
                        if (userQuery == null) {
                            console.log("User was not found");
                            return [2 /*return*/, res.status(401).json({ error: "User not found in database" })];
                        }
                        return [4 /*yield*/, bcrypt.compare(password, userQuery["password"])];
                    case 3:
                        compareResponse = _a.sent();
                        if (!compareResponse) {
                            console.log("Invalid credentials");
                            return [2 /*return*/, res.status(401).json({ error: "Invalid credentials" })];
                        }
                        return [4 /*yield*/, jwt.sign({
                                expiresIn: "1h",
                            }, process.env.SECRET)];
                    case 4:
                        token = _a.sent();
                        res
                            .cookie("token", token, { httpOnly: true })
                            .status(200)
                            .send("User logged in and token stored as a cookie.");
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        console.log(err_1);
                        res.status(500).json({
                            error: "Server faced some unexpected error. Check the log for more details.",
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.userRegister = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var username, email, country, phone, password, emailQuery, hash, insertResponse, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req.body);
                        username = req.body.username;
                        email = req.body.email;
                        country = req.body.country;
                        phone = req.body.phone;
                        password = req.body.password;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.collection.find({ email: email }).toArray()];
                    case 2:
                        emailQuery = _a.sent();
                        if (emailQuery.length != 0) {
                            console.log("User email already exists");
                            return [2 /*return*/, res.status(409).json({ error: "User email already exists" })];
                        }
                        return [4 /*yield*/, bcrypt.hash(password, 14)];
                    case 3:
                        hash = _a.sent();
                        return [4 /*yield*/, this.collection.insertOne({
                                username: username,
                                email: email,
                                country: country,
                                phone: phone,
                                password: hash,
                            })];
                    case 4:
                        insertResponse = _a.sent();
                        res.status(200).send("User registered successfully");
                        return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        console.log(err_2);
                        res.status(500).json({
                            error: "Server faced some unexpected error. Check the log for more details.",
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.userLogout = function (req, res) {
            res.clearCookie("token");
            res.status(200).send("User has been logged out");
        };
    }
    return AuthenticationController;
}());
exports.AuthenticationController = AuthenticationController;