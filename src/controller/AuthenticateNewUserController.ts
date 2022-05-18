import { Request, Response } from "express";
import { AuthenticateNewUserService } from "../services/AuthenticateNewUserService";

class AuthenticateNewUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    const service = new AuthenticateNewUserService();

    try {
      const result = await service.execute(email,password);
      return response.json(result);
    } catch (error) {
      return response.status(401).json(error.message);
    }
  }
}
export { AuthenticateNewUserController };

