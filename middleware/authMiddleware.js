"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizePermissions = exports.authenticateUser = void 0;
var customError_1 = require("../errors/customError");
var tokenUtils_1 = require("../utils/tokenUtils");
var authenticateUser = function (req, _res, next) {
    var token = req.cookies.token;
    if (!token) {
        throw new customError_1.UnauthenticatedError("Authentication invalid");
    }
    try {
        var _a = (0, tokenUtils_1.verifyJWT)(token), userId = _a.userId, role = _a.role;
        req.user = {
            userId: userId,
            role: role,
        };
        next();
    }
    catch (_b) {
        throw new customError_1.UnauthenticatedError("Authentication invalid");
    }
};
exports.authenticateUser = authenticateUser;
var authorizePermissions = function () {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return function (req, _res, next) {
        if (!roles.includes(req.user.role)) {
            throw new customError_1.UnauthorizedError("You are not authorized to view this page");
        }
        next();
    };
};
exports.authorizePermissions = authorizePermissions;
