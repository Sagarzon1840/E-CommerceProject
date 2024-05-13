"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerGlobalMiddleware = void 0;
function LoggerGlobalMiddleware(req, res, next) {
    const time = new Date();
    console.log(`Method ${req.method} in route ${req.url} on ${time}`);
    next();
}
exports.LoggerGlobalMiddleware = LoggerGlobalMiddleware;
//# sourceMappingURL=logger.js.map