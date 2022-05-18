import { Router } from "express";
import { AuthenticateNewUserController } from "./controller/AuthenticateNewUserController";
import { AuthenticateUserController } from "./controller/AuthenticateUserController";
import { CreateMessageController } from "./controller/CreateMessageController";
import { CreateUserController } from "./controller/CreateUserController";
import { GetLast3MessagesController } from "./controller/GetLast3MessagesController";
import { ProfileUserController } from "./controller/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);
router.post("/create-user", new CreateUserController().handle);
router.post("/auth-user", new AuthenticateNewUserController().handle);
router.post(
  "/messages",
  ensureAuthenticated,
  new CreateMessageController().handle
);

router.get("/messages/last3", new GetLast3MessagesController().handle);
router.get("/profile",ensureAuthenticated, new ProfileUserController().handle);

export { router };

