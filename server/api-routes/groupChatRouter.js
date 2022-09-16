import { Router } from "express";
import * as GroupChatController from "../core/GroupChat/GroupChatController.js";
import { authorizationChecker } from "../middleware/athorizationChecker.js";

const groupChatRouter = new Router();
groupChatRouter.post("/", authorizationChecker, GroupChatController.create);
groupChatRouter.get("/:id", authorizationChecker, GroupChatController.getById);

export { groupChatRouter };