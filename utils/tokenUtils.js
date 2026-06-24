"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.createJWT = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var createJWT = function (payload) {
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};
exports.createJWT = createJWT;
var verifyJWT = function (token) {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
};
exports.verifyJWT = verifyJWT;
