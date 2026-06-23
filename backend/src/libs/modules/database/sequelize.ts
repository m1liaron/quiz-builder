import { config } from "dotenv";
import { Sequelize } from "sequelize";
import logger from 'jet-logger';

import { ENV } from "@src/libs/modules/config/env/env";
config();

let sequelize: Sequelize;

if (ENV.NODE_ENV === "production") {
    sequelize = new Sequelize(ENV.DATABASE_URL!, {
        dialect: "postgres",
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    });
} else {
    sequelize = new Sequelize(
        ENV.DATABASE_NAME!,
        ENV.DATABASE_USER_NAME!,
        ENV.DATABASE_PASSWORD,
        {
            host: ENV.DB_HOST,
            port: Number(ENV.DB_PORT),
            dialect: "postgres",
            logging: false,
        },
    );
}

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        logger.info("Connection to PostgreSQL has been established successfully.");
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        logger.err(`Unable to connect to the PostgreSQL database: ${message}`);
    }
};

export { sequelize, connectDB };