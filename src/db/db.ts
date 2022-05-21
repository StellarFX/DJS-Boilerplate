import { Sequelize } from 'sequelize';
import BoxLog from '../util/BoxLog';
import { red } from 'colors/safe';
import * as fs from 'fs';

export async function initDb() {
    const db = new Sequelize({
        dialect: "sqlite",
        storage: "src/db/db.sqlite",
        logging: (msg) => BoxLog(`> ${msg}`, false)
    })

    try {
        await db.authenticate()
        BoxLog("> Loading database *models*...", false)
        await loadModels(db)
        BoxLog("*Database* connection *operational*!")
    } catch (err) {
        BoxLog(`Database connection ${red("failed")}!\n> ${err}`, true, { borderColor: "red" });
    }
}

async function loadModels(sequelize: Sequelize): Promise<void> {
    const files = fs.readdirSync("src/db/models").filter(file => (file.endsWith(".js") || file.endsWith(".ts")) && !file.startsWith("_"));
    return new Promise(async (res, rej) => {
        try {
            for (const file of files) {
                const m = (await import(`./models/${file}`))?.default;

                m.initModel(sequelize);
            }
            sequelize.sync().then(() => {
                res();
            }).catch((err) => rej(err));
        } catch (err) {
            rej(err);
        }
    });
}