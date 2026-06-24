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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUserInput = exports.validateIdParam = exports.validateJobInput = exports.validateLoginInput = exports.validateRegister = void 0;
var express_validator_1 = require("express-validator");
var prisma_1 = require("../utils/prisma");
var customError_1 = require("../errors/customError");
var constants_1 = require("../utils/constants");
var withValidationErrors = function (validateValues) {
    return __spreadArray(__spreadArray([], validateValues, true), [
        function (req, _res, next) {
            var _a, _b;
            var errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                var errorMessages = errors.array().map(function (err) { return String(err.msg); });
                if ((_a = errorMessages[0]) === null || _a === void 0 ? void 0 : _a.startsWith("no job")) {
                    throw new customError_1.NotFoundError(errorMessages[0]);
                }
                if ((_b = errorMessages[0]) === null || _b === void 0 ? void 0 : _b.startsWith("not authorized")) {
                    throw new customError_1.UnauthorizedError("not authorized to access this route");
                }
                throw new customError_1.BadRequestError(errorMessages.join(", "));
            }
            next();
        },
    ], false);
};
exports.validateRegister = withValidationErrors([
    (0, express_validator_1.body)("name").notEmpty().withMessage("name is required"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email format")
        .custom(function (email) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma_1.prisma.user.findUnique({
                        where: { email: email },
                    })];
                case 1:
                    user = _a.sent();
                    if (user) {
                        throw new customError_1.BadRequestError("email already exists");
                    }
                    return [2 /*return*/, true];
            }
        });
    }); }),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 8 })
        .withMessage("password must be at least 8 characters long"),
    (0, express_validator_1.body)("location").notEmpty().withMessage("location is required"),
    (0, express_validator_1.body)("lastName").notEmpty().withMessage("lastname is required"),
]);
exports.validateLoginInput = withValidationErrors([
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email format"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("password is required"),
]);
exports.validateJobInput = withValidationErrors([
    (0, express_validator_1.body)("company").notEmpty().withMessage("company is required"),
    (0, express_validator_1.body)("position").notEmpty().withMessage("position is required"),
    (0, express_validator_1.body)("jobLocation").notEmpty().withMessage("job location is required"),
    (0, express_validator_1.body)("jobStatus")
        .isIn(Object.values(constants_1.JOB_STATUS))
        .withMessage("invalid status value"),
    (0, express_validator_1.body)("jobType")
        .isIn(Object.values(constants_1.JOB_TYPE))
        .withMessage("invalid type value"),
]);
exports.validateIdParam = withValidationErrors([
    (0, express_validator_1.param)("id").custom(function (value_1, _a) { return __awaiter(void 0, [value_1, _a], void 0, function (value, _b) {
        var job, isAdmin, isOwner;
        var req = _b.req;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, prisma_1.prisma.job.findUnique({
                        where: {
                            id: value,
                        },
                    })];
                case 1:
                    job = _c.sent();
                    if (!job) {
                        throw new customError_1.NotFoundError("no job with id ".concat(value));
                    }
                    isAdmin = req.user.role === "ADMIN";
                    isOwner = req.user.userId === job.createdById;
                    if (!isAdmin && !isOwner) {
                        throw new customError_1.UnauthorizedError("not authorized to access this route");
                    }
                    return [2 /*return*/, true];
            }
        });
    }); }),
]);
exports.validateUpdateUserInput = withValidationErrors([
    (0, express_validator_1.body)("name").notEmpty().withMessage("name is required"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email format")
        .custom(function (email_1, _a) { return __awaiter(void 0, [email_1, _a], void 0, function (email, _b) {
        var user;
        var req = _b.req;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, prisma_1.prisma.user.findUnique({
                        where: { email: email },
                    })];
                case 1:
                    user = _c.sent();
                    if (user && user.id !== req.user.userId) {
                        throw new customError_1.BadRequestError("email already exists");
                    }
                    return [2 /*return*/, true];
            }
        });
    }); }),
    (0, express_validator_1.body)("location").notEmpty().withMessage("location is required"),
    (0, express_validator_1.body)("lastName").notEmpty().withMessage("last name is required"),
]);
