import { Client } from "discord.js";
import { Event } from "./_Event";
import bl from "../util/BoxLog";
import { deployCommands } from "../init/DeployCommands";

export default class extends Event {

    constructor(client: Client) {
        super(client, "ready", false);
    }

    async execute(client: Client): Promise<void> {
        
        await deployCommands(client.user.id);

    }

}