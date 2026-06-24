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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multerMiddleware_1 = require("../middleware/multerMiddleware");
var userController_1 = require("../controllers/userController");
var validationMiddleware_1 = require("../middleware/validationMiddleware");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = (0, express_1.Router)();
router.get("/current-user", authMiddleware_1.authenticateUser, userController_1.getCurrentUser);
router.get("/admin/app-stats", authMiddleware_1.authenticateUser, userController_1.getApplicationStats);
router.patch.apply(router, __spreadArray(__spreadArray(["/update-user",
    authMiddleware_1.authenticateUser,
    multerMiddleware_1.default.single("avatar")], validationMiddleware_1.validateUpdateUserInput, false), [userController_1.updateUser], false));
exports.default = router;
