"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var jobController_1 = require("../controllers/jobController");
var validationMiddleware_1 = require("../middleware/validationMiddleware");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = (0, express_1.Router)();
router.get("/stats", authMiddleware_1.authenticateUser, jobController_1.showStats);
(_a = router
    .route("/")
    .get(authMiddleware_1.authenticateUser, jobController_1.getAllJobs))
    .post.apply(_a, __spreadArray(__spreadArray([authMiddleware_1.authenticateUser], validationMiddleware_1.validateJobInput, false), [jobController_1.createJob], false));
(_b = (_c = (_d = router
    .route("/:id"))
    .get.apply(_d, __spreadArray(__spreadArray([authMiddleware_1.authenticateUser], validationMiddleware_1.validateIdParam, false), [jobController_1.getJob], false)))
    .patch.apply(_c, __spreadArray(__spreadArray(__spreadArray([authMiddleware_1.authenticateUser], validationMiddleware_1.validateIdParam, false), validationMiddleware_1.validateJobInput, false), [jobController_1.updateJob], false)))
    .delete.apply(_b, __spreadArray(__spreadArray([authMiddleware_1.authenticateUser], validationMiddleware_1.validateIdParam, false), [jobController_1.deleteJob], false));
exports.default = router;
