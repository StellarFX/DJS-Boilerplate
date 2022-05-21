import { REST } from "@discordjs/rest";
import { Routes } from 'discord-api-types/v10'
import { token } from '../config/config.json'
import bl from '../util/BoxLog'
import { red } from "colors/safe";
import { commands } from "./init";

export async function deployCommands(clientId: string): Promise<void> {

    const rest = new REST({
        version: '10'
    }).setToken(token);

    try {
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands.default.map((val) => val.data.toJSON() )}
        )

        bl("Successfully *deployed* bot's *commands*!")
    } catch (err) {
        bl(`Can't deploy ${red("commands")} to Discord's API!\n> ${err}`, true, { borderColor: "red" });
    }

}