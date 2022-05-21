import { Client, Collection as Collection } from "discord.js";
import * as data from '../config/config.json'
import * as fs from 'fs';
import bl from "../util/BoxLog";
import { Command } from "../commands/_Command";
import { initDb as initDb } from "../db/db";

export const commands: { default: Collection<string, Command> } = {
  default: new Collection()
};

const client = new Client({
  intents: [/* Your intents here */]
})

export default async function init() {
  /* <---- Here is the load flow of the bot's initialization. Everything here is realized BEFORE the bot is logged in. ----> */

  bl("> Loading *database*...", false)
  await initDb();

  bl("> Loading *events*...", false)
  await loadEvents(client);

  bl("> Loading *commands*...", false)
  commands.default = await loadCommands(client)

  /* </---------------------> */

  bl("> *Logging* bot...", false)
  await client.login(data["token"]);

  /* <---- Everything here is realized AFTER the bot is logged in. ----> */

  setPresence(client);

  /* </---------------------> */

  bl("Bot successfully *initialized*.");
}

async function loadEvents(client: Client): Promise<void> {
  const files = fs.readdirSync("src/events").filter(file => (file.endsWith(".ts") || file.endsWith(".js") ) && !file.startsWith("_"));
  return new Promise(async (res) => {
    for (const file of files) {
      const e = new ((await import(`../events/${file}`))?.default)(client);

      (e.once) ? client.once(e.name, (...args) => e.execute(...args)) : client.on(e.name, (...args) => e.execute(...args));
    }
    res();
  });
}

async function loadCommands(client: Client): Promise<Collection<string, Command>> {
  return new Promise(async (res, rej) => {
    try {
      const files = fs.readdirSync('src/commands');
      const commandArray: Collection<string, Command> = new Collection();
      for (const file of files) {
        if ((file.endsWith(".ts") || file.endsWith(".js")) && !file.startsWith("_")) {
          const command = new ((await import(`../commands/${file}`))?.default)(client);
          let command_name = file.split(".")[0];
          commandArray.set(command_name, command);
        }
      }
      res(commandArray);
    } catch (err) {
      rej(err);
    }
  })
}

function setPresence(client: Client) {
  client.user?.setPresence({
    activities: [{
      name: "In development!",
      type: "STREAMING",
      url: "https://www.twitch.tv/stellarfx"
    }]
  })
}