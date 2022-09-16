import { Sequelize } from "sequelize";
import { delay } from "./utils/delay.js";
import { log } from "./utils/logger.js";

const sequelizeOptions = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres',
    logging: msg => log("sequelize: " + msg)
};

// console.log(sequelizeOptions.host);

const sequelize = new Sequelize(
    process.env.DATABASE_NAME, 
    process.env.DATABASE_USER, 
    process.env.DATABASE_PASSWORD, 
    sequelizeOptions
);

async function connectToDatabase() {
    
    let isConnected = false;
    const dbConnectionRequestInterval = Number.parseInt(process.env.DATABASE_CONNECTION_REQUEST_INTERVAL);

    do {

        log("выполняется попытка подключения к базе данных");
        isConnected = await requestConnectionToDatabase();
        await delay(dbConnectionRequestInterval);

    } while(!isConnected);

    log(`успешно установлено соединение с базой данных: ${process.env.DATABASE_NAME}`);
}

async function requestConnectionToDatabase() {
    try {
        await sequelize.authenticate();
        return true;
    } catch (e) {
        return false;
    }
}

export { sequelize, connectToDatabase };