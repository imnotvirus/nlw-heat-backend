import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
class CreateUserController {
  async handle(req: Request, res: Response) {
    const { email, password, name } = req.body;

    const service = new CreateUserService();
    const result = await service.execute(email, password, name);

    return res.json(result);

  }
}
export { CreateUserController };

