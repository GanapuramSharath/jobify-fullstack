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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.logout = exports.login = exports.register = void 0;
var http_status_codes_1 = require("http-status-codes");
require("express-async-errors");
var prisma_1 = require("../utils/prisma");
var passwordsUtils_1 = require("../utils/passwordsUtils");
var customError_1 = require("../errors/customError");
var tokenUtils_1 = require("../utils/tokenUtils");
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usersCount, role, hashedPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.prisma.user.count()];
            case 1:
                usersCount = _a.sent();
                role = usersCount === 0 ? "ADMIN" : "USER";
                return [4 /*yield*/, (0, passwordsUtils_1.hashPassword)(req.body.password)];
            case 2:
                hashedPassword = _a.sent();
                return [4 /*yield*/, prisma_1.prisma.user.create({
                        data: {
                            name: req.body.name,
                            email: req.body.email.toLowerCase(),
                            password: hashedPassword,
                            role: role,
                        },
                    })];
            case 3:
                _a.sent();
                res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    msg: "user created",
                });
                return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, isValidPassword, token, oneDay;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.prisma.user.findUnique({
                    where: {
                        email: req.body.email.toLowerCase(),
                    },
                })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new customError_1.UnauthenticatedError("invalid credentials");
                }
                return [4 /*yield*/, (0, passwordsUtils_1.comparePassword)(req.body.password, user.password)];
            case 2:
                isValidPassword = _a.sent();
                if (!isValidPassword) {
                    throw new customError_1.UnauthenticatedError("invalid credentials");
                }
                token = (0, tokenUtils_1.createJWT)({
                    userId: user.id,
                    role: user.role,
                });
                oneDay = 1000 * 60 * 60 * 24;
                res.cookie("token", token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + oneDay),
                    secure: process.env.NODE_ENV === "production",
                });
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    msg: "user logged in",
                });
                return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var logout = function (_req, res) {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(),
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: "user logged out!",
    });
};
exports.logout = logout;
