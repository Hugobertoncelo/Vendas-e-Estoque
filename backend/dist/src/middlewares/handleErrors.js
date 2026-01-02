"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = handleErrors;
const AppError_1 = require("../errors/AppError");
function handleErrors(err, req, res, next) {
    if (err instanceof AppError_1.AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    return res.status(500).json({
        success: false,
        status: 'error',
        message: `Erro interno do servidor - ${err.message}`,
    });
}
