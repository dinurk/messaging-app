import "dotenv/config";
import { synchronizeModels } from "./core/synchronizeModels.js";
import { connectToDatabase } from "./database.js";
import express from "express";
import { apiRouter } from "./api-routes/index.js";
import { log } from "./utils/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { apiInfo } from "./middleware/apiInfo.js";

async function start() {

    await connectToDatabase();
    await synchronizeModels();
    
    const app = express();
    app.use(express.json());
    app.use("/api", apiRouter);
    app.use("/", apiInfo);
    app.use(errorHandler);
    app.listen(process.env.APP_PORT || 3000, () => log(`API сервера запущен на порту ${process.env.APP_PORT}`));
} 
 
start();