import { Router } from "express";
import { groupChatRouter } from "./groupChatRouter.js";
import { userRouter } from "./userRouter.js";

const apiRouter = new Router();
apiRouter.use("/users", userRouter);
apiRouter.use("/groupchats", groupChatRouter);
// router.use("/messages", userRouter);
// router.use("/chats", userRouter);
export { apiRouter };
