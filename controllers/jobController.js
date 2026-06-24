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
exports.showStats = exports.deleteJob = exports.updateJob = exports.createJob = exports.getJob = exports.getAllJobs = void 0;
var http_status_codes_1 = require("http-status-codes");
require("express-async-errors");
var prisma_1 = require("../utils/prisma");
var customError_1 = require("../errors/customError");
var getAllJobs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, search, jobStatus, jobType, sort, where, orderBy, jobs;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, search = _a.search, jobStatus = _a.jobStatus, jobType = _a.jobType, sort = _a.sort;
                where = {
                    createdById: req.user.userId,
                };
                if (search) {
                    where.position = {
                        contains: search,
                        mode: "insensitive",
                    };
                }
                if (jobStatus && jobStatus !== "all") {
                    where.jobStatus = jobStatus;
                }
                if (jobType && jobType !== "all") {
                    where.jobType = jobType;
                }
                orderBy = {
                    createdAt: "desc",
                };
                switch (sort) {
                    case "oldest":
                        orderBy = { createdAt: "asc" };
                        break;
                    case "a-z":
                        orderBy = { position: "asc" };
                        break;
                    case "z-a":
                        orderBy = { position: "desc" };
                        break;
                }
                return [4 /*yield*/, prisma_1.prisma.job.findMany({
                        where: where,
                        orderBy: orderBy,
                    })];
            case 1:
                jobs = _b.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json({ jobs: jobs });
                return [2 /*return*/];
        }
    });
}); };
exports.getAllJobs = getAllJobs;
var getJob = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var job;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.prisma.job.findUnique({
                    where: {
                        id: req.params.id,
                    },
                })];
            case 1:
                job = _a.sent();
                if (!job) {
                    throw new customError_1.NotFoundError("no job with id ".concat(req.params.id));
                }
                res.status(http_status_codes_1.StatusCodes.OK).json({ job: job });
                return [2 /*return*/];
        }
    });
}); };
exports.getJob = getJob;
var createJob = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var job;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.prisma.job.create({
                    data: {
                        company: req.body.company,
                        position: req.body.position,
                        jobStatus: req.body.jobStatus,
                        jobType: req.body.jobType,
                        jobLocation: req.body.jobLocation,
                        createdById: req.user.userId,
                    },
                })];
            case 1:
                job = _a.sent();
                res.status(http_status_codes_1.StatusCodes.CREATED).json({ job: job });
                return [2 /*return*/];
        }
    });
}); };
exports.createJob = createJob;
var updateJob = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var job;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.prisma.job.update({
                    where: {
                        id: req.params.id,
                    },
                    data: req.body,
                })];
            case 1:
                job = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    msg: "job updated",
                    job: job,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.updateJob = updateJob;
var deleteJob = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var job;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.prisma.job.delete({
                    where: {
                        id: req.params.id,
                    },
                })];
            case 1:
                job = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    msg: "job deleted",
                    job: job,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteJob = deleteJob;
var showStats = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var stats, defaultStats, monthlyApplications;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.prisma.job.groupBy({
                    by: ["jobStatus"],
                    where: {
                        createdById: req.user.userId,
                    },
                    _count: {
                        id: true,
                    },
                })];
            case 1:
                stats = _a.sent();
                defaultStats = {
                    pending: 0,
                    interview: 0,
                    declined: 0,
                };
                stats.forEach(function (item) {
                    defaultStats[item.jobStatus] = item._count.id;
                });
                return [4 /*yield*/, prisma_1.prisma.$queryRawUnsafe("\n      SELECT\n        DATE_TRUNC('month', \"createdAt\") AS month,\n        COUNT(*)::int AS count\n      FROM \"Job\"\n      WHERE \"createdById\" = '".concat(req.user.userId, "'\n      GROUP BY month\n      ORDER BY month DESC\n      LIMIT 6\n    "))];
            case 2:
                monthlyApplications = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    defaultStats: defaultStats,
                    monthlyApplications: monthlyApplications,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.showStats = showStats;
