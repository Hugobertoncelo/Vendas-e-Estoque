"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateController = void 0;
const tsyringe_1 = require("tsyringe");
const AuthenticateUserService_service_1 = require("../useCases/Authenticate/AuthenticateUser/AuthenticateUserService.service");
const RefreshTokenService_service_1 = require("../useCases/Authenticate/RefreshToken/RefreshTokenService.service");
class AuthenticateController {
    async authenticateUser(req, res) {
        const { email, password } = req.body;
        const authenticateUserService = tsyringe_1.container.resolve(AuthenticateUserService_service_1.AuthenticateUserService);
        const authenticatedUser = await authenticateUserService.execute({
            email,
            password,
        });
        return res.status(200).json({
            success: true,
            user: authenticatedUser.user,
            token: authenticatedUser.token,
            refreshToken: authenticatedUser.refreshToken,
            message: 'Usuário autenticado com sucesso',
        });
    }
    async refreshToken(req, res) {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const refreshTokenService = tsyringe_1.container.resolve(RefreshTokenService_service_1.RefreshTokenService);
        const { refreshToken, newToken } = await refreshTokenService.execute(token);
        return res.status(200).json({
            success: true,
            token: newToken,
            refreshToken,
            message: "Tokens renovados com sucesso"
        });
    }
}
exports.AuthenticateController = AuthenticateController;
