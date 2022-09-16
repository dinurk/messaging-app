import { sequelize } from "../database.js";
import { log } from "../utils/logger.js";
import { GroupChatModel } from "./GroupChat/GroupChatModel.js";
import { GroupChatMessageModel } from "./GroupChatMessage/GroupChatMessageModel.js";
import { UserModel } from "./User/UserModel.js";

async function synchronizeModels() {
    try {
        sequelize.sync();
    } catch (e) {
        log("synchronizeModels: не удалось произвести синхронизацию моделей");
        process.exit(0);
    }
}

export { synchronizeModels };