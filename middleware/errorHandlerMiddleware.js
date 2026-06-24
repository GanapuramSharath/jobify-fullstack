"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_codes_1 = require("http-status-codes");
var errorHandlerMiddleware = function (err, _req, res, _next) {
    var _a, _b;
    console.log(err);
    var statusCode = (_a = err.statusCode) !== null && _a !== void 0 ? _a : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    var msg = (_b = err.message) !== null && _b !== void 0 ? _b : "Something went wrong, try again later";
    res.status(statusCode).json({ msg: msg });
};
exports.default = errorHandlerMiddleware;
