import { Client } from "discord.js";
import * as data from '../config/config.json';
import * as fs from 'fs';
import boxen from 'boxen';

const client = new Client({
  intents: [/* Your intents here */]
})

export default function init() {
  client.login(data["token"]);
  loadEvents(client);
}

function loadEvents(client: Client) {

    const files = fs.readdirSync("events").filter(file => file.endsWith(".js") && !file.startsWith("_"));

    for (const file of files) {
        const e = new (require(`../events/${file}`))(client);

        (e.once) ? client.once(e.name, (...args) => e.execute(...args)) : client.on(e.name, (...args) => e.execute(...args));
    }

}